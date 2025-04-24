import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('Tenho 17 anos, estou no terceiro ano do Ensino Médio e faço Desenvolvimento de Sistemas no Senai de Taubaté.');
  const [followers, setFollowers] = useState(100);
  const [following, setFollowing] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [editedPostText, setEditedPostText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPostId, setMenuPostId] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    const requestPermissionAndFetchUser = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Você precisa permitir acesso à galeria para mudar a imagem de perfil.');
      }

      try {
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        const storedUsername = await AsyncStorage.getItem('username');
        const storedBio = await AsyncStorage.getItem('bio');

        setProfileImage(storedProfileImage || '');
        setUsername(storedUsername || 'gustamartins');
        setBio(storedBio || 'Tenho 17 anos, estou no terceiro ano do Ensino Médio e faço Desenvolvimento de Sistemas no Senai de Taubaté.');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    requestPermissionAndFetchUser();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('userPosts');
        if (storedPosts) {
          const userPosts = JSON.parse(storedPosts).filter(
            (post) => post.id !== '1' && post.id !== '2'
          );
          setUserPosts(userPosts);
        }
      } catch (error) {
        console.error('Erro ao carregar os posts do usuário:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);

      try {
        await AsyncStorage.setItem('profileImage', imageUri);
        Alert.alert('Sucesso', 'Imagem de perfil atualizada com sucesso!');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar a imagem de perfil.');
      }
    }
  };

  const handleSaveProfile = async () => {
    setUsername(newUsername);
    setBio(newBio);
    setIsEditing(false);

    try {
      await AsyncStorage.setItem('username', newUsername);
      await AsyncStorage.setItem('bio', newBio);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const handleEditPost = async () => {
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === currentPostId ? { ...post, text: editedPostText } : post
      )
    );
    setIsEditingPost(false);
    setEditedPostText('');

    try {
      const updatedPosts = userPosts.map((post) =>
        post.id === currentPostId ? { ...post, text: editedPostText } : post
      );
      await AsyncStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Erro ao editar o post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const updatedPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedPosts);

    try {
      await AsyncStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
  };

  const handleCreatePost = async () => {
    const newPost = {
      id: Date.now().toString(),
      username: username,
      time: new Date().toLocaleString(),
      text: newPostText,
      comments: 0,
      likes: 0,
    };
    const updatedPosts = [newPost, ...userPosts];
    setUserPosts(updatedPosts);
    setIsCreatingPost(false);
    setNewPostText('');

    try {
      await AsyncStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Erro ao criar o post:', error);
    }
  };

  const openMenu = (postId) => {
    setMenuPostId(postId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuPostId(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image source={{ uri: profileImage || 'https://via.placeholder.com/120' }} style={styles.profileImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>@martinss.gusta</Text>
          <Text style={styles.bio}>{bio}</Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>{followers} Seguidores</Text>
            <Text style={styles.statText}>{following} Seguindo</Text>
          </View>
        </View>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <View style={styles.postsHeader}>
            <Text style={styles.postsHeaderText}>Posts</Text>
          </View>
          {userPosts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Text style={styles.postUsername}>{post.username}</Text>
              <Text style={styles.postDate}>{post.time}</Text>
              <Text style={styles.postContent}>{post.text}</Text>
              <View style={styles.postReactions}>
                <View style={styles.reaction}>
                  <Icon name="chatbubble-outline" size={20} color="#fff" />
                  <Text style={styles.reactionText}>{post.comments || 0}</Text>
                </View>
                <View style={styles.reaction}>
                  <Icon name="heart-outline" size={20} color="#fff" />
                  <Text style={styles.reactionText}>{post.likes || 0}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => openMenu(post.id)}
              >
                <Icon name="ellipsis-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu de opções */}
      <Modal visible={menuVisible} animationType="fade" transparent={true}>
        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                const post = userPosts.find((p) => p.id === menuPostId);
                setCurrentPostId(post.id);
                setEditedPostText(post.text);
                setIsEditingPost(true);
                closeMenu();
              }}
            >
              <Text style={styles.menuOptionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                handleDeletePost(menuPostId);
                closeMenu();
              }}
            >
              <Text style={styles.menuOptionText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={closeMenu}>
              <Text style={styles.menuOptionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal visible={isEditing} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Bio"
              value={newBio}
              onChangeText={setNewBio}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para editar post */}
      <Modal visible={isEditingPost} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Edite seu post"
              value={editedPostText}
              onChangeText={setEditedPostText}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEditPost}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditingPost(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para criar novo post */}
      <Modal visible={isCreatingPost} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Escreva seu post"
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleCreatePost}>
              <Text style={styles.saveButtonText}>Postar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCreatingPost(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Ícone flutuante para criar novo post */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsCreatingPost(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: { color: '#fff', fontSize: 14 },
  userInfo: { alignItems: 'center', padding: 16 },
  username: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  bio: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  statText: { color: '#fff', fontSize: 14 },
  postsSection: { flex: 1, padding: 16 },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingBottom: 8,
    marginBottom: 16,
  },
  postsHeaderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  post: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  postUsername: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  postDate: { color: '#aaa', fontSize: 12, marginBottom: 8 },
  postContent: { color: '#fff', fontSize: 14 },
  postReactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reactionText: {
    color: '#fff',
    fontSize: 14,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
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
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: { color: '#fff', fontSize: 16 },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: { color: '#fff', fontSize: 16 },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  menuContent: {
    width: '80%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80, // Mantém o botão fixo na tela
    right: 20,
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10, // Garante que o botão fique acima de outros elementos
  },
});
