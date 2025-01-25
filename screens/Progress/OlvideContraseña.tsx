import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Aquí podrías agregar la lógica para enviar el enlace de recuperación de contraseña
    if (email) {
      // Lógica de recuperación de contraseña (por ejemplo, a través de una API)
      Alert.alert('Correo enviado', 'Hemos enviado un enlace para restablecer tu contraseña.', [{ text: 'OK' }]);
      navigation.goBack(); // Vuelve a la pantalla anterior (Login)
    } else {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar enlace de recuperación</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Volver a iniciar sesión</Text>
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
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
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
