import { Image, Text, TouchableOpacity, View } from 'react-native';
// import { Perfil } from '../assets/Perfil';
import { Feather } from '@expo/vector-icons';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

type Props = {
  invisible?: boolean;
  imageUri?: string;
};

export function Header({ invisible, imageUri }: Props) {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const profileImage: string | undefined = auth.user?.photo;

  function handleScreenProfile() {
    navigation.navigate('profile');
  }

  const firstName = auth.user?.name ? auth.user?.name.split(' ')[0] : '';

  if (invisible) {
    return null;
  }

  return (
    <View>
      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-mist-100 border-[1px] border-black rounded-full"
          onPress={handleScreenProfile}
        >
          {profileImage || imageUri ? (
            imageUri ? (
              <Image
                className="rounded-full"
                source={{ uri: imageUri }}
                style={{ width: 55, height: 55 }}
              />
            ) : (
              <Image
                className="rounded-full"
                source={{ uri: auth.user?.photo }}
                style={{ width: 55, height: 55 }}
              />
            )
          ) : (
            <Feather name="user" size={30} style={{ margin: 10 }} />
          )}
        </TouchableOpacity>

        <Text className="font-extralight text-3xl ml-[18px]">
          Hi, {firstName}!
        </Text>
      </View>
    </View>
  );
}
