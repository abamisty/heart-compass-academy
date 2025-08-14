import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown,
  Medal,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Flame,
  Heart,
  Gift,
  Timer
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface XPConfig {
  lessonCompletion: number;
  exerciseCorrect: number;
  exerciseIncorrect: number;
  streakBonus: number;
  perfectLesson: number;
  dailyGoal: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedBy: number;
  active: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'streak' | 'completion' | 'score' | 'social';
  target: number;
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  active: boolean;
}

interface Leaderboard {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'all-time';
  metric: 'xp' | 'streak' | 'lessons' | 'accuracy';
  participants: number;
  active: boolean;
}

const GamificationPanel: React.FC = () => {
  const { toast } = useToast();

  const [xpConfig, setXpConfig] = useState<XPConfig>({
    lessonCompletion: 50,
    exerciseCorrect: 10,
    exerciseIncorrect: 2,
    streakBonus: 25,
    perfectLesson: 100,
    dailyGoal: 200
  });

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      color: '#10B981',
      criteria: 'lessons_completed >= 1',
      rarity: 'common',
      unlockedBy: 1247,
      active: true
    },
    {
      id: '2',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      color: '#F59E0B',
      criteria: 'streak_days >= 7',
      rarity: 'rare',
      unlockedBy: 456,
      active: true
    },
    {
      id: '3',
      name: 'Perfect Scholar',
      description: 'Complete 10 lessons with 100% accuracy',
      icon: '👑',
      color: '#8B5CF6',
      criteria: 'perfect_lessons >= 10',
      rarity: 'epic',
      unlockedBy: 89,
      active: true
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Digital Native',
      description: 'Complete the Digital Citizenship course',
      type: 'completion',
      target: 1,
      reward: { xp: 500, badge: 'digital-citizen' },
      active: true
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Maintain a 30-day learning streak',
      type: 'streak',
      target: 30,
      reward: { xp: 1000, title: 'Dedicated Learner' },
      active: true
    }
  ]);

  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([
    {
      id: '1',
      name: 'Weekly XP Champions',
      type: 'weekly',
      metric: 'xp',
      participants: 1247,
      active: true
    },
    {
      id: '2',
      name: 'Streak Masters',
      type: 'all-time',
      metric: 'streak',
      participants: 892,
      active: true
    }
  ]);

  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    icon: '🏆',
    color: '#3B82F6',
    criteria: '',
    rarity: 'common' as const
  });

  const handleUpdateXP = (field: keyof XPConfig, value: number) => {
    setXpConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveXPConfig = () => {
    toast({
      title: "XP Configuration Saved",
      description: "Experience point settings have been updated.",
    });
  };

  const handleCreateBadge = () => {
    if (!newBadge.name || !newBadge.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all badge details.",
        variant: "destructive",
      });
      return;
    }

    const badge: Badge = {
      id: Date.now().toString(),
      ...newBadge,
      unlockedBy: 0,
      active: true
    };

    setBadges(prev => [badge, ...prev]);
    setNewBadge({
      name: '',
      description: '',
      icon: '🏆',
      color: '#3B82F6',
      criteria: '',
      rarity: 'common'
    });

    toast({
      title: "Badge Created",
      description: `"${badge.name}" badge has been created.`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'xp': return <Zap className="h-4 w-4" />;
      case 'streak': return <Flame className="h-4 w-4" />;
      case 'lessons': return <Target className="h-4 w-4" />;
      case 'accuracy': return <Star className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="xp" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="xp">XP System</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
        </TabsList>

        <TabsContent value="xp" className="space-y-6">
          {/* XP Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Experience Points Configuration
              </CardTitle>
              <CardDescription>
                Set XP rewards for different learning activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Core Activities</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Lesson Completion</label>
                    <Input
                      type="number"
                      value={xpConfig.lessonCompletion}
                      onChange={(e) => handleUpdateXP('lessonCompletion', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Correct Exercise</label>
                    <Input
                      type="number"
                      value={xpConfig.exerciseCorrect}
                      onChange={(e) => handleUpdateXP('exerciseCorrect', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Incorrect Exercise (Consolation)</label>
                    <Input
                      type="number"
                      value={xpConfig.exerciseIncorrect}
                      onChange={(e) => handleUpdateXP('exerciseIncorrect', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Bonus Rewards</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Streak Bonus (per day)</label>
                    <Input
                      type="number"
                      value={xpConfig.streakBonus}
                      onChange={(e) => handleUpdateXP('streakBonus', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Perfect Lesson (100% accuracy)</label>
                    <Input
                      type="number"
                      value={xpConfig.perfectLesson}
                      onChange={(e) => handleUpdateXP('perfectLesson', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Goal Achievement</label>
                    <Input
                      type="number"
                      value={xpConfig.dailyGoal}
                      onChange={(e) => handleUpdateXP('dailyGoal', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSaveXPConfig}>
                  <Settings className="h-4 w-4 mr-2" />
                  Save XP Configuration
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* XP Preview */}
          <Card>
            <CardHeader>
              <CardTitle>XP System Preview</CardTitle>
              <CardDescription>
                See how students earn experience points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span>Complete a lesson</span>
                  <span className="font-medium text-green-600">+{xpConfig.lessonCompletion} XP</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span>Answer exercise correctly</span>
                  <span className="font-medium text-green-600">+{xpConfig.exerciseCorrect} XP</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span>Perfect lesson (5 exercises)</span>
                  <span className="font-medium text-green-600">+{xpConfig.lessonCompletion + (xpConfig.exerciseCorrect * 5) + xpConfig.perfectLesson} XP</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span>7-day streak bonus</span>
                  <span className="font-medium text-green-600">+{xpConfig.streakBonus * 7} XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          {/* Badge Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Create New Badge
              </CardTitle>
              <CardDescription>
                Design badges to reward student achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge Name</label>
                  <Input
                    placeholder="e.g., Digital Expert"
                    value={newBadge.name}
                    onChange={(e) => setNewBadge(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rarity</label>
                  <Select 
                    value={newBadge.rarity} 
                    onValueChange={(value: any) => setNewBadge(prev => ({ ...prev, rarity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe how to earn this badge..."
                  value={newBadge.description}
                  onChange={(e) => setNewBadge(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    placeholder="🏆"
                    value={newBadge.icon}
                    onChange={(e) => setNewBadge(prev => ({ ...prev, icon: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <Input
                    type="color"
                    value={newBadge.color}
                    onChange={(e) => setNewBadge(prev => ({ ...prev, color: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Unlock Criteria</label>
                <Input
                  placeholder="e.g., lessons_completed >= 5"
                  value={newBadge.criteria}
                  onChange={(e) => setNewBadge(prev => ({ ...prev, criteria: e.target.value }))}
                />
              </div>

              <Button onClick={handleCreateBadge} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Badge
              </Button>
            </CardContent>
          </Card>

          {/* Badge Library */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Library ({badges.length})</CardTitle>
              <CardDescription>
                Manage all available badges and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {badges.map((badge) => (
                  <div key={badge.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <Badge className={getRarityColor(badge.rarity)}>
                            {badge.rarity}
                          </Badge>
                        </div>
                      </div>
                      <Switch checked={badge.active} />
                    </div>

                    <p className="text-sm text-muted-foreground">{badge.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Unlocked by:</span>
                        <span className="font-medium">{badge.unlockedBy} students</span>
                      </div>
                      <div className="text-xs font-mono bg-muted p-2 rounded">
                        {badge.criteria}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievements List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievement System
              </CardTitle>
              <CardDescription>
                Long-term goals and milestones for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Medal className="h-8 w-8 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline">{achievement.type}</Badge>
                          <span className="text-sm">Target: {achievement.target}</span>
                          <span className="text-sm text-green-600">+{achievement.reward.xp} XP</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={achievement.active} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboards" className="space-y-6">
          {/* Leaderboards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Leaderboard Management
              </CardTitle>
              <CardDescription>
                Create competitive rankings to motivate students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboards.map((leaderboard) => (
                  <div key={leaderboard.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded">
                        {getMetricIcon(leaderboard.metric)}
                      </div>
                      <div>
                        <h4 className="font-medium">{leaderboard.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline">{leaderboard.type}</Badge>
                          <span>Metric: {leaderboard.metric}</span>
                          <span>{leaderboard.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={leaderboard.active} />
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create New Leaderboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationPanel;