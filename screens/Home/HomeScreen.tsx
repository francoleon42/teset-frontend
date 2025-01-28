import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { DataTable } from 'react-native-paper';
import { getCliente, getClienteDetalle } from '../../servicios/clienteService';
import { Emoji } from '../../components/Emoji/Emoji';
import StyleCard from '../../components/Card/StyleCard';
import Card from '../../components/Card/Card';
import Slider from '../../components/Silder/Slider';
import Modal from '../Components/modal';

export default function HomeScreen({ route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [esDia, setEsDia] = useState(false);
  const [esTarde, setEsTarde] = useState(false);
  const [esNoche, setEsNoche] = useState(false);

  const [clientData, setClientData] = useState<any>(null);
  const [clientDetalle, setClientDetalle] = useState<any>(null);
  const { token } = route.params;
  const [useToken, setToken] = useState<string>(token);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const responseClienteData = await getCliente(token);
        setClientData(responseClienteData);

        const responseClienteDetalle = await getClienteDetalle(token);
        setClientDetalle(responseClienteDetalle);

      } catch (error) {
        console.error('Error obteniendo datos del cliente:', error);
      }
    };

    fetchClientData();

    const hours = new Date().getHours();
    if (hours >= 5 && hours < 13) setEsDia(true);
    else if (hours >= 13 && hours < 19) setEsTarde(true);
    else setEsNoche(true);
  }, [token]);

  const onShowAccountDetail = () => setIsModalVisible(true);
  const onModalClose = () => setIsModalVisible(false);

  return (
    <View className="flex-1 bg-[#f5f5f5]">
      <View className="pt-16 pb6 px-6 bg-[#11ae40]">
        <Animated.View className="flex-row justify-between items-center">
          <View>
            <View className="flex-row items-end gap-1">
              {esDia && <Text className="text-white text-lg">¡Buenos días!</Text>}
              {esTarde && <Text className="text-white text-lg">¡Buenas tardes!</Text>}
              {esNoche && <Text className="text-white text-lg">¡Buenas noches!</Text>}
              <View>
                {esDia && <Emoji emoji="😋" />}
                {esTarde && <Emoji emoji="😎" />}
                {esNoche && <Emoji emoji="😴" />}
              </View>
            </View>
            <Text className="text-white text-2xl" style={{ marginBottom: 10 }}>
              {clientData?.nombre || 'Usuario'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Press')}>
            <MaterialIcons name="person-outline" size={40} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ScrollView>
        <Slider />
        <StyleCard
          title={`$${clientData?.saldoCompras || '0'}`}
          subtitle="DISPONIBLE PARA COMPRAS 🛒"
          text="Podes ir a comprar a cualquier comercio adherido"
        />
        <Card subtitle="RESUMEN DE CUENTA" text={`- Saldo a pagar a la fecha es $ ${clientData?.totalAPagar || '0'} 
        - Proximo vencimiento ${clientData?.fechaProximoVencimiento || '0/00/0000'} $${clientData?.importePxVto || '0'}`} />

        <TouchableOpacity style={styles.appButtonContainer} onPress={onShowAccountDetail}>
          <Text style={styles.appButtonText}>Ver detalle de cuenta</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} onClose={onModalClose}>
          <ScrollView style={styles.container}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Fecha emision</DataTable.Title>
                <DataTable.Title>CreditoNro</DataTable.Title>
                <DataTable.Title>Comercio</DataTable.Title>
                <DataTable.Title>Importe a pagar</DataTable.Title>
                <DataTable.Title>Prox vencim</DataTable.Title>
              </DataTable.Header>
              {clientDetalle?.map((detalle, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{detalle.fechaEmision}</DataTable.Cell>
                  <DataTable.Cell>{detalle.secuencia}</DataTable.Cell>
                  <DataTable.Cell>{detalle.codCom}</DataTable.Cell>
                  <DataTable.Cell>${detalle.importe.toFixed(2)}</DataTable.Cell>
                  <DataTable.Cell>
                    <View>
                      <Text>${detalle.importePxVto.toFixed(2)}</Text>
                      <Text>{detalle.fechadeProximoVencimiento}</Text>
                      <Text>{detalle.cuota}</Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    flex: 1,
    elevation: 14,
    justifyContent: 'center',
    backgroundColor: '#11ae40',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '95%',
    alignSelf: 'center',
    height: 'auto',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
