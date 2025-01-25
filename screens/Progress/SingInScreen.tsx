import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';

const SingInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese ambos campos');
      return;
    }
    setLoading(true);

    // Aquí agregarías tu lógica de autenticación (API, validaciones, etc.)
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Bienvenido', `Hola, ${email}`);
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperación de contraseña', 'Se enviará un enlace para recuperar tu contraseña al correo ingresado');
  };

  const handleRegister = () => {
    Alert.alert('Registro', 'Serás redirigido a la pantalla de registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Input para correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input para contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botón para ingresar */}
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Ingresar
      </Button>

      {/* Botón para 'Olvidé mi contraseña' */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón para registrarse */}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#007bff',
    marginBottom: 20,
  },
  register: {
    color: '#007bff',
  },
});

export default SingInScreen;