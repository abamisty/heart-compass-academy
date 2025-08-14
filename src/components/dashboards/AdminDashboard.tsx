import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import CourseBuilder from '@/components/admin/CourseBuilder';
import ExerciseTemplates from '@/components/admin/ExerciseTemplates';
import ContentUpload from '@/components/admin/ContentUpload';
import GamificationPanel from '@/components/admin/GamificationPanel';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Target, 
  CheckCircle,
  AlertTriangle,
  Star,
  Award,
  BookOpen
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <TabsContent value="courses">
        <CourseBuilder />
      </TabsContent>

      <TabsContent value="content">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Content Management</h2>
          <Card>
            <CardHeader>
              <CardTitle>Multimedia Content Editor</CardTitle>
              <CardDescription>
                Create rich learning experiences with text, audio, images, and video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <BookOpen className="h-8 w-8 mb-2" />
                  Text Lessons
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Award className="h-8 w-8 mb-2" />
                  Audio Content
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Star className="h-8 w-8 mb-2" />
                  Image Library
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Target className="h-8 w-8 mb-2" />
                  Video Editor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="exercises">
        <ExerciseTemplates />
      </TabsContent>

      <TabsContent value="upload">
        <ContentUpload />
      </TabsContent>

      <TabsContent value="gamification">
        <GamificationPanel />
      </TabsContent>

      <TabsContent value="analytics">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Analytics & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,891</div>
                <p className="text-xs text-muted-foreground">+12.5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Average across all courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Time spent learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="quality">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Quality Control & Testing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Approval</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Automatic approval rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </AdminLayout>
  );
};

export default AdminDashboard;