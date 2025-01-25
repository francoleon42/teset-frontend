import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function VerifyCodeScreen({ navigation }) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    // Verificar que el código tiene 4 dígitos
    if (code.length !== 4) {
      Alert.alert('Error', 'El código debe tener 4 dígitos.');
      return;
    }

    // Lógica para verificar el código (en un proyecto real, aquí iría la llamada a la API)
    if (code === '1234') {  // Este es un código simulado
      Alert.alert('Éxito', 'Correo verificado con éxito.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }, // Redirigir al login
      ]);
    } else {
      Alert.alert('Error', 'Código incorrecto. Por favor, intenta nuevamente.');
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
        maxLength={4}  // Limitar a 4 dígitos
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
