// Learning system types for Enteteye Academy

export type AgeGroup = '10-12' | '13-15' | '16-18';

export type LearningBranch = 
  | 'family-values'
  | 'character-building'
  | 'practical-skills'
  | 'emotional-intelligence'
  | 'community';

export interface LearningPath {
  id: string;
  title: string;
  branch: LearningBranch;
  ageGroup: AgeGroup;
  modules: LearningModule[];
  requiredParentApproval: boolean;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  characterGuide: string; // Character ID
  lessons: Lesson[];
  unlocked: boolean;
  completed: boolean;
  requiresApproval: boolean;
  discussionCheckpoint?: DiscussionCheckpoint;
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
  exercises: Exercise[];
  estimatedDuration: number; // minutes
  completed: boolean;
}

export interface LessonContent {
  type: 'video' | 'interactive' | 'comic' | 'audio' | 'simulation';
  data: any;
  characterNarrator?: string;
}

export interface Exercise {
  id: string;
  type: 'decision-tree' | 'simulation' | 'collaboration' | 'action-planner' | 'reflection';
  title: string;
  content: any;
  xpReward: number;
}

export interface DiscussionCheckpoint {
  id: string;
  prompts: string[];
  suggestedDuration: number; // minutes
  parentGuidance: string;
  completed: boolean;
  parentVerified: boolean;
}

export interface StudentProgress {
  studentId: string;
  totalXP: number;
  familyXP: number;
  badges: Badge[];
  currentModule?: string;
  completedModules: string[];
  reflectionEntries: ReflectionEntry[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  designedBy: 'kofi' | 'system';
}

export interface ReflectionEntry {
  id: string;
  date: Date;
  prompt: string;
  response: string;
  characterGuide: string;
}