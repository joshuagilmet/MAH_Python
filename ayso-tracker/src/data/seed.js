import { db } from '../config/firebase.js';
import { MOCK_TEAMS } from './mockData.js';
import { doc, setDoc } from 'firebase/firestore';

async function seedData() {
  console.log('Starting to seed data...');
  try {
    for (const team of MOCK_TEAMS) {
      console.log(`Seeding team: ${team.name}`);
      // Using the team.id as the document ID in the 'teams' collection
      await setDoc(doc(db, 'teams', team.id), team);
    }
    console.log('Successfully seeded database!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();
