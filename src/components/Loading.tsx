import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'tailwindcss/colors';

export function Loading() {
  return (
    <SafeAreaView className="flex-1 bg-mist-100 justify-center items-center">
      <ActivityIndicator color={colors.green['500']} />
    </SafeAreaView>
  );
}
