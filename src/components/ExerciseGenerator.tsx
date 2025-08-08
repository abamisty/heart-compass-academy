import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Crown, Target, Zap, Volume2, Eye, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import InteractiveExercise from "./InteractiveExercise";

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

interface GeneratedExercises {
  exercises: Exercise[];
}

const ExerciseGenerator = () => {
  const [skillId, setSkillId] = useState("");
  const [crownLevel, setCrownLevel] = useState("");
  const [numExercises, setNumExercises] = useState("7");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);

  const skillOptions = {
    "u1s1": "The Love Map",
    "u1s2": "The Warm Fuzzies", 
    "u1s3": "The First Step – I am Awesome!",
    "u2s1": "The Secret Codes of Caring",
    "u2s2": "Fueling Your Compass",
    "u2s3": "Mapping Your Family's Heart",
    "u3s1": "The Friendship Formula",
    "u3s2": "Bouncing Back Together",
    "u3s3": "Drawing the Line (in a friendly way)",
    "u4s1": "Stepping Into Their Shoes",
    "u4s2": "Compassion in Action",
    "u4s3": "Gracefully Receiving",
    "u5s1": "Red Flags & Green Flags",
    "u5s2": "Mending Fences",
    "u5s3": "Your Support Network"
  };

  const crownLevelDescriptions = {
    "1": "Single words & picture matches",
    "2": "Short sentences & simple grammar",
    "3": "Longer sentences + listening + basic role-play",
    "4": "Scenario branching & multi-step responses", 
    "5": "Mastery challenge (timed, mixed exercise set)"
  };

  const exerciseTypeIcons = {
    "match_image_text": Eye,
    "fill_blank": Target,
    "reorder_words": Zap,
    "multiple_choice_audio": Volume2,
    "picture_choice": Eye,
    "speak_prompt": MessageSquare,
    "true_false": Target,
    "scenario_response": MessageSquare
  };

  const generateExercises = async () => {
    if (!skillId || !crownLevel) {
      toast.error("Please select a skill and crown level");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-exercises', {
        body: {
          skillId,
          crownLevel: parseInt(crownLevel),
          numExercises: parseInt(numExercises)
        }
      });

      if (error) {
        throw error;
      }

      setGeneratedExercises(data.exercises || []);
      toast.success(`Generated ${data.exercises?.length || 0} exercises successfully!`);
      
    } catch (error) {
      console.error('Error generating exercises:', error);
      toast.error("Failed to generate exercises. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getExerciseTypeIcon = (type: string) => {
    const IconComponent = exerciseTypeIcons[type as keyof typeof exerciseTypeIcons] || Target;
    return <IconComponent className="h-4 w-4" />;
  };

  const getExerciseTypeColor = (type: string) => {
    const colors = {
      "match_image_text": "bg-blue-500",
      "fill_blank": "bg-green-500", 
      "reorder_words": "bg-purple-500",
      "multiple_choice_audio": "bg-orange-500",
      "picture_choice": "bg-pink-500",
      "speak_prompt": "bg-indigo-500",
      "true_false": "bg-yellow-500",
      "scenario_response": "bg-red-500"
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-primary">Exercise Generator</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          AI-powered exercise creation for the Compass of Love curriculum
        </p>
      </div>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Generate Lesson Exercises
          </CardTitle>
          <CardDescription>
            Select a skill and crown level to generate age-appropriate exercises
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Select value={skillId} onValueChange={setSkillId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a skill" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(skillOptions).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {id} - {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crown-level">Crown Level</Label>
              <Select value={crownLevel} onValueChange={setCrownLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(crownLevelDescriptions).map(([level, desc]) => (
                    <SelectItem key={level} value={level}>
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        Level {level} - {desc}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="num-exercises">Number of Exercises</Label>
              <Input
                id="num-exercises"
                type="number"
                min="6"
                max="8"
                value={numExercises}
                onChange={(e) => setNumExercises(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={generateExercises} 
            disabled={isGenerating || !skillId || !crownLevel}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Exercises...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Exercises
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Exercises */}
      {generatedExercises.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Interactive Exercises
              </CardTitle>
              <CardDescription>
                {skillId && skillOptions[skillId as keyof typeof skillOptions]} - Crown Level {crownLevel}
              </CardDescription>
            </CardHeader>
          </Card>
          
          <div className="grid gap-6">
            {generatedExercises.map((exercise, index) => (
              <InteractiveExercise
                key={exercise.exerciseId}
                exercise={exercise}
                onComplete={(correct, xp) => {
                  // Handle completion - could save to database, update progress, etc.
                  console.log(`Exercise ${index + 1} completed:`, { correct, xp });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseGenerator;