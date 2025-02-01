import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface User {
    id: string | number;
    name: string;
}

const UserSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    const handleSearch = async () => {
        if (searchQuery) {
            const response = await axios.get(`/api/users?search=${searchQuery}`);
            setUsers(response.data);
        } else {
            setUsers([]);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search for users..."
                placeholderTextColor="#666"
            />
            <FlatList
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.name}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
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
