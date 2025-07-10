import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Shield, 
  Clock, 
  Bell, 
  User, 
  Mail, 
  Lock,
  Eye,
  Calendar,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ParentControlsProps {
  selectedChild: any;
  onSettingsUpdate: (settings: any) => void;
}

export const ParentControls = ({ selectedChild, onSettingsUpdate }: ParentControlsProps) => {
  const [settings, setSettings] = useState({
    // Screen Time Controls
    dailyTimeLimit: "60", // minutes
    weekdayTimeLimit: "45",
    weekendTimeLimit: "90",
    restrictedHours: {
      enabled: false,
      startTime: "20:00",
      endTime: "08:00"
    },

    // Content Controls
    ageAppropriate: true,
    difficultyLevel: "automatic",
    contentTopics: {
      characterValues: true,
      socialSkills: true,
      academicSkills: false,
      creativityArts: true,
      physicalActivity: false
    },

    // Communication & Notifications
    progressReports: "weekly",
    achievementNotifications: true,
    strugglingAlerts: true,
    parentEmail: "parent@example.com",
    childCanMessage: false,

    // Privacy & Safety
    profileVisibility: "private",
    dataSharing: false,
    allowCommunityFeatures: false,
    requireApprovalForNewCourses: true
  });

  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedSettingChange = (parentKey: string, childKey: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  const saveSettings = () => {
    onSettingsUpdate(settings);
    toast({
      title: "Settings Updated",
      description: "Parent controls have been successfully updated."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Parent Controls for {selectedChild.name}
          </CardTitle>
          <CardDescription>
            Manage safety, time limits, and learning preferences
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="screen-time" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="screen-time">Screen Time</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="screen-time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Time Management
              </CardTitle>
              <CardDescription>
                Set healthy learning time limits and schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily Limits */}
              <div className="space-y-4">
                <h4 className="font-semibold">Daily Time Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dailyLimit">Daily Limit (minutes)</Label>
                    <Input
                      id="dailyLimit"
                      type="number"
                      value={settings.dailyTimeLimit}
                      onChange={(e) => handleSettingChange("dailyTimeLimit", e.target.value)}
                      min="15"
                      max="180"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekdayLimit">Weekday Limit</Label>
                    <Input
                      id="weekdayLimit"
                      type="number"
                      value={settings.weekdayTimeLimit}
                      onChange={(e) => handleSettingChange("weekdayTimeLimit", e.target.value)}
                      min="15"
                      max="180"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekendLimit">Weekend Limit</Label>
                    <Input
                      id="weekendLimit"
                      type="number"
                      value={settings.weekendTimeLimit}
                      onChange={(e) => handleSettingChange("weekendTimeLimit", e.target.value)}
                      min="15"
                      max="180"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Restricted Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Restricted Hours</h4>
                    <p className="text-sm text-muted-foreground">Block access during specified times</p>
                  </div>
                  <Switch
                    checked={settings.restrictedHours.enabled}
                    onCheckedChange={(checked) => 
                      handleNestedSettingChange("restrictedHours", "enabled", checked)
                    }
                  />
                </div>
                
                {settings.restrictedHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={settings.restrictedHours.startTime}
                        onChange={(e) => 
                          handleNestedSettingChange("restrictedHours", "startTime", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={settings.restrictedHours.endTime}
                        onChange={(e) => 
                          handleNestedSettingChange("restrictedHours", "endTime", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Content Controls
              </CardTitle>
              <CardDescription>
                Manage what content your child can access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age Appropriate Content */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Age-Appropriate Content Only</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically filter content based on {selectedChild.name}'s age
                  </p>
                </div>
                <Switch
                  checked={settings.ageAppropriate}
                  onCheckedChange={(checked) => handleSettingChange("ageAppropriate", checked)}
                />
              </div>

              <Separator />

              {/* Difficulty Level */}
              <div className="space-y-3">
                <h4 className="font-semibold">Difficulty Level</h4>
                <Select
                  value={settings.difficultyLevel}
                  onValueChange={(value) => handleSettingChange("difficultyLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic (AI-adjusted)</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Content Topics */}
              <div className="space-y-4">
                <h4 className="font-semibold">Allowed Content Topics</h4>
                <div className="space-y-3">
                  {Object.entries(settings.contentTopics).map(([topic, enabled]) => (
                    <div key={topic} className="flex items-center justify-between">
                      <Label htmlFor={topic} className="flex items-center gap-2">
                        {topic.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        {enabled && <Badge variant="secondary">Enabled</Badge>}
                      </Label>
                      <Switch
                        id={topic}
                        checked={enabled}
                        onCheckedChange={(checked) => 
                          handleNestedSettingChange("contentTopics", topic, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications & Communication
              </CardTitle>
              <CardDescription>
                Control how and when you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Reports */}
              <div className="space-y-3">
                <h4 className="font-semibold">Progress Report Frequency</h4>
                <Select
                  value={settings.progressReports}
                  onValueChange={(value) => handleSettingChange("progressReports", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Notification Preferences */}
              <div className="space-y-4">
                <h4 className="font-semibold">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="achievements">Achievement Notifications</Label>
                    <Switch
                      id="achievements"
                      checked={settings.achievementNotifications}
                      onCheckedChange={(checked) => 
                        handleSettingChange("achievementNotifications", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="struggling">Struggling Alerts</Label>
                    <Switch
                      id="struggling"
                      checked={settings.strugglingAlerts}
                      onCheckedChange={(checked) => 
                        handleSettingChange("strugglingAlerts", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-semibold">Contact Information</h4>
                <div>
                  <Label htmlFor="parentEmail">Parent Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={settings.parentEmail}
                    onChange={(e) => handleSettingChange("parentEmail", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Privacy & Safety
              </CardTitle>
              <CardDescription>
                Protect your child's privacy and ensure safe interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Visibility */}
              <div className="space-y-3">
                <h4 className="font-semibold">Profile Visibility</h4>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private (family only)</SelectItem>
                    <SelectItem value="friends">Friends only</SelectItem>
                    <SelectItem value="public">Public (with restrictions)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Safety Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold">Safety Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataSharing">Allow Data Sharing for Improvement</Label>
                      <p className="text-xs text-muted-foreground">
                        Help improve the platform with anonymized usage data
                      </p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) => handleSettingChange("dataSharing", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="community">Community Features</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow interaction with other learners
                      </p>
                    </div>
                    <Switch
                      id="community"
                      checked={settings.allowCommunityFeatures}
                      onCheckedChange={(checked) => 
                        handleSettingChange("allowCommunityFeatures", checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="courseApproval">Require Approval for New Courses</Label>
                      <p className="text-xs text-muted-foreground">
                        Parent must approve before child can start new courses
                      </p>
                    </div>
                    <Switch
                      id="courseApproval"
                      checked={settings.requireApprovalForNewCourses}
                      onCheckedChange={(checked) => 
                        handleSettingChange("requireApprovalForNewCourses", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-800">Privacy Notice</h5>
                  <p className="text-sm text-yellow-700">
                    All data is encrypted and stored securely. We never share personal information 
                    with third parties without explicit consent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} variant="hero" size="lg">
          <Settings className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};