import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [unlockedTeams, setUnlockedTeams] = useState([]);

  const addUnlockedTeam = (team) => {
    // Only add if not already unlocked
    if (!unlockedTeams.find(t => t.id === team.id)) {
      setUnlockedTeams(prev => [...prev, team]);
    }
  };

  return (
    <AppContext.Provider value={{ unlockedTeams, addUnlockedTeam }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
