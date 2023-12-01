import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Close } from '../../assets/Close';
import { LocationTypes } from '.';

type Props = {
  visible: boolean;
  locations: LocationTypes | undefined;
  onClose: () => void;
};

export function ModalLocation({ visible = true, locations, onClose }: Props) {
  if (!visible || !locations) {
    return null;
  }

  function openLink() {
    const local: string = locations?.link ?? '';

    Linking.openURL(local);
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        className="flex-1 items-stretch justify-center py-0 px-6"
      >
        <View className="bg-[#fafafa] rounded-lg p-6">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-xl">{locations.nome}</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={openLink} className="pt-4 gap-2">
            <Text className="text-blue-500">
              <Text className="font-medium text-black">Link: </Text>{' '}
              {locations.link}
            </Text>
          </TouchableOpacity>

          <Image
            className="w-[300] h-[300] mt-8"
            source={{
              uri: locations.photo,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
