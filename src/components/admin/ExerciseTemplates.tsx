import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Mic, 
  Volume2, 
  Image as ImageIcon, 
  CheckCircle,
  XCircle,
  Shuffle,
  Target,
  Brain,
  Headphones,
  PenTool,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ExerciseTemplate {
  id: string;
  name: string;
  type: 'multiple-choice' | 'translation' | 'listening' | 'speaking' | 'matching' | 'fill-blank' | 'ordering';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number; // seconds
  xpReward: number;
  configuration: any;
  usageCount: number;
}

interface Exercise {
  id: string;
  templateId: string;
  question: string;
  content: any;
  correctAnswer: string | string[];
  options?: string[];
  hints?: string[];
  feedback: {
    correct: string;
    incorrect: string;
  };
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
    alt?: string;
  };
}

const ExerciseTemplates: React.FC = () => {
  const { toast } = useToast();
  
  const [templates] = useState<ExerciseTemplate[]>([
    {
      id: '1',
      name: 'Multiple Choice',
      type: 'multiple-choice',
      description: 'Select the correct answer from multiple options',
      difficulty: 'Easy',
      estimatedTime: 30,
      xpReward: 10,
      configuration: { maxOptions: 4, randomizeOptions: true },
      usageCount: 145
    },
    {
      id: '2',
      name: 'Audio Translation',
      type: 'listening',
      description: 'Listen and type what you hear',
      difficulty: 'Medium',
      estimatedTime: 45,
      xpReward: 20,
      configuration: { playbackSpeed: 1.0, maxAttempts: 3 },
      usageCount: 87
    },
    {
      id: '3',
      name: 'Speaking Practice',
      type: 'speaking',
      description: 'Pronounce the word correctly',
      difficulty: 'Hard',
      estimatedTime: 60,
      xpReward: 30,
      configuration: { confidenceThreshold: 0.8, maxDuration: 10 },
      usageCount: 62
    },
    {
      id: '4',
      name: 'Word Matching',
      type: 'matching',
      description: 'Match words with their meanings',
      difficulty: 'Medium',
      estimatedTime: 40,
      xpReward: 15,
      configuration: { pairCount: 5, shufflePairs: true },
      usageCount: 98
    },
    {
      id: '5',
      name: 'Fill in the Blanks',
      type: 'fill-blank',
      description: 'Complete the sentence with missing words',
      difficulty: 'Medium',
      estimatedTime: 35,
      xpReward: 15,
      configuration: { maxBlanks: 3, caseSensitive: false },
      usageCount: 73
    },
    {
      id: '6',
      name: 'Sentence Ordering',
      type: 'ordering',
      description: 'Put words in the correct order',
      difficulty: 'Hard',
      estimatedTime: 50,
      xpReward: 25,
      configuration: { maxWords: 8, partialCredit: true },
      usageCount: 54
    }
  ]);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 'ex1',
      templateId: '1',
      question: 'What is the best practice for creating strong passwords?',
      content: {},
      correctAnswer: 'Use a combination of letters, numbers, and symbols',
      options: [
        'Use a combination of letters, numbers, and symbols',
        'Use only your birthday',
        'Use the same password everywhere',
        'Use only lowercase letters'
      ],
      hints: ['Think about what makes a password hard to guess'],
      feedback: {
        correct: 'Excellent! Strong passwords should be complex and unique.',
        incorrect: 'Try again. Strong passwords need multiple character types.'
      }
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<ExerciseTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newExercise, setNewExercise] = useState({
    question: '',
    correctAnswer: '',
    options: ['', '', '', ''],
    hints: [''],
    feedback: { correct: '', incorrect: '' }
  });

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return <CheckCircle className="h-5 w-5" />;
      case 'translation': return <MessageSquare className="h-5 w-5" />;
      case 'listening': return <Headphones className="h-5 w-5" />;
      case 'speaking': return <Mic className="h-5 w-5" />;
      case 'matching': return <Target className="h-5 w-5" />;
      case 'fill-blank': return <PenTool className="h-5 w-5" />;
      case 'ordering': return <ArrowRight className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateExercise = (template: ExerciseTemplate) => {
    setSelectedTemplate(template);
    setIsCreating(true);
    setNewExercise({
      question: '',
      correctAnswer: '',
      options: ['', '', '', ''],
      hints: [''],
      feedback: { correct: '', incorrect: '' }
    });
  };

  const handleSaveExercise = () => {
    if (!newExercise.question || !newExercise.correctAnswer) {
      toast({
        title: "Missing Information",
        description: "Please fill in the question and correct answer.",
        variant: "destructive",
      });
      return;
    }

    const exercise: Exercise = {
      id: Date.now().toString(),
      templateId: selectedTemplate!.id,
      question: newExercise.question,
      content: {},
      correctAnswer: newExercise.correctAnswer,
      options: selectedTemplate!.type === 'multiple-choice' ? newExercise.options.filter(o => o.trim()) : undefined,
      hints: newExercise.hints.filter(h => h.trim()),
      feedback: newExercise.feedback
    };

    setExercises(prev => [exercise, ...prev]);
    setIsCreating(false);
    setSelectedTemplate(null);

    toast({
      title: "Exercise Created",
      description: "Your exercise has been saved successfully.",
    });
  };

  const renderExerciseForm = () => {
    if (!selectedTemplate) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getTemplateIcon(selectedTemplate.type)}
            Create {selectedTemplate.name} Exercise
          </CardTitle>
          <CardDescription>{selectedTemplate.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question/Prompt *</label>
            <Textarea
              placeholder="Enter your question or prompt here..."
              value={newExercise.question}
              onChange={(e) => setNewExercise(prev => ({ ...prev, question: e.target.value }))}
              rows={3}
            />
          </div>

          {selectedTemplate.type === 'multiple-choice' && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Answer Options</label>
              {newExercise.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newExercise.options];
                      newOptions[index] = e.target.value;
                      setNewExercise(prev => ({ ...prev, options: newOptions }));
                    }}
                  />
                  <Checkbox
                    checked={newExercise.correctAnswer === option}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewExercise(prev => ({ ...prev, correctAnswer: option }));
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">Correct</span>
                </div>
              ))}
            </div>
          )}

          {selectedTemplate.type !== 'multiple-choice' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Correct Answer *</label>
              <Input
                placeholder="Enter the correct answer..."
                value={newExercise.correctAnswer}
                onChange={(e) => setNewExercise(prev => ({ ...prev, correctAnswer: e.target.value }))}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Success Feedback</label>
              <Textarea
                placeholder="Message when answer is correct..."
                value={newExercise.feedback.correct}
                onChange={(e) => setNewExercise(prev => ({ 
                  ...prev, 
                  feedback: { ...prev.feedback, correct: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Error Feedback</label>
              <Textarea
                placeholder="Message when answer is incorrect..."
                value={newExercise.feedback.incorrect}
                onChange={(e) => setNewExercise(prev => ({ 
                  ...prev, 
                  feedback: { ...prev.feedback, incorrect: e.target.value }
                }))}
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hints (Optional)</label>
            {newExercise.hints.map((hint, index) => (
              <Input
                key={index}
                placeholder={`Hint ${index + 1}`}
                value={hint}
                onChange={(e) => {
                  const newHints = [...newExercise.hints];
                  newHints[index] = e.target.value;
                  setNewExercise(prev => ({ ...prev, hints: newHints }));
                }}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewExercise(prev => ({ ...prev, hints: [...prev.hints, ''] }))}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Hint
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveExercise}>
              Save Exercise
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Exercise Templates Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Exercise Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTemplateIcon(template.type)}
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{template.estimatedTime}s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">XP Reward:</span>
                    <span>{template.xpReward} XP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used:</span>
                    <span>{template.usageCount} times</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleCreateExercise(template)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exercise Creation Form */}
      {isCreating && renderExerciseForm()}

      {/* Created Exercises */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Created Exercises ({exercises.length})</h2>
        <div className="space-y-4">
          {exercises.map((exercise) => {
            const template = templates.find(t => t.id === exercise.templateId);
            return (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {template && getTemplateIcon(template.type)}
                      <div>
                        <CardTitle className="text-lg">{exercise.question}</CardTitle>
                        <CardDescription>
                          {template?.name} • {template?.xpReward} XP
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Correct Answer: </span>
                      <span className="text-sm text-green-600">{exercise.correctAnswer}</span>
                    </div>
                    {exercise.options && (
                      <div>
                        <span className="text-sm font-medium">Options: </span>
                        <span className="text-sm text-muted-foreground">
                          {exercise.options.join(', ')}
                        </span>
                      </div>
                    )}
                    {exercise.hints && exercise.hints.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Hints: </span>
                        <span className="text-sm text-muted-foreground">
                          {exercise.hints.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExerciseTemplates;