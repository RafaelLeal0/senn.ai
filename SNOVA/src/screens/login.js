import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Login</Text>
      <Button title="Ir para Cadastro" onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Entrar" onPress={() => navigation.replace('PaginaPrincipal')} />
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
