import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/Header';
import { TravelInProgressList } from './components/TravelInProgressList';
import { CompletedTripsList } from './components/CompletedTripsList';
import { useState } from 'react';

export function OngoingTrips() {
  const [viewTripsProgress, setViewTripsProgress] = useState(true);
  const [viewTripsCompleteds, setViewTripsCompleteds] = useState(false);

  function handleViewTripsCompleteds() {
    setViewTripsProgress(false);
    setViewTripsCompleteds(true);
  }

  function handleViewTripsProgress() {
    setViewTripsProgress(true);
    setViewTripsCompleteds(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-[37px] px-[24px]">
        <Header />

        <View className="flex-row text-center justify-center gap-6 mt-8">
          <TouchableOpacity
            className={`${
              viewTripsProgress
                ? 'bg-green-500'
                : 'bg-white border-gray-400 border-[1px]'
            } rounded-[10px] w-[150px]`}
            onPress={handleViewTripsProgress}
          >
            <Text
              className={`${
                viewTripsProgress ? 'text-white' : 'text-gray-500'
              } font-semibold text-[10px] text-center py-3`}
            >
              Viagens em andamento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${
              viewTripsCompleteds
                ? 'bg-green-500'
                : 'bg-white border-gray-400 border-[1px]'
            } rounded-[10px] w-[150px]`}
            onPress={handleViewTripsCompleteds}
          >
            <Text
              className={`${
                viewTripsCompleteds ? 'text-white' : 'text-gray-500'
              } font-semibold text-[10px] text-center py-3`}
            >
              Viagens concluidas
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-9 pb-52">
          {viewTripsProgress && <TravelInProgressList />}
          {viewTripsCompleteds && <CompletedTripsList />}
        </View>
      </View>
    </SafeAreaView>
  );
}
