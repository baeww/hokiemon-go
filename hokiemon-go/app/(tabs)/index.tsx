import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TextInput, Button, View, Text, Platform, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });
      Alert.alert(response.data.message);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://<your-flask-server-ip>:5000/signup', {
        username,
        password,
      });
      Alert.alert(response.data.message);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Sign up failed';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      
      <View style={styles.tabContainer}>
        <Button 
          title="Login" 
          onPress={() => setIsLogin(true)} 
          disabled={isLogin}
        />
        <Button 
          title="Sign Up" 
          onPress={() => setIsLogin(false)} 
          disabled={!isLogin}
        />
      </View>

      <ThemedText type="title">{isLogin ? 'Login' : 'Sign Up'}</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title={isLogin ? "Login" : "Sign Up"} onPress={isLogin ? handleLogin : handleSignUp} />

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 36,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  stepContainer: {
    gap: 8,
    marginTop: 20,
  },
});

