import { Text, View } from 'react-native';
import { Empty } from '../assets/Empty';

export function ListEmpty() {
  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Empty />
      <Text className="font-extralight text-[25px]">Nenhuma viagem criada</Text>
    </View>
  );
}
