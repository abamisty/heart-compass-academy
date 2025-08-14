import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, BookOpen, Trophy, Heart, Users } from 'lucide-react';
import CharacterAvatar from '@/components/shared/CharacterAvatar';

const StudentDashboard: React.FC = () => {
  const [selectedIsland, setSelectedIsland] = useState<string>('penguin-island');

  // Mock student data
  const studentData = {
    name: 'Emma',
    totalXP: 1250,
    familyXP: 380,
    currentStreak: 5,
    badges: [
      { id: '1', name: 'Helper', icon: '🤝', earnedDate: new Date(), designedBy: 'kofi' },
      { id: '2', name: 'Listener', icon: '👂', earnedDate: new Date(), designedBy: 'kofi' }
    ]
  };

  const learningMap = {
    'penguin-island': {
      name: 'Penguin Family Island',
      description: 'Core values and family wisdom',
      character: 'pax',
      progress: 75,
      modules: [
        { id: '1', name: 'Sharing & Kindness', character: 'pearl', completed: true, locked: false },
        { id: '2', name: 'Responsibility', character: 'pax', completed: true, locked: false },
        { id: '3', name: 'Honesty', character: 'pippin', completed: false, locked: false },
        { id: '4', name: 'Respect', character: 'pearl', completed: false, locked: true }
      ]
    },
    'human-village': {
      name: 'Human Character Village',
      description: 'Life skills and practical wisdom',
      character: 'leo',
      progress: 45,
      modules: [
        { id: '1', name: 'Money Management', character: 'leo', completed: true, locked: false },
        { id: '2', name: 'Conflict Resolution', character: 'maya', completed: false, locked: false },
        { id: '3', name: 'Teamwork', character: 'zoe', completed: false, locked: true },
        { id: '4', name: 'Community Service', character: 'samira', completed: false, locked: true }
      ]
    }
  };

  const recentReflections = [
    {
      id: '1',
      prompt: 'How did you show kindness today?',
      character: 'pearl',
      date: new Date(),
      snippet: 'I helped my little brother with his homework...'
    },
    {
      id: '2',
      prompt: 'What responsibility did you take on this week?',
      character: 'pax',
      date: new Date(Date.now() - 86400000),
      snippet: 'I started making my bed every morning...'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {studentData.name}! 🐧
          </h1>
          <p className="text-muted-foreground">
            Continue your character-building adventure
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{studentData.totalXP}</div>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{studentData.familyXP}</div>
              <p className="text-xs text-muted-foreground">Family XP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{studentData.currentStreak}</div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{studentData.badges.length}</div>
              <p className="text-xs text-muted-foreground">Badges</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="learning-map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learning-map">Learning Map</TabsTrigger>
            <TabsTrigger value="reflection">Reflection Journal</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="learning-map" className="space-y-6">
            {/* Island Selector */}
            <div className="flex justify-center gap-4">
              {Object.entries(learningMap).map(([key, island]) => (
                <Button
                  key={key}
                  variant={selectedIsland === key ? "default" : "outline"}
                  onClick={() => setSelectedIsland(key)}
                  className="flex items-center gap-2 h-auto p-4"
                >
                  <CharacterAvatar characterId={island.character} size="sm" />
                  <div className="text-left">
                    <div className="font-medium">{island.name}</div>
                    <div className="text-xs text-muted-foreground">{island.progress}% Complete</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {learningMap[selectedIsland as keyof typeof learningMap].name}
                </CardTitle>
                <CardDescription>
                  {learningMap[selectedIsland as keyof typeof learningMap].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{learningMap[selectedIsland as keyof typeof learningMap].progress}%</span>
                  </div>
                  <Progress value={learningMap[selectedIsland as keyof typeof learningMap].progress} />
                </div>

                <div className="space-y-4">
                  {learningMap[selectedIsland as keyof typeof learningMap].modules.map((module, index) => (
                    <div 
                      key={module.id} 
                      className={`p-4 rounded-lg border-2 transition-all ${
                        module.locked 
                          ? 'border-gray-200 bg-gray-50 opacity-60' 
                          : module.completed
                            ? 'border-green-200 bg-green-50'
                            : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CharacterAvatar characterId={module.character} size="sm" />
                          <div>
                            <h3 className="font-medium">{module.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {module.locked ? 'Locked' : module.completed ? 'Completed' : 'Available'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant={module.completed ? "outline" : "default"}
                          disabled={module.locked}
                          size="sm"
                        >
                          {module.completed ? 'Review' : module.locked ? 'Locked' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reflection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Reflection Journal
                </CardTitle>
                <CardDescription>
                  Share your thoughts with Pearl and Pippin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReflections.map((reflection) => (
                    <div key={reflection.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <CharacterAvatar characterId={reflection.character} size="sm" />
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{reflection.prompt}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {reflection.snippet}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {reflection.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  Write New Reflection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your Achievements
                </CardTitle>
                <CardDescription>
                  Badges designed by Kofi for your resilience milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {studentData.badges.map((badge) => (
                    <div key={badge.id} className="text-center p-4 border rounded-lg">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        by {badge.designedBy}
                      </p>
                    </div>
                  ))}
                  
                  {/* Locked badges preview */}
                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg opacity-60">
                    <div className="text-4xl mb-2">🔒</div>
                    <h3 className="font-medium text-gray-500">Courage</h3>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;