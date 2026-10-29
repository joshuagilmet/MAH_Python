import React, { createContext, useState, useContext } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [unlockedTeams, setUnlockedTeams] = useState([]);

  const addUnlockedTeam = (team) => {
    // Only add if not already unlocked
    if (!unlockedTeams.find(t => t.id === team.id)) {
      setUnlockedTeams(prev => [...prev, team]);
    }
  };

  const updatePlayer = async (teamId, playerId, newRatings) => {
    // First, update the local state so the UI reflects the change instantly
    setUnlockedTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            players: team.players.map(player =>
              player.id === playerId ? { ...player, ratings: newRatings } : player
            )
          };
        }
        return team;
      })
    );

    // Then, update Firestore
    try {
      const teamRef = doc(db, 'teams', teamId);
      const teamSnap = await getDoc(teamRef);
      if (teamSnap.exists()) {
        const teamData = teamSnap.data();
        const updatedPlayers = teamData.players.map(player =>
          player.id === playerId ? { ...player, ratings: newRatings } : player
        );

        await updateDoc(teamRef, { players: updatedPlayers });
      }
    } catch (error) {
      console.error("Error updating player in Firestore:", error);
      // In a robust app, we might revert the local state here if the network call fails.
    }
  };

  return (
    <AppContext.Provider value={{ unlockedTeams, addUnlockedTeam, updatePlayer }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
