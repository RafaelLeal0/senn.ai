import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Notificacao() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Página de Notificações Leal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
});
