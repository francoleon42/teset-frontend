import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { updatePasswordStepTwo } from '../../servicios/authService';


//update step two
const NewPasswordScreen = ({navigation, route}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
 
  const { email,dni } = route.params;

  const handleModifyPassword = async () => {
    if (!verificationCode || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const data = {
        dni: dni,
        newPassword:newPassword,
        codigo: verificationCode
      }
      const response = await updatePasswordStepTwo(data);
      // TODO
      // Respuesta: "El código de verificación es incorrecto o ha expirado"
      if(response){
        Alert.alert('Error', 'El código de verificación es incorrecto o ha expirado');
        navigation.navigate('ForgotPassword');
      } else if (response){
        // Respuesta: ok
        Alert.alert('Éxito', 'Contraseña modificada correctamente');
        navigation.navigate('SignIn');
      }
      
    } catch (error) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      console.error('Login error:', error);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresar código</Text>
      <Text style={styles.subTitle}>Te enviamos un código de 5 digitos a tu correo electrónico: <Text style={{fontWeight: "bold"}}>{email}</Text></Text>

      <TextInput
        style={styles.input}
        placeholder="Código verificador"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        mode="contained"
        onPress={handleModifyPassword}
        style={styles.button}
      >
        Enviar código
      </Button>
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
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    color:'#ffffff',
    backgroundColor: '#11ae40', 
  },
});

export default NewPasswordScreen;