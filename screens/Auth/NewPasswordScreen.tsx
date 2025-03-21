import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { updatePasswordStepTwo } from '../../servicios/authService';
import SweetAlert, { showSweetAlert } from '../../components/Sweet Alert/SweetAlert';

//update step two
const NewPasswordScreen = ({navigation, route}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sweetAlerVisible, setSweetAlerVisible] = useState(false);
  const [titleAlert, setTitleAlert] = useState('');
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState(null);
  
    useEffect(() => {
        setTimeout(() => {
          setSweetAlerVisible(sweetAlerVisible);
        }, 0)
      }, [sweetAlerVisible]);
  
    showSweetAlert({
          title: titleAlert,
          text: textAlert,
          showCancelButton: false,
          cancelButtonText: 'Cerrar',
          confirmButtonText: 'Cerrar',
          onConfirm: () => {
            
            if(titleAlert == "Éxito"){
              navigation.navigate('SignIn');
            }
            setSweetAlerVisible(!sweetAlerVisible);
          },
          onClose: () => {
            setSweetAlerVisible(!sweetAlerVisible);
          },
          type: typeAlert, // 'info', 'success', 'danger', veya 'warning' olabilirm, 'user'
        });
 
  const { email,dni } = route.params;

  const handleModifyPassword = async () => {
    if (!verificationCode || !newPassword || !confirmPassword) {
      setTitleAlert('Error')
      setTextAlert('Todos los campos son requeridos.')
      setTypeAlert("warning");
      setSweetAlerVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setTitleAlert('Error')
      setTextAlert('Las contraseñas no coinciden.')
      setTypeAlert("warning");
      setSweetAlerVisible(true);
      return;
    }

    try {
      const data = {
        dni: dni,
        newPassword:newPassword,
        codigo: verificationCode
      }
      
      const response = await updatePasswordStepTwo(data);
      setTitleAlert('Éxito')
      setTextAlert('Contraseña modificada correctamente.')
      setTypeAlert("success");
      setSweetAlerVisible(true);
    } catch (error) {
      if(error.message.includes("incorrecto o ha expirado")){
        setTitleAlert('Incorrecto o ha expirado')
        setTextAlert('El código de verificación es incorrecto o ha expirado.')
        setTypeAlert("warning");
        setSweetAlerVisible(true);
    } else {
      setTitleAlert('Error')
      setTextAlert('Ha ocurrido un error inesperado.')
      setTypeAlert("danger");
      setSweetAlerVisible(true);
    }
  
  }};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Text style={styles.subTitle}>Te enviamos un código de 5 digitos a tu correo electrónico: <Text style={{fontWeight: "bold"}}>{email.slice(0,3)}*********{email.slice(email.indexOf("@"),1000)}</Text></Text>

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
        Cambiar contraseña
      </Button>

      {sweetAlerVisible && <SweetAlert/>}

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