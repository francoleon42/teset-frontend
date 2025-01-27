import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


// registroStepTwo
const SignUpScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = () => {
    if (!username || !password || !verificationCode) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    // Simulación de la creación de la cuenta (aquí puedes agregar tu lógica real)
    setTimeout(() => {
      setLoading(false);
      Alert.alert('¡Cuenta creada!', `Bienvenido, ${username}`);
    }, 2000);
  };

  const handleTerminos = () => {
    Alert.alert('Terminos y Condiciones', 'Serás redirigido a la pantalla de terminos y condiciones');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subTitle}>Por favor, ingresa los siguientes datos:</Text>

      {/* Input para el nombre de usuario */}
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor={'#929292'} 
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

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

      {/* Botón para registrarse */}
      <TouchableOpacity onPress={handleTerminos}>
        <Text style={styles.terminos}>Al registrarse estas aceptando los <Text style={{color:'#11ae40'}}>terminos y condiciones</Text> de uso.</Text>
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
    marginTop: 10,
  },
  terminos: {
    color: '#808080',
    textAlign:'center',
  },
});

export default SignUpScreen;