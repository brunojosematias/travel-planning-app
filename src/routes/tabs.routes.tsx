import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { OngoingTrips } from '../screens/OngoingTrips';
import { TravelRegistration } from '../screens/TravelRegistration';
import { CityInformation } from '../screens/CityInformation';
import { Profile } from '../screens/Profile';
import { EditFormTrips } from '../screens/EditFormTrips';
// import { Profile } from '../screens/Profile';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#31C292',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          overflow: 'hidden',
        },
      }}
    >
      <Tab.Screen
        name="trips"
        component={OngoingTrips}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? '#fff' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="travel-registration"
        component={TravelRegistration}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="plus"
              size={size}
              color={focused ? '#fff' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="city-​​information"
        component={CityInformation}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="info"
              size={size}
              color={focused ? '#fff' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="edit-trips"
        component={EditFormTrips}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
