import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Cadastro() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        email,
        senha: password,
        criadoEm: serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar. Verifique sua conexão e permissões.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image 
          source={require('../../src/assets/logo.jpg')} 
          style={styles.logoImage} 
        />

        <Text style={styles.subtitle}>Faça seu cadastro</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#333',
    marginTop: 15,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
