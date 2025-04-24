import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal
} from 'react-native';
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
    commentList: [],
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
    commentList: [],
  },
];

export default function FeedScreen() {
  const navigation = useNavigation();
  const [postList, setPostList] = useState(posts);
  const [newPostText, setNewPostText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newComment, setNewComment] = useState('');

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
      commentList: [],
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

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    setPostList((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === currentPostId) {
          return {
            ...post,
            comments: post.comments + 1,
            commentList: [newComment],
          };
        }
        return post;
      })
    );

    setNewComment('');
    setIsCommenting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.topBar}>
          <Image source={require('../../src/assets/logo.jpg')} style={styles.logoImage} />
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

              {item.commentList.length > 0 && (
                <Text style={styles.commentText}>
                  {item.commentList[item.commentList.length - 1]}
                </Text>
              )}

              <View style={styles.reactions}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                  onPress={() => {
                    setCurrentPostId(item.id);
                    setIsCommenting(true);
                  }}
                >
                  <Icon name="chatbubble-outline" size={20} color="#fff" />
                  <Text style={{ color: '#fff' }}>{item.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                  onPress={() => toggleReaction(item.id, 'shares')}
                >
                  <Icon name="repeat-outline" size={20} color="#fff" />
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

      {/* Modal para adicionar comentário */}
      <Modal visible={isCommenting} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Comentário</Text>
            <TextInput
              style={styles.input}
              placeholder="Escreva seu comentário"
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddComment}>
              <Text style={styles.saveButtonText}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsCommenting(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  logoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
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
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 15,
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
  commentText: {
    color: '#fff',
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
