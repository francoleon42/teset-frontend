import React from 'react';
import {StyleSheet, StatusBar, View, Image, SectionList, Pressable, Linking, SafeAreaView, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function NewsScreen() {

  const imagenesNovedades = [
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/18291311_CAI_Training_1920x540_copia.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data:['https://media2.solodeportes.com.ar/media/slider/slide/08410911_Solo_Deportes_Desktop_BTS_copia.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/09042610_desktop.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/18311211_DESKTOP.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/12361208_SD_Banner_desktop.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/18501010_MPQ4_SOLODEPORTES_HomeBannerDesktop_1920x540_copia.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    },
    {
      title: 'https://www.solodeportes.com.ar',
      data: ['https://media2.solodeportes.com.ar/media/slider/slide/16112509_SD_Desktop.webp'],
      comercioUrl: 'https://www.solodeportes.com.ar',
    }
  ];

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
    <SafeAreaProvider style={styles.droidSafeArea}>
        <SafeAreaView className='bg-[#11ae40]' >
      <View className='bg-[#f5f5f5]' style={{paddingBottom:5}}></View>
        <SectionList
          sections={imagenesNovedades}
          renderItem={({item, section}) => (
            <View className='bg-[#f5f5f5]' style={{paddingBottom:10}}>
              <Pressable onPress={() => 
                Linking.openURL(section.comercioUrl)
              }>
              <Image source={{uri: item}} style={styles.banner}></Image>
              </Pressable>
            </View>
          )}
        /> 
        </SafeAreaView>
        </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 10,
  },
  banner: {
    flex: 1,
    elevation: 14,
    justifyContent: 'center',
    backgroundColor: "#11ae40",
    borderRadius: 10,
    padding:'auto',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '95%',
    alignSelf:'center',
    height: 150,
  },
  text: {
    fontSize: 30,
    padding: 12,
    textAlign: 'center',
  },
    droidSafeArea: {
      flex: 1,
      backgroundColor: '#11ae40',
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
