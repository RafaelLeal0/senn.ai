import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <TextInput placeholder="Escreva seu post" placeholderTextColor="#aaa" style={styles.input} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  },
});