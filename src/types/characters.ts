// Character types for Enteteye Academy

export interface PenguinCharacter {
  id: string;
  name: string;
  personality: string;
  specialization: string;
  description: string;
}

export interface HumanCharacter {
  id: string;
  name: string;
  personality: string;
  specialization: string;
  description: string;
}

export const PENGUIN_FAMILY: PenguinCharacter[] = [
  {
    id: 'pax',
    name: 'Pax',
    personality: 'Responsible and patient',
    specialization: 'Responsibility and leadership',
    description: 'The wise father penguin who teaches responsibility and life skills'
  },
  {
    id: 'pearl',
    name: 'Pearl',
    personality: 'Nurturing and emotionally intelligent',
    specialization: 'Emotional learning and empathy',
    description: 'The caring mother penguin who guides emotional development'
  },
  {
    id: 'pippin',
    name: 'Pippin',
    personality: 'Curious and adventurous',
    specialization: 'Discovery and exploration',
    description: 'The young penguin who leads discovery-based learning'
  }
];

export const HUMAN_CHARACTERS: HumanCharacter[] = [
  {
    id: 'grandma-anya',
    name: 'Grandma Anya',
    personality: 'Wise storyteller',
    specialization: 'Heritage and traditions',
    description: 'The wise grandmother who shares stories and cultural wisdom'
  },
  {
    id: 'leo',
    name: 'Leo',
    personality: 'Practical and resourceful',
    specialization: 'Life skills and practical application',
    description: 'The practical teen who demonstrates real-world skills'
  },
  {
    id: 'maya',
    name: 'Maya',
    personality: 'Natural mediator',
    specialization: 'Conflict resolution',
    description: 'The diplomatic teen who teaches conflict resolution'
  },
  {
    id: 'zoe',
    name: 'Zoe',
    personality: 'Creative collaborator',
    specialization: 'Teamwork and creativity',
    description: 'The artistic teen who promotes creative collaboration'
  },
  {
    id: 'zane',
    name: 'Zane',
    personality: 'Team player',
    specialization: 'Sports and teamwork',
    description: 'The athletic teen who teaches teamwork through sports'
  },
  {
    id: 'samira',
    name: 'Samira',
    personality: 'Community advocate',
    specialization: 'Community action and service',
    description: 'The community-minded teen who leads service projects'
  },
  {
    id: 'kofi',
    name: 'Kofi',
    personality: 'Resilient adventurer',
    specialization: 'Resilience and overcoming challenges',
    description: 'The resilient teen who teaches overcoming failure and building strength'
  }
];