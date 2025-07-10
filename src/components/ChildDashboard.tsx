import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  Star, 
  Trophy, 
  Heart, 
  Zap, 
  BookOpen, 
  Target,
  Gift,
  Users,
  Award,
  Sparkles
} from "lucide-react";

const ChildDashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(7);

  const childProfile = {
    name: "Emma",
    avatar: "/placeholder-avatar.png",
    level: 15,
    xp: 1250,
    xpToNext: 350,
    heartGems: 89,
    currentCourse: "Character Values Foundations",
    courseProgress: 68
  };

  const dailyQuests = [
    {
      id: 1,
      title: "Practice Gratitude",
      description: "Write down 3 things you're grateful for today",
      reward: 15,
      type: "reflection",
      completed: false,
      icon: <Heart className="w-5 h-5 text-red-500" />
    },
    {
      id: 2,
      title: "Kindness Challenge",
      description: "Do one kind act for a family member",
      reward: 20,
      type: "action",
      completed: true,
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Complete today's lesson",
      reward: 25,
      type: "lesson",
      completed: false,
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    }
  ];

  const recentBadges = [
    { name: "Empathy Explorer", icon: <Heart className="w-6 h-6 text-red-500" />, earned: "2 days ago" },
    { name: "Honest Helper", icon: <Award className="w-6 h-6 text-blue-500" />, earned: "1 week ago" },
    { name: "Respect Ranger", icon: <Star className="w-6 h-6 text-yellow-500" />, earned: "2 weeks ago" },
    { name: "Kindness King", icon: <Sparkles className="w-6 h-6 text-purple-500" />, earned: "3 weeks ago" }
  ];

  const learningPath = [
    {
      id: 1,
      title: "Understanding Emotions",
      completed: true,
      current: false,
      locked: false
    },
    {
      id: 2,
      title: "Showing Respect",
      completed: true,
      current: false,
      locked: false
    },
    {
      id: 3,
      title: "Building Empathy",
      completed: false,
      current: true,
      locked: false
    },
    {
      id: 4,
      title: "Honest Communication",
      completed: false,
      current: false,
      locked: false
    },
    {
      id: 5,
      title: "Taking Responsibility",
      completed: false,
      current: false,
      locked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-primary">
                <AvatarImage src={childProfile.avatar} />
                <AvatarFallback>{childProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Hi, {childProfile.name}!</h1>
                <p className="text-muted-foreground">Ready to learn and grow today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-accent px-4 py-2 rounded-full text-white">
                <Heart className="w-4 h-4" />
                <span className="font-semibold">{childProfile.heartGems}</span>
              </div>
              <Badge className="achievement-badge">
                <Star className="w-4 h-4 mr-1" />
                Level {childProfile.level}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Progress */}
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-primary">Current Adventure</CardTitle>
                    <CardDescription className="text-lg">{childProfile.currentCourse}</CardDescription>
                  </div>
                  <div className="progress-ring">
                    <span className="text-white font-bold text-lg">{childProfile.courseProgress}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={childProfile.courseProgress} className="h-4 mb-4" />
                <div className="flex gap-4">
                  <Button variant="hero" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" size="lg">
                    <Target className="w-5 h-5 mr-2" />
                    See Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Your Learning Journey
                </CardTitle>
                <CardDescription>
                  Follow the path to build amazing character skills!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="learning-path">
                  <div className="space-y-4">
                    {learningPath.map((lesson, index) => (
                      <div 
                        key={lesson.id} 
                        className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                          lesson.completed 
                            ? 'bg-gradient-to-r from-success/20 to-success/10 border border-success/30' 
                            : lesson.current 
                              ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 pulse-glow' 
                              : lesson.locked 
                                ? 'bg-muted/50 opacity-50'
                                : 'bg-card hover:bg-muted/50 cursor-pointer'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          lesson.completed 
                            ? 'bg-success text-success-foreground' 
                            : lesson.current 
                              ? 'bg-primary text-primary-foreground animate-pulse' 
                              : lesson.locked 
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {lesson.completed ? (
                            <Trophy className="w-5 h-5" />
                          ) : lesson.current ? (
                            <Play className="w-5 h-5" />
                          ) : lesson.locked ? (
                            <div className="w-3 h-3 bg-current rounded-full" />
                          ) : (
                            <div className="w-3 h-3 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${lesson.locked ? 'text-muted-foreground' : ''}`}>
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {lesson.completed ? 'Completed!' : lesson.current ? 'Ready to start' : lesson.locked ? 'Complete previous lessons to unlock' : 'Coming next'}
                          </p>
                        </div>
                        {lesson.current && (
                          <Button variant="hero" size="sm" className="animate-bounce-in">
                            Start
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <Card className="bg-gradient-accent text-white border-0">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">{currentStreak} Day Streak!</h3>
                <p className="opacity-90">You're on fire! Keep learning every day.</p>
              </CardContent>
            </Card>

            {/* Daily Quests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Today's Quests
                </CardTitle>
                <CardDescription>Complete these to earn Heart Gems!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyQuests.map((quest) => (
                    <div key={quest.id} className={`p-3 rounded-lg border transition-all duration-300 ${
                      quest.completed 
                        ? 'bg-success/10 border-success/30' 
                        : 'bg-card hover:bg-muted/50 cursor-pointer'
                    }`}>
                      <div className="flex items-start gap-3">
                        {quest.icon}
                        <div className="flex-1">
                          <h4 className={`font-medium ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {quest.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{quest.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Heart className="w-3 h-3 text-accent" />
                            <span className="text-xs font-medium">+{quest.reward} Heart Gems</span>
                          </div>
                        </div>
                        {quest.completed && (
                          <Trophy className="w-5 h-5 text-success" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Recent Badges
                </CardTitle>
                <CardDescription>Your awesome achievements!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {recentBadges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 cursor-pointer">
                      {badge.icon}
                      <span className="text-xs font-medium text-center mt-2">{badge.name}</span>
                      <span className="text-xs text-muted-foreground">{badge.earned}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Level {childProfile.level}</span>
                    <span className="text-sm text-muted-foreground">
                      {childProfile.xp} / {childProfile.xp + childProfile.xpToNext} XP
                    </span>
                  </div>
                  <Progress value={(childProfile.xp / (childProfile.xp + childProfile.xpToNext)) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {childProfile.xpToNext} XP until Level {childProfile.level + 1}!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;