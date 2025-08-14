import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Eye,
  Palette,
  MessageSquare,
  Shield,
  TrendingUp
} from 'lucide-react';
import CharacterAvatar from '@/components/shared/CharacterAvatar';
import { PENGUIN_FAMILY, HUMAN_CHARACTERS } from '@/types/characters';

const AdminDashboard: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('pax');

  // Mock admin data
  const adminStats = {
    totalFamilies: 1247,
    activeStudents: 3891,
    completedModules: 15678,
    averageEngagement: 87
  };

  const recentActivity = [
    { id: '1', action: 'New module created', user: 'Content Team', time: '2 hours ago' },
    { id: '2', action: 'Discussion quality improved', user: 'AI System', time: '4 hours ago' },
    { id: '3', action: 'Family enrolled', user: 'Parent Portal', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Enteteye Academy Admin
          </h1>
          <p className="text-muted-foreground">
            Professional curriculum and content management
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Families</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalFamilies.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.completedModules.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.averageEngagement}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="curriculum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Curriculum Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Module
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Age Band Customization */}
              <Card>
                <CardHeader>
                  <CardTitle>Age Band Customization</CardTitle>
                  <CardDescription>
                    Adjust content complexity for different age groups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age Group</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-12">10-12 years</SelectItem>
                        <SelectItem value="13-15">13-15 years</SelectItem>
                        <SelectItem value="16-18">16-18 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Complexity Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </CardContent>
              </Card>

              {/* Cultural Adaptation */}
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Adaptation</CardTitle>
                  <CardDescription>
                    Customize content for different cultural contexts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cultural Context</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cultural context" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="western">Western</SelectItem>
                        <SelectItem value="eastern">Eastern</SelectItem>
                        <SelectItem value="african">African</SelectItem>
                        <SelectItem value="latin">Latin American</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value Emphasis</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emphasis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Focus</SelectItem>
                        <SelectItem value="family">Family Focus</SelectItem>
                        <SelectItem value="community">Community Focus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Adaptation</Button>
                </CardContent>
              </Card>
            </div>

            {/* Discussion Prompt Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion Prompt Editor</CardTitle>
                <CardDescription>
                  Create and manage family discussion prompts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Module Topic</label>
                  <Input placeholder="e.g., Honesty and Trust" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discussion Prompts</label>
                  <Textarea 
                    placeholder="Enter discussion prompts, one per line..."
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Guidance</label>
                  <Textarea 
                    placeholder="Guidance for parents on facilitating this discussion..."
                    rows={3}
                  />
                </div>
                <Button>Save Prompts</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Character Content Studio</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Character
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Character Selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Character</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Penguin Family</h3>
                    {PENGUIN_FAMILY.map((character) => (
                      <Button
                        key={character.id}
                        variant={selectedCharacter === character.id ? "default" : "ghost"}
                        onClick={() => setSelectedCharacter(character.id)}
                        className="w-full justify-start"
                      >
                        <CharacterAvatar characterId={character.id} size="sm" showName />
                      </Button>
                    ))}
                    
                    <h3 className="font-medium text-sm mt-4">Human Characters</h3>
                    {HUMAN_CHARACTERS.map((character) => (
                      <Button
                        key={character.id}
                        variant={selectedCharacter === character.id ? "default" : "ghost"}
                        onClick={() => setSelectedCharacter(character.id)}
                        className="w-full justify-start"
                      >
                        <CharacterAvatar characterId={character.id} size="sm" showName />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Character Details */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CharacterAvatar characterId={selectedCharacter} size="sm" />
                    Character Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personality Traits</label>
                    <Textarea 
                      defaultValue="Wise, patient, responsible, caring father figure who teaches through example..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Voice Style Guidelines</label>
                    <Textarea 
                      defaultValue="Speaks with warmth and authority. Uses gentle questions to guide thinking..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scenario Preferences</label>
                    <Textarea 
                      defaultValue="Home responsibilities, leadership challenges, moral dilemmas..."
                      rows={2}
                    />
                  </div>
                  <Button className="w-full">Update Character Profile</Button>
                </CardContent>
              </Card>
            </div>

            {/* Personality Consistency Checker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Personality Consistency Checker
                </CardTitle>
                <CardDescription>
                  Ensure character consistency across all content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ All Pax content maintains consistent wise, patient tone
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Pearl's content in Module 3 needs review for empathy consistency
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Run Full Consistency Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Suite</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Family Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Daily Active Families</span>
                      <span className="font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discussion Completion Rate</span>
                      <span className="font-bold">76%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parent Approval Response Time</span>
                      <span className="font-bold">2.3 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Value Adoption Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Honesty Module Impact</span>
                      <Badge variant="default">High</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsibility Growth</span>
                      <Badge variant="default">High</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Empathy Development</span>
                      <Badge variant="secondary">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold">Content Management</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">by {activity.user}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <h2 className="text-2xl font-bold">Content Safety & Moderation</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Sensitivity Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">✅ All content passed cultural review</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Review Flagged Content
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Age Appropriateness Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">✅ All modules age-appropriate</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Run Age Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;