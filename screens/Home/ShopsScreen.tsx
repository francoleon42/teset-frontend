import React, { useEffect } from 'react';
import {StyleSheet, Text, ScrollView, Platform, Pressable, View, TextInput, Linking, SafeAreaView} from 'react-native';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Comercio {
  id: string;
  nombre: string;
  logo: string;
  direccion: string;
  telefono: string;
  urlGoogleMaps: string;
}

const comercios = [
  {id: '1', nombre:'Solo Deportes', logo:'https://media2.solodeportes.com.ar/media/logo/stores/1/solodeportes.png', direccion:'Calle falsa 123', telefono:'3244-1231', urlGoogleMaps:'https://maps.app.goo.gl/hnJxc1w1G7vaemz66'},
  {id: '2', nombre:'Dexter', logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENVKGkqUWW0ZaWYLjYJW9vQv1t_j_uXcq7CTGjbeqLnBvpS6WspsLswQv9LbmTcD0vPQ&usqp=CAU', direccion:'Calle verdadera 123', telefono:'15-3004-8080', urlGoogleMaps:'https://maps.app.goo.gl/4SeLRzwmvKtc1oeM6'},
  {id: '3', nombre:'Nike', logo:'https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png', direccion:'Calle Calle 321', telefono:'0230 11 4000 3000', urlGoogleMaps:'https://maps.app.goo.gl/GpFb9VUttarFvQvF8'},
  {id: '4', nombre:'Solo Deportes', logo:'https://media2.solodeportes.com.ar/media/logo/stores/1/solodeportes.png', direccion:'Calle falsa 123', telefono:'3244-1231', urlGoogleMaps:'https://maps.app.goo.gl/S99FKHcL5Pu7tUD88'},
  {id: '5', nombre:'Dexter', logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENVKGkqUWW0ZaWYLjYJW9vQv1t_j_uXcq7CTGjbeqLnBvpS6WspsLswQv9LbmTcD0vPQ&usqp=CAU', direccion:'Calle verdadera 123', telefono:'15-3004-8080', urlGoogleMaps:'https://maps.app.goo.gl/PELyuwLTLwxcdtFYA'},
  {id: '6', nombre:'Nike', logo:'https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png', direccion:'Calle Calle 321', telefono:'0230 11 4000 3000', urlGoogleMaps:''},
  {id: '7', nombre:'Solo Deportes', logo:'https://media2.solodeportes.com.ar/media/logo/stores/1/solodeportes.png', direccion:'Calle falsa 123', telefono:'3244-1231', urlGoogleMaps:'https://maps.app.goo.gl/fuP4hcgyAwQVfuGj8'},
  {id: '8', nombre:'Dexter', logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENVKGkqUWW0ZaWYLjYJW9vQv1t_j_uXcq7CTGjbeqLnBvpS6WspsLswQv9LbmTcD0vPQ&usqp=CAU', direccion:'Calle verdadera 123', telefono:'15-3004-8080', urlGoogleMaps:''},
  {id: '9', nombre:'Nike', logo:'https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png', direccion:'Calle Calle 321', telefono:'0230 11 4000 3000', urlGoogleMaps:''},
  {id: '10', nombre:'Solo Deportes', logo:'https://media2.solodeportes.com.ar/media/logo/stores/1/solodeportes.png', direccion:'Calle falsa 123', telefono:'3244-1231', urlGoogleMaps:''},
  {id: '11', nombre:'Dexter', logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENVKGkqUWW0ZaWYLjYJW9vQv1t_j_uXcq7CTGjbeqLnBvpS6WspsLswQv9LbmTcD0vPQ&usqp=CAU', direccion:'Calle verdadera 123', telefono:'15-3004-8080', urlGoogleMaps:''},
  {id: '12', nombre:'Nike', logo:'https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png', direccion:'Calle Calle 321', telefono:'0230 11 4000 3000', urlGoogleMaps:''},
];


export default function ShopsScreen() {
  const [comercio, setComercio] = React.useState('');

  useEffect(() => {
    console.log(comercio);
  }, [comercio]);

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
      <SafeAreaProvider style={styles.droidSafeArea}>
        <SafeAreaView className='bg-[#11ae40]' >
        <View className='bg-[#f5f5f5]'>
          <TextInput
              placeholder='Buscar comercio'
              style={styles.containerInput}
              placeholderTextColor={'#929292'} 
              onChangeText={setComercio}
              value={comercio}
          />
          <View style={{ position: 'absolute', top: 20, right: 20 }}>
              <Icon name='search' size={24} color={'#C9C9C9'} />
          </View>
          {/* <SearchBar style={styles.containerInput} /> */}
        </View>
      <ScrollView>
          {comercios.map((comercio) => {
            return (
              <Pressable 
                onPress={()=> Linking.openURL(comercio.urlGoogleMaps)}
                key={comercio.id} 
              >
              <ListItem bottomDivider>
                <Avatar
                  rounded
                  source={{ uri: comercio.logo }}
                />
                <ListItem.Content>
                  <ListItem.Title>{comercio.nombre}</ListItem.Title>
                  <ListItem.Subtitle>{comercio.direccion}</ListItem.Subtitle>
                  <Text style={{fontSize:12}}>{comercio.telefono}</Text>
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
  
  containerInput: {
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
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#11ae40',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
