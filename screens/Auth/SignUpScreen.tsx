import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { registroStepTwo } from '../../servicios/authService';

//registro step two
const SignUpScreen = ({ navigation, route }) => {

  const [password, setPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { email } = route.params;

  const handleSignUp = async () => {
    if (!password || !verificationCode) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const data = {
        username: email,
        password: password,
        codigo: verificationCode
      }
      const response = await registroStepTwo(data);
      
      navigation.navigate('SignIn');

    } catch (error) {
      Alert.alert('Error', 'Por favor, ingresa el codigo válido.');
      console.error('Login error:', error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subTitle}>Por favor, ingresa los siguientes datos:</Text>


      {/* Input para la contraseña */}
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={'#929292'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Input para el código verificador */}
      <TextInput
        placeholder="Código Verificador"
        placeholderTextColor={'#929292'}
        value={verificationCode}
        onChangeText={setVerificationCode}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Botón para crear cuenta */}
      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Crear Cuenta
      </Button>

    </View>
  );
};

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
  },
  button: {
    width: '100%',
    marginBottom: 15,
    color: '#ffffff',
    backgroundColor: '#11ae40',
    marginTop: 10,
  },
  terminos: {
    color: '#808080',
    textAlign: 'center',
  },
});

export default SignUpScreen;