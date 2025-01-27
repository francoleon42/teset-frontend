import React, { useEffect, useState } from 'react';
import {StyleSheet, StatusBar, View, Image, SectionList, Pressable, Linking, SafeAreaView, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getNovedades } from '../../servicios/negocioService';


export default function NewsScreen({ route }) {
  const { token } = route.params;
  const [useToken, setToken] = useState<string>(token);
  const [novedades, setNovedades] = useState<any>(null);
  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const response = await getNovedades(token);
        setNovedades(response); 
      } catch (error) {
        console.error('Error obteniendo datos del cliente:', error);
      }
    };

    fetchNovedades();

  }, [token]);

  const novedadesSections = novedades ? novedades.map((novedad) => ({
    title: novedad.titulo,  
    data: [novedad.linkImagen],      
    comercioUrl: novedad.linkComercio,
  })) : [];

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
    <SafeAreaProvider style={styles.droidSafeArea}>
        <SafeAreaView className='bg-[#11ae40]' >
      <View className='bg-[#f5f5f5]' style={{paddingBottom:5}}></View>
        <SectionList
          sections={novedadesSections}
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
