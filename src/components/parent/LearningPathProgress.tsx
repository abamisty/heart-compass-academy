import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Clock, Target, CheckCircle, Lock, Play } from "lucide-react";

interface LearningPathProgressProps {
  selectedChild: any;
}

export const LearningPathProgress = ({ selectedChild }: LearningPathProgressProps) => {
  const learningPath = [
    {
      id: 1,
      title: "Foundation Values",
      description: "Core character building principles",
      lessons: [
        { id: 1, title: "Understanding Honesty", completed: true, score: 95 },
        { id: 2, title: "Practicing Kindness", completed: true, score: 88 },
        { id: 3, title: "Building Respect", completed: true, score: 92 },
        { id: 4, title: "Developing Responsibility", completed: false, score: null }
      ],
      completed: 3,
      total: 4,
      status: "in-progress"
    },
    {
      id: 2,
      title: "Social Skills",
      description: "Building healthy relationships",
      lessons: [
        { id: 5, title: "Active Listening", completed: false, score: null },
        { id: 6, title: "Conflict Resolution", completed: false, score: null },
        { id: 7, title: "Team Collaboration", completed: false, score: null }
      ],
      completed: 0,
      total: 3,
      status: "locked"
    },
    {
      id: 3,
      title: "Leadership Basics",
      description: "Developing leadership qualities",
      lessons: [
        { id: 8, title: "Setting Examples", completed: false, score: null },
        { id: 9, title: "Motivating Others", completed: false, score: null },
        { id: 10, title: "Making Decisions", completed: false, score: null }
      ],
      completed: 0,
      total: 3,
      status: "locked"
    }
  ];

  const getModuleIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "in-progress":
        return <Play className="w-6 h-6 text-primary" />;
      case "locked":
        return <Lock className="w-6 h-6 text-muted-foreground" />;
      default:
        return <BookOpen className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "in-progress":
        return "bg-primary";
      case "locked":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {selectedChild.name}'s Learning Journey
          </CardTitle>
          <CardDescription>
            Track progress through the character development curriculum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">75%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">8</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">92%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Modules */}
      <div className="space-y-4">
        {learningPath.map((module, index) => (
          <Card key={module.id} className={`transition-all duration-300 ${
            module.status === "locked" ? "opacity-60" : "hover:shadow-md"
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getModuleIcon(module.status)}
                  <div>
                    <CardTitle className="text-lg">
                      Module {index + 1}: {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={module.status === "completed" ? "default" : "secondary"}>
                  {module.completed}/{module.total} lessons
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Module Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((module.completed / module.total) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(module.completed / module.total) * 100} 
                    className={`h-2 ${getProgressColor(module.status)}`}
                  />
                </div>

                {/* Lessons List */}
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        lesson.completed 
                          ? "bg-success/10 border border-success/20" 
                          : module.status === "locked"
                          ? "bg-muted/30"
                          : "bg-muted/50 hover:bg-muted/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : module.status === "locked" ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-primary" />
                        )}
                        <span className={`font-medium ${
                          module.status === "locked" ? "text-muted-foreground" : ""
                        }`}>
                          {lesson.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {lesson.completed && lesson.score && (
                          <Badge variant="outline" className="text-success border-success">
                            {lesson.score}%
                          </Badge>
                        )}
                        {!lesson.completed && module.status !== "locked" && (
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Module Actions */}
                {module.status === "in-progress" && (
                  <div className="pt-2">
                    <Button variant="hero" size="sm" className="w-full">
                      Continue Learning
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};