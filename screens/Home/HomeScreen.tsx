import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React,{ useEffect, useState } from 'react';
import {StyleSheet, Text,View, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import { Emoji } from '../../components/Emoji/Emoji';
import StyleCard from '../../components/Card/StyleCard';
import Card from '../../components/Card/Card';
import Slider from '../../components/Silder/Slider';
import Modal from '../Components/modal';
import { DataTable } from 'react-native-paper';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let hours = new Date().getHours();
  const [esDia, setEsDia] = useState(false);
  const [esTarde, setEsTarde] = useState(false);
  const [esNoche, setEsNoche] = useState(false);

  const onShowAccountDetail = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (hours >= 5 && hours < 13) {
      setEsDia(true);
    } else if (hours >= 13 && hours < 19){
      setEsTarde(true);
    } else if (hours >= 19 || hours < 5){
      setEsNoche(true);
    }

  }, [hours]);

  const width = Dimensions.get('window').width;

    const tableData = [
      ['2025-01-01', '$1500', '1/6'],
      ['2025-02-01', '$1500', '3/12'],
      ['2025-03-01', '$1500', '10/12'],
      ['2025-04-01', '$1500', '2/3'],
    ];

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
    <View className='pt-16 pb6 px-6 bg-[#11ae40]'>
      <Animated.View className='flex-row justify-between items-center'>
        {/* <Avatar size={40} rounded title="GP" containerStyle={{ backgroundColor: "black" }} /> */}
        <View>
          <View className='flex-row items-end gap-1'>
            {esDia && <Text className='text-white text-lg' style={{fontFamily: 'BarlowMedium'}}>¡Buenos dias!</Text>}
            {esTarde && <Text className='text-white text-lg' style={{fontFamily: 'BarlowMedium'}}>¡Buenas tardes!</Text>}
            {esNoche && <Text className='text-white text-lg' style={{fontFamily: 'BarlowMedium'}}>¡Buenas noches!</Text>}
            <View>
              {esDia && <Emoji emoji="😋" />}
              {esTarde && <Emoji emoji="😎" />}
              {esNoche && <Emoji emoji="😴" />}
            </View>
          </View>
          <Text className='text-white text-2xl' style={{fontFamily: 'BarlowBold', marginBottom: 10}}>
           Gonzalo Paolinelli
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log('Press');
            }}>
              <MaterialIcons name= 'person-outline' size={40} color='white' />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
    <ScrollView>

      <Slider/>

      {/* <Text style={styles.titleText}>Credito disponible</Text> */}

      {/* <StyleCard title="$200.000" subtitle="SALDO EN EFECTIVO 💵" text="Recorda que este saldo lo tenes disponible para retirarlo en cualquier sucursal de Solo Deportes" /> */}
      <StyleCard title="$430.000" subtitle="SALDO EN COMPRAS 🛒" text="Podes ir a comprar a cualquier comercio adherido" />
      <Card subtitle="RESUMEN DE CUENTA" text="El total a pagar al 25/12/2024 es $23.400" />

      <TouchableOpacity style={styles.appButtonContainer} onPress={onShowAccountDetail}>
        <Text style={styles.appButtonText}>Ver detalle de cuenta</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onClose={onModalClose}>
        <ScrollView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Fecha</DataTable.Title>
            <DataTable.Title>Monto</DataTable.Title>
            <DataTable.Title>Cuota</DataTable.Title>
          </DataTable.Header>

          {tableData.map((row, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{row[0]}</DataTable.Cell>
              <DataTable.Cell>{row[1]}</DataTable.Cell>
              <DataTable.Cell>{row[2]}</DataTable.Cell>
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
    // alignItems: 'center',
    backgroundColor: "#11ae40",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '95%',
    alignSelf:'center',
    height: 'auto',
    
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  titleText: {
    fontSize: 15,
    paddingVertical: 5,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    
    // textAlign:'center',
    // paddingLeft: 0,
    
  },
});