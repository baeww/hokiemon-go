import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button as PaperButton, Chip, Modal, Portal, TextInput as PaperTextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; // Icon for right arrow in dropdown

const predefinedTags = [
  'React',
  'JavaScript',
  'Node.js',
  'React Native',
  'Python',
  'CSS',
  'HTML',
  'GraphQL',
  'Typescript',
  'Expo',
  'Frontend',
  'Backend',
  'UI/UX',
];

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl] = useState(require('@/assets/images/react-logo.png')); // Placeholder profile picture from your assets
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Holds selected tags
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Filter the predefined tags based on the search query
  const filteredTags = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a tag
  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setModalVisible(false);
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(item => item !== tag));
  };

  // Handle saving the profile
  const handleSave = () => {
    alert('Profile saved!');
  };

  return (
    <View style={styles.container}>
      {/* Display the placeholder profile picture */}
      <Image source={avatarUrl} style={styles.avatar} />
      <Text style={styles.title}>Profile</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#B0B0B0" // Lighter gray color for placeholder text
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          placeholderTextColor="#B0B0B0" // Lighter gray color for placeholder text
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#B0B0B0" // Lighter gray color for placeholder text
        />
      </View>

      {/* Display selected tags as Chips */}
      <Text style={styles.interestsTitle}>Interests</Text>
      <ScrollView horizontal style={styles.selectedTagsContainer}>
        {selectedTags.map(tag => (
          <Chip
            key={tag}
            mode="flat"
            style={styles.chip}
            onClose={() => handleRemoveTag(tag)}
          >
            {tag}
          </Chip>
        ))}
      </ScrollView>

      {/* Button to open the modal for tag selection */}
      <PaperButton onPress={() => setModalVisible(true)} mode="contained" style={styles.selectButton}>
        Select Interests
      </PaperButton>

      {/* Modal for searching and selecting tags */}
      <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
          <PaperTextInput
            label="Search Tags"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoFocus
          />

          <ScrollView>
            {filteredTags.map(tag => (
              <TouchableOpacity key={tag} onPress={() => handleSelectTag(tag)}>
                <View style={styles.tagItem}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <AntDesign name="right" size={16} color="gray" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>

      {/* Save button */}
      <PaperButton mode="contained" onPress={handleSave} style={styles.selectButton}>
        Save
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75, // Make the avatar circular
    marginBottom: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  interestsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedTagsContainer: {
    marginBottom: 20,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  selectButton: {
    marginBottom: 20,
  },
  modal: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  searchInput: {
    marginBottom: 10,
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tagText: {
    fontSize: 16,
  },
});
