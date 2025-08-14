import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, MessageSquare, Settings, Users, Award } from 'lucide-react';
import CharacterAvatar from '@/components/shared/CharacterAvatar';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string>('child-1');

  // Mock data - replace with real data from Supabase
  const children = [
    { id: 'child-1', name: 'Emma', age: 12, avatar: '/avatars/emma.png' },
    { id: 'child-2', name: 'Jacob', age: 15, avatar: '/avatars/jacob.png' }
  ];

  const pendingApprovals = [
    {
      id: '1',
      childName: 'Emma',
      module: 'Digital Citizenship',
      branch: 'practical-skills',
      requestedAt: '2 hours ago'
    }
  ];

  const recentDiscussions = [
    {
      id: '1',
      topic: 'Sharing and Kindness',
      character: 'pearl',
      completedAt: '1 day ago',
      quality: 'excellent'
    },
    {
      id: '2',
      topic: 'Responsibility at Home',
      character: 'pax',
      completedAt: '3 days ago',
      quality: 'good'
    }
  ];

  const familyActivities = [
    {
      id: '1',
      title: 'Community Garden Project',
      character: 'samira',
      dueDate: 'This weekend',
      status: 'planned'
    },
    {
      id: '2',
      title: 'Family Budget Exercise',
      character: 'leo',
      dueDate: 'Next week',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Family Learning Hub
          </h1>
          <p className="text-muted-foreground">
            Track your children's character development journey
          </p>
        </div>

        {/* Child Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Children
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={selectedChild === child.id ? "default" : "outline"}
                  onClick={() => setSelectedChild(child.id)}
                  className="flex items-center gap-2"
                >
                  <img 
                    src={child.avatar} 
                    alt={child.name}
                    className="h-6 w-6 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.name}`;
                    }}
                  />
                  {child.name} ({child.age})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="activities">Family Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Family Values Progress */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Family Values</CardTitle>
                  <CharacterAvatar characterId="pearl" size="sm" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    4 of 5 modules completed
                  </p>
                </CardContent>
              </Card>

              {/* Character Building Progress */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Character Building</CardTitle>
                  <CharacterAvatar characterId="pax" size="sm" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">60%</div>
                  <Progress value={60} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    3 of 5 modules completed
                  </p>
                </CardContent>
              </Card>

              {/* Family XP */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Family XP</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,450</div>
                  <p className="text-xs text-muted-foreground">
                    +180 this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Your child's latest accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Completed "Empathy in Action"</p>
                      <p className="text-sm text-muted-foreground">
                        Guided by Pearl • Yesterday
                      </p>
                    </div>
                    <Badge variant="secondary">+50 XP</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Earned "Helper" Badge</p>
                      <p className="text-sm text-muted-foreground">
                        Designed by Kofi • 3 days ago
                      </p>
                    </div>
                    <Badge variant="outline">Badge</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Approvals
                </CardTitle>
                <CardDescription>
                  Modules waiting for your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{approval.module}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested by {approval.childName} • {approval.requestedAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm">
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Discussion History
                </CardTitle>
                <CardDescription>
                  Your dinner table conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiscussions.map((discussion) => (
                    <div key={discussion.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CharacterAvatar characterId={discussion.character} size="sm" />
                        <div>
                          <p className="font-medium">{discussion.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {discussion.completedAt}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={discussion.quality === 'excellent' ? 'default' : 'secondary'}
                      >
                        {discussion.quality}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Family Activity Planner</CardTitle>
                <CardDescription>
                  Real-world applications of lesson concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CharacterAvatar characterId={activity.character} size="sm" />
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {activity.dueDate}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Plan Activity
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;