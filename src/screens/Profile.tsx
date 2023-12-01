import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Perfil } from '../assets/Perfil';
// import { BigPerfil } from '../assets/BigPerfil';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// import { EditPassword } from '../assets/EditPassword';
import { ToGoOut } from '../assets/ToGoOut';
import { EditPerfil } from '../assets/EditPerfil';
import { useNavigation } from '@react-navigation/native';
import { api } from '../hooks/useApi';
import { Header } from '../components/Header';

export function Profile() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState('');
  // const [profileImage, setProfileImage] = useState<string | undefined>('');

  const profileImage: string | undefined = auth.user?.photo;

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

      // console.log('imagem', imageUri);
    } else {
      console.log('Seleção cancelada');
    }

    // setProfileImage(auth.user?.photo);
  }

  async function addPhotoUser() {
    try {
      const { data } = await api.put(
        '/api/auth/updatePhoto',
        {
          photo: imageUri,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user?.token}`,
          },
        }
      );

      // setImageUri('');

      console.log(data);
    } catch (err) {
      console.log('Error', err);
    }
  }

  function handleScreenLogin() {
    navigation.navigate('login');
  }

  return (
    <SafeAreaView className="flex-1 px-[25px]">
      <Header invisible imageUri={imageUri} />
      <View className="py-[37px] px-[24px]">
        <View className="justify-center items-center">
          <Text className="text-3xl">Settings</Text>

          <View className="justify-center items-center mt-6 relative">
            <View className="border-8 border-blue-100 rounded-full">
              <View className="border-8 border-white rounded-full">
                <View className="border-8 border-green-500 rounded-full">
                  {/* <BigPerfil /> */}
                  {profileImage || imageUri ? (
                    imageUri ? (
                      <Image
                        className="rounded-full"
                        source={{ uri: imageUri }}
                        style={{ width: 200, height: 200 }}
                      />
                    ) : (
                      <Image
                        className="rounded-full"
                        source={{ uri: profileImage ? profileImage : imageUri }}
                        style={{ width: 200, height: 200 }}
                      />
                    )
                  ) : (
                    <Feather name="user" size={155} style={{ margin: 20 }} />
                  )}
                </View>
              </View>
            </View>

            <View className=" bg-white rounded-full absolute bottom-5 right-10">
              <TouchableOpacity
                className="justify-center items-cente"
                onPress={pickImage}
              >
                <View className="border-4 p-1 border-green-500 rounded-full">
                  <EditPerfil />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {imageUri && (
            <TouchableOpacity onPress={addPhotoUser}>
              <Text>Salvar foto</Text>
            </TouchableOpacity>
          )}

          <Text className="text-3xl font-semibold mt-5">{auth.user?.name}</Text>
        </View>
      </View>

      <View>
        {/* <TouchableOpacity className="flex-row items-center">
          <View className="p-2 bg-coral-600 rounded-[5px] opacity-50">
            <EditPassword />
          </View>
          <Text className="ml-[10px] text-xs">Editar senha</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          className="flex-row items-center mt-3"
          onPress={handleScreenLogin}
        >
          <View className="p-2 bg-[#E1E1E1] rounded-[5px] opacity-50">
            <ToGoOut />
          </View>
          <Text className="ml-[10px] text-xs">Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
