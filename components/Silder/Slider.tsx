import * as React from 'react';
import { Dimensions, Linking, Pressable, Image, View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useState, useEffect } from 'react';
import { getNovedades } from '../../servicios/negocioService';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

function Slider({ token }) {
 
  const [imagenesNovedades, setImagenesNovedades] = useState([])

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const response = await getNovedades(token);

        // filtra  las novedades que pueden mostrarse en inicio
        const novedadesFiltradas = response.filter(n => n.mostrarEnInicio);
        setImagenesNovedades(novedadesFiltradas);

      } catch (err) {
        console.log(err);
      }
    };

    fetchNovedades();
  }, [token]);


  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={imagenesNovedades}
        scrollAnimationDuration={7000}
        // onSnapToItem={(item) => console.log('current index:', item)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              borderTopWidth: 10,
              justifyContent: 'center',
              borderColor: '#f5f5f5'
            }}
          >
            <Image src={item.linkImagen} style={styles.banner}></Image>
          </View>
        )}
      />
    </View>
  );
}

export default Slider;


const styles = StyleSheet.create({
  banner: {
    flex: 1,
    elevation: 14,
    justifyContent: 'center',
    backgroundColor: "#11ae40",
    borderRadius: 10,
    //   padding:70,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '95%',
    alignSelf: 'center',
    height: 120,
  }
});
