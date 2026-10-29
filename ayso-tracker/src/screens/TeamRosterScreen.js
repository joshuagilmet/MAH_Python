import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { calculateAllPositionScores } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export default function TeamRosterScreen({ route, navigation }) {
  const { team: routeTeam, canEdit } = route.params;
  const { unlockedTeams } = useAppContext();

  // Find the up-to-date team from Context, fallback to route param if not found
  const activeTeam = unlockedTeams.find(t => t.id === routeTeam.id) || routeTeam;

  // Calculate the BEST score for all players and sort them descending (Leaderboard)
  const rankedPlayers = [...activeTeam.players].map(p => {
    const scores = calculateAllPositionScores(p.ratings);
    const best = scores[0]; // array is sorted highest to lowest
    return {
      ...p,
      bestPosition: best.position,
      bestScore: best.score || 0
    };
  }).sort((a, b) => b.bestScore - a.bestScore);

  const renderPlayer = ({ item, index }) => {
    const score = item.bestScore;

    return (
      <TouchableOpacity
        style={styles.playerCard}
        onPress={() => navigation.navigate('PlayerDetail', { player: item, teamId: activeTeam.id, canEdit })}
      >
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.playerPosition}>{score > 0 ? item.bestPosition : 'Unrated'}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Potential</Text>
          <Text style={styles.scoreValue}>{score > 0 ? score.toFixed(1) : 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.teamName}>{activeTeam.name}</Text>
        <Text style={styles.division}>{activeTeam.division}</Text>
        <Text style={styles.leaderboardTitle}>Team Leaderboard</Text>
        {!canEdit && <Text style={styles.readOnlyText}>View Only Mode</Text>}
      </View>

      <FlatList
        data={rankedPlayers}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayer}
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
  header: {
    backgroundColor: '#002855',
    padding: 20,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  division: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C8102E',
    marginTop: 15,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  readOnlyText: {
    marginTop: 10,
    backgroundColor: '#C8102E',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden'
  },
  listContainer: {
    padding: 15,
  },
  playerCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankContainer: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002855',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playerPosition: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#888',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C8102E',
  }
});
