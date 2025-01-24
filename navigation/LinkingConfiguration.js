/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeTab: {
            screens: {
              HomeScreen: "Inicio",
            },
          },
          NewsTab: {
            screens: {
              NewsScreen: "Novedades",
            },
          },
          ShopsTab: {
            screens: {
              ShopsScreen: "Comercios",
            },
          },
          ContactTab: {
            screens: {
              ContactScreen: "Contacto",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
