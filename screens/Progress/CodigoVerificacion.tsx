import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginStepTwo } from '../../servicios/authService';

// Login Step Two
export default function VerifyCodeScreen({ route, navigation }) {
  const [code, setCode] = useState("");
  const { email } = route.params;

  
  

  const handleSubmit = async () => {
    
    try {
      console.log('Email:', email);
      console.log('Code:', code);
      
      const requestData = {
        codigo: code,
        username: email,
        codDispositivo: 'codigoNuevod', 
      };
      
      const response = await loginStepTwo(requestData);
      
      if(response.role =="CLIENTE"){
        console.log("TOKEN:",response.token);
        navigation.navigate('Root',{ token: response.token });
      }
      // Lógica después de la verificación
      Alert.alert('Éxito', 'Correo verificado con éxito.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el inicio de sesión. Por favor, intenta más tarde.');
      console.error('Login error:', error);
      return; // Evita continuar si hay un error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar Correo Electrónico</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el código de 4 dígitos"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={5} // Limitar a 4 dígitos
        autoFocus
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.linkText}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
  },
});
