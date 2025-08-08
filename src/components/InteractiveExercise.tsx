import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Lightbulb, Check, X, RotateCcw, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Exercise {
  exerciseId: string;
  type: string;
  promptText: string;
  imageDesc?: string;
  audioTranscript?: string;
  options?: string[];
  correctAnswer: string;
  hintText: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  xpReward: number;
}

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean, xp: number) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  useEffect(() => {
    // Generate image if exercise has imageDesc
    if (exercise.imageDesc && !generatedImage) {
      generateImage();
    }

    // Initialize reorder words exercise
    if (exercise.type === "reorder_words" && exercise.options) {
      const words = exercise.options[0].split(' ');
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setReorderedWords([]);
    }
  }, [exercise]);

  const generateImage = async () => {
    if (!exercise.imageDesc) return;
    
    setIsLoadingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-images', {
        body: { prompt: exercise.imageDesc }
      });

      if (error) throw error;
      setGeneratedImage(data.image);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image");
    } finally {
      setIsLoadingImage(false);
    }
  };

  const checkAnswer = () => {
    let userAnswer = "";
    
    switch (exercise.type) {
      case "multiple_choice_audio":
      case "picture_choice":
      case "true_false":
        userAnswer = selectedAnswer;
        break;
      case "fill_blank":
      case "speak_prompt":
      case "scenario_response":
        userAnswer = userInput.trim();
        break;
      case "reorder_words":
        userAnswer = reorderedWords.join(' ');
        break;
      case "match_image_text":
        userAnswer = selectedAnswer;
        break;
    }

    const correct = userAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    toast(correct ? exercise.feedbackCorrect : exercise.feedbackIncorrect, {
      icon: correct ? "✅" : "❌"
    });

    onComplete(correct, correct ? exercise.xpReward : 0);
  };

  const resetExercise = () => {
    setSelectedAnswer("");
    setUserInput("");
    setShowResult(false);
    setShowHint(false);
    setReorderedWords([]);
    if (exercise.type === "reorder_words" && exercise.options) {
      const words = exercise.options[0].split(' ');
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
    }
  };

  const addWordToSentence = (word: string, index: number) => {
    setReorderedWords([...reorderedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const removeWordFromSentence = (index: number) => {
    const word = reorderedWords[index];
    setAvailableWords([...availableWords, word]);
    setReorderedWords(reorderedWords.filter((_, i) => i !== index));
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case "multiple_choice_audio":
      case "picture_choice":
      case "true_false":
        return (
          <div className="space-y-4">
            {exercise.audioTranscript && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Volume2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{exercise.audioTranscript}</span>
              </div>
            )}
            <div className="grid gap-2">
              {exercise.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4"
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "fill_blank":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{exercise.promptText}</p>
            </div>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Type your answer here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
            />
          </div>
        );

      case "reorder_words":
        return (
          <div className="space-y-4">
            <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed">
              <div className="flex flex-wrap gap-2">
                {reorderedWords.map((word, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => removeWordFromSentence(index)}
                    disabled={showResult}
                  >
                    {word} <X className="h-3 w-3 ml-1" />
                  </Button>
                ))}
                {reorderedWords.length === 0 && (
                  <span className="text-muted-foreground">Drag words here to form a sentence</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addWordToSentence(word, index)}
                  disabled={showResult}
                >
                  {word}
                </Button>
              ))}
            </div>
          </div>
        );

      case "speak_prompt":
      case "scenario_response":
        return (
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border rounded-lg min-h-[100px] resize-none"
              placeholder="Type your response here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
            />
          </div>
        );

      case "match_image_text":
        return (
          <div className="space-y-4">
            {generatedImage && (
              <div className="text-center">
                <img 
                  src={generatedImage} 
                  alt="Exercise illustration" 
                  className="mx-auto rounded-lg max-w-xs"
                />
              </div>
            )}
            <div className="grid gap-2">
              {exercise.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4"
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown exercise type</div>;
    }
  };

  const canSubmit = () => {
    switch (exercise.type) {
      case "multiple_choice_audio":
      case "picture_choice":
      case "true_false":
      case "match_image_text":
        return selectedAnswer !== "";
      case "fill_blank":
      case "speak_prompt":
      case "scenario_response":
        return userInput.trim() !== "";
      case "reorder_words":
        return reorderedWords.length > 0;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {exercise.imageDesc && (
              <div className="relative">
                {isLoadingImage ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : (
                  <ImageIcon className="h-6 w-6" />
                )}
              </div>
            )}
            {exercise.promptText}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{exercise.type.replace('_', ' ')}</Badge>
            <Badge variant="outline">{exercise.xpReward} XP</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderExerciseContent()}

        {showHint && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-yellow-800">{exercise.hintText}</span>
          </div>
        )}

        {showResult && (
          <div className={`flex items-start gap-2 p-3 rounded-lg ${
            isCorrect 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {isCorrect ? (
              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <span className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? exercise.feedbackCorrect : exercise.feedbackIncorrect}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult && (
            <>
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="flex-1"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              <Button
                onClick={checkAnswer}
                disabled={!canSubmit()}
                className="flex-1"
              >
                Check Answer
              </Button>
            </>
          )}
          
          {showResult && (
            <Button
              variant="outline"
              onClick={resetExercise}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveExercise;