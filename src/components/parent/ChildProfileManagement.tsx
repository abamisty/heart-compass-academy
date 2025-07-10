import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Settings, 
  Key, 
  Palette, 
  Save, 
  Trash2,
  UserPlus,
  Edit3
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ChildProfile {
  id: string;
  first_name: string;
  last_name: string;
  age: number | null;
  avatar_url: string | null;
  pin: string | null;
}

const ChildProfileManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [editingChild, setEditingChild] = useState<ChildProfile | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [pin, setPin] = useState("");

  // Avatar options
  const avatarOptions = [
    {
      id: "cat1",
      url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
      name: "Orange Cat"
    },
    {
      id: "cat2", 
      url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face",
      name: "Grey Kitten"
    },
    {
      id: "monkey",
      url: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=150&h=150&fit=crop&crop=face",
      name: "Friendly Monkey"
    },
    {
      id: "penguin",
      url: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=150&h=150&fit=crop&crop=face",
      name: "Penguin Duo"
    }
  ];

  // Load children profiles
  useEffect(() => {
    if (user) {
      loadChildren();
    }
  }, [user]);

  const loadChildren = async () => {
    try {
      // Get parent profile first
      const { data: parentProfile, error: parentError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (parentError) throw parentError;

      // Get children profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('parent_id', parentProfile.id)
        .eq('role', 'child')
        .order('first_name');

      if (error) throw error;
      setChildren(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading children",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setSelectedAvatar("");
    setPin("");
    setEditingChild(null);
  };

  const handleSaveChild = async () => {
    if (!firstName.trim() || !lastName.trim() || !selectedAvatar || !pin) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields including avatar and PIN",
        variant: "destructive",
      });
      return;
    }

    if (pin.length < 4 || pin.length > 6 || !/^\d+$/.test(pin)) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4-6 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get parent profile
      const { data: parentProfile, error: parentError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (parentError) throw parentError;

      const childData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        age: age ? parseInt(age) : null,
        avatar_url: selectedAvatar,
        pin: pin,
        parent_id: parentProfile.id,
        role: 'child' as const,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@child.local`, // Placeholder email
        user_id: crypto.randomUUID() // Generate a fake user_id for child profiles
      };

      if (editingChild) {
        // Update existing child
        const { error } = await supabase
          .from('profiles')
          .update(childData)
          .eq('id', editingChild.id);

        if (error) throw error;

        toast({
          title: "Child profile updated",
          description: `${firstName}'s profile has been updated successfully!`,
        });
      } else {
        // Create new child
        const { error } = await supabase
          .from('profiles')
          .insert(childData);

        if (error) throw error;

        toast({
          title: "Child profile created",
          description: `${firstName} can now log in with their PIN!`,
        });
      }

      setIsAddingChild(false);
      resetForm();
      loadChildren();
    } catch (error: any) {
      toast({
        title: "Error saving child profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditChild = (child: ChildProfile) => {
    setEditingChild(child);
    setFirstName(child.first_name);
    setLastName(child.last_name);
    setAge(child.age?.toString() || "");
    setSelectedAvatar(child.avatar_url || "");
    setPin(child.pin || "");
    setIsAddingChild(true);
  };

  const handleDeleteChild = async (childId: string) => {
    if (!confirm("Are you sure you want to delete this child profile? This cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', childId);

      if (error) throw error;

      toast({
        title: "Child profile deleted",
        description: "The profile has been removed successfully.",
      });

      loadChildren();
    } catch (error: any) {
      toast({
        title: "Error deleting profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Child Profiles</h2>
          <p className="text-muted-foreground">
            Manage your children's avatars, PINs, and profile information
          </p>
        </div>
        <Dialog open={isAddingChild} onOpenChange={setIsAddingChild}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingChild ? "Edit Child Profile" : "Add New Child"}
              </DialogTitle>
              <DialogDescription>
                Set up your child's avatar and PIN for easy login
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  min="3"
                  max="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                />
              </div>

              {/* Avatar Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Choose Avatar
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.url)}
                      className={`relative p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        selectedAvatar === avatar.url
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <Avatar className="w-full h-16 mx-auto">
                        <AvatarImage src={avatar.url} alt={avatar.name} />
                        <AvatarFallback>{avatar.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        {avatar.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* PIN Setup */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Login PIN (4-6 digits)
                </Label>
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 4-6 digit PIN"
                  maxLength={6}
                />
                <p className="text-sm text-muted-foreground">
                  Your child will use this PIN to log in after selecting their avatar
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveChild} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingChild ? "Update Profile" : "Create Profile"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingChild(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Children List */}
      <div className="grid gap-4">
        {children.length === 0 ? (
          <Card className="p-8 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No children added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first child profile to get started with their learning journey
            </p>
            <Button onClick={() => setIsAddingChild(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Child
            </Button>
          </Card>
        ) : (
          children.map((child) => (
            <Card key={child.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                    <AvatarImage src={child.avatar_url || ""} />
                    <AvatarFallback className="text-lg font-bold">
                      {child.first_name[0]}{child.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {child.first_name} {child.last_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {child.age && (
                        <Badge variant="secondary">Age {child.age}</Badge>
                      )}
                      <Badge variant={child.pin ? "default" : "destructive"}>
                        {child.pin ? "PIN Set" : "No PIN"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditChild(child)}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteChild(child.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Instructions */}
      {children.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Key className="w-5 h-5" />
              How Children Log In
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Children visit the <strong>Child Login</strong> page</p>
              <p>2. They select their avatar from the available options</p>
              <p>3. They enter their 4-6 digit PIN using the number pad</p>
              <p>4. Once authenticated, they access their personalized dashboard</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChildProfileManagement;