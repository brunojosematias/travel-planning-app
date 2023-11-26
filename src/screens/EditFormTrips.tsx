import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Calender } from '../assets/Calender';
import { Button } from '../components/Button';
import { useContext, useState } from 'react';
import { Upload } from '../assets/Upload';

import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { api } from '../hooks/useApi';
import { AuthContext } from '../contexts/AuthContext';

type RouteParams = {
  id: number;
};

export function EditFormTrips() {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  const [destiny, setDestiny] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [investmentIntention, setInvestmentIntention] = useState('');
  const [imageUri, setImageUri] = useState('');

  async function pickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Você precisa conceder permissão para acessar a galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);

      console.log('imagem', imageUri);
    } else {
      console.log('Seleção cancelada');
    }
  }

  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function handleEditTrip() {
    console.log({
      destiny,
      departureDate,
      returnDate,
      investmentIntention,
      imageUri,
    });

    console.log('Token', auth.user?.token);

    try {
      console.log(id);

      await api.put(`/api/trip/finish/${id}`, null, {
        headers: {
          Authorization: `Bearer ${auth.user?.token}`,
        },
      });
    } catch (err) {
      console.log('Error', err);
    }

    setDestiny('');
    setDepartureDate('');
    setReturnDate('');
    setInvestmentIntention('');
    setImageUri('');

    navigation.navigate('trips');
  }

  function handleCancel() {
    setDestiny('');
    setDepartureDate('');
    setReturnDate('');
    setInvestmentIntention('');
    setImageUri('');

    navigation.navigate('trips');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 py-[37px] px-[24px]">
        <Header />

        <View className="bg-blue-100 flex-1 justify-between mt-[47px] px-[29px] rounded-[5px] ">
          <View className="mt-[17px]">
            <Input
              value={destiny}
              placeholder="Destino"
              onChangeText={setDestiny}
            />

            <View className="flex-row justify-between mt-[10px]">
              <View className="flex-row bg-white items-center pr-[7px] ">
                <Input
                  className="w-28 focus:border-white"
                  value={departureDate}
                  placeholder="Data de ida"
                  keyboardType="number-pad"
                  onChangeText={(value) => setDepartureDate(formatDate(value))}
                />
                <Calender />
              </View>

              <View className="flex-row bg-white items-center pr-[7px]">
                <Input
                  className="w-28 focus:border-white"
                  value={returnDate}
                  placeholder="Data de volta"
                  keyboardType="number-pad"
                  onChangeText={(value) => setReturnDate(formatDate(value))}
                />
                <Calender />
              </View>
            </View>

            <Input
              className="mt-[10px]"
              value={investmentIntention}
              placeholder="Quanto pretendo investir"
              keyboardType="numeric"
              onChangeText={(value) =>
                setInvestmentIntention(formatCurrency(value))
              }
            />

            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center justify-end mt-[10px]"
            >
              <Text className="text-gray-400 text-[10px] mr-[6px]">
                Faça upload de fotos
              </Text>
              <Upload />
            </TouchableOpacity>
          </View>

          {imageUri && (
            <View className="items-center">
              <Image
                source={{ uri: imageUri }}
                style={{ width: 300, height: 300 }}
              />
            </View>
          )}

          <View className="flex-row justify-end gap-[6px] mb-[19px]">
            <Button smallText onPress={handleEditTrip} className="w-[100px]">
              Concluído
            </Button>
            <Button
              smallText
              onPress={handleCancel}
              className="w-[100px] bg-coral-600"
            >
              Andamento
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
