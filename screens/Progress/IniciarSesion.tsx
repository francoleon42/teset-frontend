import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import * as Google from 'expo-google-auth-session';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: 'TU_CLIENT_ID_DE_GOOGLE', // Reemplaza con tu Client ID de Google
//   });

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password123') {
      Alert.alert('Login exitoso', `Bienvenido, ${email}!`, [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Credenciales incorrectas', [{ text: 'OK' }]);
    }
  };

  const handleGoogleLogin = async () => {
    try {
    //   const result = await promptAsync();
    //   if (result?.type === 'success') {
    //     Alert.alert('Inicio de sesión con Google', `Bienvenido, ${result.params.name}!`, [{ text: 'OK' }]);
    //   } else {
    //     Alert.alert('Error', 'No se pudo iniciar sesión con Google', [{ text: 'OK' }]);
    //   }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión con Google', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        // disabled={!request}
      >
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => Alert.alert('Función de recuperación de contraseña')}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => Alert.alert('Redirigiendo a registro')}>
          <Text style={styles.linkText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
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
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#db4437',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  googleButtonText: {
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
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
