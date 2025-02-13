import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, FlatList, Platform, StatusBar, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import { getCliente, getClienteDetalle } from '../../servicios/clienteService';
import { logout } from '../../servicios/authService';
import { Emoji } from '../../components/Emoji/Emoji';
import StyleCard from '../../components/Card/StyleCard';
import Card from '../../components/Card/Card';
import Slider from '../../components/Silder/Slider';
import Modal from '../Components/modal';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  SignIn: undefined;
  CheckCode: { email: string };
  Root: { token: string };
  ForgotPassword: undefined;
  NewPassword:{ email:string, dni: string };
  CheckEmail:undefined;
  SignUp:{ email: string };
  TermsAndConditions: undefined;
  NotFound: undefined;
  Slider:{ token: string }
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function HomeScreen({ route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [esDia, setEsDia] = useState(false);
  const [esTarde, setEsTarde] = useState(false);
  const [esNoche, setEsNoche] = useState(false);

  const [clientData, setClientData] = useState<any>(null);
  const [clientDetalle, setClientDetalle] = useState<any>(null);
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

  const callLogout =  async () => {
    console.log('logout')
    try{
      const responseLogout = logout(token);
      navigation.navigate('SignIn');
    } catch (error){
      console.log(error);
      
      Alert.alert('Error', 'Error al cerrar sesion, cierre y abra la aplicacion.');
    }
  };

  return (
    <View className="flex-1 bg-[#f5f5f5]" >
      {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default'/> : '' }
      <View className="pt-16 pb6 px-6 bg-[#11ae40]" style={{paddingTop: Platform.OS === 'android' ? 25 : 60}}>
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
        <Slider token={token}  />
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
        <TouchableWithoutFeedback>
          <Modal isVisible={isModalVisible} onClose={onModalClose}>
            <FlatList
              style={styles.container}
              data={clientDetalle}
              keyExtractor={item => item.codCom}
              renderItem={({ item, index }) => (
                <View style={styles.fila} key={index}>
                  <Text style={styles.columna}>{item.fechaEmision}</Text>
                  <Text style={styles.columna}>{item.secuencia}</Text>
                  <Text style={styles.columna}>{item.codCom}</Text>
                  <Text style={styles.columna}>${item.importe.toFixed(2)}</Text>
                  <Text style={styles.columna}>
                    <View>
                      <Text style={styles.columna}>${item.importePxVto.toFixed(2)}</Text>
                      <Text style={styles.columna}>{item.fechadeProximoVencimiento}</Text>
                      <Text style={styles.columna}>{item.cuota}</Text>
                    </View>
                  </Text>
                </View>
              )}
            />
          </Modal>
        </TouchableWithoutFeedback>
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
    backgroundColor: '#f5f5f5',
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#11ae40',
  },
  columna: {
    flex: 1,
    fontSize: 11,
    textAlign: 'center',
  },
});
