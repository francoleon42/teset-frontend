import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';


//login step two remplazar con codigo verificacion
export default function CheckCodeScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');

  const handleSubmit = () => {
    // Aquí podrías agregar la lógica para enviar el enlace de recuperación
    if (codigo) {
      // Lógica de recuperación de contraseña (por ejemplo, a través de una API)
      Alert.alert('Codigo Verificado', 'Hemos verificado el codigo de forma exitosa.', [{ text: 'OK' }]);
      navigation.goBack(); // Vuelve a la pantalla anterior (Login)
    } else {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código verificador</Text>
      <Text style={styles.subTitle}>Por favor, ingrese el codigo enviado al correo electronico:</Text>

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
              Verificar codigo
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