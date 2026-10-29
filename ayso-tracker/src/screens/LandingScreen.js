import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AysoRating</Text>
      <Text style={styles.subtitle}>Welcome to the player ranking tracker.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#002855', // AYSO Navy Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  }
});
