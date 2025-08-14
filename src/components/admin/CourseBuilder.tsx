import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowRight, 
  Lock,
  Unlock,
  Star,
  Clock,
  Users,
  BookOpen,
  Target,
  Award,
  Settings
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CharacterAvatar from '@/components/shared/CharacterAvatar';
import { PENGUIN_FAMILY, HUMAN_CHARACTERS } from '@/types/characters';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  modules: Module[];
  prerequisites: string[];
  xpReward: number;
  published: boolean;
  enrolledStudents: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  unlocked: boolean;
  completionRequirement: number; // percentage needed to unlock next module
  character: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'exercise' | 'reading';
  estimatedMinutes: number;
  xpReward: number;
  exercises: string[]; // exercise IDs
  prerequisites: string[];
  published: boolean;
}

const CourseBuilder: React.FC = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Digital Citizenship Fundamentals',
      description: 'Learn responsible online behavior and digital ethics',
      difficulty: 'Beginner',
      estimatedHours: 12,
      modules: [
        {
          id: 'm1',
          title: 'Online Safety Basics',
          description: 'Understanding digital privacy and security',
          lessons: [
            {
              id: 'l1',
              title: 'Password Security',
              type: 'interactive',
              estimatedMinutes: 15,
              xpReward: 50,
              exercises: ['e1', 'e2'],
              prerequisites: [],
              published: true
            },
            {
              id: 'l2',
              title: 'Social Media Privacy',
              type: 'video',
              estimatedMinutes: 20,
              xpReward: 75,
              exercises: ['e3'],
              prerequisites: ['l1'],
              published: true
            }
          ],
          unlocked: true,
          completionRequirement: 80,
          character: 'pax'
        }
      ],
      prerequisites: [],
      xpReward: 500,
      published: true,
      enrolledStudents: 156
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner' as const,
    estimatedHours: 10
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
      modules: [],
      prerequisites: [],
      xpReward: newCourse.estimatedHours * 50,
      published: false,
      enrolledStudents: 0
    };

    setCourses(prev => [course, ...prev]);
    setNewCourse({ title: '', description: '', difficulty: 'Beginner', estimatedHours: 10 });
    
    toast({
      title: "Course Created",
      description: `"${course.title}" has been created successfully.`,
    });
  };

  const handleAddModule = (courseId: string) => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      lessons: [],
      unlocked: true,
      completionRequirement: 80,
      character: 'pax'
    };

    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, modules: [...course.modules, newModule] }
        : course
    ));
  };

  const handleAddLesson = (courseId: string, moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      type: 'interactive',
      estimatedMinutes: 15,
      xpReward: 50,
      exercises: [],
      prerequisites: [],
      published: false
    };

    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? {
            ...course,
            modules: course.modules.map(module =>
              module.id === moduleId
                ? { ...module, lessons: [...module.lessons, newLesson] }
                : module
            )
          }
        : course
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      case 'exercise': return '📝';
      case 'reading': return '📖';
      default: return '📚';
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Creation */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
          <CardDescription>
            Build a structured learning path with modules and lessons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Title *</label>
              <Input 
                placeholder="e.g., Digital Citizenship"
                value={newCourse.title}
                onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select 
                value={newCourse.difficulty} 
                onValueChange={(value: any) => setNewCourse(prev => ({ ...prev, difficulty: value }))}
              >
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea 
              placeholder="Describe what students will learn..."
              value={newCourse.description}
              onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Estimated Hours</label>
            <Input 
              type="number"
              min="1"
              max="100"
              value={newCourse.estimatedHours}
              onChange={(e) => setNewCourse(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 10 }))}
            />
          </div>
          <Button onClick={handleCreateCourse} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </CardContent>
      </Card>

      {/* Course List & Builder */}
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {course.title}
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    {course.published ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.estimatedHours}h
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.enrolledStudents} students
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {course.xpReward} XP
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.modules.length} modules
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Modules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Learning Path</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddModule(course.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                              {moduleIndex + 1}
                            </div>
                            <CharacterAvatar characterId={module.character} size="sm" />
                          </div>
                          <div>
                            <h5 className="font-medium">{module.title}</h5>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {module.unlocked ? (
                            <Unlock className="h-4 w-4 text-green-600" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-400" />
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Lessons */}
                      <div className="space-y-2 ml-11">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center justify-between p-2 border rounded bg-background">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{getLessonTypeIcon(lesson.type)}</span>
                              <div>
                                <span className="font-medium text-sm">{lesson.title}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {lesson.estimatedMinutes}min
                                  <Award className="h-3 w-3" />
                                  {lesson.xpReward}XP
                                  {lesson.prerequisites.length > 0 && (
                                    <>
                                      <Lock className="h-3 w-3" />
                                      Prerequisites
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {lesson.published && (
                                <Badge variant="outline" className="text-xs">Live</Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-dashed"
                          onClick={() => handleAddLesson(course.id, module.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseBuilder;