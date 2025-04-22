import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PaginaPrincipal({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página Principal</Text>
      <Button title="Notificações" onPress={() => navigation.navigate('Notificacoes')} />
      <Button title="Mensagens" onPress={() => navigation.navigate('Mensagens')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
