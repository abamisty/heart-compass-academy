import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Star, 
  Clock, 
  TrendingUp, 
  Plus,
  Eye,
  Settings,
  Heart,
  Target,
  Zap,
  MessageSquare,
  BarChart3,
  Calendar,
  CheckCircle
} from "lucide-react";
import { DuolingoStyleLearningPath } from "@/components/DuolingoStyleLearningPath";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [children, setChildren] = useState([
    {
      id: "child-1",
      name: "Alex",
      age: 12,
      avatar: "/placeholder-avatar.png",
      level: 15,
      streak: 7,
      coursesCompleted: 3,
      currentCourse: "Decision Making Mastery",
      progress: 35,
      weeklyTime: 4.5,
      characterTraits: {
        criticalThinking: 85,
        responsibility: 72,
        empathy: 68,
        integrity: 78
      }
    }
  ]);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const currentChild = children[selectedChild];

  const discussionReadyLessons = [
    {
      title: "Types of Decisions",
      completedAt: "today at 3:45 PM",
      keyPoints: [
        "Difference between big and small decisions",
        "How values influence our choices", 
        "The importance of thinking before acting"
      ],
      discussionStarters: [
        "What was the hardest decision you made this week?",
        "How do our family values help us make choices?",
        "Can you think of a time when you made a quick decision vs. a thoughtful one?"
      ]
    },
    {
      title: "What Are Decisions?",
      completedAt: "yesterday",
      isDiscussed: true,
      note: "Great discussion about daily choices and their impact!"
    }
  ];

  const weeklyStats = {
    lessonsCompleted: 2,
    familyDiscussions: 1,
    characterPoints: 45
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">Parent Dashboard 👨‍👩‍👧‍👦</h1>
                <p className="text-muted-foreground">Monitor {currentChild.name}'s character development and join meaningful discussions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Child Selector */}
        <div className="flex gap-4 mb-8">
          {children.map((child, index) => (
            <Card 
              key={child.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedChild === index 
                  ? 'ring-2 ring-primary shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedChild(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback>{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">Age {child.age} • Level {child.level}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  📊 {currentChild.name}'s Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Course Progress */}
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                      🧠 Decision Making Course
                    </h4>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-2xl font-bold text-primary">{currentChild.progress}%</span>
                      </div>
                      <Progress value={currentChild.progress} className="h-2 mb-4" />
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>✅ Completed: 2 lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>🔄 In Progress: 1 lesson</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>⏳ Remaining: 9 lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Character Traits */}
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-500" />
                      ⭐ Character Traits
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{currentChild.characterTraits.criticalThinking}%</div>
                        <div className="text-sm text-muted-foreground">Critical Thinking</div>
                        <Progress value={currentChild.characterTraits.criticalThinking} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">{currentChild.characterTraits.responsibility}%</div>
                        <div className="text-sm text-muted-foreground">Responsibility</div>
                        <Progress value={currentChild.characterTraits.responsibility} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success mb-1">{currentChild.characterTraits.empathy}%</div>
                        <div className="text-sm text-muted-foreground">Empathy</div>
                        <Progress value={currentChild.characterTraits.empathy} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary mb-1">{currentChild.characterTraits.integrity}%</div>
                        <div className="text-sm text-muted-foreground">Integrity</div>
                        <Progress value={currentChild.characterTraits.integrity} className="h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Discussion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  💬 Ready for Family Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {discussionReadyLessons.map((lesson, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Lesson: {lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">Completed {lesson.completedAt}</p>
                        </div>
                        {lesson.isDiscussed ? (
                          <Badge variant="secondary" className="text-xs">
                            Discussed ✓
                          </Badge>
                        ) : (
                          <Button size="sm">Start Discussion</Button>
                        )}
                      </div>
                      
                      {lesson.isDiscussed ? (
                        <p className="text-sm text-muted-foreground italic">{lesson.note}</p>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Key Learning Points:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {lesson.keyPoints?.map((point, idx) => (
                                <li key={idx}>• {point}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">Discussion Starters:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {lesson.discussionStarters?.map((starter, idx) => (
                                <li key={idx}>• "{starter}"</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* This Week Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm">📚 Lessons Completed</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{weeklyStats.lessonsCompleted}</div>
                      <div className="text-xs text-muted-foreground">this week</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      <span className="text-sm">💬 Family Discussions</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{weeklyStats.familyDiscussions}</div>
                      <div className="text-xs text-muted-foreground">Quality conversations</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-success" />
                      <span className="text-sm">⭐ Character Points</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success">{weeklyStats.characterPoints}</div>
                      <div className="text-xs text-muted-foreground">Earned this week</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parenting Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Parenting Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Discussion Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Ask open-ended questions and listen actively. Let Alex share their thoughts before offering guidance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Reinforcement</h4>
                    <p className="text-sm text-muted-foreground">
                      Look for opportunities in daily life to apply the decision-making concepts Alex is learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Goals */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Family Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Weekly family discussion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm">Practice decision-making together</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="text-sm">Share family values stories</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;