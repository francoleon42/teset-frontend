import { Modal, View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';


type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function modal({ isVisible, children, onClose }: Props) {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={() => {onClose}}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Detalle de cuenta</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={28} />
              </Pressable>
            </View>
            {children}
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '60%',
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    // fontSize: 10,
    
  },
  titleContainer: {
    height: 40,
    backgroundColor: '#11ae40',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // fontSize: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'flex-start',
  },
  
});