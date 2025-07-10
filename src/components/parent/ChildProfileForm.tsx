import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChildProfileFormProps {
  onChildAdded: (child: any) => void;
}

export const ChildProfileForm = ({ onChildAdded }: ChildProfileFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    interests: "",
    learningGoals: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.age) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newChild = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      age: parseInt(formData.age),
      avatar: "/placeholder-avatar.png",
      level: 1,
      streak: 0,
      totalBadges: 0,
      coursesCompleted: 0,
      currentCourse: null,
      progress: 0,
      weeklyTime: 0,
      interests: formData.interests.split(',').map(i => i.trim()),
      learningGoals: formData.learningGoals
    };

    onChildAdded(newChild);
    setFormData({ firstName: "", lastName: "", age: "", interests: "", learningGoals: "" });
    setOpen(false);
    
    toast({
      title: "Child Profile Created",
      description: `${newChild.name}'s profile has been created successfully.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Child Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Create Child Profile
          </DialogTitle>
          <DialogDescription>
            Add a new child to start their character development journey
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="age">Age *</Label>
            <Select value={formData.age} onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 13 }, (_, i) => i + 6).map(age => (
                  <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="interests">Interests (comma-separated)</Label>
            <Input
              id="interests"
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="e.g., reading, sports, art, music"
            />
          </div>
          
          <div>
            <Label htmlFor="learningGoals">Learning Goals</Label>
            <Input
              id="learningGoals"
              value={formData.learningGoals}
              onChange={(e) => setFormData(prev => ({ ...prev, learningGoals: e.target.value }))}
              placeholder="What would you like your child to learn?"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              Create Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};