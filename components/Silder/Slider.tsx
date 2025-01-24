import * as React from 'react';
import { Dimensions, Linking, Pressable, Image, View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
  
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

function Slider() {
    const imagenesNovedades = [
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/18291311_CAI_Training_1920x540_copia.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data:'https://media2.solodeportes.com.ar/media/slider/slide/08410911_Solo_Deportes_Desktop_BTS_copia.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/09042610_desktop.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/18311211_DESKTOP.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/12361208_SD_Banner_desktop.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/18501010_MPQ4_SOLODEPORTES_HomeBannerDesktop_1920x540_copia.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        },
        {
          title: 'https://www.solodeportes.com.ar',
          data: 'https://media2.solodeportes.com.ar/media/slider/slide/16112509_SD_Desktop.webp',
          comercioUrl: 'https://www.solodeportes.com.ar',
        }
      ];
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
                renderItem={({item}) => (
                    <View
                        style={{
                            flex: 1,
                            borderTopWidth: 10,
                            justifyContent: 'center',
                            borderColor: '#f5f5f5'
                        }}
                    >
                        <Image src={item.data} style={styles.banner}></Image>
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
      alignSelf:'center',
      height: 120,
    }
  });
  