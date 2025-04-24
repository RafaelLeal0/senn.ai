import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const mensagensData = [
  { id: '1', nome: 'João', mensagem: 'Oi, tudo bem?' },
  { id: '2', nome: 'Maria', mensagem: 'Como você está?' },
  { id: '3', nome: 'Pedro', mensagem: 'Vamos marcar algo?' },
];

export default function MensagensScreen() {
  const navigation = useNavigation();
  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      // Aqui você pode implementar a lógica para enviar a mensagem
      alert('Mensagem enviada: ' + novaMensagem);
      setNovaMensagem('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.mensagem}>{item.mensagem}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>SN</Text>
          <View style={styles.tabs}>
            <Text style={[styles.tabText, styles.activeTab]}>Mensagens</Text>
          </View>
        </View>

        {/* Lista de mensagens */}
        <FlatList
          data={mensagensData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
        />

        {/* Campo para digitar nova mensagem */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva uma mensagem..."
            placeholderTextColor="#888"
            value={novaMensagem}
            onChangeText={setNovaMensagem}
          />
          <TouchableOpacity onPress={enviarMensagem} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de navegação */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
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
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  mensagem: {
    fontSize: 14,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0088cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
