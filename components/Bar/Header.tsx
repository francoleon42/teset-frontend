import React from 'react';
import {StyleSheet, Platform, View, SafeAreaView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Header(props) {

  return (
    <View className='flex-1 bg-[#f5f5f5]'>
      <SafeAreaProvider style={styles.droidSafeArea}>
        <SafeAreaView className='bg-[#11ae40]' >
            {props.body}
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#11ae40',
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
});
