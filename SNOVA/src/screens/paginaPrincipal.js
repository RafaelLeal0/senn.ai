import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  const [postList, setPostList] = useState(posts);
  const [newPostText, setNewPostText] = useState('');

  const handlePost = () => {
    if (newPostText.trim() === '') return;

    const newPost = {
      id: (postList.length + 1).toString(),
      user: 'Você',
      username: '@voce',
      time: 'Agora',
      text: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPostList([newPost, ...postList]);
    setNewPostText('');
  };

  const toggleReaction = (postId, reactionType) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isActive = post[`${reactionType}Active`];
          return {
            ...post,
            [`${reactionType}Active`]: !isActive,
            [reactionType]: isActive ? post[reactionType] - 1 : post[reactionType] + 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>SN</Text>
          <View style={styles.tabs}>
            <Text style={[styles.tabText, styles.activeTab]}>Para você</Text>
            
          </View>
        </View>

        {/* Campo de post */}
        <View style={styles.postBox}>
          <Icon name="person-circle-outline" size={40} color="#fff" />
          <TextInput
            placeholder="Escreva seu post"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={newPostText}
            onChangeText={setNewPostText}
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={{ color: '#000' }}>Postar</Text>
          </TouchableOpacity>
        </View>

        {/* Feed */}
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.username}>
                <Text style={styles.bold}>{item.user}</Text> {item.username} · {item.time}
              </Text>
              <Text style={styles.postText}>{item.text}</Text>
            
              <View style={styles.reactions}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                  onPress={() => toggleReaction(item.id, 'comments')}
                >
                  <Icon
                    name="chatbubble-outline"
                    size={20}
                    color="#fff"
                  />
                  <Text style={{ color: '#fff' }}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                  onPress={() => toggleReaction(item.id, 'shares')}
                >
                  <Icon
                    name="repeat-outline"
                    size={20}
                    color="#fff"
                  />
                  <Text style={{ color: '#fff' }}>{item.shares}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                  onPress={() => toggleReaction(item.id, 'likes')}
                >
                  <Icon
                    name="heart-outline"
                    size={20}
                    color={item.likesActive ? 'red' : '#fff'}
                  />
                  <Text style={{ color: '#fff' }}>{item.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Barra de navegação */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('PaginaPrincipal')}>
          <Icon name="home-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Icon name="person-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notificacoes')}>
          <Icon name="notifications-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Mensagens')}>
          <Icon name="chatbubble-ellipses-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#333',
  },
});