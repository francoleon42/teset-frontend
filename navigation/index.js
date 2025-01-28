import SingInScreen from "../screens/Auth/SignInScreen";
import CheckCodeScreen from "../screens/Auth/CheckCodeScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/Auth/NewPasswordScreen"
import SignUpScreen from "../screens/Auth/SignUpScreen"
import CheckEmailScreen from "../screens/Auth/CheckEmailScreen"



import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";


export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SingInScreen} />
      <Stack.Screen name="CheckCode" component={CheckCodeScreen} /> 

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} /> 


      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} /> 
      <Stack.Screen name="SignUp" component={SignUpScreen} /> 
      
      
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
