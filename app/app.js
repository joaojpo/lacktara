import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import * as Google from 'expo-auth-session';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleRequest, setGoogleRequest] = useState(null);

  // Função de Login com E-mail e Senha
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert('Login bem-sucedido', `Bem-vindo, ${email}!`);
    }
  };

  // Função de Login com Google
  const handleGoogleLogin = async () => {
    const { type, params } = await Google.useIdTokenAuthRequest({
      clientId: 'YOUR_GOOGLE_CLIENT_ID',
    });

    if (type === 'success') {
      // Aqui você pode fazer a lógica para autenticar o usuário com o Google
      Alert.alert('Google Login', `Autenticado como ${params.email}`);
    }
  };

  // Função de Login com Facebook
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({ appId: 'YOUR_FACEBOOK_APP_ID' });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync();
      if (type === 'success') {
        Alert.alert('Facebook Login', `Token: ${token}`);
      } else {
        Alert.alert('Erro', 'Erro ao logar com o Facebook');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  // Função de Login com Apple
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync();
      Alert.alert('Apple Login', `Autenticado como ${credential.email}`);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />

      <View style={styles.socialButtons}>
        <Button title="Login com Google" onPress={handleGoogleLogin} />
        <Button title="Login com Facebook" onPress={handleFacebookLogin} />
        {AppleAuthentication.isAvailableAsync() && (
          <Button title="Login com Apple" onPress={handleAppleLogin} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    paddingLeft: 10,
  },
  socialButtons: {
    marginTop: 20,
  },
});
