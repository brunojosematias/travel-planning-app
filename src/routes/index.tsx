import { NavigationContainer } from '@react-navigation/native';

import { View } from 'react-native';

import { AppRoutes } from './app.routes';

import colors from 'tailwindcss/colors';

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.green[100] }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
