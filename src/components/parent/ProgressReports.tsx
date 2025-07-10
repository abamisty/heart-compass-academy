import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Clock, 
  BarChart3, 
  Download,
  BookOpen,
  Star,
  Trophy
} from "lucide-react";

interface ProgressReportsProps {
  selectedChild: any;
}

export const ProgressReports = ({ selectedChild }: ProgressReportsProps) => {
  const weeklyData = [
    { week: "Week 1", timeSpent: 3.5, lessonsCompleted: 2, score: 85 },
    { week: "Week 2", timeSpent: 4.2, lessonsCompleted: 3, score: 88 },
    { week: "Week 3", timeSpent: 5.1, lessonsCompleted: 4, score: 92 },
    { week: "Week 4", timeSpent: 4.8, lessonsCompleted: 3, score: 95 }
  ];

  const skillAreas = [
    { name: "Honesty & Integrity", progress: 92, trend: "+5%" },
    { name: "Empathy & Kindness", progress: 88, trend: "+8%" },
    { name: "Responsibility", progress: 85, trend: "+3%" },
    { name: "Communication", progress: 78, trend: "+12%" },
    { name: "Problem Solving", progress: 82, trend: "+7%" }
  ];

  const achievements = [
    {
      title: "Empathy Explorer",
      description: "Completed 5 empathy-building activities",
      dateEarned: "2 days ago",
      icon: "❤️"
    },
    {
      title: "Honesty Hero",
      description: "Demonstrated honesty in challenging scenarios",
      dateEarned: "1 week ago",
      icon: "🌟"
    },
    {
      title: "7-Day Streak",
      description: "Completed lessons for 7 consecutive days",
      dateEarned: "Today",
      icon: "🔥"
    }
  ];

  const recommendations = [
    {
      area: "Communication Skills",
      suggestion: "Consider enrolling in 'Public Speaking Confidence' course",
      priority: "high"
    },
    {
      area: "Leadership Development",
      suggestion: "Practice peer mentoring activities",
      priority: "medium"
    },
    {
      area: "Digital Citizenship",
      suggestion: "Review online safety practices",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Progress Report for {selectedChild.name}
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of learning progress and character development
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                    <p className="text-2xl font-bold">17.6h</p>
                    <p className="text-xs text-success">+2.1h this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lessons</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-success">+3 this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold">90%</p>
                    <p className="text-xs text-success">+5% improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Badges</p>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-success">+2 this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Progress</CardTitle>
              <CardDescription>Track weekly engagement and performance trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium">{week.week}</p>
                        <p className="text-sm text-muted-foreground">
                          {week.lessonsCompleted} lessons • {week.timeSpent}h
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {week.score}% avg
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Character Development Areas</CardTitle>
              <CardDescription>Progress in key character building skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillAreas.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-success">{skill.trend}</span>
                        <Badge variant="outline">{skill.progress}%</Badge>
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Celebrating {selectedChild.name}'s accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-primary mt-1">{achievement.dateEarned}</p>
                    </div>
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions for continued growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.area}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.suggestion}</p>
                    <Button variant="outline" size="sm">
                      Take Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};