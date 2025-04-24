import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/paginaPrincipal';
import PerfilScreen from '../screens/perfil';
import NotificacoesScreen from '../screens/notificacoes';
import MensagensScreen from '../screens/mensagens';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Mensagens" component={MensagensScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
