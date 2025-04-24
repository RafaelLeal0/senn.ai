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
import ChatScreen from './src/screens/chat';

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
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PaginaPrincipal" 
          component={PaginaPrincipal} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Notificacoes" 
          component={Notificacoes} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Mensagens" 
          component={Mensagens} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
        />
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