import React from 'react';
import {StyleSheet, Text, ScrollView, StatusBar, View, Linking, Pressable, TouchableOpacity, Platform, SafeAreaView} from 'react-native';
import { ListItem, Avatar } from '@rneui/themed'
import Animated from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Emoji } from '../../components/Emoji/Emoji';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ContactScreen() {

  let hours = new Date().getHours();
    const [esDia, setEsDia] = useState(false);
    const [esTarde, setEsTarde] = useState(false);
    const [esNoche, setEsNoche] = useState(false);
  
    useEffect(() => {
      if (hours >= 5 && hours < 13) {
        setEsDia(true);
      } else if (hours >= 13 && hours < 19){
        setEsTarde(true);
      } else if (hours >= 19 || hours < 5){
        setEsNoche(true);
      }
    }, [hours]);

  const redesSociales = [
    {
      name: 'Facebook',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
      subtitle: 'facebook.com/teset',
      link: '',
    },
    {
      name: 'Instagram',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
      subtitle: '@teset',
      link: '',
    },
  ];

  const numerosWhatsApp = [
    {
      name: '11-3060-4587',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png',
      subtitle: 'Prestamos',
      link: '',
    },
    {
      name: '11-3060-4587',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png',
      subtitle: 'Deudas y Pagos',
      link: '',
    },
  ];

  const numerosTelefonos = [
    {
      name: '15-3000-4000',
      logo: 'https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968244_1280.png',
      subtitle: 'Nuevos prestamos',
      link: '',
    },
    {
      name: '15-3000-4000',
      logo: 'https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968244_1280.png',
      subtitle: 'Nuevos prestamos',
      link: '',
    },
  ];

  return (

    <View className='flex-1 bg-[#f5f5f5]'>
      <SafeAreaProvider style={styles.droidSafeArea}>
        <SafeAreaView className='bg-[#11ae40]'>
        <View className='bg-[#f5f5f5]'></View>
          <ScrollView className='bg-[#ffffff]'>
            
          <Text style={styles.titleText}>Redes Sociales</Text>
              {redesSociales.map((redSocial, index) => {
                return (
                  <Pressable 
                    onPress={()=> Linking.openURL(redSocial.link)}
                    key={index} 
                  >
                    <ListItem className='bg-[#f5f5f5]' key={index} bottomDivider>
                      <Avatar rounded source={{uri: redSocial.logo}} />
                      <ListItem.Content>
                        <ListItem.Title>{redSocial.name}</ListItem.Title>
                        <ListItem.Subtitle>{redSocial.subtitle}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </Pressable>
                );
              })}

          <Text style={styles.titleText}>Numeros WhatsApp</Text>
              {numerosWhatsApp.map((numeroWhatsApp, index) => {
                return (
                  <Pressable 
                    onPress={()=> Linking.openURL(numeroWhatsApp.link)}
                    key={index} 
                  >
                    <ListItem key={index} bottomDivider>
                      <Avatar rounded source={{uri: numeroWhatsApp.logo}} />
                      <ListItem.Content>
                        <ListItem.Title>{numeroWhatsApp.name}</ListItem.Title>
                        <ListItem.Subtitle>{numeroWhatsApp.subtitle}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </Pressable>
                );
              })}

          <Text style={styles.titleText}>Numeros Telefonicos</Text>
              {numerosTelefonos.map((numeroTelefono, index) => {
                return (
                  <Pressable 
                    onPress={()=> Linking.openURL(numeroTelefono.link)}
                    key={index} 
                  >
                    <ListItem key={index} bottomDivider>
                      <Avatar rounded source={{uri: numeroTelefono.logo}} />
                      <ListItem.Content>
                        <ListItem.Title>{numeroTelefono.name}</ListItem.Title>
                        <ListItem.Subtitle>{numeroTelefono.subtitle}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </Pressable>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    padding: 12,
  },
  titleText: {
    fontSize: 15,
    paddingVertical: 5,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    backgroundColor: '#ffffff',
  },
      droidSafeArea: {
        flex: 1,
        backgroundColor: '#11ae40',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});