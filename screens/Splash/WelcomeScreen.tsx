import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {

const { width, height } = Dimensions.get('window');  // Obtener las dimensiones de la pantalla


  return (
    <View style={styles.container}>
      {/* Fondo con gradiente y desenfoque */}
      <LinearGradient
        colors={['#11ae40', '#11ae40', '#b3ffb3']} // Colores del fondo verde
        style={styles.gradientBackground}
      >
        <BlurView intensity={10} style={styles.blurView}>
          {/* Logo en el centro */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/teset-logocompleto.png')} // Reemplaza con tu logo
              style={{resizeMode:'contain', height: height, width: width}}
            />
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;