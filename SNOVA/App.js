import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/splashScreen';
import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import PaginaPrincipal from './src/screens/paginaPrincipal';
import Notificacoes from './src/screens/notificacoes';
import Mensagens from './src/screens/mensagens';
import Perfil from './src/screens/perfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} options={{ headerShown: false }} />
          <Stack.Screen name="Notificacoes" component={Notificacoes} options={{ headerShown: false }} />
          <Stack.Screen name="Mensagens" component={Mensagens} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
