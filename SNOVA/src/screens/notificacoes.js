import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const notificacoesData = [
  { id: '1', titulo: 'Nova mensagem', descricao: 'Você recebeu uma nova mensagem de João.' },
  { id: '2', titulo: 'Atualização de sistema', descricao: 'Uma nova atualização de sistema está disponível.' },
  { id: '3', titulo: 'Lembrete', descricao: 'Não se esqueça do evento amanhã às 15h.' },
];

export default function NotificacoesScreen() {
  const navigation = useNavigation();
  const [notificacoes, setNotificacoes] = useState(notificacoesData);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map((notificacao) => 
      notificacao.id === id ? { ...notificacao, lida: true } : notificacao
    ));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.notificacaoContainer, item.lida && styles.lida]}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <TouchableOpacity onPress={() => marcarComoLida(item.id)} style={styles.botaoLer}>
        <Text style={styles.botaoLerText}>Marcar como lida</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>SN</Text>
          <View style={styles.tabs}>
            <Text style={[styles.tabText, styles.activeTab]}>Notificações</Text>
          </View>
        </View>

        {/* Lista de notificações */}
        <FlatList
          data={notificacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.notificacoesList}
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
  notificacoesList: {
    padding: 10,
  },
  notificacaoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  lida: {
    backgroundColor: '#d3f9d8',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  descricao: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  botaoLer: {
    marginTop: 10,
    backgroundColor: '#0088cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  botaoLerText: {
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
