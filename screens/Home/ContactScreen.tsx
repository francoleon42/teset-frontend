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
    return (
      <Pressable onPress={() => Linking.openURL(link)} key={index}>
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
    <View className='flex-1 bg-[#f5f5f5]'>
      {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default'/> : <View className="pt-16 pb6 px-6 bg-[#11ae40]"></View> }
      <SafeAreaProvider style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
        <SafeAreaView >
          <ScrollView>
            {/* Sección Redes Sociales */}
            {contactos && contactos.filter(contacto => contacto.tipo === 'REDES_SOCIALES').length > 0 && (
              <>
                <Text style={styles.titleText}>Redes Sociales</Text>
                {contactos.filter(contacto => contacto.tipo === 'REDES_SOCIALES').map(renderContacto)}
              </>
            )}

            {/* Sección WhatsApp */}
            {contactos && contactos.filter(contacto => contacto.tipo === 'WHATSAPP').length > 0 && (
              <>
                <Text style={styles.titleText}>Numeros WhatsApp</Text>
                {contactos.filter(contacto => contacto.tipo === 'WHATSAPP').map(renderContacto)}
              </>
            )}

            {/* Sección Teléfonos */}
            {contactos && contactos.filter(contacto => contacto.tipo === 'TELEFONO').length > 0 && (
              <>
                <Text style={styles.titleText}>Numeros Telefonicos</Text>
                {contactos.filter(contacto => contacto.tipo === 'TELEFONO').map(renderContacto)}
              </>
            )}
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
    width: "100%",
    textAlign: "center",
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
