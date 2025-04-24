import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import PaginaPrincipal from './src/screens/paginaPrincipal';
import Notificacoes from './src/screens/notificacoes';
import Mensagens from './src/screens/mensagens';
import Perfil from './src/screens/perfil';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image 
          source={require('./src/assets/logo.jpg')} 
          style={styles.logoImage} 
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
        <Stack.Screen name="Notificacoes" component={Notificacoes} />
        <Stack.Screen name="Mensagens" component={Mensagens} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
