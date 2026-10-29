import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { unlockedTeams } = useAppContext();

  const renderTeam = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.teamCard}
        onPress={() => navigation.navigate('TeamRoster', { team: item, canEdit: true })}
      >
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.teamDivision}>{item.division}</Text>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Welcome to AYSO Tracker!</Text>
      <Text style={styles.emptySubtitle}>You don&apos;t have access to any teams yet.</Text>
      <Text style={styles.emptySubtitle}>Tap the button below to enter a 6-digit access code and unlock your team&apos;s roster and ratings.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={unlockedTeams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeam}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTeam')}
      >
        <Text style={styles.addButtonText}>+ Unlock a Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002855',
    marginBottom: 15,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  teamCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#C8102E',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  teamDivision: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#C8102E',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
