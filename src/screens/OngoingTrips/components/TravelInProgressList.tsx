import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { useContext, useState } from 'react';
import { Trip } from '../../../components/Trip';
import { ListEmpty } from '../../../components/ListEmpty';
import { api } from '../../../hooks/useApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { ModalTrip } from '../../../components/ModalTrip';

import colors from 'tailwindcss/colors';

export type TripType = {
  id: number;
  data_inicio: string;
  data_fim: string;
  destino: string;
  orcamento: string;
  status: number;
  photo: string;
};

export function TravelInProgressList() {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const [tripModalVisible, setTripModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripType>();

  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  function handleTripModalOpen(trip: TripType) {
    setTripModalVisible(true);
    setSelectedTrip(trip);
  }

  useFocusEffect(
    React.useCallback(() => {
      const maxRetries = 3;

      async function fetchTrips(retryCount = 0) {
        try {
          setIsloading(true);

          const token = auth.user?.token || '';
          const response = await api.get(
            `api/trip/showAll?user_id=${auth.user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const tripsData = response.data?.data || [];
          const filteredTrips = tripsData.data.filter(
            (trip: TripType) => trip.status === 1
          );
          setTrips(filteredTrips);

          console.log(tripsData.data);
        } catch (err: any) {
          if (
            err.response &&
            err.response.status === 429 &&
            retryCount < maxRetries
          ) {
            const waitingTime = err.response.headers['Retry-After'] || 2;
            console.log(
              `Atingido o limite de solicitações. Aguardando ${waitingTime} segundos antes de tentar novamente.`
            );
            await esperar(waitingTime * 1000);

            // Tenta novamente após a espera
            fetchTrips(retryCount + 1);
          } else {
            console.error('Erro', err);
          }
        } finally {
          setIsloading(false);
        }
      }

      fetchTrips();
    }, [])
  );

  function handleEditFormTripNavigate(id: number) {
    navigation.navigate('edit-trips', { id });
    console.log('id do usuário', id);
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={trips}
        keyExtractor={(trip) => trip.id.toString()}
        renderItem={({ item: trip }) => (
          <Trip
            location={trip.destino}
            expectedDate={trip.data_inicio}
            returnDate={trip.data_fim}
            investment={trip.orcamento}
            onEditFormTripNavigate={() => handleEditFormTripNavigate(trip.id)}
            onTripModalOpen={() => handleTripModalOpen(trip)}
          />
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator color={colors.green['500']} />
          ) : (
            <ListEmpty />
          )
        }
        contentContainerStyle={[{ paddingBottom: 100 }]}
      />

      <ModalTrip
        visible={tripModalVisible}
        trip={selectedTrip}
        onClose={() => setTripModalVisible(false)}
      />
    </>
  );
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
