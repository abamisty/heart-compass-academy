import { useState, useEffect } from "react";
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
  BookOpen,
  RotateCcw
} from "lucide-react";

const CoursePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("video");
  const [currentScene, setCurrentScene] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

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

  const videoScenes = [
    {
      id: 0,
      title: "Maya's Morning",
      duration: 8,
      description: "Maya wakes up feeling excited about her day",
      characters: ["Maya"],
      dialogue: "Maya stretches and smiles, ready for a great day!"
    },
    {
      id: 1,
      title: "The Spilled Paint",
      duration: 12,
      description: "Maya accidentally knocks over paint in art class",
      characters: ["Maya", "Teacher"],
      dialogue: "Oh no! Maya's painting is ruined and paint is everywhere."
    },
    {
      id: 2,
      title: "Friends' Reactions",
      duration: 15,
      description: "Different friends respond to Maya's accident",
      characters: ["Maya", "Alex", "Sam", "Lily"],
      dialogue: "Watch how each friend reacts differently to Maya's situation."
    },
    {
      id: 3,
      title: "Maya's Feelings",
      duration: 10,
      description: "Maya processes her emotions about the day",
      characters: ["Maya"],
      dialogue: "Maya feels frustrated and sad about what happened."
    },
    {
      id: 4,
      title: "Understanding & Support",
      duration: 12,
      description: "Maya receives empathy and feels better",
      characters: ["Maya", "Lily"],
      dialogue: "Lily sits with Maya and really listens to her feelings."
    }
  ];

  const totalVideoDuration = videoScenes.reduce((total, scene) => total + scene.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentScene < videoScenes.length) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = prev + (100 / totalVideoDuration);
          if (newProgress >= (videoScenes.slice(0, currentScene + 1).reduce((sum, scene) => sum + scene.duration, 0) / totalVideoDuration) * 100) {
            if (currentScene < videoScenes.length - 1) {
              setCurrentScene(prev => prev + 1);
            } else {
              setIsPlaying(false);
            }
          }
          return Math.min(newProgress, 100);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentScene, videoScenes.length, totalVideoDuration]);

  const resetVideo = () => {
    setCurrentScene(0);
    setVideoProgress(0);
    setIsPlaying(false);
  };

  const handleAnswerSubmit = () => {
    setShowResults(true);
  };

  const renderVideoActivity = () => {
    const currentSceneData = videoScenes[currentScene];
    const currentTime = Math.floor((videoProgress / 100) * totalVideoDuration);
    const totalTime = totalVideoDuration;

    return (
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardContent className="p-8">
          {/* Video Scene Display */}
          <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
            
            {/* Scene Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Scene Header */}
              <div className="p-4 bg-black/30 backdrop-blur-sm">
                <div className="flex items-center justify-between text-white">
                  <h3 className="text-lg font-semibold">{currentSceneData.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    Scene {currentScene + 1} of {videoScenes.length}
                  </Badge>
                </div>
              </div>

              {/* Scene Animation Area */}
              <div className="flex-1 relative flex items-center justify-center p-8">
                {/* Character Animations */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {currentScene === 0 && (
                    <div className={`transition-all duration-1000 ${isPlaying ? 'animate-bounce' : ''}`}>
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">😊</span>
                      </div>
                      <p className="text-white text-center font-medium">Maya</p>
                    </div>
                  )}

                  {currentScene === 1 && (
                    <div className="flex items-center justify-center space-x-8">
                      <div className={`transition-all duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}>
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xl">😰</span>
                        </div>
                        <p className="text-white text-center text-sm">Maya</p>
                      </div>
                      <div className={`transition-all duration-1000 ${isPlaying ? 'animate-fade-in' : ''}`}>
                        <div className="w-16 h-16 bg-red-500 rounded-lg mb-2 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-lg"></div>
                          <div className="absolute bottom-0 w-full h-4 bg-red-400 rounded-b-lg animate-pulse"></div>
                        </div>
                        <p className="text-white text-center text-xs">Spilled Paint</p>
                      </div>
                    </div>
                  )}

                  {currentScene === 2 && (
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-lg">🤔</span>
                        </div>
                        <p className="text-white text-xs">Alex: "Just clean it up"</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-lg">😕</span>
                        </div>
                        <p className="text-white text-xs">Sam: "That's too bad"</p>
                      </div>
                      <div className="text-center col-span-2">
                        <div className={`w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-2 mx-auto ${isPlaying ? 'animate-pulse' : ''}`}>
                          <span className="text-xl">❤️</span>
                        </div>
                        <p className="text-white text-sm">Lily: "How are you feeling?"</p>
                      </div>
                    </div>
                  )}

                  {currentScene === 3 && (
                    <div className={`transition-all duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}>
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">😔</span>
                      </div>
                      <p className="text-white text-center font-medium">Maya feels sad</p>
                    </div>
                  )}

                  {currentScene === 4 && (
                    <div className="flex items-center justify-center space-x-6">
                      <div className={`transition-all duration-1000 ${isPlaying ? 'animate-bounce' : ''}`}>
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xl">😌</span>
                        </div>
                        <p className="text-white text-center text-sm">Maya</p>
                      </div>
                      <div className="w-8 h-8 text-red-400 animate-pulse">
                        <Heart className="w-full h-full" />
                      </div>
                      <div className={`transition-all duration-1000 ${isPlaying ? 'animate-bounce' : ''}`}>
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xl">😊</span>
                        </div>
                        <p className="text-white text-center text-sm">Lily</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Play/Pause Overlay */}
                {!isPlaying && videoProgress === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <Button 
                      size="lg"
                      variant="secondary"
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Scene Dialogue */}
              <div className="p-4 bg-black/40 backdrop-blur-sm">
                <p className="text-white text-center text-sm">{currentSceneData.dialogue}</p>
              </div>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={videoProgress >= 100}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetVideo}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-12 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            <Badge variant="secondary">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <Progress value={videoProgress} className="h-3 mb-4" />
          
          {/* Scene Description */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">{currentSceneData.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

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