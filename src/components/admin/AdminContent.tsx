import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  BookOpen, 
  Play, 
  Edit,
  Trash2,
  Plus,
  Star,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export function AdminContent() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock content data
  const courses = [
    {
      id: 1,
      title: "Math Adventures",
      description: "Fun math activities for beginners",
      ageGroup: "10-12",
      lessons: 12,
      enrollments: 342,
      completion: 87,
      rating: 4.8,
      status: "published",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Reading Heroes", 
      description: "Reading comprehension and vocabulary",
      ageGroup: "10-12",
      lessons: 15,
      enrollments: 298,
      completion: 92,
      rating: 4.9,
      status: "published",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "Science Explorer",
      description: "Interactive science experiments",
      ageGroup: "10-12", 
      lessons: 8,
      enrollments: 156,
      completion: 0,
      rating: 0,
      status: "draft",
      lastUpdated: "2024-01-20"
    }
  ];

  const exercises = [
    {
      id: 1,
      title: "Addition Practice",
      type: "multiple_choice",
      skill: "Basic Addition",
      difficulty: 1.2,
      attempts: 2456,
      successRate: 89,
      avgTime: 45,
      status: "active",
      flags: 0
    },
    {
      id: 2,
      title: "Reading Comprehension #5",
      type: "fill_blank",
      skill: "Reading",
      difficulty: 2.1,
      attempts: 1876,
      successRate: 74,
      avgTime: 120,
      status: "active",
      flags: 3
    },
    {
      id: 3,
      title: "Multiplication Challenge",
      type: "reorder_words",
      skill: "Multiplication",
      difficulty: 2.8,
      attempts: 1234,
      successRate: 62,
      avgTime: 95,
      status: "review",
      flags: 8
    }
  ];

  const contentStats = {
    totalCourses: 24,
    publishedCourses: 18,
    totalLessons: 248,
    totalExercises: 1567,
    avgRating: 4.7
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage courses, lessons, and exercises
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {contentStats.publishedCourses} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalLessons}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exercises</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalExercises.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Interactive activities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.avgRating}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">
              Needs review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content Tables */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Age Group</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">{course.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{course.ageGroup}</TableCell>
                      <TableCell>{course.lessons}</TableCell>
                      <TableCell>{course.enrollments}</TableCell>
                      <TableCell>{course.completion}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell className="font-medium">{exercise.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exercise.type}</Badge>
                      </TableCell>
                      <TableCell>{exercise.skill}</TableCell>
                      <TableCell>{exercise.difficulty}</TableCell>
                      <TableCell>{exercise.attempts.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={exercise.successRate > 80 ? 'text-green-600' : exercise.successRate > 60 ? 'text-yellow-600' : 'text-red-600'}>
                            {exercise.successRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{exercise.avgTime}s</TableCell>
                      <TableCell>
                        <Badge variant={
                          exercise.status === 'active' ? 'default' : 
                          exercise.status === 'review' ? 'destructive' : 'secondary'
                        }>
                          {exercise.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {exercise.flags > 0 ? (
                          <Badge variant="destructive">{exercise.flags}</Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}