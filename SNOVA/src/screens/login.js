import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';  // Certifique-se de que o Firebase está configurado corretamente
import { query, where, getDocs, collection } from 'firebase/firestore';  // Importando funções do Firestore

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Erro, Preencha todos os campos.');
      return;
    }

    try {
      // Consultar o Firestore para verificar se o email e a senha existem
      const usersRef = collection(db, 'users');  // Referência para a coleção "users"
      const q = query(usersRef, where('email', '==', email), where('senha', '==', password));  // Consulta com filtros para email e senha

      const querySnapshot = await getDocs(q);  // Executa a consulta

      if (querySnapshot.empty) {
        // Se não encontrar usuário com esse email e senha
        alert('Erro, Email ou senha inválidos.');
      } else {
        // Se encontrar, redireciona para a página principal
        navigation.replace('PaginaPrincipal');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro, Não foi possível autenticar. Tente novamente mais tarde.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('../../src/assets/logo.jpg')} 
          style={styles.logo}
        />

        <Text style={styles.subtitle}>Faça login para continuar</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
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
  registerText: {
    marginTop: 20,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
