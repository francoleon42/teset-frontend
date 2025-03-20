import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, FlatList, Platform, StatusBar, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import { getCliente, getClienteDetalle } from '../../servicios/clienteService';
import { logout } from '../../servicios/authService';
import { Emoji } from '../../components/Emoji/Emoji';
import StyleCard from '../../components/Card/StyleCard';
import Slider from '../../components/Silder/Slider';
import Modal from '../Components/modal';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { color } from '@rneui/base';

type RootStackParamList = {
  SignIn: undefined;
  CheckCode: { email: string };
  Root: { token: string };
  ForgotPassword: undefined;
  NewPassword: { email: string, dni: string };
  CheckEmail: undefined;
  SignUp: { email: string };
  TermsAndConditions: undefined;
  NotFound: undefined;
  Slider: { token: string }
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function HomeScreen({ route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [esDia, setEsDia] = useState(false);
  const [esTarde, setEsTarde] = useState(false);
  const [esNoche, setEsNoche] = useState(false);

  const [clientData, setClientData] = useState<any>(null);
  const [clientDetalle, setClientDetalle] = useState<any>(null);
  const [clientDetalleCuenta, setClientDetalleCuenta] = useState<any>(null);
  const [clientDetalleroxVenc, setClientDetalleProxVenc] = useState<any>(null);
  const { token } = route.params;
  const [useToken, setToken] = useState<string>(token);

  const navigation = useNavigation<NavigationProp>();

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

  const callLogout = async () => {
    try {
      const responseLogout = logout(token);
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Error', 'Error al cerrar sesion, cierre y abra la aplicacion.');
    }
  };

  return (
    <View className="flex-1 bg-[#f5f5f5]" >
      {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default' /> : ''}
      <View className="pt-16 pb6 px-6 bg-[#11ae40]" style={{ paddingTop: Platform.OS === 'android' ? 35 : 60 }}>
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
          <TouchableOpacity onPress={callLogout}>
            <MaterialIcons name="logout" size={30} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ScrollView>
        <Slider token={token} />
        <StyleCard
          title={`$${clientData?.saldoCompras || '0'}`}
          subtitle="DISPONIBLE PARA COMPRAS 🛒"
          text="Podes ir a comprar a cualquier comercio adherido"
        />
        <StyleCard
          title="Resumen de cuenta"
          subtitle={
              <Text>A pagar al día de la fecha:  <Text style={{ fontWeight: 'bold' }}>${clientData?.saldoAPagar || '0'}</Text></Text>
          }
          text={
            <Text>El próximo vencimiento es el <Text style={{ fontWeight: 'bold' }}>{clientData?.fechadeProximoVencimiento || '00/00/0000'} </Text>
                y el monto a pagar será de <Text style={{ fontWeight: 'bold' }}>{"$"+clientData?.importePxVto || '$0'}</Text></Text>
          }
        />

        <TouchableOpacity style={styles.appButtonContainer} onPress={onShowAccountDetail}>
          <Text style={styles.appButtonText}>Ver detalle de cuenta</Text>
        </TouchableOpacity>

          <Modal isVisible={isModalVisible} onClose={onModalClose}>

            {/* titulos */}
            <View style={styles.titles}>
              <Text style={styles.columna}>Emisión</Text>
              <Text style={styles.columna}>Sec</Text>
              <Text style={styles.columna}>Comercio</Text>
              <Text style={styles.columna}>Saldo Actual</Text>
            </View>
              
            <FlatList
              style={styles.container}
              data={clientDetalle}
              // keyExtractor={item => item.id}
              renderItem={({ item, index }) => (

                <View style={styles.fila} key={clientDetalle.id}> 
                  <Text style={styles.columna}>{item.fechaEmision}</Text>
                  <Text style={styles.columna}>{item.secuencia}</Text>
                  <Text style={styles.columna}>{item.codCom}</Text>
                  <Text style={styles.columna}>${item.importe.toFixed(2)}</Text>                
                </View>
              )}
            />
            <Text style={{position: 'absolute', right: '5%', top:'38%',}}>Total:  <Text style={{ fontWeight: 'bold' }}>${clientData?.saldoAPagar || '0'}</Text></Text>
            <Text style={{width: '100%',position: 'absolute', right: '0%', top:'48%',color: '#fff',fontSize: 16,backgroundColor: '#11ae40',borderTopRightRadius: 15,borderTopLeftRadius: 15,textAlign:'center',height:28}}>Prox. vencimiento: <Text style={{ fontWeight: 'bold' }}>{clientData?.fechadeProximoVencimiento || '00/00/0000'} </Text></Text>
            {/* titulos */}
            <View style={styles.titles}>
              <Text style={styles.columna}>Cuota</Text>
              <Text style={styles.columna}>Sec</Text>
              <Text style={styles.columna}>Comercio</Text>
              <Text style={styles.columna}>Imp. Cuota</Text>
            </View>
             
            <FlatList
            style={styles.container}
            data={clientDetalle}
            renderItem={({ item, index }) => (
              <View style={styles.fila} key={clientDetalle.id}>
                <Text style={styles.columna}>{item.cuota}</Text>
                <Text style={styles.columna}>{item.secuencia}</Text>
                <Text style={styles.columna}>{item.codCom}</Text>
                <Text style={styles.columna}>${item.importePxVto.toFixed(2)}</Text>
              </View>
            )}
            />
            <Text style={{position: 'absolute', right: '5%', top:'85%',}}>Total:  <Text style={{ fontWeight: 'bold' }}>{"$"+clientData?.importePxVto || '$0'}</Text></Text>
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
    marginBottom: Platform.OS === 'android' ? 20 : 0
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
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
    
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#11ae40',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // flex: 5,
    // fontSize: RFPercentage(1.3),
  },
  columna: {
    // flex: 5,
    fontSize: RFPercentage(1.7),
    textAlign: 'center',
  },
  titles: {
    flexDirection: 'row',
    paddingVertical: 2,
    
    paddingHorizontal: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#11ae40',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
