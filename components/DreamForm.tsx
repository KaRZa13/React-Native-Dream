import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Checkbox, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');



export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [dateText, setDateText] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [hashtag1, setHashtag1] = useState('');
  const [hashtag2, setHashtag2] = useState('');
  const [hashtag3, setHashtag3] = useState('');
  const [hashtag4, setHashtag4] = useState('');
  const [hashtag5, setHashtag5] = useState('');

  // const findHashtagId = async () => {
    // 
  // } 

  const handleDreamSubmission = async () => {
    // Logique de traitement de la soumission du rêve
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray.push(
        {
          "dateText": dateText, 
          "dreamText": dreamText, 
          "isLucidDream": isLucidDream,
          "hashtags": {
            "hashtag1": hashtag1,
            "hashtag2": hashtag2,
            "hashtag3": hashtag3,
            "hashtag4": hashtag4,
            "hashtag5": hashtag5,
          },
        }
      );

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray))


    } catch(error) {
      console.error('Erreur lors de la sauvegarde des données', error)
    }
    // Réinitialisation du formulaire
    setDreamText('');
    setDateText('');
    setIsLucidDream(false);
  };


  return (
    <View style={styles.container}>
      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={(text) => setDreamText(text)}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <TextInput
        label="Date"
        value={dateText}
        onChangeText={(text) => setDateText(text)}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Rêve Lucide"
          status={isLucidDream ? 'checked' : 'unchecked'}
          onPress={() => setIsLucidDream(!isLucidDream)}
        />
      </View>
      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});