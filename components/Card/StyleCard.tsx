import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function StyleCard(props: any) {
  return (
    <View>
      <View style={styles.container}>
         
         {/* Card */}
         <View style={styles.card}>
          
             {/* Header */}
             <View style={styles.header}>
                 <Text style={styles.title}>
                    {props.title}
                 </Text>
                 <Text style={styles.subtitle}>
                     {props.subtitle}
                 </Text>
             </View>
              
             {/* Content */}
             <View style={styles.content}>
                 <Text style={styles.text}>
                    {props.text}
                 </Text>
             </View>
         </View>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#11ae40',
    },
    subtitle: {
        fontSize: 20,
        color: '#333',
        marginTop: 10,
    },
    content: {
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: '#444444',
        textAlign: 'center',
    },
});