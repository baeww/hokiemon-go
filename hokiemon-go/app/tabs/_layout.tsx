import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Text, 
  Alert 
} from 'react-native';
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
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
      });
      Alert.alert(response.data.message);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, isLogin && styles.activeTab]} 
          onPress={() => setIsLogin(true)}
        >
          <Text style={styles.tabText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, !isLogin && styles.activeTab]} 
          onPress={() => setIsLogin(false)}
        >
          <Text style={styles.tabText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <ThemedText type="title" style={styles.title}>
        {isLogin ? 'Welcome, Hokie!' : 'Join the Hokie Nation'}
      </ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={isLogin ? handleLogin : handleSignUp}
      >
        <View style={styles.submitButtonSolid}>
          <Text style={styles.submitText}>{isLogin ? "Login" : "Sign Up"}</Text>
        </View>
      </TouchableOpacity>

      <ThemedView style={styles.loreContainer}>
        <ThemedText type="subtitle" style={styles.loreTitle}>
          Go Hokies!
        </ThemedText>
        <ThemedText style={styles.loreText}>
          "Ut Prosim" (That I May Serve) is the motto of Virginia Tech. Whether you're logging in to check your grades or signing up to join the Hokie community, we're glad to have you here!
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A94454', // Simplified solid color instead of gradient
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff30',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#F08C40', // Less intense color
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff50',
    backgroundColor: '#ffffff20',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 12,
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
  },
  submitButtonSolid: {
    padding: 15,
    backgroundColor: '#F08C40', // Simple solid color instead of gradient
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loreContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff20',
    borderRadius: 10,
    alignItems: 'center',
  },
  loreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  loreText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
