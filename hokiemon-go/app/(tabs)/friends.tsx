import React, { useState } from 'react';
import { StyleSheet, Image, Platform, View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Define a type for the friend object
interface Friend {
  id: string;
  name: string;
  birthday: string;
  context: string;
  occupation: string;
  date: string;
}

// Sample friends data with the new type
const friendsData: Friend[] = [
  { id: '1', name: 'Alice', birthday: "10/5/2003", context: 'Hackviolet 2024', occupation: 'Software Engineer', date: "01/15/2023" },
  { id: '2', name: 'Bob', birthday: "12/15/2002", context: 'Hackviolet 2024', occupation: 'Designer', date: "01/20/2023" },
  { id: '3', name: 'Charlie', birthday: "11/20/2001", context: 'Hackviolet 2024', occupation: 'Product Manager', date: "01/25/2023" },
];

export default function TabTwoScreen() {
  // Set the selectedFriend state with the correct type
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Handle opening the modal and setting the selected friend
  const handleFriendPress = (friend: Friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedFriend(null); // Clear the selected friend
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>

      {/* Friends Table */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title >Date Met</DataTable.Title>
        </DataTable.Header>

        {friendsData.map((friend) => (
          <DataTable.Row key={friend.id}>
            <DataTable.Cell>
              {/* Make the friend's name clickable */}
              <TouchableOpacity onPress={() => handleFriendPress(friend)}>
                <ThemedText>{friend.name}</ThemedText>
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell>{friend.date}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {/* Modal to display friend's detailed info */}
      <Modal
        visible={isModalVisible}
        transparent={true} // Make the background transparent
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          {/* Dark background behind the modal */}
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          {selectedFriend && (
            <>
              <Image 
                source={{ uri: 'https://example.com/path/to/image.jpg' }} // Add the image source here
                style={styles.modalImage} // Add a style for the image
              />
              <Text style={styles.modalTitle}>{selectedFriend.name}</Text>
              <Text style={styles.modalText}>Birthday: {selectedFriend.birthday}</Text>
              <Text style={styles.modalText}>Where we met: {selectedFriend.context}</Text>
              <Text style={styles.modalText}>Occupation: {selectedFriend.occupation}</Text>
            </>
          )}
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background with opacity
  },
  modalContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'black', // Modal background color
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalImage: {
    width: '100%', // Adjust width as needed
    height: 200, // Set a height for the image
    borderRadius: 10, // Optional: add border radius
    marginBottom: 10, // Space between image and text
  },
});
