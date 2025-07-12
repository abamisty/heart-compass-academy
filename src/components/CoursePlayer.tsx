import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedCharacter } from "@/components/video/AnimatedCharacter";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
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
  RotateCcw,
  VolumeX
} from "lucide-react";

const CoursePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("video");
  const [currentScene, setCurrentScene] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const { speak, stop: stopSpeech, isLoading: isSpeechLoading } = useTextToSpeech();

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
      duration: 12,
      description: "Maya wakes up feeling excited about her day",
      characters: [{ name: "Maya", emotion: "happy" as const, isActive: true }],
      dialogue: "Maya stretches and smiles, looking forward to art class today. She can't wait to paint her favorite flower!",
      speaker: "Maya",
      voiceId: "pFZP5JQG7iQjIQuC4Bku" // Lily voice
    },
    {
      id: 1,
      title: "The Spilled Paint",
      duration: 15,
      description: "Maya accidentally knocks over paint in art class",
      characters: [
        { name: "Maya", emotion: "worried" as const, isActive: true },
        { name: "Teacher", emotion: "empathetic" as const, isActive: false }
      ],
      dialogue: "Oh no! Maya's paintbrush slips and red paint spills all over her beautiful flower painting and the table.",
      speaker: "Narrator",
      voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah voice
    },
    {
      id: 2,
      title: "Friends' Reactions",
      duration: 20,
      description: "Different friends respond to Maya's accident",
      characters: [
        { name: "Maya", emotion: "sad" as const, isActive: false },
        { name: "Alex", emotion: "surprised" as const, isActive: false },
        { name: "Sam", emotion: "happy" as const, isActive: false },
        { name: "Lily", emotion: "empathetic" as const, isActive: true }
      ],
      dialogue: "Alex says 'Just clean it up quick!' Sam laughs and says 'At least it's colorful!' But Lily asks gently, 'Maya, how are you feeling about this?'",
      speaker: "Narrator",
      voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah voice
    },
    {
      id: 3,
      title: "Maya's Feelings",
      duration: 12,
      description: "Maya processes her emotions about the day",
      characters: [{ name: "Maya", emotion: "sad" as const, isActive: true }],
      dialogue: "I feel really frustrated and embarrassed. I worked so hard on that painting and now it's ruined. Everyone can see my mistake.",
      speaker: "Maya",
      voiceId: "pFZP5JQG7iQjIQuC4Bku" // Lily voice
    },
    {
      id: 4,
      title: "Understanding & Support",
      duration: 15,
      description: "Maya receives empathy and feels better",
      characters: [
        { name: "Maya", emotion: "empathetic" as const, isActive: false },
        { name: "Lily", emotion: "happy" as const, isActive: true }
      ],
      dialogue: "Lily sits with Maya and says, 'I understand you're upset. Accidents happen to everyone. Your painting was beautiful, and I know you can make another amazing one.'",
      speaker: "Lily",
      voiceId: "XrExE9yKIg1WjnnlVkGX" // Matilda voice
    }
  ];

  const totalVideoDuration = videoScenes.reduce((total, scene) => total + scene.duration, 0);

  // Background music setup
  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    backgroundMusicRef.current = audio;
    
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, []);

  // Auto-play dialogue when scene changes
  useEffect(() => {
    if (isPlaying && !isMuted) {
      const currentSceneData = videoScenes[currentScene];
      const activeCharacter = currentSceneData.characters.find(char => char.isActive);
      
      setCurrentSpeaker(currentSceneData.speaker);
      speak(currentSceneData.dialogue, { voiceId: currentSceneData.voiceId });
    }
  }, [currentScene, isPlaying, isMuted, speak]);

  // Video progress and scene management
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentScene < videoScenes.length) {
      // Start background music
      if (backgroundMusicRef.current && !isMuted) {
        backgroundMusicRef.current.play().catch(console.error);
      }
      
      interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = prev + (100 / totalVideoDuration);
          const currentSceneEnd = (videoScenes.slice(0, currentScene + 1).reduce((sum, scene) => sum + scene.duration, 0) / totalVideoDuration) * 100;
          
          if (newProgress >= currentSceneEnd) {
            if (currentScene < videoScenes.length - 1) {
              setCurrentScene(prev => prev + 1);
            } else {
              setIsPlaying(false);
              if (backgroundMusicRef.current) {
                backgroundMusicRef.current.pause();
              }
            }
          }
          return Math.min(newProgress, 100);
        });
      }, 1000);
    } else {
      // Pause background music
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentScene, videoScenes.length, totalVideoDuration, isMuted]);

  const resetVideo = () => {
    setCurrentScene(0);
    setVideoProgress(0);
    setIsPlaying(false);
    setCurrentSpeaker(null);
    stopSpeech();
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = !isMuted;
    }
    if (isMuted) {
      stopSpeech();
    }
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
          <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg mb-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
            
            {/* Scene Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Scene Header */}
              <div className="p-4 bg-black/30 backdrop-blur-sm">
                <div className="flex items-center justify-between text-white">
                  <h3 className="text-lg font-semibold">{currentSceneData.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Scene {currentScene + 1} of {videoScenes.length}
                    </Badge>
                    {currentSpeaker && (
                      <Badge variant="outline" className="text-xs bg-primary/20">
                        🎤 {currentSpeaker}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Characters Animation Area */}
              <div className="flex-1 relative flex items-center justify-center p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Scene-specific character layouts */}
                  {currentScene === 0 && (
                    <div className="flex flex-col items-center">
                      <AnimatedCharacter 
                        character="Maya" 
                        emotion="happy" 
                        isActive={currentSpeaker === "Maya"}
                        size="lg"
                        className="transform hover:scale-110 transition-transform"
                      />
                      <div className="mt-4 text-center">
                        <div className="w-16 h-4 bg-yellow-400/30 rounded-full animate-pulse"></div>
                        <p className="text-white text-xs mt-1">Feeling excited!</p>
                      </div>
                    </div>
                  )}

                  {currentScene === 1 && (
                    <div className="flex items-center justify-center space-x-8">
                      <AnimatedCharacter 
                        character="Maya" 
                        emotion="worried" 
                        isActive={currentSpeaker === "Maya"}
                        size="lg"
                      />
                      <div className="relative">
                        <div className="w-20 h-16 bg-red-500/80 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600"></div>
                          <div className="absolute bottom-0 w-full h-6 bg-red-400/60 rounded-b-lg animate-pulse"></div>
                          <div className="absolute top-2 left-2 w-3 h-3 bg-red-300 rounded-full animate-bounce"></div>
                          <div className="absolute top-4 right-3 w-2 h-2 bg-red-200 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <p className="text-white text-center text-xs mt-2">Spilled Paint!</p>
                      </div>
                      <AnimatedCharacter 
                        character="Teacher" 
                        emotion="empathetic" 
                        isActive={currentSpeaker === "Teacher"}
                        size="md"
                      />
                    </div>
                  )}

                  {currentScene === 2 && (
                    <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
                      <div className="text-center">
                        <AnimatedCharacter 
                          character="Alex" 
                          emotion="surprised" 
                          isActive={currentSpeaker === "Alex"}
                          size="md"
                        />
                        <div className="mt-2 p-2 bg-blue-500/20 rounded-lg">
                          <p className="text-white text-xs">"Just clean it up!"</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <AnimatedCharacter 
                          character="Sam" 
                          emotion="happy" 
                          isActive={currentSpeaker === "Sam"}
                          size="md"
                        />
                        <div className="mt-2 p-2 bg-green-500/20 rounded-lg">
                          <p className="text-white text-xs">"It's colorful!"</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <AnimatedCharacter 
                          character="Lily" 
                          emotion="empathetic" 
                          isActive={currentSpeaker === "Lily"}
                          size="lg"
                          className="mx-auto"
                        />
                        <div className="mt-2 p-3 bg-pink-500/20 rounded-lg border border-pink-300/30">
                          <p className="text-white text-sm">"How are you feeling?"</p>
                          <div className="flex justify-center mt-1">
                            <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <AnimatedCharacter 
                          character="Maya" 
                          emotion="sad" 
                          isActive={currentSpeaker === "Maya"}
                          size="md"
                        />
                      </div>
                    </div>
                  )}

                  {currentScene === 3 && (
                    <div className="flex flex-col items-center space-y-4">
                      <AnimatedCharacter 
                        character="Maya" 
                        emotion="sad" 
                        isActive={currentSpeaker === "Maya"}
                        size="lg"
                      />
                      <div className="text-center p-4 bg-gray-600/30 rounded-lg max-w-md">
                        <p className="text-white text-sm mb-2">"I feel frustrated and embarrassed..."</p>
                        <div className="flex justify-center space-x-2">
                          <div className="w-2 h-8 bg-red-400/60 rounded"></div>
                          <div className="w-2 h-6 bg-orange-400/60 rounded"></div>
                          <div className="w-2 h-4 bg-yellow-400/60 rounded"></div>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">Emotion levels</p>
                      </div>
                    </div>
                  )}

                  {currentScene === 4 && (
                    <div className="flex items-center justify-center space-x-8">
                      <div className="text-center">
                        <AnimatedCharacter 
                          character="Maya" 
                          emotion="empathetic" 
                          isActive={currentSpeaker === "Maya"}
                          size="lg"
                        />
                        <div className="mt-2 p-2 bg-green-500/20 rounded-lg">
                          <p className="text-white text-xs">Feeling better</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                        <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded animate-pulse"></div>
                        <p className="text-white text-xs">Empathy</p>
                      </div>
                      
                      <div className="text-center">
                        <AnimatedCharacter 
                          character="Lily" 
                          emotion="happy" 
                          isActive={currentSpeaker === "Lily"}
                          size="lg"
                        />
                        <div className="mt-2 p-2 bg-pink-500/20 rounded-lg">
                          <p className="text-white text-xs">Being supportive</p>
                        </div>
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
                      className="w-20 h-20 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Scene Dialogue */}
              <div className="p-4 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm flex-1">{currentSceneData.dialogue}</p>
                  {isSpeechLoading && (
                    <div className="ml-4 flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300" 
                    style={{ width: isMuted ? '0%' : '75%' }}
                  ></div>
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