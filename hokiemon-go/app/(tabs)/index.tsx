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
      // const response = await axios.get('http://127.0.0.1:5000/login');
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
      <ThemedText type="title" style={styles.text}>{isLogin ? 'Login' : 'Sign Up'}</ThemedText> {/* Moved title higher */}
      
      <View style={styles.tabContainer}>
        <Button 
          title="Login" 
          onPress={() => setIsLogin(true)} 
          disabled={isLogin}
          color="maroon" // Changed button color to maroon
        />
        <Button 
          title="Sign Up" 
          onPress={() => setIsLogin(false)} 
          disabled={!isLogin}
          color="orange" // Changed button color to orange
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.text]}
          placeholder="Username"
          placeholderTextColor="maroon" // Changed placeholder text color to maroon
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, styles.text]}
          placeholder="Password"
          placeholderTextColor="orange" // Changed placeholder text color to orange
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={[styles.errorText, styles.text]}>{error}</Text>}

      <Button title={isLogin ? "Login" : "Sign Up"} onPress={isLogin ? handleLogin : handleSignUp} color="maroon" /> {/* Changed button color to maroon */}

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
  text: {
    color: 'maroon', // Changed text color to maroon
  },
});

