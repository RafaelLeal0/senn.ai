import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pela URL da imagem do perfil
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>gustamartins</Text>
        <Text style={styles.userHandle}>@martinss.gusta</Text>
        <Text style={styles.bio}>
          Tenho 17 anos, estou no terceiro ano do Ensino Médio e faço Desenvolvimento de Sistemas no Senai de Taubaté.
        </Text>
      </View>

      {/* Followers */}
      <View style={styles.followers}>
        <Text style={styles.followersText}>
          <Text style={styles.boldText}>100</Text> Seguidores
        </Text>
        <Text style={styles.followersText}>
          <Text style={styles.boldText}>100</Text> Seguindo
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tab}>Posts</Text>
        <Text style={styles.tab}>Curtidas</Text>
      </View>

      {/* Post */}
      <View style={styles.post}>
        <Text style={styles.postHandle}>@martinss.gusta</Text>
        <Text style={styles.postDate}>22 de Abril de 2025</Text>
        <Text style={styles.postContent}>Ds é muito legal...</Text>
        <View style={styles.postActions}>
          <Text style={styles.postAction}>5</Text>
          <Text style={styles.postAction}>172</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editButton: {
    marginLeft: 'auto',
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
    marginBottom: 16,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userHandle: {
    color: '#aaa',
    fontSize: 16,
  },
  bio: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  followers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  followersText: {
    color: '#fff',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 16,
  },
  tab: {
    color: '#fff',
    fontSize: 16,
    paddingBottom: 8,
  },
  post: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  postHandle: {
    color: '#aaa',
    fontSize: 14,
  },
  postDate: {
    color: '#555',
    fontSize: 12,
    marginBottom: 8,
  },
  postContent: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postAction: {
    color: '#aaa',
    fontSize: 14,
  },
});












