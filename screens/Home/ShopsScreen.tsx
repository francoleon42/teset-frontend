import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, Platform, Pressable, View, TextInput, Linking, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Avatar, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getComerciosAdheridos, getComerciosAdheridosByName } from '../../servicios/negocioService';
import { debounce } from 'lodash'; 
import shops from '../utils/shops.json';

import { useFocusEffect } from '@react-navigation/native';

export default function ShopsScreen({ route }) {
  const [comercio, setComercio] = useState('');
  const { token } = route.params;
  const [comercios, setComercios] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedAll, setHasFetchedAll] = useState(false); 


  useFocusEffect(
    useCallback(() => {
      setComercio('');
      setComercios(shops);
      setHasFetchedAll(false);
      setIsLoading(false);

      return () => {
      };
    }, [])
  );

  const handleViewMore = async () => {
    setIsLoading(true);
    try {
      const response = await getComerciosAdheridos(token);
      setComercios(response);
      setHasFetchedAll(true);
    } catch (error) {
      console.error('Error cargando todos los comercios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = debounce(async (nombre) => {
    setIsLoading(true);
    setHasFetchedAll(true);
    try {
      let response;
      if (!nombre || nombre.trim() === '') {
        response = hasFetchedAll 
          ? await getComerciosAdheridos(token) 
          : shops;
      } else {
        response = await getComerciosAdheridosByName(token, nombre);
      }
      setComercios(response);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setIsLoading(false);
    }
  }, 600);

  return (
      <SafeAreaProvider style={{paddingTop: Platform.OS === 'android' ? 20 : 0}}>
        <View className='flex-1 bg-[#f5f5f5]'>
        {Platform.OS === 'android' ? <StatusBar backgroundColor="#11ae40" barStyle='default' /> : <View className="pt-16 pb6 px-6 bg-[#11ae40]"></View>}
          <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Buscar comercio  🔍"
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
                  {comercios.map((comercio) => (
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
                  
                  {/* Botón Ver Más */}
                  {!hasFetchedAll && (
                    <Pressable 
                      onPress={handleViewMore} 
                      style={styles.viewMoreButton}
                    >
                      <Text style={styles.viewMoreText}>Ver más comercios</Text>
                    </Pressable>
                  )}
                </ScrollView>
              )}
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaProvider>
  );
}

 

const styles = StyleSheet.create({
  viewMoreButton: {
    margin: 15,
    padding: 12,
    backgroundColor: '#11ae40',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
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

