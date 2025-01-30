import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { loginStepOne, loginStepTwo } from '../../servicios/authService';

type RootStackParamList = {
  SignIn: undefined;
  CheckCode: { email: string };
  Root: { token: string };
  ForgotPassword: undefined;
  NewPassword:{ email:string, dni: string };
  CheckEmail:undefined;
  SignUp:{ email: string };
  TermsAndConditions: undefined;
  NotFound: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese ambos campos');
      return;
    }

    setLoading(true);

    try {
      const requestloginStepOne = {
        username: email,
        password,
        codDispositivo: 'codigoBoostrap',
      };

      const responseOne = await loginStepOne(requestloginStepOne);
      
        Alert.alert('Bienvenido', `Hola, ${email}`);
        if (responseOne.nuevoDispositivo) {
          navigation.navigate('CheckCode', { email });
        } else {
          const requestloginStepTwo = {
            codigo: '12345',
            username: email,
            codDispositivo: 'codigoBoostrap',
          };

          const responseTwo = await loginStepTwo(requestloginStepTwo);

          if (responseTwo.role === 'CLIENTE') {
            navigation.navigate('Root', { token: responseTwo.token });
          }
        }
      
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el inicio de sesión. Por favor, intenta más tarde.');
      // console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
    Alert.alert('Recuperación de contraseña', 'Se enviará un enlace para recuperar tu contraseña al correo ingresado');
  };

  const handleRegister = () => {
    navigation.navigate('TermsAndConditions');
    Alert.alert('Registro', 'Serás redirigido a la pantalla de registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, Bienvenido! 👋</Text>
      <Text style={styles.subTitle}>Teset - Préstamos Personales</Text>

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

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Ingresar
      </Button>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>
          ¿No tienes una cuenta? <Text style={{ color: '#11ae40' }}>Regístrate</Text>
        </Text>
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


export default SignInScreen;
