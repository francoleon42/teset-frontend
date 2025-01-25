import { color } from '@rneui/themed/dist/config';
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
      <Text style={styles.title}>Hola, Bienvenido! 👋</Text>
      <Text style={styles.subTitle}>Teset - Prestamos Personales</Text>

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

          {/* Botón para 'Olvidé mi contraseña' */}
          <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

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



      {/* Botón para registrarse */}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>¿No tienes una cuenta? <Text style={{color:'#11ae40'}}>Regístrate</Text></Text>
      </TouchableOpacity>
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
  },
  button: {
    width: '100%',
    marginBottom: 15,
    color:'#ffffff',
    backgroundColor: '#11ae40', 
  },
  forgotPassword: {
    color: '#000000',
    marginBottom: 20,
    textAlign: 'right',
  },
  register: {
    color: '#808080',
    textAlign:'center',
  },
});

export default SingInScreen;