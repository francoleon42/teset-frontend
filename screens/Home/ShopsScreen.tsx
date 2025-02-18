import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Platform, Pressable, View, TextInput, Linking, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Avatar, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getComerciosAdheridos, getComerciosAdheridosByName } from '../../servicios/negocioService';

export default function ShopsScreen({ route }) {
  const [comercio, setComercio] = useState('');
  const { token } = route.params;
  const [comercios, setComercios] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComercios = async () => {
      setIsLoading(true);
      try {
        const response = await getComerciosAdheridos(token);
        setComercios(response);
      } catch (error) {
        console.error('Error obteniendo datos del cliente:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchComercios();
  }, [token]);

  const handleSearch = async (nombre) => {
    setIsLoading(true);
    try {
      let response;
      if (!nombre || nombre.trim() === '') {
        response = await getComerciosAdheridos(token);
      } else {
        console.log("busco por nombre ", nombre);
        response = await getComerciosAdheridosByName(token, nombre);
      }
      setComercios(response);
    } catch (error) {
      console.error('Error en la búsqueda de comercios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
      {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default'/> : <View className="pt-16 pb6 px-6 bg-[#11ae40]"></View>}
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Buscar comercio 🔍"
                style={styles.containerInput}
                placeholderTextColor="#929292"
                onChangeText={(text) => {
                  setComercio(text);
                  handleSearch(text);
                }}
                value={comercio}
              />
            </View>

            {isLoading ? ( 
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#11ae40" />
                <Text>Cargando comercios...</Text>
              </View>
            ) : (
              <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {comercios &&
                  comercios.map((comercio) => (
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
                  ))}
              </ScrollView>
            )}
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </View>
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
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#11ae40',
    padding: 10,
  },
  containerInput: {
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 16,
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 20, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

