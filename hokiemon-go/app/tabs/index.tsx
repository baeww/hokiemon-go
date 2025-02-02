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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const response = await axios.post(`http://127.0.0.1:5000/${endpoint}`, {
        username,
        password,
      });
      Alert.alert(response.data.message);
      setIsLoggedIn(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Authentication failed';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText}>Login was successful</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, isLogin && styles.activeTab]} 
          onPress={() => setIsLogin(true)}
          disabled={isLoggedIn}
        >
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, !isLogin && styles.activeTab]} 
          onPress={() => setIsLogin(false)}
          disabled={isLoggedIn}
        >
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <ThemedText type="title">{isLogin ? 'Login' : 'Sign Up'}</ThemedText>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={username} 
          onChangeText={setUsername} 
          autoCapitalize="none"
          editable={!isLoggedIn}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
          editable={!isLoggedIn}
        />
      </View>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Auth Button */}
      <TouchableOpacity 
        style={styles.authButton} 
        onPress={handleAuth}
        disabled={isLoggedIn}
      >
        <Text style={styles.authButtonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  successText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  authButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
