// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabBarIcon } from "../components/Navigation/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

import NewsScreen from "../screens/Home/NewsScreen";
import ContactScreen from "../screens/Home/ContactScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ShopsScreen from "../screens/Home/ShopsScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const colorScheme = useColorScheme();
  const token = route?.params?.token; // Recibe el token desde la ruta 'Root'

  // Validar si el token está presente
  if (!token) {
    console.error("El token no fue pasado correctamente a BottomTabNavigator");
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint
      }}
    >
      <BottomTab.Screen
        name="Inicio"
        component={HomeScreen}
        initialParams={{ token }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          unmountOnBlur: false,
        }}
      />
      <BottomTab.Screen
        name="Novedades"
        component={NewsScreen}
        initialParams={{ token }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
          unmountOnBlur: false,
        }}
      />
      <BottomTab.Screen
        name="Comercios"
        component={ShopsScreen}
        initialParams={{ token }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color} />
          ),
          unmountOnBlur: false,
        }}
      />
      <BottomTab.Screen
        name="Contacto"
        component={ContactScreen}
        initialParams={{ token }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'call' : 'call-outline'} color={color} />
          ),
          unmountOnBlur: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// LO DE ABAJO VENIA CON EL TEMPLATE PERO NO LO ESTOY UTILIZANDO DE MOMENTO

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const NewsStack = createStackNavigator();

function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="Novedades"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
    </NewsStack.Navigator>
  );
}

const ShopsStack = createStackNavigator();

function ShopsNavigator() {
  return (
    <ShopsStack.Navigator>
      <ShopsStack.Screen
        name="Comercios"
        component={ShopsScreen}
        options={{ headerShown: false }}
      />
    </ShopsStack.Navigator>
  );
}

const ContactStack = createStackNavigator();

function ContactNavigator() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="Contacto"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
    </ContactStack.Navigator>
  );
}
