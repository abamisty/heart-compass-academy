import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Calendar, Award, Lock, CheckCircle } from "lucide-react";

interface AchievementTrackingProps {
  selectedChild: any;
}

export const AchievementTracking = ({ selectedChild }: AchievementTrackingProps) => {
  const badges = [
    {
      id: 1,
      name: "Honesty Hero",
      description: "Demonstrated honesty in 10 challenging scenarios",
      icon: "🌟",
      earned: true,
      earnedDate: "2024-01-15",
      category: "Character Values",
      rarity: "Common"
    },
    {
      id: 2,
      name: "Empathy Explorer",
      description: "Completed 5 empathy-building activities",
      icon: "❤️",
      earned: true,
      earnedDate: "2024-01-20",
      category: "Social Skills",
      rarity: "Common"
    },
    {
      id: 3,
      name: "Streak Master",
      description: "Maintained 7-day learning streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-22",
      category: "Consistency",
      rarity: "Uncommon"
    },
    {
      id: 4,
      name: "Problem Solver",
      description: "Solved 15 complex scenarios",
      icon: "🧩",
      earned: false,
      progress: 12,
      total: 15,
      category: "Critical Thinking",
      rarity: "Rare"
    },
    {
      id: 5,
      name: "Leadership Legend",
      description: "Led 3 group activities successfully",
      icon: "👑",
      earned: false,
      progress: 1,
      total: 3,
      category: "Leadership",
      rarity: "Epic"
    },
    {
      id: 6,
      name: "Kindness Champion",
      description: "Performed 20 acts of kindness",
      icon: "🤝",
      earned: false,
      progress: 8,
      total: 20,
      category: "Character Values",
      rarity: "Uncommon"
    }
  ];

  const milestones = [
    {
      id: 1,
      title: "First Course Completion",
      description: "Complete your first character development course",
      achieved: true,
      achievedDate: "2024-01-10",
      reward: "Special Certificate + 50 Heart Gems"
    },
    {
      id: 2,
      title: "Skill Master",
      description: "Reach 90% proficiency in any skill area",
      achieved: true,
      achievedDate: "2024-01-18",
      reward: "Skill Mastery Badge + 100 Heart Gems"
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Help 5 other learners in the community",
      achieved: false,
      progress: 2,
      total: 5,
      reward: "Helper Badge + 150 Heart Gems"
    },
    {
      id: 4,
      title: "Character Champion",
      description: "Earn 15 character-building badges",
      achieved: false,
      progress: 8,
      total: 15,
      reward: "Champion Title + 300 Heart Gems"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800";
      case "Uncommon": return "bg-green-100 text-green-800";
      case "Rare": return "bg-blue-100 text-blue-800";
      case "Epic": return "bg-purple-100 text-purple-800";
      case "Legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      {/* Achievement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
                <p className="text-3xl font-bold text-primary">{earnedBadges.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Milestones</p>
                <p className="text-3xl font-bold text-secondary">
                  {milestones.filter(m => m.achieved).length}/{milestones.length}
                </p>
              </div>
              <Target className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Heart Gems</p>
                <p className="text-3xl font-bold text-accent">1,250</p>
              </div>
              <Star className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Earned Badges
          </CardTitle>
          <CardDescription>
            Celebrating {selectedChild.name}'s achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 cursor-pointer text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                <Badge className={getRarityColor(badge.rarity)}>
                  {badge.rarity}
                </Badge>
                <p className="text-xs text-primary mt-2">
                  Earned {new Date(badge.earnedDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges in Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            Badges in Progress
          </CardTitle>
          <CardDescription>
            Track progress towards earning new badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressBadges.map((badge) => (
              <div key={badge.id} className="p-4 rounded-lg border">
                <div className="flex items-start gap-4">
                  <div className="text-2xl opacity-60">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <Badge className={getRarityColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                    </div>
                    
                    {badge.progress !== undefined && badge.total && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{badge.progress}/{badge.total}</span>
                        </div>
                        <Progress value={(badge.progress / badge.total) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Learning Milestones
          </CardTitle>
          <CardDescription>
            Major achievements in the learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                milestone.achieved 
                  ? "bg-success/10 border-success/20" 
                  : "bg-muted/30"
              }`}>
                <div className="flex items-start gap-4">
                  {milestone.achieved ? (
                    <CheckCircle className="w-6 h-6 text-success mt-1" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground mt-1" />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      {milestone.achieved && (
                        <Badge variant="outline" className="text-success border-success">
                          Achieved
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-primary font-medium mb-2">
                      Reward: {milestone.reward}
                    </p>
                    
                    {milestone.achieved && milestone.achievedDate && (
                      <p className="text-xs text-success">
                        Achieved on {new Date(milestone.achievedDate).toLocaleDateString()}
                      </p>
                    )}
                    
                    {!milestone.achieved && milestone.progress !== undefined && milestone.total && (
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.progress}/{milestone.total}</span>
                        </div>
                        <Progress value={(milestone.progress / milestone.total) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};