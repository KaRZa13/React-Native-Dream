import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';


export default function DreamList() {
  const [dreams, setDreams] = useState([]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setDreams([]);
      console.log('AsyncStorage effacé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression des données', error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('dreamFormDataArray');
      const dreamFormDataArray = data ? JSON.parse(data) : [];
      setDreams(dreamFormDataArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  // Ce useEffect est executé une seule fois à l'instanciation du composant
  useEffect(() => {
    fetchData();
  }, []);

  // Ce useFocusEffect est un hook pour changer 
  useFocusEffect(
    useCallback(() => {
 
      fetchData();
 
      return () => {
        console.log('This route is now unfocused.');
      }
    }, [])
  );



  return (
    <View>
      <Text style={styles.title}>Liste des Rêves :</Text>
      {dreams.map((dream, index) => (
        <Text key={index} style={styles.dreamText}>
          {dream.dateText} : {dream.dreamText} - {dream.isLucidDream ? 'Lucide' : 'Non Lucide'}
        </Text>
      ))}
      <Button mode="contained" onPress={clearStorage}>Supprimer tous les rêves</Button>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },
});