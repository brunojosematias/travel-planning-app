import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  location: string;
  completedDate: string;
  onSelectedTrip: () => void;
  onTripModalOpen: () => void;
};

export function CompletedTrips({
  location,
  completedDate,
  onTripModalOpen,
}: Props) {
  function formatDate(date: string) {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    return date.replace(regex, '$3/$2/$1');
  }

  function handleSelectedTrip() {
    onTripModalOpen();
  }

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center border-gray-400 border-[0.5px] py-2 px-[14px] mb-[15px] rounded-[5px]"
      onPress={handleSelectedTrip}
    >
      <View>
        <Text className="text-gray-500 text-[15px]">
          Viagem para {location}
        </Text>
        <View className="flex-row">
          <Text className="text-gray-400 text-[8px] mt-[5px]">
            Conluído: {formatDate(completedDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
