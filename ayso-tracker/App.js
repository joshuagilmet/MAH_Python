import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import AddTeamScreen from './src/screens/AddTeamScreen';
import TeamRosterScreen from './src/screens/TeamRosterScreen';
import PlayerDetailScreen from './src/screens/PlayerDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#002855" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#002855', // AYSO Navy Blue
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'My Teams' }}
          />
          <Stack.Screen
            name="AddTeam"
            component={AddTeamScreen}
            options={{ title: 'Add a Team', presentation: 'modal' }}
          />
          <Stack.Screen
            name="TeamRoster"
            component={TeamRosterScreen}
            options={{ title: 'Team Roster' }}
          />
          <Stack.Screen
            name="PlayerDetail"
            component={PlayerDetailScreen}
            options={{ title: 'Player Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
