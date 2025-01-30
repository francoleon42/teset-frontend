import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { updatePasswordStepOne } from '../../servicios/authService';

// Update step one 
export default function ForgotPasswordScreen({ navigation }) {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { dni };
      const response = await updatePasswordStepOne(data);
      const email = response.username;
      navigation.navigate('NewPassword', { email, dni });
    } catch (error) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      console.error('Login error:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olvidé mi contraseña</Text>
      <Text style={styles.subTitle}>Por favor, ingrese su DNI:</Text>

      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading} 
      >
        {loading ? 'Cargando...' : 'Enviar código'}
      </Button>

      {loading && <ActivityIndicator size="large" color="#11ae40" style={styles.spinner} />}
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
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 35,
    color: '#808080',
    textAlign: 'center',
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
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#11ae40',
  },
  spinner: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

