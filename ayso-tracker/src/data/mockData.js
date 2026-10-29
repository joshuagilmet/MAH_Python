export const SKILLS = [
  'Passing',
  'Shooting',
  'Dribbling',
  'First Touch',
  'Tackling',
  'Heading',
  'Speed',
  'Stamina',
  'Positioning',
  'Vision',
  'Goalkeeping (Handling)',
  'Goalkeeping (Reflexes)',
  'Goalkeeping (Positioning)',
];

export const POSITIONS = {
  STRIKER: 'Striker',
  WINGER: 'Winger',
  ATTACKING_MID: 'Attacking Midfielder',
  CENTER_MID: 'Center Midfielder',
  DEFENSIVE_MID: 'Defensive Midfielder',
  CENTER_BACK: 'Center Back',
  FULL_BACK: 'Full Back',
  GOALIE: 'Goalie',
};

// Map each position to the skills that should be averaged to get their position score.
export const POSITION_SKILLS = {
  [POSITIONS.STRIKER]: ['Shooting', 'First Touch', 'Speed', 'Positioning', 'Heading'],
  [POSITIONS.WINGER]: ['Dribbling', 'Speed', 'Passing', 'First Touch', 'Stamina'],
  [POSITIONS.ATTACKING_MID]: ['Vision', 'Passing', 'Dribbling', 'Shooting', 'First Touch'],
  [POSITIONS.CENTER_MID]: ['Passing', 'Vision', 'Stamina', 'Positioning', 'First Touch'],
  [POSITIONS.DEFENSIVE_MID]: ['Tackling', 'Positioning', 'Stamina', 'Passing', 'Heading'],
  [POSITIONS.CENTER_BACK]: ['Tackling', 'Heading', 'Positioning', 'Passing'],
  [POSITIONS.FULL_BACK]: ['Speed', 'Stamina', 'Tackling', 'Passing', 'Dribbling'],
  [POSITIONS.GOALIE]: ['Goalkeeping (Handling)', 'Goalkeeping (Reflexes)', 'Goalkeeping (Positioning)', 'Passing', 'Vision'],
};

export const MOCK_TEAMS = [
  {
    id: 'team_1',
    name: 'Red Dragons',
    division: '10U Boys',
    accessCode: '123456',
    players: [
      {
        id: 'p1',
        name: 'Tommy S.',
        position: POSITIONS.STRIKER,
        ratings: {
          'Passing': 3,
          'Shooting': 4,
          'Dribbling': 3,
          'First Touch': 3,
          'Speed': 4,
          'Positioning': 3,
          'Heading': 2,
        },
      },
      {
        id: 'p2',
        name: 'David L.',
        position: POSITIONS.GOALIE,
        ratings: {
          'Goalkeeping (Handling)': 4,
          'Goalkeeping (Reflexes)': 4,
          'Goalkeeping (Positioning)': 3,
          'Passing': 2,
          'Vision': 3,
        }
      },
      {
        id: 'p3',
        name: 'Michael R.',
        position: POSITIONS.CENTER_MID,
        ratings: {
          'Passing': 4,
          'Vision': 4,
          'Stamina': 5,
          'Positioning': 3,
          'First Touch': 3,
        }
      }
    ]
  },
  {
    id: 'team_2',
    name: 'Blue Sharks',
    division: '12U Girls',
    accessCode: '654321',
    players: [
      {
        id: 'p4',
        name: 'Sarah J.',
        position: POSITIONS.CENTER_BACK,
        ratings: {
          'Tackling': 4,
          'Heading': 3,
          'Positioning': 4,
          'Passing': 3,
        }
      },
      {
        id: 'p5',
        name: 'Emily W.',
        position: POSITIONS.STRIKER,
        ratings: {
          'Shooting': 5,
          'First Touch': 4,
          'Speed': 4,
          'Positioning': 4,
          'Heading': 2,
        }
      }
    ]
  }
];

export const DIVISIONS = [
  '6U Boys', '6U Girls',
  '8U Boys', '8U Girls',
  '10U Boys', '10U Girls',
  '12U Boys', '12U Girls',
  '14U Boys', '14U Girls',
  '16U Boys', '16U Girls',
  '19U Boys', '19U Girls',
];

// Calculate the score for a specific position based on ratings
export const calculateScoreForPosition = (ratings, positionName) => {
  const relevantSkills = POSITION_SKILLS[positionName];
  if (!relevantSkills || relevantSkills.length === 0) return 0;

  let totalScore = 0;
  let count = 0;

  relevantSkills.forEach(skill => {
    if (ratings[skill] !== undefined) {
      totalScore += ratings[skill];
      count++;
    }
  });

  return count === 0 ? 0 : parseFloat((totalScore / count).toFixed(1));
};

// Returns an array of { position, score } sorted highest to lowest
export const calculateAllPositionScores = (ratings) => {
  const scores = Object.values(POSITIONS).map(pos => ({
    position: pos,
    score: calculateScoreForPosition(ratings, pos)
  }));

  return scores.sort((a, b) => b.score - a.score);
};

// Backward compatibility helper if needed, though we will refactor to use best position
export const calculatePositionScore = (player) => {
  return calculateScoreForPosition(player.ratings, player.position).toFixed(1);
};
