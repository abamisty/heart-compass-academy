import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Users, 
  Star, 
  Brain, 
  Heart, 
  Zap, 
  MessageSquare,
  Lock,
  CheckCircle
} from "lucide-react";

const ChildDashboard = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/child-login" replace />;
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const childName = profile?.first_name || user?.user_metadata?.full_name || 'Alex';

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {childName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Welcome back, {childName}! 🌟
                </h1>
                <p className="text-muted-foreground">Ready to build character and learn valuable life skills?</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course */}
            <Card className="border-0 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      📚 Current Course
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold">
                      Decision Making Mastery
                    </CardDescription>
                  </div>
                  <Badge className="text-sm">
                    <Target className="w-4 h-4 mr-1" />
                    🎯 Unit 1: 60% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={60} className="h-3" />
                  <Button className="w-full">
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  ⭐ Character Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">85%</div>
                    <div className="text-sm text-muted-foreground">Decision Making</div>
                    <Progress value={85} className="h-2 mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">72%</div>
                    <div className="text-sm text-muted-foreground">Responsibility</div>
                    <Progress value={72} className="h-2 mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-1">68%</div>
                    <div className="text-sm text-muted-foreground">Empathy</div>
                    <Progress value={68} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  🧠 Decision Making Mastery
                </CardTitle>
                <CardDescription>Course Progress: 35%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Unit 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        1️⃣ Unit 1: Understanding Decisions
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl mb-1">🤔</div>
                        <div className="text-sm font-medium">Critical Thinking</div>
                        <div className="text-xs text-success">75%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl mb-1">⚡</div>
                        <div className="text-sm font-medium">Problem Solving</div>
                        <div className="text-xs text-primary">60%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl mb-1">💪</div>
                        <div className="text-sm font-medium">Values Alignment</div>
                        <div className="text-xs text-accent">45%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl mb-1">🎯</div>
                        <div className="text-sm font-medium">Consequence Awareness</div>
                        <div className="text-xs text-orange-500">30%</div>
                      </div>
                    </div>
                  </div>

                  {/* Unit 2 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        2️⃣ Unit 2: Decision-Making Process
                      </h4>
                      <Badge variant="outline">🔒 Complete current lesson</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg opacity-50">
                        <div className="text-2xl mb-1">🔒</div>
                        <div className="text-sm font-medium">Systematic Thinking</div>
                        <div className="text-xs text-muted-foreground">0%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg opacity-50">
                        <div className="text-2xl mb-1">🔒</div>
                        <div className="text-sm font-medium">Information Analysis</div>
                        <div className="text-xs text-muted-foreground">0%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg opacity-50">
                        <div className="text-2xl mb-1">🔒</div>
                        <div className="text-sm font-medium">Option Weighing</div>
                        <div className="text-xs text-muted-foreground">0%</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg opacity-50">
                        <div className="text-2xl mb-1">🔒</div>
                        <div className="text-sm font-medium">Decision Confidence</div>
                        <div className="text-xs text-muted-foreground">0%</div>
                      </div>
                    </div>
                  </div>

                  {/* Locked Units */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-semibold text-muted-foreground">3️⃣ Unit 3: Values and Ethics</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">🔒 Complete Unit 2 to unlock</p>
                    <p className="text-sm text-muted-foreground">Explore how values guide ethical decision making</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-semibold text-muted-foreground">4️⃣ Unit 4: Real-World Applications</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">🔒 Complete Unit 3 to unlock</p>
                    <p className="text-sm text-muted-foreground">Apply decision-making skills to complex real-world scenarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Family Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Family Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">👨‍👩‍👧‍👦</div>
                      <span className="text-sm font-medium">Parents Online</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Ready for discussion
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Discussions</span>
                    <Badge className="text-xs">2 lessons ready for family talk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <div className="font-medium">Decision Master</div>
                      <div className="text-sm text-muted-foreground">Completed 5 scenarios</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl">💬</div>
                    <div>
                      <div className="font-medium">Family Connector</div>
                      <div className="text-sm text-muted-foreground">3 meaningful discussions</div>
                    </div>
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

export default ChildDashboard;