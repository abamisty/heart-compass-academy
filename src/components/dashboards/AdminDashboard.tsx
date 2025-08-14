import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
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
  TrendingUp,
  Save,
  Check,
  AlertTriangle
} from 'lucide-react';
import CharacterAvatar from '@/components/shared/CharacterAvatar';
import { PENGUIN_FAMILY, HUMAN_CHARACTERS } from '@/types/characters';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState<string>('pax');
  
  // Curriculum Management State
  const [curriculumForm, setCurriculumForm] = useState({
    ageGroup: '',
    complexityLevel: '',
    culturalContext: '',
    valueEmphasis: '',
    moduleTitle: '',
    discussionPrompts: '',
    parentGuidance: ''
  });

  // Character Management State
  const [characterData, setCharacterData] = useState({
    personalityTraits: '',
    voiceStyle: '',
    scenarioPreferences: ''
  });

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState({
    dailyActiveFamilies: 89,
    discussionCompletionRate: 76,
    approvalResponseTime: 2.3,
    honestyModuleImpact: 'High',
    responsibilityGrowth: 'High',
    empathyDevelopment: 'Moderate'
  });

  // Safety State
  const [safetyStatus, setSafetyStatus] = useState({
    culturalSensitivity: 'passed',
    ageAppropriateness: 'passed',
    contentModeration: 'passed'
  });

  // Content State
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    ageGroup: '',
    character: '',
    branch: ''
  });

  // Created content storage
  const [createdModules, setCreatedModules] = useState([
    {
      id: '1',
      title: 'Digital Citizenship with Pax',
      description: 'Learn responsible online behavior and digital ethics',
      ageGroup: '13-15',
      character: 'pax',
      branch: 'character-building',
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Family Budget Planning with Leo',
      description: 'Practical money management and family budgeting skills',
      ageGroup: '16-18',
      character: 'leo',
      branch: 'practical-skills',
      status: 'draft',
      createdAt: '2024-01-14'
    }
  ]);

  const [createdPrompts, setCreatedPrompts] = useState([
    {
      id: '1',
      moduleTitle: 'Digital Citizenship',
      prompts: ['How do you handle cyberbullying?', 'What are privacy settings?'],
      parentGuidance: 'Discuss real online experiences',
      createdAt: '2024-01-15'
    }
  ]);

  // Mock admin data
  const adminStats = {
    totalFamilies: 1247,
    activeStudents: 3891,
    completedModules: 15678,
    averageEngagement: 87
  };

  const [recentActivity, setRecentActivity] = useState([
    { id: '1', action: 'New module created', user: 'Content Team', time: '2 hours ago' },
    { id: '2', action: 'Discussion quality improved', user: 'AI System', time: '4 hours ago' },
    { id: '3', action: 'Family enrolled', user: 'Parent Portal', time: '6 hours ago' }
  ]);

  // Load character data when character changes
  useEffect(() => {
    const character = [...PENGUIN_FAMILY, ...HUMAN_CHARACTERS].find(c => c.id === selectedCharacter);
    if (character) {
      setCharacterData({
        personalityTraits: character.personality + '. ' + character.description,
        voiceStyle: `Speaks with ${character.personality.toLowerCase()} tone. Focuses on ${character.specialization.toLowerCase()}.`,
        scenarioPreferences: character.specialization + ' related scenarios and challenges.'
      });
    }
  }, [selectedCharacter]);

  // Handler functions
  const handleCurriculumUpdate = (field: string, value: string) => {
    setCurriculumForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCurriculumSettings = () => {
    if (!curriculumForm.ageGroup || !curriculumForm.complexityLevel) {
      toast({
        title: "Missing Information",
        description: "Please select both age group and complexity level.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Settings Updated",
      description: `Curriculum settings updated for ${curriculumForm.ageGroup} age group.`,
    });
  };

  const handleCulturalAdaptation = () => {
    if (!curriculumForm.culturalContext || !curriculumForm.valueEmphasis) {
      toast({
        title: "Missing Information",
        description: "Please select both cultural context and value emphasis.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Adaptation Applied",
      description: `Cultural adaptation applied for ${curriculumForm.culturalContext} context.`,
    });
  };

  const handleSaveDiscussionPrompts = () => {
    if (!curriculumForm.moduleTitle || !curriculumForm.discussionPrompts) {
      toast({
        title: "Missing Information",
        description: "Please enter module title and discussion prompts.",
        variant: "destructive",
      });
      return;
    }
    
    const newPrompt = {
      id: Date.now().toString(),
      moduleTitle: curriculumForm.moduleTitle,
      prompts: curriculumForm.discussionPrompts.split('\n').filter(p => p.trim()),
      parentGuidance: curriculumForm.parentGuidance,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setCreatedPrompts(prev => [newPrompt, ...prev]);
    
    setRecentActivity(prev => [{
      id: Date.now().toString(),
      action: `Discussion prompts created for "${curriculumForm.moduleTitle}"`,
      user: 'Admin Dashboard',
      time: 'Just now'
    }, ...prev]);
    
    toast({
      title: "Prompts Saved",
      description: `Discussion prompts saved for ${curriculumForm.moduleTitle}.`,
    });
    
    setCurriculumForm(prev => ({ ...prev, moduleTitle: '', discussionPrompts: '', parentGuidance: '' }));
  };

  const handleUpdateCharacterProfile = () => {
    const character = [...PENGUIN_FAMILY, ...HUMAN_CHARACTERS].find(c => c.id === selectedCharacter);
    
    setRecentActivity(prev => [{
      id: Date.now().toString(),
      action: `${character?.name} character profile updated`,
      user: 'Admin Dashboard',
      time: 'Just now'
    }, ...prev]);
    
    toast({
      title: "Character Updated",
      description: `${character?.name}'s profile has been updated successfully.`,
    });
  };

  const handleConsistencyCheck = () => {
    toast({
      title: "Consistency Check Running",
      description: "Running full personality consistency check across all content...",
    });
    
    // Simulate consistency check
    setTimeout(() => {
      toast({
        title: "Consistency Check Complete",
        description: "All character content maintains personality consistency.",
      });
    }, 2000);
  };

  const handleCreateNewModule = () => {
    if (!newModule.title || !newModule.character || !newModule.branch) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for the new module.",
        variant: "destructive",
      });
      return;
    }
    
    const newModuleData = {
      id: Date.now().toString(),
      ...newModule,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setCreatedModules(prev => [newModuleData, ...prev]);
    
    setRecentActivity(prev => [{
      id: Date.now().toString(),
      action: `New module "${newModule.title}" created`,
      user: 'Admin Dashboard',
      time: 'Just now'
    }, ...prev]);
    
    toast({
      title: "Module Created",
      description: `"${newModule.title}" has been created successfully.`,
    });
    
    setNewModule({ title: '', description: '', ageGroup: '', character: '', branch: '' });
  };

  const handleRunSafetyCheck = (checkType: string) => {
    toast({
      title: "Safety Check Running",
      description: `Running ${checkType} assessment...`,
    });
    
    setTimeout(() => {
      setSafetyStatus(prev => ({ ...prev, [checkType]: 'passed' }));
      toast({
        title: "Safety Check Complete",
        description: `${checkType} assessment completed successfully.`,
      });
    }, 1500);
  };

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
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateNewModule}
              >
                <Plus className="h-4 w-4" />
                Create New Module
              </Button>
            </div>

            {/* New Module Creation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Module</CardTitle>
                <CardDescription>
                  Build a new learning module with character guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Module Title *</label>
                    <Input 
                      placeholder="e.g., Digital Citizenship"
                      value={newModule.title}
                      onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Branch *</label>
                    <Select value={newModule.branch} onValueChange={(value) => setNewModule(prev => ({ ...prev, branch: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family-values">Family Values</SelectItem>
                        <SelectItem value="character-building">Character Building</SelectItem>
                        <SelectItem value="practical-skills">Practical Skills</SelectItem>
                        <SelectItem value="emotional-intelligence">Emotional Intelligence</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Character Guide *</label>
                    <Select value={newModule.character} onValueChange={(value) => setNewModule(prev => ({ ...prev, character: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select character" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...PENGUIN_FAMILY, ...HUMAN_CHARACTERS].map((char) => (
                          <SelectItem key={char.id} value={char.id}>{char.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Age Group</label>
                    <Select value={newModule.ageGroup} onValueChange={(value) => setNewModule(prev => ({ ...prev, ageGroup: value }))}>
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
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Describe the learning objectives and content..."
                    value={newModule.description}
                    onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateNewModule} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Module
                </Button>
              </CardContent>
            </Card>

            {/* Created Modules List */}
            <Card>
              <CardHeader>
                <CardTitle>Created Modules ({createdModules.length})</CardTitle>
                <CardDescription>
                  All learning modules created in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {createdModules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CharacterAvatar 
                          characterId={module.character} 
                          size="sm"
                        />
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{module.ageGroup}</Badge>
                            <Badge variant="outline">{module.branch}</Badge>
                            <Badge variant={module.status === 'published' ? 'default' : 'secondary'}>
                              {module.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                    <Select value={curriculumForm.ageGroup} onValueChange={(value) => handleCurriculumUpdate('ageGroup', value)}>
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
                    <Select value={curriculumForm.complexityLevel} onValueChange={(value) => handleCurriculumUpdate('complexityLevel', value)}>
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
                  <Button className="w-full" onClick={handleSaveCurriculumSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Settings
                  </Button>
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
                    <Select value={curriculumForm.culturalContext} onValueChange={(value) => handleCurriculumUpdate('culturalContext', value)}>
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
                    <Select value={curriculumForm.valueEmphasis} onValueChange={(value) => handleCurriculumUpdate('valueEmphasis', value)}>
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
                  <Button className="w-full" onClick={handleCulturalAdaptation}>
                    <Settings className="h-4 w-4 mr-2" />
                    Apply Adaptation
                  </Button>
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
                  <Input 
                    placeholder="e.g., Honesty and Trust" 
                    value={curriculumForm.moduleTitle}
                    onChange={(e) => handleCurriculumUpdate('moduleTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discussion Prompts</label>
                  <Textarea 
                    placeholder="Enter discussion prompts, one per line..."
                    rows={6}
                    value={curriculumForm.discussionPrompts}
                    onChange={(e) => handleCurriculumUpdate('discussionPrompts', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Guidance</label>
                  <Textarea 
                    placeholder="Guidance for parents on facilitating this discussion..."
                    rows={3}
                    value={curriculumForm.parentGuidance}
                    onChange={(e) => handleCurriculumUpdate('parentGuidance', e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveDiscussionPrompts}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Prompts
                </Button>
              </CardContent>
            </Card>

            {/* Created Discussion Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion Prompts Library ({createdPrompts.length})</CardTitle>
                <CardDescription>
                  All discussion prompts created for family conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {createdPrompts.map((prompt) => (
                    <div key={prompt.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{prompt.moduleTitle}</h4>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Discussion Questions:</label>
                          <ul className="text-sm mt-1 space-y-1">
                            {prompt.prompts.map((p, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {prompt.parentGuidance && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Parent Guidance:</label>
                            <p className="text-sm mt-1">{prompt.parentGuidance}</p>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">Created: {prompt.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                      value={characterData.personalityTraits}
                      onChange={(e) => setCharacterData(prev => ({ ...prev, personalityTraits: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Voice Style Guidelines</label>
                    <Textarea 
                      value={characterData.voiceStyle}
                      onChange={(e) => setCharacterData(prev => ({ ...prev, voiceStyle: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scenario Preferences</label>
                    <Textarea 
                      value={characterData.scenarioPreferences}
                      onChange={(e) => setCharacterData(prev => ({ ...prev, scenarioPreferences: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  <Button className="w-full" onClick={handleUpdateCharacterProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Character Profile
                  </Button>
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
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <p className="text-sm text-green-800">
                        All {PENGUIN_FAMILY.find(c => c.id === selectedCharacter)?.name || HUMAN_CHARACTERS.find(c => c.id === selectedCharacter)?.name} content maintains personality consistency
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <p className="text-sm text-blue-800">
                        Character voice patterns are within acceptable range
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleConsistencyCheck}>
                    <Shield className="h-4 w-4 mr-2" />
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
                    <div className="flex justify-between items-center">
                      <span>Daily Active Families</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{analyticsData.dailyActiveFamilies}%</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Discussion Completion Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{analyticsData.discussionCompletionRate}%</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Parent Approval Response Time</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{analyticsData.approvalResponseTime} hours</span>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
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
                      <Badge variant={analyticsData.honestyModuleImpact === 'High' ? "default" : "secondary"}>
                        {analyticsData.honestyModuleImpact}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsibility Growth</span>
                      <Badge variant={analyticsData.responsibilityGrowth === 'High' ? "default" : "secondary"}>
                        {analyticsData.responsibilityGrowth}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Empathy Development</span>
                      <Badge variant={analyticsData.empathyDevelopment === 'High' ? "default" : "secondary"}>
                        {analyticsData.empathyDevelopment}
                      </Badge>
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
                    <div className={`p-3 border rounded-lg ${
                      safetyStatus.culturalSensitivity === 'passed' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        {safetyStatus.culturalSensitivity === 'passed' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                        <p className={`text-sm ${
                          safetyStatus.culturalSensitivity === 'passed' 
                            ? 'text-green-800' 
                            : 'text-yellow-800'
                        }`}>
                          {safetyStatus.culturalSensitivity === 'passed' 
                            ? 'All content passed cultural review'
                            : 'Some content needs cultural review'
                          }
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => handleRunSafetyCheck('culturalSensitivity')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Run Cultural Review
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
                    <div className={`p-3 border rounded-lg ${
                      safetyStatus.ageAppropriateness === 'passed' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        {safetyStatus.ageAppropriateness === 'passed' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                        <p className={`text-sm ${
                          safetyStatus.ageAppropriateness === 'passed' 
                            ? 'text-green-800' 
                            : 'text-yellow-800'
                        }`}>
                          {safetyStatus.ageAppropriateness === 'passed' 
                            ? 'All modules age-appropriate'
                            : 'Some modules need age review'
                          }
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => handleRunSafetyCheck('ageAppropriateness')}>
                      <Shield className="h-4 w-4 mr-2" />
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