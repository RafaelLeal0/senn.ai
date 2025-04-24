import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Perfil from './perfil';
import Mensagens from './mensagens';
import Notificacao from './notificacao';

// Páginas fictícias para navegação
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Página Inicial</Text>
=======
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Verifique se o pacote react-native-vector-icons está instalado corretamente.
// Execute `npm install react-native-vector-icons` se necessário.

const posts = [
  {
    id: '1',
    user: 'Abel Tesfaye',
    username: '@theweeknd',
    time: '6 min',
    text: 'hurryuptomorrow.movie/tickets',
   
    likes: 481,
    comments: 38,
    shares: 69,
  },
  {
    id: '2',
    user: 'RECEBA',
    username: '@luvadepedreiro',
    time: '20 h',
    text: 'Descanse em Paz 🙏🏻🖤',
    
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>SN</Text>
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Para você</Text>
          <Text style={styles.tabText}>Seguindo</Text>
        </View>
      </View>

      {/* Campo de post */}
      <View style={styles.postBox}>
        <Icon name="person-circle-outline" size={40} color="#fff" />
        <TextInput
          placeholder="Escreva seu post"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={{ color: '#000' }}>Postar</Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.username}>
              <Text style={styles.bold}>{item.user}</Text> {item.username} · {item.time}
            </Text>
            <Text style={styles.postText}>{item.text}</Text>
          
            <View style={styles.reactions}>
              <Text>💬 {item.comments}</Text>
              <Text>🔁 {item.shares}</Text>
              <Text>❤️ {item.likes}</Text>
            </View>
          </View>
        )}
      />
>>>>>>> 76f59f0cd0905d0466a42711d1e98c0abfce2dd7
    </View>
  );
}

// Configuração do BottomTabNavigator
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Retorna o ícone correspondente
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#000' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={Mensagens} />
      <Tab.Screen name="Notifications" component={Notificacao} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
<<<<<<< HEAD
    padding: 16,
=======
    paddingTop: 50,
  },
  topBar: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tabText: {
    color: '#777',
    marginHorizontal: 10,
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  postBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    gap: 5,
  },
  input: {
    flex: 1,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#555',
    padding: 5,
    marginHorizontal: 10,
  },
  postButton: {
    backgroundColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  post: {
    borderBottomWidth: 0.5,
    borderColor: '#333',
    padding: 10,
  },
  username: {
    color: '#aaa',
    marginBottom: 5,
  },
  bold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postText: {
    color: '#fff',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 5,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    color: '#fff',
>>>>>>> 76f59f0cd0905d0466a42711d1e98c0abfce2dd7
  },
});













