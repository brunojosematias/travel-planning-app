import { TouchableOpacityProps } from 'react-native';

import { Text, TouchableOpacity, View } from 'react-native';

import { Edit } from '../assets/Edit';
// import { formatCurrency } from '../utils/formatCurrency';

type Props = TouchableOpacityProps & {
  location: string;
  expectedDate: string;
  returnDate: string;
  investment: string;
  onEditFormTripNavigate: () => void;
  onTripModalOpen: () => void;
};

export function Trip({
  location,
  expectedDate,
  investment,
  returnDate,
  onEditFormTripNavigate,
  onTripModalOpen,
}: Props) {
  function formatCurrency(value: string) {
    const convertValue = Number(value);

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(convertValue);
  }

  function formatDate(date: string) {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    return date.replace(regex, '$3/$2/$1');
  }

  function handleSelectedTrip() {
    onTripModalOpen();
  }

  function handleEditFormTrip() {
    onEditFormTripNavigate();
  }

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center border-gray-400 border-[0.5px] py-2 px-[14px] mb-[15px] rounded-[5px]"
      onPress={handleSelectedTrip}
    >
      <View>
        <Text className="text-gray-500 text-[15px]">{location}</Text>
        <View className="flex-row">
          <View>
            <Text className="text-gray-400 text-[8px]">
              Data prevista: {formatDate(expectedDate)}
            </Text>
            <Text className="text-gray-400 text-[8px] mt-[2px]">
              Investimento: {formatCurrency(investment)}
            </Text>
          </View>

          <Text className="text-gray-400 text-[8px] ml-[15px]">
            Data volta: {formatDate(returnDate)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleEditFormTrip}>
        <Edit />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
