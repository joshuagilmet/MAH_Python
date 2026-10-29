import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SKILLS, calculateAllPositionScores } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export default function PlayerDetailScreen({ route, navigation }) {
  const { player, teamId, canEdit } = route.params;
  const { updatePlayer } = useAppContext();
  const [ratings, setRatings] = useState({ ...player.ratings });

  // Calculate all scores dynamically as ratings change
  const positionScores = useMemo(() => calculateAllPositionScores(ratings), [ratings]);
  const bestPosition = positionScores[0];

  const handleRatingChange = (skill, value) => {
    if (!canEdit) return;

    // Only allow numbers 1-5 or empty
    if (value !== '' && !/^[1-5]$/.test(value)) {
        return;
    }

    setRatings(prev => ({
      ...prev,
      [skill]: value === '' ? undefined : parseInt(value, 10)
    }));
  };

  const handleSave = () => {
    updatePlayer(teamId, player.id, ratings);
    Alert.alert('Saved', 'Player ratings have been updated.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerPosition}>Recommended: {bestPosition?.score > 0 ? bestPosition.position : 'None'}</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{bestPosition?.score > 0 ? bestPosition.score.toFixed(1) : 'N/A'}</Text>
          <Text style={styles.scoreSubText}>Best Score</Text>
        </View>
      </View>

      <View style={styles.positionScoresContainer}>
        <Text style={styles.sectionTitle}>Positional Potential</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {positionScores.map((pos) => (
            <View key={pos.position} style={[styles.posCard, pos.position === bestPosition.position && bestPosition.score > 0 ? styles.bestPosCard : null]}>
              <Text style={[styles.posName, pos.position === bestPosition.position && bestPosition.score > 0 ? styles.bestPosText : null]}>{pos.position}</Text>
              <Text style={[styles.posScore, pos.position === bestPosition.position && bestPosition.score > 0 ? styles.bestPosText : null]}>{pos.score > 0 ? pos.score.toFixed(1) : '-'}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Player Ratings (1-5)</Text>
        {!canEdit && <Text style={styles.readOnlyNote}>You are in view-only mode.</Text>}

        {SKILLS.map(skill => {
          return (
            <View key={skill} style={styles.skillRow}>
              <View style={styles.skillLabelContainer}>
                <Text style={styles.skillName}>
                  {skill}
                </Text>
              </View>
              <TextInput
                style={[styles.input, !canEdit && styles.disabledInput]}
                value={ratings[skill] ? ratings[skill].toString() : ''}
                onChangeText={(val) => handleRatingChange(skill, val)}
                keyboardType="number-pad"
                maxLength={1}
                editable={canEdit}
                placeholder="-"
              />
            </View>
          );
        })}
      </View>

      {canEdit && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Ratings</Text>
        </TouchableOpacity>
      )}
      <View style={styles.bottomSpacer} />
    </ScrollView>
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
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  playerPosition: {
    fontSize: 18,
    color: '#e0e0e0',
    marginTop: 5,
    marginBottom: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#C8102E',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#002855',
  },
  scoreSubText: {
    fontSize: 12,
    color: '#666',
  },
  positionScoresContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  posCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bestPosCard: {
    backgroundColor: '#002855',
    borderColor: '#C8102E',
    borderWidth: 2,
  },
  posName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  posScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bestPosText: {
    color: '#ffffff',
  },
  skillsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  readOnlyNote: {
    color: '#C8102E',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skillLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 16,
    color: '#444',
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#C8102E',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 40,
  }
});
