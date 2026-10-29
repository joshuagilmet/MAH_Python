import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider } from './src/context/AppContext';
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTeamScreen from './src/screens/AddTeamScreen';
import TeamRosterScreen from './src/screens/TeamRosterScreen';
import PlayerDetailScreen from './src/screens/PlayerDetailScreen';
import MoreScreen from './src/screens/MoreScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TeamsStack = createNativeStackNavigator();

// This stack manages the flow specifically within the "Teams" tab
function TeamsStackNavigator() {
  return (
    <TeamsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#002855' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <TeamsStack.Screen
        name="TeamsList"
        component={HomeScreen}
        options={{ title: 'My Teams' }}
      />
      <TeamsStack.Screen
        name="TeamRoster"
        component={TeamRosterScreen}
        options={{ title: 'Team Roster' }}
      />
      <TeamsStack.Screen
        name="PlayerDetail"
        component={PlayerDetailScreen}
        options={{ title: 'Player Profile' }}
      />
    </TeamsStack.Navigator>
  );
}

// The main Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#002855' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#C8102E', // AYSO Red
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Teams') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={LandingScreen} options={{ title: 'AysoRating' }} />
      <Tab.Screen name="Teams" component={TeamsStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ title: 'More' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#002855" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Main Tabs (which contains the nested Teams stack) */}
          <Stack.Screen name="MainTabs" component={MainTabs} />

          {/* Global Modals that can pop up over any tab */}
          <Stack.Screen
            name="AddTeam"
            component={AddTeamScreen}
            options={{
              headerShown: true,
              presentation: 'modal',
              title: 'Add a Team',
              headerStyle: { backgroundColor: '#002855' },
              headerTintColor: '#ffffff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
