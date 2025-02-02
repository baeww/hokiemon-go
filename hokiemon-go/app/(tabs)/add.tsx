import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface User {
    id: string | number;
    name: string;
}

const UserSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/search', {
                username: searchQuery,
            });
            console.log(response.data)
            setUsers(response.data.users);
            Alert.alert(response.data.message);
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'No users found');
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search for users..."
                    placeholderTextColor="#666"
                />
                <Button title="Search" onPress={handleSearch} color="maroon" /> {/* Changed button color to maroon */}
            </View>
            <FlatList
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.name}</Text>
                )}
            />
            <Picker
                selectedValue={selectedUser?.id}
                onValueChange={(itemValue: any) => {
                    const user = users.find(user => user.id === itemValue);
                    setSelectedUser(user || null);
                }}
            >
                {users.map(user => (
                    <Picker.Item key={user.id} label={user.name} value={user.id} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        color: '#000',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        color: '#000',
    },
});

export default UserSearch;
