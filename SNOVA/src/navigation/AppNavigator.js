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
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
      <Stack.Screen name="Mensagens" component={MensagensScreen} />
    </Stack.Navigator>
  );
}
