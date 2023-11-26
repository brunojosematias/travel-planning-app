import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Perfil } from '../assets/Perfil';
import { BigPerfil } from '../assets/BigPerfil';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { EditPassword } from '../assets/EditPassword';
import { ToGoOut } from '../assets/ToGoOut';
import { EditPerfil } from '../assets/EditPerfil';
import { useNavigation } from '@react-navigation/native';

export function Profile() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  function handleScreenLogin() {
    navigation.navigate('login');
  }

  return (
    <SafeAreaView className="flex-1 px-[25px]">
      <View className="py-[37px] px-[24px]">
        <View className="justify-center items-center">
          <Text className="text-3xl">Settings</Text>

          <View className="justify-center items-center mt-6 relative">
            <View className="border-8 border-blue-100 rounded-full">
              <View className="border-8 border-white rounded-full">
                <View className="border-8 border-green-500 rounded-full">
                  <BigPerfil />
                </View>
              </View>
            </View>

            <View className=" bg-white rounded-full absolute bottom-5 right-10">
              <TouchableOpacity className="justify-center items-cente">
                <View className="border-4 p-1 border-green-500 rounded-full">
                  <EditPerfil />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-3xl font-semibold mt-5">{auth.user?.name}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity className="flex-row items-center">
          <View className="p-2 bg-coral-600 rounded-[5px] opacity-50">
            <EditPassword />
          </View>
          <Text className="ml-[10px] text-xs">Editar senha</Text>
        </TouchableOpacity>

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
