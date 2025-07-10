import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Heart, 
  Trophy, 
  Star,
  CheckCircle2,
  ArrowRight,
  Volume2,
  BookOpen
} from "lucide-react";

const CoursePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("video");

  const lessonData = {
    title: "Understanding Different Perspectives",
    module: "Building Empathy",
    progress: 45,
    totalSteps: 8,
    currentStep: 4,
    heartGems: 25
  };

  const quizQuestion = {
    question: "When your friend seems upset, what's the best first step?",
    options: [
      { id: "a", text: "Tell them they shouldn't feel that way", correct: false },
      { id: "b", text: "Ask them how they're feeling and listen", correct: true },
      { id: "c", text: "Change the subject to something fun", correct: false },
      { id: "d", text: "Give them advice right away", correct: false }
    ]
  };

  const handleAnswerSubmit = () => {
    setShowResults(true);
  };

  const renderVideoActivity = () => (
    <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10">
      <CardContent className="p-8">
        <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          <div className="relative z-10 text-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">Story: Maya's Difficult Day</h3>
            <p className="text-sm opacity-80">Watch how different characters respond to Maya's feelings</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <div className="w-16 h-2 bg-muted rounded-full">
                <div className="w-12 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          <Badge variant="secondary">3:45 / 5:20</Badge>
        </div>
        
        <Progress value={65} className="h-2" />
      </CardContent>
    </Card>
  );

  const renderQuizActivity = () => (
    <Card className="border-0 bg-gradient-to-br from-accent/10 to-orange-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          Quick Check
        </CardTitle>
        <CardDescription>
          Let's see what you learned about showing empathy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{quizQuestion.question}</div>
        
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {quizQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label 
                htmlFor={option.id} 
                className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedAnswer === option.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-background hover:bg-muted/50'
                } ${
                  showResults && option.correct 
                    ? 'bg-success/10 border-success' 
                    : showResults && selectedAnswer === option.id && !option.correct 
                      ? 'bg-destructive/10 border-destructive'
                      : ''
                }`}
              >
                {option.text}
                {showResults && option.correct && (
                  <CheckCircle2 className="w-4 h-4 text-success float-right" />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {!showResults ? (
          <Button 
            variant="hero" 
            className="w-full" 
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
          >
            Check Answer
          </Button>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              quizQuestion.options.find(o => o.id === selectedAnswer)?.correct 
                ? 'bg-success/10 border border-success/30' 
                : 'bg-destructive/10 border border-destructive/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {quizQuestion.options.find(o => o.id === selectedAnswer)?.correct ? (
                  <>
                    <Trophy className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Great job!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 text-destructive" />
                    <span className="font-semibold text-destructive">Good try!</span>
                  </>
                )}
              </div>
              <p className="text-sm">
                {quizQuestion.options.find(o => o.id === selectedAnswer)?.correct 
                  ? "Asking how someone feels and listening shows empathy and helps them feel understood."
                  : "The best way to show empathy is to ask how they're feeling and really listen to their answer."
                }
              </p>
            </div>
            
            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => setCurrentActivity("reflection")}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue to Reflection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderReflectionActivity = () => (
    <Card className="border-0 bg-gradient-to-br from-success/10 to-teal-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-success" />
          Personal Reflection
        </CardTitle>
        <CardDescription>
          Think about your own experiences with empathy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Can you think of a time when someone showed empathy to you?</h3>
          <p className="text-sm text-muted-foreground">
            Write about how it felt when someone really listened to your feelings and tried to understand you.
          </p>
          
          <Textarea 
            placeholder="I remember when..."
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">How can you show empathy to others this week?</h3>
          <p className="text-sm text-muted-foreground">
            Think of specific ways you can practice listening and understanding others' feelings.
          </p>
          
          <Textarea 
            placeholder="I will try to..."
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button variant="hero" className="w-full">
          <Trophy className="w-4 h-4 mr-2" />
          Complete Lesson
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold gradient-text">{lessonData.title}</h1>
                <p className="text-muted-foreground">{lessonData.module}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-accent px-4 py-2 rounded-full text-white">
                <Heart className="w-4 h-4" />
                <span className="font-semibold">+{lessonData.heartGems}</span>
              </div>
              <Badge variant="secondary">
                Step {lessonData.currentStep} of {lessonData.totalSteps}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={lessonData.progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Button variant="outline">
              <SkipBack className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text mb-2">Building Empathy</h2>
              <p className="text-muted-foreground">Learn to understand and share others' feelings</p>
            </div>
            <Button variant="outline">
              Next
              <SkipForward className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Activity Content */}
          <div className="mb-8">
            {currentActivity === "video" && renderVideoActivity()}
            {currentActivity === "quiz" && renderQuizActivity()}
            {currentActivity === "reflection" && renderReflectionActivity()}
          </div>

          {/* Activity Navigation */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant={currentActivity === "video" ? "hero" : "outline"}
              onClick={() => setCurrentActivity("video")}
            >
              1. Watch
            </Button>
            <Button 
              variant={currentActivity === "quiz" ? "hero" : "outline"}
              onClick={() => setCurrentActivity("quiz")}
            >
              2. Quiz
            </Button>
            <Button 
              variant={currentActivity === "reflection" ? "hero" : "outline"}
              onClick={() => setCurrentActivity("reflection")}
            >
              3. Reflect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;