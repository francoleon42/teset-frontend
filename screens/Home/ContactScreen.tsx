import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Linking, Pressable, SafeAreaView,StatusBar,TouchableOpacity,Platform } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { getContactos } from '../../servicios/negocioService';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function ContactScreen({ route }) {

  const { token } = route.params;
  const [contactos, setContactos] = useState<any>(null);

  

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const response = await getContactos(token);
        setContactos(response);
      } catch (error) {
        console.error('Error obteniendo contactos:', error);
      }
    };

    fetchContactos();
  }, [token]);

  const renderContacto = (contacto: any, index: number) => {
    const { tipo, titulo, subTitulo, logoLink, link } = contacto;
    
    const handlePress = () => {
      if (typeof link === 'string' && link.trim() !== '') {
      
        Linking.openURL(link).catch((err) => {
          console.error("Error abriendo link:", err);
        });
      } else {
        console.warn("Link inválido o indefinido:", link);
      }
    };
  
    return (
      <Pressable onPress={handlePress} key={index}>
        <ListItem bottomDivider>
          <Avatar rounded source={{ uri: logoLink }} />
          <ListItem.Content>
            <ListItem.Title>{titulo}</ListItem.Title>
            <ListItem.Subtitle>{subTitulo}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Pressable>
    );
  };
  

  return (
      <SafeAreaProvider  style={{paddingTop: Platform.OS === 'android' ? 35 : 0, backgroundColor:'#ffffff'}}>
        <View className='flex-1 bg-[#ffffff]'>
        {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default'/> : <View className="pt-16 pb6 px-6 bg-[#11ae40]"></View> }
          <SafeAreaView>
            <ScrollView>
              {/* Sección PRESENCIA ONLINE */}
              {contactos && contactos.filter(contacto => contacto.tipo === 'PRESENCIA_ONLINE').length > 0 && (
                <>
                  <Text style={styles.titleText}>Presencia Online</Text>
                  {contactos.filter(contacto => contacto.tipo === 'PRESENCIA_ONLINE').map(renderContacto)}
                </>
              )}
          
              {/* Sección CONTACTO DIRECTO */}
              {contactos && contactos.filter(contacto => contacto.tipo === 'CONTACTO_DIRECTO').length > 0 && (
                <>
                  <Text style={styles.titleText}>Contacto Directo</Text>
                  {contactos.filter(contacto => contacto.tipo === 'CONTACTO_DIRECTO').map(renderContacto)}
                </>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 30,
    padding: 12,
  },
  titleText: {
    width: "100%",
    textAlign: "center",
    fontSize: 23,
    paddingTop: 30,
    margin: 'auto',
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
    droidSafeArea: {
      flex: 1,
      backgroundColor: '#11ae40',
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
