import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import { useChildDashboardData } from "@/hooks/useChildDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Play, 
  Star, 
  Trophy, 
  Heart, 
  Zap, 
  BookOpen, 
  Target,
  Award,
  Sparkles
} from "lucide-react";

const ChildDashboard = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { signOut } = useAuth();
  const { enrollments, dailyQuests, questCompletions, userBadges, streak, loading } = useChildDashboardData(profile);

  // Redirect if user is not a child
  if (!profileLoading && profile && profile.role !== 'child') {
    return <Navigate to="/parent-dashboard" replace />;
  }

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // Calculate current enrollment data
  const currentEnrollment = enrollments[0]; // Most recent enrollment
  const currentCourse = currentEnrollment?.course;
  
  // Calculate XP and level (simplified calculation)
  const totalHeartGems = userBadges.length * 25 + questCompletions.length * 20;
  const level = Math.floor(totalHeartGems / 100) + 1;
  const xpInCurrentLevel = totalHeartGems % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  // Create learning path from current course
  const learningPath = currentCourse ? [
    { id: 1, title: "Understanding Emotions", completed: true, current: false, locked: false },
    { id: 2, title: "Showing Respect", completed: true, current: false, locked: false },
    { id: 3, title: "Building Empathy", completed: false, current: true, locked: false },
    { id: 4, title: "Honest Communication", completed: false, current: false, locked: false },
    { id: 5, title: "Taking Responsibility", completed: false, current: false, locked: true }
  ] : [];

  // Map quest completions to completed quest IDs
  const completedQuestIds = new Set(questCompletions.map(qc => qc.quest_id));

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 ring-2 ring-primary">
                <AvatarImage src={profile.avatar_url || ''} />
                <AvatarFallback>{profile.first_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Hi, {profile.first_name}!</h1>
                <p className="text-muted-foreground">Ready to learn and grow today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-accent px-4 py-2 rounded-full text-white">
                <Heart className="w-4 h-4" />
                <span className="font-semibold">{totalHeartGems}</span>
              </div>
              <Badge className="achievement-badge">
                <Star className="w-4 h-4 mr-1" />
                Level {level}
              </Badge>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Progress */}
            {currentCourse ? (
              <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary">Current Adventure</CardTitle>
                      <CardDescription className="text-lg">{currentCourse.title}</CardDescription>
                    </div>
                    <div className="progress-ring">
                      <span className="text-white font-bold text-lg">{currentEnrollment.progress_percentage}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={currentEnrollment.progress_percentage} className="h-4 mb-4" />
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
            ) : (
              <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">No Active Course</h3>
                  <p className="text-muted-foreground mb-4">Ask your parent to enroll you in a course to start learning!</p>
                </CardContent>
              </Card>
            )}

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
                <h3 className="text-2xl font-bold mb-2">{streak?.current_streak || 0} Day Streak!</h3>
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
                  {dailyQuests.map((quest) => {
                    const isCompleted = completedQuestIds.has(quest.id);
                    return (
                      <div key={quest.id} className={`p-3 rounded-lg border transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-success/10 border-success/30' 
                          : 'bg-card hover:bg-muted/50 cursor-pointer'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 text-primary">
                            {quest.quest_type === 'reflection' && <Heart className="w-5 h-5 text-red-500" />}
                            {quest.quest_type === 'action' && <Sparkles className="w-5 h-5 text-yellow-500" />}
                            {quest.quest_type === 'lesson' && <BookOpen className="w-5 h-5 text-blue-500" />}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {quest.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{quest.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Heart className="w-3 h-3 text-accent" />
                              <span className="text-xs font-medium">+{quest.heart_gems_reward} Heart Gems</span>
                            </div>
                          </div>
                          {isCompleted && (
                            <Trophy className="w-5 h-5 text-success" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {dailyQuests.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No quests available today!</p>
                  )}
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
                  {userBadges.map((userBadge) => (
                    <div key={userBadge.id} className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 cursor-pointer">
                      <div className="w-6 h-6 mb-2" style={{ color: userBadge.badge.color }}>
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-medium text-center">{userBadge.badge.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(userBadge.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {userBadges.length === 0 && (
                    <div className="col-span-2 text-center py-4">
                      <p className="text-muted-foreground">No badges earned yet!</p>
                      <p className="text-sm text-muted-foreground">Complete quests and lessons to earn your first badge.</p>
                    </div>
                  )}
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
                    <span className="font-medium">Level {level}</span>
                    <span className="text-sm text-muted-foreground">
                      {xpInCurrentLevel} / 100 XP
                    </span>
                  </div>
                  <Progress value={xpInCurrentLevel} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {xpToNextLevel} XP until Level {level + 1}!
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