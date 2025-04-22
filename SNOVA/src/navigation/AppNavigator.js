import PaginaPrincipal from '../screens/paginaPrincipal';
import Notificacoes from '../screens/notificacoes';
import Mensagens from '../screens/mensagens';
import Perfil from '../screens/perfil';
import Cadastro from '../screens/cadastro';
import Login from '../screens/login';
import SplashScreen from '../screens/splashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'PaginaPrincipal') {
            iconName = 'home';
          } else if (route.name === 'Notificacoes') {
            iconName = 'notifications';
          } else if (route.name === 'Mensagens') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="SplashScreen" component={SplashScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Login" component={Login} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Cadastro" component={Cadastro} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
      <Tab.Screen name="Notificacoes" component={Notificacoes} />
      <Tab.Screen name="Mensagens" component={Mensagens} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
