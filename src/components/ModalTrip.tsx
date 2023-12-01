import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Close } from '../assets/Close';
import { TripType } from '../screens/OngoingTrips/components/TravelInProgressList';

// type Props = {
//   data_inicio: string;
//   data_fim: string;
//   destino: string;
//   orcamento: string;
//   photo: string;
// };

type Props = {
  visible: boolean;
  trip: TripType | undefined;
  onClose: () => void;
};

export function ModalTrip({ visible = true, trip, onClose }: Props) {
  if (!visible || !trip) {
    return null;
  }

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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        className="flex-1 items-stretch justify-center py-0 px-6"
      >
        <View className="bg-[#fafafa] rounded-lg p-6">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-xl">{trip.destino}</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </View>

          <View className="pt-4 gap-2">
            <Text>
              <Text className="font-medium">Data prevista:</Text>{' '}
              {formatDate(trip.data_inicio)}
            </Text>
            <Text>
              <Text className="font-medium">Data de volta:</Text>{' '}
              {formatDate(trip.data_fim)}
            </Text>
            <Text>
              <Text className="font-medium">Investimento:</Text>{' '}
              {formatCurrency(trip.orcamento)}
            </Text>
          </View>

          <Image
            className="w-[300] h-[300] mt-8"
            source={{
              uri: trip.photo,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
