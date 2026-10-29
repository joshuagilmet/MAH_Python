import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { DIVISIONS, MOCK_TEAMS } from '../data/mockData';

export default function HomeScreen({ navigation, route }) {
  // Get params passed from login
  const canEdit = route.params?.canEdit ?? false;

  const renderItem = ({ item }) => {
    // For this simple example, we just filter MOCK_TEAMS by division.
    // In a real app, this would be a DB query.
    const teamsInDivision = MOCK_TEAMS.filter(t => t.division === item);

    return (
      <View style={styles.divisionContainer}>
        <Text style={styles.divisionTitle}>{item}</Text>
        {teamsInDivision.length === 0 ? (
          <Text style={styles.noTeamsText}>No teams currently in this division.</Text>
        ) : (
          teamsInDivision.map(team => (
            <TouchableOpacity
              key={team.id}
              style={styles.teamCard}
              onPress={() => navigation.navigate('TeamRoster', { team, canEdit })}
            >
              <Text style={styles.teamName}>{team.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DIVISIONS}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  divisionContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divisionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002855',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  teamCard: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 6,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  noTeamsText: {
    color: '#888',
    fontStyle: 'italic',
  }
});
