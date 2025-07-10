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
  Zap
} from "lucide-react";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    {
      id: 1,
      name: "Emma",
      age: 12,
      avatar: "/placeholder-avatar.png",
      level: 15,
      streak: 7,
      totalBadges: 12,
      coursesCompleted: 3,
      currentCourse: "Character Values Foundations",
      progress: 68,
      weeklyTime: 4.5
    },
    {
      id: 2,
      name: "Alex",
      age: 15,
      avatar: "/placeholder-avatar.png",
      level: 22,
      streak: 12,
      totalBadges: 18,
      coursesCompleted: 5,
      currentCourse: "Financial Literacy & Sales Skills",
      progress: 43,
      weeklyTime: 6.2
    }
  ];

  const currentChild = children[selectedChild];

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
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Child
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

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Level</p>
                      <p className="text-3xl font-bold text-primary">{currentChild.level}</p>
                    </div>
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                      <p className="text-3xl font-bold text-accent">{currentChild.streak} days</p>
                    </div>
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-success/10 to-success/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
                      <p className="text-3xl font-bold text-success">{currentChild.totalBadges}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Weekly Time</p>
                      <p className="text-3xl font-bold text-secondary">{currentChild.weeklyTime}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Current Course Progress
                </CardTitle>
                <CardDescription>
                  {currentChild.name} is currently learning: {currentChild.currentCourse}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{currentChild.currentCourse}</span>
                    <Badge variant="secondary">{currentChild.progress}% Complete</Badge>
                  </div>
                  <Progress value={currentChild.progress} className="h-3" />
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="secondary" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Progress Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Keep track of {currentChild.name}'s latest achievements and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      {activity.icon}
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>
                  AI-curated courses based on {currentChild.name}'s age, interests, and learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course, index) => (
                    <Card key={index} className="card-hover">
                      <CardHeader>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">Ages {course.ageGroup}</Badge>
                            <Badge variant="outline">{course.duration}</Badge>
                            <Badge variant="outline">{course.difficulty}</Badge>
                          </div>
                          <Button variant="hero" size="sm" className="w-full">
                            Enroll {currentChild.name}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievement Gallery</CardTitle>
                <CardDescription>
                  Celebrate {currentChild.name}'s character development milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: currentChild.totalBadges }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 cursor-pointer">
                      <Trophy className="w-8 h-8 text-primary mb-2" />
                      <span className="text-xs text-center font-medium">Achievement {index + 1}</span>
                    </div>
                  ))}
                  {Array.from({ length: 6 - (currentChild.totalBadges % 6) }).map((_, index) => (
                    <div key={`placeholder-${index}`} className="flex flex-col items-center p-4 rounded-lg bg-muted/20 opacity-50">
                      <Trophy className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-xs text-center text-muted-foreground">Locked</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <CardDescription>
                  Detailed insights into {currentChild.name}'s learning patterns and growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Detailed Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're building comprehensive learning analytics to help you track progress over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;