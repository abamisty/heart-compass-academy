import { useState, useEffect } from "react";
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
  Zap
} from "lucide-react";

// Import new components
import { CourseSelectionGrid } from "@/components/parent/CourseSelectionGrid";
import { DuolingoStyleLearningPath } from "@/components/DuolingoStyleLearningPath";
import { ProgressReports } from "@/components/parent/ProgressReports";
import { AchievementTracking } from "@/components/parent/AchievementTracking";
import { ParentControls } from "@/components/parent/ParentControls";
import ChildProfileManagement from "@/components/parent/ChildProfileManagement";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ChildProfile {
  id: string;
  first_name: string;
  age: number;
  avatar_url?: string;
  level?: number;
  streak?: number;
  totalBadges?: number;
  coursesCompleted?: number;
  currentCourse?: string;
  progress?: number;
  weeklyTime?: number;
}

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { toast: toastLegacy } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchChildProfiles();
    }
  }, [user]);

  const fetchChildProfiles = async () => {
    try {
      setLoading(true);
      
      // Get parent profile first
      const { data: parentProfile, error: parentError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (parentError) throw parentError;

      // Fetch child profiles
      const { data: childProfiles, error: childError } = await supabase
        .from('profiles')
        .select('*')
        .eq('parent_id', parentProfile.id)
        .eq('role', 'child');

      if (childError) throw childError;

      setChildren(childProfiles || []);
    } catch (error) {
      console.error('Error fetching child profiles:', error);
      toast.error('Failed to load child profiles');
    } finally {
      setLoading(false);
    }
  };

  const currentChild = children[selectedChild];

  // Handler functions
  const handleChildAdded = () => {
    fetchChildProfiles(); // Refresh the list
  };

  const handleCourseEnroll = async (courseId: string, childId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          child_id: childId,
          course_id: courseId,
          enrolled_by: user?.id
        });

      if (error) throw error;

      toast.success(`Successfully enrolled ${currentChild.first_name} in course!`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
    }
  };

  const handleSettingsUpdate = (settings: any) => {
    // Update child settings logic here
    console.log("Settings updated:", settings);
  };

  const recentActivities = [
    {
      type: "badge",
      title: "Empathy Explorer Badge Earned",
      course: "Character Values",
      time: "2 hours ago",
      icon: <Heart className="w-4 h-4 text-red-500" />
    },
    {
      type: "lesson",
      title: "Completed: Understanding Different Perspectives",
      course: "Character Values",
      time: "1 day ago",
      icon: <BookOpen className="w-4 h-4 text-blue-500" />
    },
    {
      type: "streak",
      title: "7-Day Learning Streak!",
      course: "Overall Progress",
      time: "Today",
      icon: <Star className="w-4 h-4 text-yellow-500" />
    }
  ];

  const recommendedCourses = [
    {
      title: "Public Speaking Confidence",
      description: "Build confidence in expressing ideas and opinions",
      ageGroup: "13-15",
      duration: "6 weeks",
      difficulty: "Intermediate"
    },
    {
      title: "Digital Citizenship",
      description: "Navigate online relationships and digital responsibility",
      ageGroup: "12-18",
      duration: "4 weeks",
      difficulty: "Beginner"
    },
    {
      title: "Emotional Intelligence Mastery",
      description: "Advanced emotional awareness and management skills",
      ageGroup: "14-18",
      duration: "8 weeks",
      difficulty: "Advanced"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">Parent Dashboard</h1>
                <p className="text-muted-foreground">Track your children's character development journey</p>
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
        {/* Add Child Button Section */}
        <div className="flex justify-end mb-6">
          <Button onClick={() => setIsAddingChild(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </div>

        {children.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No children profiles found</h3>
            <p className="text-muted-foreground mb-4">Add a child profile to get started</p>
            <Button onClick={() => setIsAddingChild(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Child
            </Button>
          </div>
        ) : (
          <>
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
                        <AvatarImage src={child.avatar_url || "/placeholder-avatar.png"} />
                        <AvatarFallback>{child.first_name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{child.first_name}</h3>
                        <p className="text-sm text-muted-foreground">Age {child.age}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Dashboard */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Profile Created</p>
                          <p className="text-3xl font-bold text-primary">✓</p>
                        </div>
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Age</p>
                          <p className="text-3xl font-bold text-accent">{currentChild?.age}</p>
                        </div>
                        <Zap className="w-8 h-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-success/10 to-success/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Ready to Learn</p>
                          <p className="text-3xl font-bold text-success">🎯</p>
                        </div>
                        <Trophy className="w-8 h-8 text-success" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Courses Available</p>
                          <p className="text-3xl font-bold text-secondary">📚</p>
                        </div>
                        <Clock className="w-8 h-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Getting Started Guide */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Getting Started
                    </CardTitle>
                    <CardDescription>
                      Help {currentChild?.first_name} begin their learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Enroll in a Course</span>
                        <Badge variant="secondary">Next Step</Badge>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="default" size="sm" onClick={() => {
                          // Switch to courses tab
                          const coursesTab = document.querySelector('[value="courses"]') as HTMLButtonElement;
                          if (coursesTab) coursesTab.click();
                        }}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Browse Courses
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          // Switch to learning path tab
                          const learningTab = document.querySelector('[value="learning-path"]') as HTMLButtonElement;
                          if (learningTab) learningTab.click();
                        }}>
                          <Target className="w-4 h-4 mr-2" />
                          View Learning Path
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                {currentChild ? (
                  <CourseSelectionGrid 
                    selectedChild={currentChild}
                    onCourseEnroll={handleCourseEnroll}
                  />
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a child first</h3>
                    <p className="text-muted-foreground">Choose a child profile to browse courses</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="learning-path" className="space-y-6">
                {currentChild ? (
                  <DuolingoStyleLearningPath selectedChild={currentChild} />
                ) : (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a child first</h3>
                    <p className="text-muted-foreground">Choose a child profile to view their learning path</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                {currentChild ? (
                  <ProgressReports selectedChild={currentChild} />
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a child first</h3>
                    <p className="text-muted-foreground">Choose a child profile to view progress reports</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                {currentChild ? (
                  <AchievementTracking selectedChild={currentChild} />
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a child first</h3>
                    <p className="text-muted-foreground">Choose a child profile to view achievements</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="controls" className="space-y-6">
                {currentChild ? (
                  <ParentControls 
                    selectedChild={currentChild}
                    onSettingsUpdate={handleSettingsUpdate}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a child first</h3>
                    <p className="text-muted-foreground">Choose a child profile to manage settings</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Hidden Child Profile Management Dialog */}
        <ChildProfileManagement 
          isAddingChild={isAddingChild}
          setIsAddingChild={setIsAddingChild}
          onChildAdded={handleChildAdded}
        />
      </div>
    </div>
  );
};

export default ParentDashboard;