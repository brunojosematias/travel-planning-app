import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { TabRoutes } from './tabs.routes';

import { RequireAuth } from '../contexts/RequireAuth';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const auth = React.useContext(AuthContext);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />

      {/* Use RequireAuth como uma função render para proteger a rota "user" */}
      <Screen
        name="user"
        options={{
          headerShown: false, // Oculta o cabeçalho para a rota "user"
        }}
      >
        {() => (
          <RequireAuth>{auth.user ? <TabRoutes /> : <Login />}</RequireAuth>
        )}
      </Screen>
    </Navigator>
  );
}
