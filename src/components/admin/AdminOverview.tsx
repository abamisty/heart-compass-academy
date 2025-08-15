import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Star,
  Clock,
  Target,
  Shield
} from "lucide-react";

export function AdminOverview() {
  // Mock data - in real app this would come from API
  const stats = {
    totalUsers: 2847,
    activeToday: 456,
    totalCourses: 24,
    totalLessons: 248,
    avgSessionTime: "18.5 min",
    retentionRate: 73,
    safetyAlerts: 3,
    contentFlags: 12
  };

  const recentActivity = [
    { action: "New user registration", user: "Sarah Johnson", time: "2 min ago", type: "user" },
    { action: "Course completed", user: "Mike Chen", course: "Math Basics", time: "5 min ago", type: "course" },
    { action: "Safety alert triggered", content: "Exercise #447", time: "12 min ago", type: "alert" },
    { action: "New lesson published", lesson: "Fractions Fun", time: "1 hour ago", type: "content" },
  ];

  const topCourses = [
    { name: "Math Adventures", enrollments: 342, completion: 87, rating: 4.8 },
    { name: "Reading Heroes", enrollments: 298, completion: 92, rating: 4.9 },
    { name: "Science Explorer", enrollments: 267, completion: 79, rating: 4.7 },
    { name: "Art & Creativity", enrollments: 234, completion: 94, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor platform health and key metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeToday}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground">
              Target: 15-25 min
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.retentionRate}%</div>
            <p className="text-xs text-muted-foreground">
              7-day retention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Safety & Content Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Safety Alerts</span>
              <Badge variant={stats.safetyAlerts > 0 ? "destructive" : "secondary"}>
                {stats.safetyAlerts}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Content Flags</span>
              <Badge variant={stats.contentFlags > 5 ? "destructive" : "secondary"}>
                {stats.contentFlags}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content Moderation Score</span>
                <span>98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Courses</span>
              <span className="font-medium">{stats.totalCourses}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Lessons</span>
              <span className="font-medium">{stats.totalLessons}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content Quality Score</span>
                <span>4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-500' :
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'course' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user && `${activity.user} • `}
                      {activity.course && `${activity.course} • `}
                      {activity.lesson && `${activity.lesson} • `}
                      {activity.content && `${activity.content} • `}
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{course.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.enrollments} enrollments</span>
                    <span>{course.completion}% completion</span>
                  </div>
                  <Progress value={course.completion} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}