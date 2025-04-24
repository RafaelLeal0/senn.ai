import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        const storedUsername = await AsyncStorage.getItem('username');
        setProfileImage(storedProfileImage || '');
        setUsername(storedUsername || 'gustamartins');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    fetchUserData();
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

  return (
    <View style={styles.container}>
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
          <Text style={styles.postsHeaderText}>Curtidas</Text>
        </View>
        <View style={styles.post}>
          <Text style={styles.postUsername}>@martinss.gusta</Text>
          <Text style={styles.postDate}>22 de Abril de 2025</Text>
          <Text style={styles.postContent}>Dá é muito legal...</Text>
        </View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  userInfo: {
    alignItems: 'center',
    padding: 16,
  },
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
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
  statText: {
    color: '#fff',
    fontSize: 14,
  },
  postsSection: {
    flex: 1,
    padding: 16,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingBottom: 8,
    marginBottom: 16,
  },
  postsHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  post: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  postUsername: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  postContent: {
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












