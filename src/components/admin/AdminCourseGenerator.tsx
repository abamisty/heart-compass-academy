import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  Eye,
  ArrowRight,
  ArrowDown,
  Crown,
  Castle,
  BookOpen,
  Target,
  Zap,
  Settings
} from "lucide-react";

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  unitId: string;
  prerequisites: string[];
  maxCrownLevel: number;
  lessons: Lesson[];
  xpPerCrown: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  exercises: Exercise[];
  heartGemsReward: number;
}

interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'reorder_words' | 'match_image_text' | 'true_false' | 'short_speak';
  prompt: string;
  difficulty: number;
  xpReward: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  order: number;
  color: string;
  skills: Skill[];
}

interface Checkpoint {
  id: string;
  title: string;
  description: string;
  unitId: string;
  order: number;
  unlockRequirement: number; // Number of skills to complete
  rewards: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  difficulty: string;
  estimatedDuration: string;
  units: Unit[];
  checkpoints: Checkpoint[];
}

export function AdminCourseGenerator() {
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    ageGroup: '10-12',
    difficulty: 'Beginner',
    estimatedDuration: '4 weeks',
    units: [],
    checkpoints: []
  });

  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const exerciseTypes = [
    { value: 'multiple_choice', label: 'Multiple Choice', icon: '🔘' },
    { value: 'fill_blank', label: 'Fill in the Blank', icon: '✍️' },
    { value: 'reorder_words', label: 'Reorder Words', icon: '🔀' },
    { value: 'match_image_text', label: 'Match Image to Text', icon: '🖼️' },
    { value: 'true_false', label: 'True/False', icon: '✅' },
    { value: 'short_speak', label: 'Speaking Practice', icon: '🎤' }
  ];

  const skillIcons = ['❤️', '🧮', '📚', '🔬', '🎨', '🌍', '⭐', '🎯', '🚀', '💎'];
  const unitColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500'];

  const addUnit = () => {
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      title: `Unit ${currentCourse.units.length + 1}`,
      description: '',
      order: currentCourse.units.length,
      color: unitColors[currentCourse.units.length % unitColors.length],
      skills: []
    };
    setCurrentCourse(prev => ({
      ...prev,
      units: [...prev.units, newUnit]
    }));
  };

  const addSkill = (unitId: string) => {
    const unit = currentCourse.units.find(u => u.id === unitId);
    if (!unit) return;

    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      title: `Skill ${unit.skills.length + 1}`,
      description: '',
      icon: skillIcons[unit.skills.length % skillIcons.length],
      order: unit.skills.length,
      unitId,
      prerequisites: [],
      maxCrownLevel: 5,
      lessons: [],
      xpPerCrown: 100
    };

    setCurrentCourse(prev => ({
      ...prev,
      units: prev.units.map(u => 
        u.id === unitId 
          ? { ...u, skills: [...u.skills, newSkill] }
          : u
      )
    }));
  };

  const addLesson = (skillId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: `Lesson ${Date.now()}`,
      description: '',
      order: 0,
      exercises: [],
      heartGemsReward: 25
    };

    setCurrentCourse(prev => ({
      ...prev,
      units: prev.units.map(unit => ({
        ...unit,
        skills: unit.skills.map(skill => 
          skill.id === skillId 
            ? { ...skill, lessons: [...skill.lessons, newLesson] }
            : skill
        )
      }))
    }));
  };

  const addCheckpoint = (unitId: string) => {
    const newCheckpoint: Checkpoint = {
      id: `checkpoint-${Date.now()}`,
      title: `Checkpoint ${currentCourse.checkpoints.length + 1}`,
      description: 'Complete this checkpoint to unlock new content!',
      unitId,
      order: currentCourse.checkpoints.length,
      unlockRequirement: 3,
      rewards: ['50 Heart Gems', 'Achievement Badge']
    };

    setCurrentCourse(prev => ({
      ...prev,
      checkpoints: [...prev.checkpoints, newCheckpoint]
    }));
  };

  const generateCourseStructure = async () => {
    if (!currentCourse.title || !currentCourse.description) {
      toast.error("Please fill in course title and description first");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating course structure...");
    
    try {
      // Create comprehensive course structure
      const generatedUnits: Unit[] = [
      {
        id: 'unit-love-basics',
        title: 'Love & Care Basics',
        description: 'Understanding fundamental expressions of love and care',
        order: 0,
        color: 'bg-pink-500',
        skills: [
          {
            id: 'skill-love-map',
            title: 'The Love Map',
            description: 'Recognize simple love actions',
            icon: '❤️',
            order: 0,
            unitId: 'unit-love-basics',
            prerequisites: [],
            maxCrownLevel: 5,
            xpPerCrown: 100,
            lessons: [
              {
                id: 'lesson-love-actions',
                title: 'Recognizing Love Actions',
                description: 'Learn to identify 6 simple love actions',
                order: 0,
                heartGemsReward: 25,
                exercises: [
                  {
                    id: 'ex-1',
                    type: 'match_image_text',
                    prompt: 'Match the picture that shows love',
                    difficulty: 1.0,
                    xpReward: 10
                  },
                  {
                    id: 'ex-2',
                    type: 'multiple_choice',
                    prompt: 'Which one is NOT a way to show love?',
                    difficulty: 1.0,
                    xpReward: 10
                  }
                ]
              }
            ]
          },
          {
            id: 'skill-gratitude',
            title: 'Expressing Gratitude',
            description: 'Learn to say thank you meaningfully',
            icon: '🙏',
            order: 1,
            unitId: 'unit-love-basics',
            prerequisites: ['skill-love-map'],
            maxCrownLevel: 5,
            xpPerCrown: 100,
            lessons: []
          }
        ]
      },
      {
        id: 'unit-family-bonds',
        title: 'Family Connections',
        description: 'Building stronger family relationships',
        order: 1,
        color: 'bg-blue-500',
        skills: []
      }
    ];

    const generatedCheckpoints: Checkpoint[] = [
      {
        id: 'checkpoint-1',
        title: 'Love Language Castle',
        description: 'Master the basics of showing love!',
        unitId: 'unit-love-basics',
        order: 0,
        unlockRequirement: 2,
        rewards: ['Love Language Badge', '100 Heart Gems', 'Family Photo Frame']
      }
    ];

      setCurrentCourse(prev => ({
        ...prev,
        units: generatedUnits,
        checkpoints: generatedCheckpoints
      }));
      
      toast.success("Course structure generated successfully!");
    } catch (error) {
      console.error("Error generating course:", error);
      toast.error("Failed to generate course structure");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateExercises = async () => {
    if (currentCourse.units.length === 0) {
      toast.error("Please create some units and skills first");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating exercises for course...");

    try {
      const updatedUnits = [...currentCourse.units];
      
      for (const unit of updatedUnits) {
        for (const skill of unit.skills) {
          if (skill.lessons.length === 0) {
            // Add a default lesson if none exists
            skill.lessons.push({
              id: `lesson-${Date.now()}-${Math.random()}`,
              title: `${skill.title} Practice`,
              description: `Practice exercises for ${skill.title}`,
              order: 0,
              exercises: [],
              heartGemsReward: 25
            });
          }
          
          for (const lesson of skill.lessons) {
            if (lesson.exercises.length === 0) {
              // Generate exercises using AI
              const { data, error } = await supabase.functions.invoke('generate-exercises', {
                body: {
                  topic: skill.title,
                  skillDescription: skill.description,
                  ageGroup: currentCourse.ageGroup,
                  difficulty: currentCourse.difficulty,
                  exerciseCount: 5
                }
              });

              if (error) {
                console.error("Error generating exercises:", error);
                continue;
              }

              if (data?.exercises) {
                lesson.exercises = data.exercises.map((ex: any, index: number) => ({
                  id: `ex-${Date.now()}-${index}`,
                  type: ex.type || 'multiple_choice',
                  prompt: ex.prompt || ex.question,
                  difficulty: 1.0,
                  xpReward: 10
                }));
              }
            }
          }
        }
      }

      setCurrentCourse(prev => ({
        ...prev,
        units: updatedUnits
      }));

      toast.success("Exercises generated successfully!");
    } catch (error) {
      console.error("Error generating exercises:", error);
      toast.error("Failed to generate exercises");
    } finally {
      setIsGenerating(false);
    }
  };

  const LearningPathPreview = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{currentCourse.title}</h2>
        <p className="text-muted-foreground">{currentCourse.description}</p>
        <div className="flex justify-center gap-4 mt-4">
          <Badge>{currentCourse.ageGroup} years</Badge>
          <Badge variant="outline">{currentCourse.difficulty}</Badge>
          <Badge variant="secondary">{currentCourse.estimatedDuration}</Badge>
        </div>
      </div>

      <div className="space-y-8">
        {currentCourse.units.map((unit, unitIndex) => (
          <div key={unit.id} className="space-y-4">
            {/* Unit Header */}
            <div className={`p-4 rounded-lg text-white ${unit.color}`}>
              <h3 className="text-xl font-bold">{unit.title}</h3>
              <p className="opacity-90">{unit.description}</p>
            </div>

            {/* Skills in Path Format */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
              {unit.skills.map((skill, skillIndex) => (
                <div key={skill.id} className="relative">
                  {/* Skill Node */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{skill.icon}</div>
                      <h4 className="font-medium mb-1">{skill.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                      <div className="flex justify-center gap-1">
                        {Array.from({ length: skill.maxCrownLevel }).map((_, i) => (
                          <Crown key={i} className="w-3 h-3 text-yellow-500" />
                        ))}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {skill.lessons.length} lessons
                      </Badge>
                    </CardContent>
                  </Card>

                  {/* Connection Lines */}
                  {skillIndex < unit.skills.length - 1 && (
                    <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Checkpoint */}
            {currentCourse.checkpoints.some(cp => cp.unitId === unit.id) && (
              <div className="flex justify-center mt-8">
                <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Castle className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-bold text-purple-800">
                      {currentCourse.checkpoints.find(cp => cp.unitId === unit.id)?.title}
                    </h4>
                    <p className="text-sm text-purple-600 mt-1">
                      Complete checkpoint to continue
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Unit Connector */}
            {unitIndex < currentCourse.units.length - 1 && (
              <div className="flex justify-center py-4">
                <ArrowDown className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create Duolingo-style learning paths with skills, lessons, and checkpoints
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview Path'}
          </Button>
          <Button onClick={generateCourseStructure} disabled={isGenerating}>
            <Zap className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "AI Generate Course"}
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Course
          </Button>
        </div>
      </div>

      {previewMode ? (
        <LearningPathPreview />
      ) : (
        <Tabs defaultValue="structure" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="structure">Course Structure</TabsTrigger>
            <TabsTrigger value="settings">Course Settings</TabsTrigger>
            <TabsTrigger value="content">Content Generation</TabsTrigger>
            <TabsTrigger value="preview">Preview & Export</TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Path Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentCourse.units.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      No units created yet. Start building your learning path!
                    </div>
                    <Button onClick={addUnit}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Unit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {currentCourse.units.map((unit, index) => (
                      <Card key={unit.id} className="border-l-4" style={{ borderLeftColor: unit.color.replace('bg-', '#') }}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <Input
                                value={unit.title}
                                onChange={(e) => {
                                  setCurrentCourse(prev => ({
                                    ...prev,
                                    units: prev.units.map(u => 
                                      u.id === unit.id ? { ...u, title: e.target.value } : u
                                    )
                                  }));
                                }}
                                className="font-bold text-lg border-none p-0 bg-transparent"
                              />
                              <Textarea
                                value={unit.description}
                                onChange={(e) => {
                                  setCurrentCourse(prev => ({
                                    ...prev,
                                    units: prev.units.map(u => 
                                      u.id === unit.id ? { ...u, description: e.target.value } : u
                                    )
                                  }));
                                }}
                                placeholder="Unit description..."
                                className="mt-2 border-none p-0 bg-transparent resize-none"
                                rows={2}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => addSkill(unit.id)}>
                                <Plus className="w-4 h-4 mr-1" />
                                Add Skill
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => addCheckpoint(unit.id)}>
                                <Castle className="w-4 h-4 mr-1" />
                                Add Checkpoint
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {unit.skills.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No skills in this unit yet
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {unit.skills.map((skill) => (
                                <Card key={skill.id} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-2xl">{skill.icon}</span>
                                      <Input
                                        value={skill.title}
                                        onChange={(e) => {
                                          setCurrentCourse(prev => ({
                                            ...prev,
                                            units: prev.units.map(u => 
                                              u.id === unit.id 
                                                ? { 
                                                    ...u, 
                                                    skills: u.skills.map(s => 
                                                      s.id === skill.id ? { ...s, title: e.target.value } : s
                                                    ) 
                                                  }
                                                : u
                                            )
                                          }));
                                        }}
                                        className="font-medium border-none p-0 bg-transparent"
                                      />
                                    </div>
                                    <Textarea
                                      value={skill.description}
                                      onChange={(e) => {
                                        setCurrentCourse(prev => ({
                                          ...prev,
                                          units: prev.units.map(u => 
                                            u.id === unit.id 
                                              ? { 
                                                  ...u, 
                                                  skills: u.skills.map(s => 
                                                    s.id === skill.id ? { ...s, description: e.target.value } : s
                                                  ) 
                                                }
                                              : u
                                          )
                                        }));
                                      }}
                                      placeholder="Skill description..."
                                      className="text-sm border-none p-0 bg-transparent resize-none"
                                      rows={2}
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                      <div className="flex gap-1">
                                        {Array.from({ length: skill.maxCrownLevel }).map((_, i) => (
                                          <Crown key={i} className="w-3 h-3 text-yellow-500" />
                                        ))}
                                      </div>
                                      <Button variant="ghost" size="sm" onClick={() => addLesson(skill.id)}>
                                        <Plus className="w-3 h-3 mr-1" />
                                        Lesson
                                      </Button>
                                    </div>
                                    <Badge variant="outline" className="mt-2">
                                      {skill.lessons.length} lessons
                                    </Badge>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    <div className="flex justify-center">
                      <Button onClick={addUnit} variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Unit
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Course Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="course-title">Course Title</Label>
                      <Input
                        id="course-title"
                        value={currentCourse.title}
                        onChange={(e) => setCurrentCourse(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Love Languages for Kids"
                      />
                    </div>
                    <div>
                      <Label htmlFor="course-description">Course Description</Label>
                      <Textarea
                        id="course-description"
                        value={currentCourse.description}
                        onChange={(e) => setCurrentCourse(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what children will learn in this course..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="age-group">Age Group</Label>
                      <Select value={currentCourse.ageGroup} onValueChange={(value) => setCurrentCourse(prev => ({ ...prev, ageGroup: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-8">6-8 years</SelectItem>
                          <SelectItem value="8-10">8-10 years</SelectItem>
                          <SelectItem value="10-12">10-12 years</SelectItem>
                          <SelectItem value="12-14">12-14 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select value={currentCourse.difficulty} onValueChange={(value) => setCurrentCourse(prev => ({ ...prev, difficulty: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Estimated Duration</Label>
                      <Select value={currentCourse.estimatedDuration} onValueChange={(value) => setCurrentCourse(prev => ({ ...prev, estimatedDuration: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="4 weeks">4 weeks</SelectItem>
                          <SelectItem value="6 weeks">6 weeks</SelectItem>
                          <SelectItem value="8 weeks">8 weeks</SelectItem>
                          <SelectItem value="12 weeks">12 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Use AI to automatically generate lesson content and exercises for your course structure
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button variant="outline" onClick={generateCourseStructure} disabled={isGenerating}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Full Course"}
                    </Button>
                    <Button variant="outline" onClick={generateExercises} disabled={isGenerating}>
                      <Target className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Exercises"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <LearningPathPreview />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}