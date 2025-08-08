import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Heart, Users, UserCheck, Target, Globe, Crown, Star, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CurriculumPreview = () => {
  const units = [
    {
      id: "u1",
      title: "Introduction to Love & Affection",
      icon: Heart,
      skills: ["The Love Map", "Family Love Circle"],
      color: "bg-pink-500",
      progress: 100
    },
    {
      id: "u2", 
      title: "Understanding Love Languages",
      icon: Users,
      skills: ["Words of Wonder", "Acts of Awesome", "Gift Giving Magic", "Quality Time Adventures"],
      color: "bg-blue-500",
      progress: 75
    },
    {
      id: "u3",
      title: "Friendship & Social Love", 
      icon: UserCheck,
      skills: ["Making Friends", "Being a Good Friend", "Conflict Resolution", "Empathy & Understanding"],
      color: "bg-green-500",
      progress: 50
    },
    {
      id: "u4",
      title: "Self-Love & Confidence",
      icon: Target, 
      skills: ["Self-Care Heroes", "Positive Self-Talk", "Celebrating Uniqueness", "Goal Setting & Dreams"],
      color: "bg-purple-500",
      progress: 25
    },
    {
      id: "u5",
      title: "Community & Universal Love",
      icon: Globe,
      skills: ["Helping Others", "Environmental Care", "Cultural Appreciation", "Love in Action"], 
      color: "bg-orange-500",
      progress: 0
    }
  ];

  const sampleLesson = {
    title: "The Love Map - Crown Level 1, Lesson 1",
    objective: "Learn what love means in simple terms and identify basic loving actions",
    duration: "6 minutes",
    exercises: [
      { type: "Match Image & Text", description: "Match pictures to loving actions" },
      { type: "Listen & Choose", description: "Story about Sam helping his sister" },
      { type: "True or False", description: "Love means being kind to people we care about" },
      { type: "Fill the Blank", description: "When we _____ someone, we want them happy" },
      { type: "Picture Choice", description: "Which picture shows expressing love?" },
      { type: "Speak Prompt", description: "Say one way you show love to your family" }
    ]
  };

  const badges = [
    { name: "Love Language Learner", icon: Heart },
    { name: "Friendship Builder", icon: Users },
    { name: "Self-Love Warrior", icon: Target },
    { name: "Empathy Champion", icon: UserCheck },
    { name: "Community Helper", icon: Globe }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-primary">Compass of Love</h1>
        </div>
        <p className="text-lg text-muted-foreground">A Duolingo-style learning journey for ages 10-12</p>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="text-sm">5 Units</Badge>
          <Badge variant="secondary" className="text-sm">18 Skills</Badge>
          <Badge variant="secondary" className="text-sm">125 Lessons</Badge>
          <Badge variant="secondary" className="text-sm">5 Crown Levels Each</Badge>
        </div>
        <div className="mt-4">
          <Link to="/exercise-generator">
            <Button variant="glow" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Try Exercise Generator
            </Button>
          </Link>
        </div>
      </div>

      {/* Learning Path Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Learning Path Structure
          </CardTitle>
          <CardDescription>Complete journey through understanding and expressing love</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit, index) => {
              const IconComponent = unit.icon;
              return (
                <Card key={unit.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${unit.color}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${unit.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium leading-tight">{unit.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={unit.progress} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{unit.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {unit.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2 text-xs">
                          <Crown className="h-3 w-3 text-yellow-500" />
                          <span className="text-muted-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sample Lesson Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Sample Lesson: {sampleLesson.title}
          </CardTitle>
          <CardDescription>
            {sampleLesson.objective} • {sampleLesson.duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {sampleLesson.exercises.map((exercise, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{exercise.type}</div>
                  <div className="text-xs text-muted-foreground mt-1">{exercise.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gamification Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Gamification & Achievements
          </CardTitle>
          <CardDescription>Badges, crowns, and rewards to motivate learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="text-center p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-xs font-medium text-center leading-tight">{badge.name}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Crown System</h4>
                <p className="text-sm text-muted-foreground">Each skill has 5 crown levels with 5 lessons each</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Crown key={level} className="h-6 w-6 text-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Learning Design</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 8 varied exercise types per lesson</li>
                <li>• 5-8 minute lessons for optimal attention</li>
                <li>• Child-friendly language (ages 10-12)</li>
                <li>• Empathy-focused supportive feedback</li>
                <li>• Progressive difficulty through crown levels</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Duolingo Structure</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vertical scroll skill bubbles</li>
                <li>• Review bubbles after every 2 skills</li>
                <li>• Checkpoint bubbles at unit ends</li>
                <li>• XP rewards and crown progression</li>
                <li>• Final master challenge certificate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurriculumPreview;