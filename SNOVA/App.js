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
import Pesquisa from './src/screens/pesquisa'; // Adicionei a importação da tela de pesquisa

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
          <Stack.Screen name="Notificacoes" component={Notificacoes} />
          <Stack.Screen name="Mensagens" component={Mensagens} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Pesquisa" component={Pesquisa} /> {/* Adicionei a tela de pesquisa */}
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
