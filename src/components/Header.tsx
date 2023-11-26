import { Text, TouchableOpacity, View } from 'react-native';
import { Perfil } from '../assets/Perfil';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export function Header() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  function handleScreenProfile() {
    console.log('ckjoscjeo');
    navigation.navigate('profile');
  }

  return (
    <View>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleScreenProfile}>
          <Perfil />
        </TouchableOpacity>
        <Text className="font-extralight text-3xl ml-[18px]">
          Hi, {auth.user?.name}!
        </Text>
      </View>
    </View>
  );
}
