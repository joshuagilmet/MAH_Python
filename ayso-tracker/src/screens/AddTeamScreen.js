import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MOCK_TEAMS } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export default function AddTeamScreen({ navigation }) {
  const [code, setCode] = useState('');
  const { addUnlockedTeam, unlockedTeams } = useAppContext();

  const handleUnlock = () => {
    if (!code) {
      Alert.alert('Error', 'Please enter a 6-digit code.');
      return;
    }

    const team = MOCK_TEAMS.find(t => t.accessCode === code);

    if (team) {
      // Check if already unlocked
      if (unlockedTeams.find(t => t.id === team.id)) {
        Alert.alert('Info', 'You have already unlocked this team.');
        navigation.goBack();
        return;
      }

      addUnlockedTeam(team);
      Alert.alert('Success', `You have unlocked ${team.name}!`);
      navigation.goBack();
    } else {
      Alert.alert('Invalid Code', 'The 6-digit code you entered is incorrect.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>AYSO Tracker</Text>
        <Text style={styles.subtitle}>Enter your 6-digit team code to access your team&apos;s players and ratings.</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleUnlock}>
          <Text style={styles.buttonText}>Unlock Team</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#002855', // AYSO Navy Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#C8102E', // AYSO Red
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
