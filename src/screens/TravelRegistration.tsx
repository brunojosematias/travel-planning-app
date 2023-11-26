import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Calender } from '../assets/Calender';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Upload } from '../assets/Upload';

import { parse, isFuture } from 'date-fns';

import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { api } from '../hooks/useApi';
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

export function TravelRegistration() {
  const navigation = useNavigation();

  const [destiny, setDestiny] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [investmentIntention, setInvestmentIntention] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [isLoading, setIsloading] = useState(false);

  const auth = useContext(AuthContext);

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

  function removeCurrencyFormatting(value: string) {
    const numericText = value.replace(/[^\d]/g, '');

    const numericValue = parseFloat(numericText) / 100;

    return numericValue.toString();
  }

  async function handleRegisterTrip() {
    setIsloading(true);

    try {
      if (!destiny || !departureDate || !returnDate || !investmentIntention) {
        alert('Todos os campos são obrigatórios.');
        return;
      }

      const departureDateValidate = parse(
        departureDate,
        'dd/MM/yyyy',
        new Date()
      );

      const returnDateValidate = parse(returnDate, 'dd/MM/yyyy', new Date());

      if (!isFuture(departureDateValidate) || !isFuture(returnDateValidate)) {
        alert('Insira uma data válida.');
        return;
      }

      const { data } = await api.post(
        '/api/trip/register',
        {
          data_inicio: departureDate,
          data_fim: returnDate,
          orcamento: removeCurrencyFormatting(investmentIntention),
          destino: destiny,
          photo:
            'file:///data/user/0/host.exp.exponent/cache/ExperienceData/@anonymous/app-9ce8e872-3b9b-49b2-ac74-eeceb5ac36fd/ImagePicker/107e68',
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.token}`,
          },
        }
      );

      console.log(data);
    } catch (err) {
      console.log('Error', err);
    } finally {
      setIsloading(false);
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                      onChangeText={(value) =>
                        setDepartureDate(formatDate(value))
                      }
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
                <Button
                  smallText
                  onPress={handleRegisterTrip}
                  className="w-[100px]"
                >
                  Salvar
                </Button>
                <Button
                  smallText
                  onPress={handleCancel}
                  className="w-[100px] bg-coral-600"
                >
                  Cancelar
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
