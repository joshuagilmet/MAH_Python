import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('AddTeam')}
      >
        <Text style={styles.menuItemText}>+ Add a Team via Access Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002855',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#C8102E', // AYSO Red
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  }
});
