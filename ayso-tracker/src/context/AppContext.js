import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [unlockedTeams, setUnlockedTeams] = useState([]);

  const addUnlockedTeam = (team) => {
    // Only add if not already unlocked
    if (!unlockedTeams.find(t => t.id === team.id)) {
      // Create a deep copy of the team to ensure we can mutate ratings safely
      const teamCopy = JSON.parse(JSON.stringify(team));
      setUnlockedTeams(prev => [...prev, teamCopy]);
    }
  };

  const updatePlayer = (teamId, playerId, newRatings) => {
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
  };

  return (
    <AppContext.Provider value={{ unlockedTeams, addUnlockedTeam, updatePlayer }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
