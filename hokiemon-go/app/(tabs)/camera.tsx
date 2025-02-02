import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


export default function CameraPage() {
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const cameraRef = useRef<CameraView  | null>(null);

  const [granted, requestPermission] = useCameraPermissions()
  const [photoUri, setPhotoUri] = useState<string | null>(null); 
  console.log(granted)

  const takePicture = async () => {
    if (cameraRef.current) {
     const photo = await cameraRef.current.takePictureAsync();
     setPhotoUri(photo?.uri || null); 
     console.log('Photo captured:', photo?.uri);
     cameraRef.current.pausePreview();
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Camera!!</Text>
      <CameraView style={styles.camera} facing={cameraType} ref={cameraRef}/>
      <View style={styles.buttonContainer}>
        <Button title="Flip Camera" onPress={() => {
          setCameraType(
            cameraType === "back" ? "front" : "back"
          );
         
        }} color="#630031" />
        <Button title="Take Picture" onPress={takePicture}   color="#630031"/>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Hokie White background
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#630031', // Hokie Maroon for text
    textAlign: 'center',
    marginVertical: 10,
  },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#cf4420', // Hokie Orange background for button section
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});