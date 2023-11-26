import { ActivityIndicator, FlatList } from 'react-native';
import { CompletedTrips } from '../../../components/CompletedTrips';
import React, { useContext, useState } from 'react';
import { ListEmpty } from '../../../components/ListEmpty';
import { AuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../hooks/useApi';
import { useFocusEffect } from '@react-navigation/native';
import { ModalTrip } from '../../../components/ModalTrip';

import colors from 'tailwindcss/colors';

type TripType = {
  id: number;
  destino: string;
  data_fim: string;
  data_inicio: string;
  orcamento: string;
  photo: string;
  status: number;
};

export function CompletedTripsList() {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [tripModalVisible, setTripModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripType>();
  const [isLoading, setIsloading] = useState(true);

  const auth = useContext(AuthContext);

  function handleSelectedTrip(id: number) {
    console.log('id do usuário', id);
  }

  function handleTripModalOpen(trip: TripType) {
    console.log(trip);
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
            (trip: TripType) => trip.status === 2
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

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={trips}
        keyExtractor={(trip) => trip.id.toString()}
        renderItem={({ item: trip }) => (
          <CompletedTrips
            location={trip.destino}
            completedDate={trip.data_fim}
            onSelectedTrip={() => handleSelectedTrip(trip.id)}
            onTripModalOpen={() => handleTripModalOpen(trip)}
          />
        )}
        ListEmptyComponent={
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
