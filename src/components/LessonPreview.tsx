import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Star, Volume2, CheckCircle, XCircle } from 'lucide-react';

const LessonPreview = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [showHint, setShowHint] = useState<{ [key: number]: boolean }>({});
  const [results, setResults] = useState<{ [key: number]: boolean }>({});

  const exercises = [
    {
      id: 1,
      type: "match_image_text",
      title: "Match Image to Text",
      prompt: "Match the picture that shows love",
      images: [
        { id: "parent_hug", alt: "A parent giving their child a warm, loving hug", label: "Parent Hug" },
        { id: "sharing_toy", alt: "Two children sharing toys together", label: "Sharing Toys" }
      ],
      textOptions: ["Showing love with a hug", "Playing with friends", "Reading a book alone"],
      correct: "parent_hug",
      correctText: "Showing love with a hug",
      hint: "Look for warm hugs and close contact between people who care about each other",
      xp: 10
    },
    {
      id: 2,
      type: "picture_choice", 
      title: "Picture Choice",
      prompt: "Which one is NOT a way to show love?",
      options: [
        { id: "helping", label: "Helping elderly person", alt: "Young person helping elderly cross street" },
        { id: "pushing", label: "Pushing away", alt: "Child pushing another child away angrily" },
        { id: "family_dinner", label: "Family dinner", alt: "Happy family sharing a meal together" }
      ],
      correct: "pushing",
      hint: "Love actions bring people closer together, not push them away",
      xp: 10
    },
    {
      id: 3,
      type: "reorder_words",
      title: "Reorder Words",
      prompt: "Put these words in the right order to make a sentence about love:",
      words: ["I", "my", "love", "family"],
      correct: "I love my family",
      hint: "Start with 'I' and think about what you feel for your family",
      xp: 15
    },
    {
      id: 4,
      type: "fill_blank",
      title: "Fill in the Blank", 
      prompt: "Giving _____ shows you care.",
      options: ["a hug", "a phone", "homework"],
      correct: "a hug",
      hint: "Think about something warm and comforting you can give with your arms",
      xp: 10
    },
    {
      id: 5,
      type: "true_false",
      title: "True or False",
      prompt: "Saying 'thank you' is a way to show love.",
      correct: true,
      hint: "Think about how it feels when someone thanks you for something you did",
      xp: 10
    },
    {
      id: 6,
      type: "short_speak",
      title: "Speaking Practice",
      prompt: "Practice saying this loving sentence out loud:",
      targetPhrase: "I care about my family",
      hint: "Speak clearly and with feeling - let your love show in your voice!",
      xp: 15
    }
  ];

  const currentEx = exercises[currentExercise];
  const totalXP = Object.values(results).filter(Boolean).reduce((acc, _, idx) => acc + exercises[idx]?.xp || 0, 0);
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({ ...prev, [currentExercise]: answer }));
  };

  const checkAnswer = () => {
    const userAnswer = answers[currentExercise];
    const isCorrect = userAnswer === currentEx.correct || 
                     (currentEx.type === "true_false" && userAnswer === currentEx.correct);
    setResults(prev => ({ ...prev, [currentExercise]: isCorrect }));
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const showHintForCurrent = () => {
    setShowHint(prev => ({ ...prev, [currentExercise]: true }));
  };

  const renderExercise = () => {
    const userAnswer = answers[currentExercise];
    const hasResult = results.hasOwnProperty(currentExercise);
    const isCorrect = results[currentExercise];

    switch (currentEx.type) {
      case "match_image_text":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {currentEx.images.map((img) => (
                <div
                  key={img.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    userAnswer === img.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleAnswer(img.id)}
                >
                  <div className="w-full h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <p className="text-sm text-center font-medium">{img.label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-medium">Choose the matching text:</p>
              {currentEx.textOptions.map((option, idx) => (
                <Button
                  key={idx}
                  variant={userAnswer === option ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleAnswer(currentEx.images[0].id)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "picture_choice":
        return (
          <div className="grid grid-cols-3 gap-4">
            {currentEx.options.map((option) => (
              <div
                key={option.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  userAnswer === option.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAnswer(option.id)}
              >
                <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">
                    {option.id === 'pushing' ? '😠' : option.id === 'helping' ? '🤝' : '🍽️'}
                  </span>
                </div>
                <p className="text-sm text-center font-medium">{option.label}</p>
              </div>
            ))}
          </div>
        );

      case "reorder_words":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentEx.words.map((word, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="text-lg"
                  onClick={() => {
                    const newSentence = (userAnswer || []).concat(word);
                    handleAnswer(newSentence);
                  }}
                >
                  {word}
                </Button>
              ))}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg min-h-[60px] flex items-center">
              <p className="text-lg">
                {userAnswer ? userAnswer.join(' ') : 'Click words to build your sentence...'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => handleAnswer([])}
              disabled={!userAnswer || userAnswer.length === 0}
            >
              Clear
            </Button>
          </div>
        );

      case "fill_blank":
        return (
          <div className="space-y-4">
            <p className="text-lg mb-4">
              Giving <span className="inline-block w-24 h-8 bg-yellow-100 border-b-2 border-dashed border-yellow-400 text-center">
                {userAnswer || '____'}
              </span> shows you care.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {currentEx.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={userAnswer === option ? "default" : "outline"}
                  onClick={() => handleAnswer(option)}
                  className="justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "true_false":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={userAnswer === true ? "default" : "outline"}
                className="h-20 text-lg"
                onClick={() => handleAnswer(true)}
              >
                <CheckCircle className="w-6 h-6 mr-2" />
                True
              </Button>
              <Button
                variant={userAnswer === false ? "default" : "outline"}
                className="h-20 text-lg"
                onClick={() => handleAnswer(false)}
              >
                <XCircle className="w-6 h-6 mr-2" />
                False
              </Button>
            </div>
          </div>
        );

      case "short_speak":
        return (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
              <p className="text-xl font-medium mb-4">"{currentEx.targetPhrase}"</p>
              <Button size="lg" className="gap-2">
                <Volume2 className="w-5 h-5" />
                Listen to Example
              </Button>
            </div>
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => handleAnswer("recorded")}
              >
                🎤 Start Recording
              </Button>
            </div>
          </div>
        );

      default:
        return <div>Exercise type not implemented</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">The Love Map - Crown Level 1</CardTitle>
              <p className="text-muted-foreground mt-2">Recognize 6 simple examples of love actions</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <Heart className="w-4 h-4" />
                {totalXP} XP
              </Badge>
              <Badge variant="outline">6-8 min</Badge>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground">
            Exercise {currentExercise + 1} of {exercises.length}
          </p>
        </CardHeader>
      </Card>

      {/* Current Exercise */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{currentEx.title}</CardTitle>
            <Badge variant="outline" className="gap-1">
              <Star className="w-4 h-4" />
              {currentEx.xp} XP
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Volume2 className="w-4 h-4" />
              Play Audio
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium">{currentEx.prompt}</p>
          
          {renderExercise()}

          {/* Hint */}
          {showHint[currentExercise] && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-blue-800">💡 Hint: {currentEx.hint}</p>
            </div>
          )}

          {/* Result */}
          {results.hasOwnProperty(currentExercise) && (
            <div className={`p-4 rounded-lg ${results[currentExercise] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium ${results[currentExercise] ? 'text-green-800' : 'text-red-800'}`}>
                {results[currentExercise] ? '✅ Correct! ' : '❌ Not quite. '}
                {results[currentExercise] 
                  ? 'Great job recognizing that love action!' 
                  : 'Try again! Think about what shows caring and kindness.'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {!results.hasOwnProperty(currentExercise) ? (
              <>
                <Button 
                  onClick={checkAnswer}
                  disabled={!answers[currentExercise]}
                  className="flex-1"
                >
                  Check Answer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={showHintForCurrent}
                  disabled={showHint[currentExercise]}
                >
                  Show Hint
                </Button>
              </>
            ) : (
              <Button 
                onClick={nextExercise}
                disabled={currentExercise >= exercises.length - 1}
                className="flex-1"
              >
                {currentExercise >= exercises.length - 1 ? 'Lesson Complete!' : 'Next Exercise'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Exercise Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            {exercises.map((_, idx) => (
              <Button
                key={idx}
                variant={idx === currentExercise ? "default" : results.hasOwnProperty(idx) ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentExercise(idx)}
                className="w-12 h-12"
              >
                {results.hasOwnProperty(idx) ? (results[idx] ? '✓' : '✗') : idx + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPreview;