import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Search } from '../../assets/Search';
import { ButtonSelected } from '../../components/ButtonSelected';

export function CityInformation() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-[37px] px-[24px]">
        <Header />

        <View className="mt-9 pb-52 mr-7">
          <View className="flex-row items-center border-gray-500 border-[2px]">
            <Input placeholder="Ex: Juazeiro do Norte" />
            <TouchableOpacity className="pl-2">
              <Search />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
