import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  Target,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export function AdminAnalytics() {
  // Mock analytics data
  const metrics = {
    dau: { current: 456, target: 500, change: "+12%" },
    retention7: { current: 73, target: 70, change: "+5%" },
    retention28: { current: 45, target: 40, change: "+8%" },
    sessionDuration: { current: 18.5, target: 20, change: "-2%" },
    completionRate: { current: 87, target: 85, change: "+3%" },
    xpPerDay: { current: 285, target: 300, change: "-1%" }
  };

  const exerciseFailures = [
    { exercise: "Multiplication Tables x7", failures: 34, total: 156, rate: 21.8 },
    { exercise: "Reading Comprehension #12", failures: 28, total: 142, rate: 19.7 },
    { exercise: "Fraction Addition", failures: 31, total: 178, rate: 17.4 },
    { exercise: "Spelling Challenge", failures: 22, total: 134, rate: 16.4 },
    { exercise: "Geography Quiz", failures: 18, total: 123, rate: 14.6 }
  ];

  const abTestResults = [
    {
      test: "Spaced Repetition Frequency",
      status: "active",
      variants: ["Control", "High Freq", "Adaptive"],
      winningVariant: "High Freq",
      improvement: "+15% retention",
      confidence: 95
    },
    {
      test: "Feedback Messaging Style", 
      status: "completed",
      variants: ["Standard", "Growth Mindset", "Strategy"],
      winningVariant: "Growth Mindset",
      improvement: "+12% completion",
      confidence: 98
    },
    {
      test: "Badge Reward Cadence",
      status: "active", 
      variants: ["Standard", "Micro-achievements", "Personalized"],
      winningVariant: "TBD",
      improvement: "TBD",
      confidence: 67
    }
  ];

  const MetricCard = ({ title, icon: Icon, metric, isGood }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof metric.current === 'number' && metric.current % 1 !== 0 
            ? metric.current.toFixed(1) 
            : metric.current}
          {title.includes('Rate') || title.includes('Retention') ? '%' : ''}
          {title.includes('Duration') ? ' min' : ''}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${isGood ? 'text-green-600' : 'text-red-600'}`}>
            {metric.change}
          </span>
          <span className="text-xs text-muted-foreground">
            Target: {metric.target}{title.includes('Rate') || title.includes('Retention') ? '%' : ''}
            {title.includes('Duration') ? ' min' : ''}
          </span>
        </div>
        <Progress 
          value={(metric.current / metric.target) * 100} 
          className="h-2 mt-2"
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Deep dive into learning metrics and platform performance
        </p>
      </div>

      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="experiments">A/B Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Daily Active Users"
              icon={Users}
              metric={metrics.dau}
              isGood={metrics.dau.current >= metrics.dau.target}
            />
            <MetricCard
              title="7-Day Retention"
              icon={Target}
              metric={metrics.retention7}
              isGood={metrics.retention7.current >= metrics.retention7.target}
            />
            <MetricCard
              title="28-Day Retention"
              icon={TrendingUp}
              metric={metrics.retention28}
              isGood={metrics.retention28.current >= metrics.retention28.target}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Engagement chart would go here</p>
                  <p className="text-sm text-muted-foreground">
                    Daily/Weekly/Monthly user activity visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Session Duration"
              icon={Clock}
              metric={metrics.sessionDuration}
              isGood={metrics.sessionDuration.current >= metrics.sessionDuration.target * 0.9}
            />
            <MetricCard
              title="Completion Rate"
              icon={CheckCircle}
              metric={metrics.completionRate}
              isGood={metrics.completionRate.current >= metrics.completionRate.target}
            />
            <MetricCard
              title="XP Per Day"
              icon={Target}
              metric={metrics.xpPerDay}
              isGood={metrics.xpPerDay.current >= metrics.xpPerDay.target * 0.95}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Learning progression chart would go here</p>
                  <p className="text-sm text-muted-foreground">
                    Crown levels, XP trends, skill mastery over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                High Failure Rate Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exerciseFailures.map((exercise, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{exercise.exercise}</span>
                      <Badge variant={exercise.rate > 20 ? "destructive" : exercise.rate > 15 ? "secondary" : "outline"}>
                        {exercise.rate.toFixed(1)}% failure
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{exercise.failures} failures out of {exercise.total} attempts</span>
                    </div>
                    <Progress value={100 - exercise.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Content performance metrics would go here</p>
                  <p className="text-sm text-muted-foreground">
                    Lesson completion rates, time spent, difficulty analysis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiments" className="space-y-6">
          <div className="grid gap-4">
            {abTestResults.map((test, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{test.test}</CardTitle>
                    <Badge variant={test.status === 'active' ? 'default' : 'secondary'}>
                      {test.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Variants</p>
                      <div className="space-y-1">
                        {test.variants.map((variant, vIndex) => (
                          <Badge key={vIndex} variant="outline" className="mr-1">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Winning Variant</p>
                      <p className="text-sm text-muted-foreground">{test.winningVariant}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Improvement</p>
                      <p className="text-sm text-green-600">{test.improvement}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Confidence</p>
                      <div className="flex items-center gap-2">
                        <Progress value={test.confidence} className="h-2 flex-1" />
                        <span className="text-sm">{test.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}