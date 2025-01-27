import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Platform, Pressable, View, TextInput, Linking, SafeAreaView } from 'react-native';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getComerciosAdheridos, getComerciosAdheridosByName} from '../../servicios/negocioService';



export default function ShopsScreen({ route }) {
  const [comercio, setComercio] = React.useState('');
  const { token } = route.params;
  const [useToken, setToken] = useState<string>(token);
  const [comercios, setComercios] = useState<any>(null);

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        const response = await getComerciosAdheridos(token);
        setComercios(response);
      } catch (error) {
        console.error('Error obteniendo datos del cliente:', error);
      }
    };

    fetchComercios();
  }, [token]);

  const handleSearch = async (nombre) => {
    try {
      if (!nombre || nombre.trim() === '') {
        const response = await getComerciosAdheridos(token);
        setComercios(response);
      } else {
        console.log("busco por nombre ",nombre);
        const response = await getComerciosAdheridosByName(token, nombre);
        setComercios(response);
      }
    } catch (error) {
      console.error('Error en la búsqueda de comercios:', error);
    }
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Buscar comercio"
              style={styles.containerInput}
              placeholderTextColor="#929292"
              onChangeText={(text) => {
                setComercio(text);
                handleSearch(text); 
              }}
              value={comercio}
            />
            <View style={styles.searchIcon}>
              <Icon name="search" size={24} color="#C9C9C9" />
            </View>
          </View>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {comercios &&
              comercios.map((comercio) => {
                return (
                  <Pressable
                    onPress={() => (comercio.urlGoogleMaps ? Linking.openURL(comercio.urlGoogleMaps) : null)}
                    key={comercio.id}
                  >
                    <ListItem bottomDivider>
                      <Avatar
                        rounded
                        source={
                          comercio.logo
                            ? { uri: comercio.logo }
                            : require('../../assets/images/logoComercioDefault.png')
                        }
                      />
                      <ListItem.Content>
                        <ListItem.Title>{comercio.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{comercio.direccion}</ListItem.Subtitle>
                        <Text style={{ fontSize: 12 }}>{comercio.telefono}</Text>
                      </ListItem.Content>
                    </ListItem>
                  </Pressable>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#11ae40',
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  containerInput: {
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'left',
    fontSize: 16,
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FAFAFA',
  },
  searchIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 20, // Asegura espacio al final
  },
});
