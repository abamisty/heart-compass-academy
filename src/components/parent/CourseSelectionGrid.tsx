import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Users, Star, Search, Filter } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  duration: string;
  difficulty: string;
  category: string;
  rating: number;
  enrolled: number;
  imageUrl?: string;
}

interface CourseSelectionGridProps {
  selectedChild: any;
  onCourseEnroll: (courseId: string, childId: number) => void;
}

export const CourseSelectionGrid = ({ selectedChild, onCourseEnroll }: CourseSelectionGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const courses: Course[] = [
    {
      id: "1",
      title: "Character Values Foundations",
      description: "Learn core values like honesty, kindness, and respect through interactive stories and activities",
      ageGroup: "6-10",
      duration: "4 weeks",
      difficulty: "Beginner",
      category: "Character Building",
      rating: 4.8,
      enrolled: 1250
    },
    {
      id: "2",
      title: "Financial Literacy & Sales Skills",
      description: "Understand money management and develop basic entrepreneurial skills",
      ageGroup: "11-15",
      duration: "6 weeks",
      difficulty: "Intermediate",
      category: "Life Skills",
      rating: 4.6,
      enrolled: 890
    },
    {
      id: "3",
      title: "Public Speaking Confidence",
      description: "Build confidence in expressing ideas and opinions through guided practice",
      ageGroup: "13-18",
      duration: "8 weeks",
      difficulty: "Advanced",
      category: "Communication",
      rating: 4.9,
      enrolled: 670
    },
    {
      id: "4",
      title: "Digital Citizenship",
      description: "Navigate online relationships and digital responsibility safely",
      ageGroup: "10-16",
      duration: "4 weeks",
      difficulty: "Beginner",
      category: "Digital Skills",
      rating: 4.7,
      enrolled: 1100
    },
    {
      id: "5",
      title: "Emotional Intelligence Mastery",
      description: "Advanced emotional awareness and management skills for better relationships",
      ageGroup: "14-18",
      duration: "10 weeks",
      difficulty: "Advanced",
      category: "Character Building",
      rating: 4.8,
      enrolled: 450
    },
    {
      id: "6",
      title: "Creative Problem Solving",
      description: "Develop innovative thinking and solution-finding abilities",
      ageGroup: "8-14",
      duration: "5 weeks",
      difficulty: "Intermediate",
      category: "Critical Thinking",
      rating: 4.5,
      enrolled: 780
    }
  ];

  const categories = ["all", "Character Building", "Life Skills", "Communication", "Digital Skills", "Critical Thinking"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === "all" ? "All Levels" : difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="card-hover group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Ages {course.ageGroup}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrolled} enrolled
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onCourseEnroll(course.id, selectedChild.id)}
                >
                  Enroll {selectedChild.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};