import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Search } from '../../assets/Search';
import { Local } from '../../components/Local';
import React, { useContext, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../hooks/useApi';
import { ModalLocation } from './ModalLocation';

export type LocationTypes = {
  id: number;
  link: string;
  nome: string;
  photo: string;
};

export function CityInformation() {
  const [locations, setLocations] = useState<LocationTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationTypes>();

  const auth = useContext(AuthContext);

  function handleLocationModalOpen(location: LocationTypes) {
    setLocationModalVisible(true);
    setSelectedLocation(location);
  }

  const filteredContacts = useMemo(
    () =>
      locations.filter((location) =>
        location.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
      ),
    [locations, searchTerm]
  );

  useFocusEffect(
    React.useCallback(() => {
      async function fetchLocations() {
        try {
          const response = await api.get('/api/local/list', {
            headers: {
              Authorization: `Bearer ${auth.user?.token}`,
            },
          });

          const locationsdata = response.data?.data || [];

          setLocations(locationsdata);
          console.log(locations);
        } catch (err) {
          console.log('Error', err);
        }
      }

      fetchLocations();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-[37px] px-[24px]">
        <Header />

        <View className="mt-9 pb-52 mr-7">
          <View className="flex-row items-center border-green-500 border-[1px] rounded-[5px]">
            <Input
              value={searchTerm}
              className="outline-none focus:border-none focus:border-0"
              placeholder="Ex: Juazeiro do Norte"
              onChangeText={setSearchTerm}
            />
            <TouchableOpacity className="pl-2">
              <Search />
            </TouchableOpacity>
          </View>

          <View className="mt-14">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredContacts}
              keyExtractor={(location) => location.id.toString()}
              renderItem={({ item: locations }) => (
                <Local
                  link={locations.link}
                  nome={locations.nome}
                  photo={locations.photo}
                  onLocationModalOpen={() => handleLocationModalOpen(locations)}
                />
              )}
              // contentContainerStyle={[{ paddingBottom: 100 }]}
            />

            <ModalLocation
              visible={locationModalVisible}
              locations={selectedLocation}
              onClose={() => setLocationModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
