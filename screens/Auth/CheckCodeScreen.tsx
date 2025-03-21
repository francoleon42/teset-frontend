import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { loginStepTwo } from '../../servicios/authService';
import * as Device from 'expo-device';
import SweetAlert, { showSweetAlert } from '../../components/Sweet Alert/SweetAlert';

//login step two 
export default function CheckCodeScreen({ route, navigation }) {
  const [codigo, setCodigo] = useState('');
  const { email } = route.params;
  const deviceID = Device.osInternalBuildId.toString().trim();
  const [sweetAlerVisible, setSweetAlerVisible] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setSweetAlerVisible(sweetAlerVisible);
      }, 0)
    }, [sweetAlerVisible]);

  showSweetAlert({
        title: 'Código incorrecto o ha expirado',
        text: 'Por favor, volve a intentarlo.',
        showCancelButton: false,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Cerrar',
        onConfirm: () => {
          setSweetAlerVisible(!sweetAlerVisible);
        },
        onClose: () => {
          setSweetAlerVisible(!sweetAlerVisible);
        },
        type: 'warning', // 'info', 'success', 'danger', veya 'warning' olabilirm, 'user'
      });

  const handleSubmit = async () => {

    try {

      const requestData = {
        codigo: codigo,
        username: email,
        codDispositivo: deviceID,
      };

      const response = await loginStepTwo(requestData);

      if (response.role == "CLIENTE") {
        navigation.navigate('Root', { token: response.token });
      }
    } catch (error) {
      if(error.message.includes("incorrecto o ha expirado")){
        setSweetAlerVisible(true);
      }
      
      return; // Evita continuar si hay un error
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código verificador</Text>
      <Text style={styles.subTitle}>Por favor, ingrese el código enviado al correo electrónico:</Text>

      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="default"
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        Verificar código
      </Button>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.linkText}>Volver al inicio de sesión</Text>
      </TouchableOpacity>

      {sweetAlerVisible && <SweetAlert/>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 35,
    color: '#808080',
    alignItems: 'flex-start',
  },
  input: {
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'left',
    fontSize: 16,
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginBottom: 15,
    color: '#ffffff',
    backgroundColor: '#11ae40',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: 'black',
    fontSize: 14,
  },
});