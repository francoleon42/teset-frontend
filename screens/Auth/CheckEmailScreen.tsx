import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Pressable, Linking, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { registroStepOne } from '../../servicios/authService';
import SweetAlert, { showSweetAlert } from '../../components/Sweet Alert/SweetAlert';

//registro step one
export default function CheckEmailScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false); 
  const [sweetAlerOpen, setSweetAlerOpen] = useState(false);
  const [titleAlert, setTitleAlert] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [confirminButtonText, setConfirminButtonText] = useState('Enviar');
  const [showCancelButton, setShowCancelButton] = useState(true);

  useEffect(() => {
    setSweetAlerOpen(sweetAlerOpen);
  },[sweetAlerOpen]);


  showSweetAlert({
    title: titleAlert,
    text: textAlert,
    showCancelButton: showCancelButton,
    cancelButtonText: 'Cancelar',
    confirmButtonText: confirminButtonText,
    onConfirm: () => {
      if(showCancelButton){
        console.log('Se envia wsp');
        Linking.openURL('whatsapp://send?text=Hola! Necesito registrarme en la aplicación de Teset.&phone=+5491162754219');
      } 
      setSweetAlerOpen(false);
    },
    onClose: () => {
      setSweetAlerOpen(false);
    },
    type: typeAlert, // 'info', 'success', 'danger', veya 'warning' olabilirm, 'user'
  });

  const handleSubmit = async () => {
    setLoading(true); 
    try {
      
      const data = { dni };
      const response = await registroStepOne(data);
      const email = response.username;
      navigation.navigate('SignUp', { email });

    } catch (error) {
      if(error.message.includes("El usuario ya esta registrado")){
        setTitleAlert('Usted ya es cliente')
        setTextAlert('Usted ya es usuario de Teset.')
        setTypeAlert("success");
        setConfirminButtonText('Cerrar');
        setShowCancelButton(false);
        setSweetAlerOpen(true);
      } else if (error.message.includes("El usuario no es cliente")){
        setTitleAlert('Usted no es cliente')
        setTextAlert('Por favor, envie un mensaje a Teset para que lo ayuden.')
        setTypeAlert("danger");
        setConfirminButtonText('Enviar');
        setShowCancelButton(true);
        setSweetAlerOpen(true);
      } else {
        setTitleAlert('Atención')
        setTextAlert('Por favor, envie un mesanje a Teset para que le den soporte.')
        setTypeAlert("warning");
        setConfirminButtonText('Enviar');
        setShowCancelButton(true);
        setSweetAlerOpen(true);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      {sweetAlerOpen && <SweetAlert/>}
      <Text style={styles.title}>Verificar correo electrónico</Text>
      <Text style={styles.subTitle}>Por favor, ingrese su DNI para realizar la validación</Text>

      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading} 
      >
        {loading ? 'Cargando...' : 'Enviar código'}
      </Button>

      {loading && <ActivityIndicator size="large" color="#11ae40" style={styles.spinner} />}
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
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 35,
    color: '#808080',
    textAlign: 'center',
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
    backgroundColor: '#11ae40',
  },
  spinner: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

