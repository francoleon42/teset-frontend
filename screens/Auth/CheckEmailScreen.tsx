import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { registroStepOne } from '../../servicios/authService';

//registro step one
export default function CheckEmailScreen({ navigation }) {
  const [dni, setDni] = useState('');

  const handleSubmit = async () => {
    try {
      const data = {
        dni: dni
      }
      const response = await registroStepOne(data);
      const email = response.username;
      
      navigation.navigate('SignUp',{ email});

    } catch (error) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar correo electronico</Text>
      <Text style={styles.subTitle}>Por favor, ingrese su dni:</Text>

      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="email-address"
        autoCapitalize="none"
      />

       <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Enviar codigo
            </Button>

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
    margin:5,
    paddingBottom:5,
    paddingTop:5,
    textAlign:'left',
    fontSize:16,
    height:55,
    borderRadius:15,
    paddingHorizontal:40,
    paddingLeft:30,
    borderWidth:1,
    borderColor:'#EBEBEB',
    backgroundColor:'#FAFAFA',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginBottom: 15,
    color:'#ffffff',
    backgroundColor: '#11ae40', 
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