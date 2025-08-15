import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Crown, 
  Lock, 
  Star, 
  Trophy, 
  Heart,
  Zap,
  Target,
  CheckCircle2,
  Play
} from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  max_crown_level: number;
  xp_per_crown: number;
  unit_id: string;
  prerequisite_skills: string[] | null;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  order_index: number;
  course_id: string;
  skills: Skill[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  age_group: string;
  difficulty: string;
  units: Unit[];
}

interface UserSkillProgress {
  skill_id: string;
  crown_level: number;
  total_xp: number;
  state: 'locked' | 'available' | 'completed' | 'unlocked' | 'mastered';
}

interface DuolingoStyleLearningPathProps {
  selectedChild: any;
  courseId?: string;
}

export const DuolingoStyleLearningPath = ({ selectedChild, courseId }: DuolingoStyleLearningPathProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserSkillProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCoursesAndProgress();
  }, [selectedChild]);

  const fetchCoursesAndProgress = async () => {
    try {
      setLoading(true);
      
      // Fetch courses with units and skills
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          units (
            *,
            skills (*)
          )
        `)
        .order('created_at', { ascending: true });

      if (coursesError) throw coursesError;

      // Fetch user progress for the selected child
      const { data: progressData, error: progressError } = await supabase
        .from('user_skill_progress')
        .select('*')
        .eq('child_id', selectedChild?.id);

      if (progressError) throw progressError;

      setCourses(coursesData || []);
      setUserProgress(progressData || []);
      
      // Set selected course (either provided courseId or first course)
      if (coursesData?.length > 0) {
        const courseToSelect = courseId 
          ? coursesData.find(c => c.id === courseId) 
          : coursesData[0];
        setSelectedCourse(courseToSelect || null);
      }
    } catch (error) {
      console.error('Error fetching courses and progress:', error);
      toast.error('Failed to load learning path');
    } finally {
      setLoading(false);
    }
  };

  const getSkillProgress = (skillId: string): UserSkillProgress => {
    return userProgress.find(p => p.skill_id === skillId) || {
      skill_id: skillId,
      crown_level: 0,
      total_xp: 0,
      state: 'available'
    };
  };

  const getSkillIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      heart: Heart,
      star: Star,
      crown: Crown,
      book: BookOpen,
      trophy: Trophy,
      target: Target,
      zap: Zap
    };
    
    const IconComponent = iconMap[iconName] || Heart;
    return <IconComponent className="w-6 h-6" />;
  };

  const getSkillState = (skill: Skill): 'locked' | 'available' | 'completed' | 'golden' => {
    const progress = getSkillProgress(skill.id);
    
    if (progress.crown_level >= skill.max_crown_level) return 'golden';
    if (progress.crown_level > 0) return 'completed';
    
    // Check prerequisites
    if (skill.prerequisite_skills && skill.prerequisite_skills.length > 0) {
      const allPrereqsCompleted = skill.prerequisite_skills.every(prereqId => {
        const prereqProgress = getSkillProgress(prereqId);
        return prereqProgress.crown_level > 0;
      });
      return allPrereqsCompleted ? 'available' : 'locked';
    }
    
    return 'available';
  };

  const getSkillStyle = (state: string) => {
    switch (state) {
      case 'golden':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg scale-105 border-2 border-yellow-300';
      case 'completed':
        return 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md border-2 border-green-300';
      case 'available':
        return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md hover:scale-105 transition-transform border-2 border-blue-300';
      case 'locked':
        return 'bg-gray-300 text-gray-600 border-2 border-gray-200';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const handleSkillClick = (skill: Skill) => {
    const state = getSkillState(skill);
    if (state === 'locked') {
      toast.error('Complete previous skills to unlock this one!');
      return;
    }
    
    toast.success(`Starting ${skill.title}!`);
    // Here you would navigate to the skill practice
  };

  const renderCrownProgress = (skill: Skill) => {
    const progress = getSkillProgress(skill.id);
    const crowns = [];
    
    for (let i = 0; i < skill.max_crown_level; i++) {
      crowns.push(
        <Crown
          key={i}
          className={`w-3 h-3 ${
            i < progress.crown_level 
              ? 'text-yellow-500 fill-current' 
              : 'text-gray-300'
          }`}
        />
      );
    }
    
    return <div className="flex justify-center gap-1">{crowns}</div>;
  };

  const generateSkillPath = (skills: Skill[]) => {
    // Sort skills by order_index
    const sortedSkills = [...skills].sort((a, b) => a.order_index - b.order_index);
    
    return sortedSkills.map((skill, index) => {
      const state = getSkillState(skill);
      const isEven = index % 2 === 0;
      
      return (
        <div key={skill.id} className="relative">
          {/* Connecting line */}
          {index < sortedSkills.length - 1 && (
            <div className="absolute top-20 left-1/2 w-1 h-16 bg-gray-300 transform -translate-x-1/2 z-0" />
          )}
          
          {/* Skill node */}
          <div className={`relative z-10 flex ${isEven ? 'justify-start' : 'justify-end'} mb-20`}>
            <div className={`${isEven ? 'ml-4' : 'mr-4'}`}>
              <Card 
                className={`w-20 h-20 cursor-pointer transition-all duration-300 ${getSkillStyle(state)}`}
                onClick={() => handleSkillClick(skill)}
              >
                <CardContent className="p-0 h-full flex flex-col items-center justify-center">
                  {state === 'locked' ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    getSkillIcon(skill.icon)
                  )}
                </CardContent>
              </Card>
              
              {/* Crown progress */}
              <div className="mt-2">
                {renderCrownProgress(skill)}
              </div>
              
              {/* Skill title */}
              <div className="text-center mt-1">
                <span className="text-xs font-medium text-gray-700 block max-w-20 truncate">
                  {skill.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No course selected</h3>
        <p className="text-muted-foreground">Select a course to start learning</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Course Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h1>
        <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
        
        {/* Course selection dropdown if multiple courses */}
        {courses.length > 1 && (
          <div className="flex justify-center gap-2 mb-6">
            {courses.map(course => (
              <Button
                key={course.id}
                variant={course.id === selectedCourse.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCourse(course)}
              >
                {course.title}
              </Button>
            ))}
          </div>
        )}
        
        {/* Overall progress */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">🔥 7</div>
              <div className="text-sm text-gray-600">Day streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">❤️ 5</div>
              <div className="text-sm text-gray-600">Hearts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">💎 120</div>
              <div className="text-sm text-gray-600">Gems</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="relative">
        {selectedCourse.units
          ?.sort((a, b) => a.order_index - b.order_index)
          .map(unit => (
            <div key={unit.id} className="mb-12">
              {/* Unit header */}
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Unit {unit.order_index + 1}: {unit.title}
                  </h2>
                  <p className="text-gray-600">{unit.description}</p>
                </div>
              </div>
              
              {/* Skills path */}
              <div className="flex flex-col items-center">
                {generateSkillPath(unit.skills || [])}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};