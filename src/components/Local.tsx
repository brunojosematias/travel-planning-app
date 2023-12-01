import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
// import { LocalExemple } from '../assets/LacalExemple';
import { Maps } from '../assets/Maps';
import React from 'react';

// type LocationTypes = {
//   id: number;
//   link: string;
//   tipo: string;
//   nome: string;
// };

type Props = {
  link: string;
  nome: string;
  photo: string;
  onLocationModalOpen: () => void;
};

export function Local({ link, nome, photo, onLocationModalOpen }: Props) {
  // const [locations, setLocations] = useState<LocationTypes[]>([]);

  // useEffect(() => {
  //   async function fetchLocations() {
  //     try {
  //       const { data } = await api.get('/api/local/list', {
  //         headers: {
  //           Authorization: `Bearer ${auth.user?.token}`,
  //         },
  //       });

  //       setLocations(data);
  //       console.log(locations);
  //     } catch (err) {
  //       console.log('Error', err);
  //     }
  //   }

  //   fetchLocations();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function fetchLocations() {
  //       try {
  //         const response = await api.get('/api/local/list', {
  //           headers: {
  //             Authorization: `Bearer ${auth.user?.token}`,
  //           },
  //         });

  //         const locationsdata = response.data?.data || [];

  //         setLocations(locationsdata);
  //         console.log(locations);
  //       } catch (err) {
  //         console.log('Error', err);
  //       }
  //     }

  //     fetchLocations();
  //   }, [])
  // );

  function handleSelectedLocation() {
    onLocationModalOpen();
  }

  function openLink() {
    Linking.openURL(link);
  }

  return (
    <TouchableOpacity
      className="flex-row mb-4"
      onPress={handleSelectedLocation}
    >
      {/* <LocalExemple /> */}
      <Image
        className="rounded-lg"
        source={{
          uri: photo,
        }}
        style={{ width: 60, height: 60 }}
      />

      <View className="ml-3">
        <Text className="text-[15px] text-gray-500">{nome}</Text>

        <TouchableOpacity onPress={openLink} className="flex-row">
          <Text className="font-extralight text-[8px] mr-1">
            Consultar endereço no maps
          </Text>
          <Maps />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
