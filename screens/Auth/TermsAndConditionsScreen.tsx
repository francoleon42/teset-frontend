import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsAndConditionsScreen({navigation }) {
  const handleAccept = () => {
    navigation.navigate('CheckEmail');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Terminos y Condiciones</Text>
      <Text style={styles.subTitle}>Usted esta aceptando todos los terminos y condiciones mencionados abajo</Text>
      <ScrollView>
      <Text>Última actualización: Marzo 2025</Text>

        <Text>1. Aceptación de los Términos

        Al acceder y utilizar Teset-App (en adelante, "la Aplicación"), proporcionada por Costanelli Tech (en adelante, "nosotros", "nuestro" o "nos"), el usuario (en adelante, "usted" o "el Usuario") acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo con estos términos, debe abstenerse de utilizar la Aplicación.
       </Text> 
       <Text>
        2. Modificación de los Términos

        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento, sin previo aviso. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Aplicación. Le recomendamos que revise regularmente esta sección para estar al tanto de cualquier cambio.
        </Text> 
        <Text>
        3. Descripción de los Servicios

        [Breve descripción de lo que hace la aplicación y los servicios que ofrece.]
        </Text> 
        <Text>
        4. Requisitos del Usuario

        Para usar la Aplicación, el Usuario debe tener al menos 18 años y estar legalmente capacitado para aceptar estos términos. Al utilizar la Aplicación, usted declara que cumple con estos requisitos.
        </Text> 
        <Text>
        5. Registro y Cuenta de Usuario
        
        Al crear una cuenta en la Aplicación, usted acepta proporcionar información veraz, precisa y completa. Es su responsabilidad mantener la confidencialidad de su cuenta y contraseña. Si sospecha de cualquier uso no autorizado de su cuenta, debe notificarlo inmediatamente.
        </Text> 
        <Text>
        6. Uso Permitido de la Aplicación

        Usted se compromete a usar la Aplicación únicamente para fines legales y de acuerdo con todas las leyes y regulaciones locales, nacionales e internacionales aplicables. Queda prohibido:

        Modificar, descompilar, realizar ingeniería inversa o intentar obtener el código fuente de la Aplicación.
        Interferir o interrumpir el funcionamiento de la Aplicación o sus servidores.
        Utilizar la Aplicación de manera que pueda dañar, deshabilitar, sobrecargar o perjudicar a los servidores de la Aplicación.
        </Text> 
        <Text>
        7. Privacidad

        Su privacidad es importante para nosotros. Por favor, lea nuestra [Política de Privacidad] para entender cómo recopilamos, usamos y protegemos su información personal al utilizar la Aplicación.
        </Text> 
        <Text>
        8. Propiedad Intelectual

        Todos los derechos de propiedad intelectual sobre la Aplicación, incluyendo pero no limitándose a su diseño, funcionalidad, contenido, marcas registradas y cualquier otro material relacionado, son propiedad de [Nombre de la Empresa] o sus licenciantes. El uso no autorizado de cualquier material de la Aplicación está prohibido.
        </Text> 
        <Text>
        9. Limitación de Responsabilidad

        La Aplicación se proporciona "tal cual", sin garantías de ningún tipo, expresas o implícitas. No garantizamos que la Aplicación esté libre de errores, interrupciones o virus. En ningún caso, [Nombre de la Empresa] será responsable por daños directos, indirectos, incidentales, especiales o consecuentes, incluyendo pero no limitándose a pérdida de beneficios, datos o uso, que resulten del uso o la imposibilidad de usar la Aplicación.
        </Text> 
        <Text>
        10. Enlaces a Terceros

        La Aplicación puede contener enlaces a sitios web de terceros que no están controlados por nosotros. No somos responsables del contenido o las prácticas de privacidad de estos sitios. Le recomendamos que lea sus términos y condiciones antes de utilizarlos.
        </Text> 
        <Text>
        11. Terminación del Uso

        Nos reservamos el derecho de suspender o terminar su acceso a la Aplicación en cualquier momento, por cualquier motivo, sin previo aviso, si creemos que ha violado estos términos.
        </Text> 
        <Text>
        12. Indemnización

        Usted acepta indemnizar y eximir de responsabilidad a Teset  y sus afiliados, empleados, directores y agentes por cualquier reclamo, demanda, daño o pérdida que resulte de su uso de la Aplicación o de la violación de estos términos.
        </Text> 
        <Text>
        13. Ley Aplicable y Jurisdicción

        Estos términos se regirán e interpretarán de acuerdo con las leyes de Argentina, sin tener en cuenta sus principios de conflicto de leyes. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de Capital Federal, Buenos Aires, a menos que se acuerde lo contrario.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Aceptar términos y condiciones" onPress={handleAccept}  />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 20,
    color: "#808080",
    textAlign: "center",
  },
  scroll: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});
