import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChildProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  age: number | null;
}

const ChildLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [childrenLoading, setChildrenLoading] = useState(true);

  // Load available children (those with PINs set)
  useEffect(() => {
    const loadChildren = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url, age')
          .eq('role', 'child')
          .not('pin', 'is', null)
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
        setChildrenLoading(false);
      }
    };

    loadChildren();
  }, [toast]);

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin("");
  };

  const handleLogin = async () => {
    if (!selectedChild || pin.length < 4) return;

    setLoading(true);
    try {
      // Verify PIN matches the selected child
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, pin')
        .eq('id', selectedChild.id)
        .eq('pin', pin)
        .single();

      if (error || !data) {
        toast({
          title: "Incorrect PIN",
          description: "Please try again!",
          variant: "destructive",
        });
        setPin("");
        return;
      }

      // Sign in with the child's user_id (this is a simplified approach)
      // In a real app, you'd want a more secure token-based approach
      localStorage.setItem('child_profile_id', selectedChild.id);
      localStorage.setItem('child_user_id', data.user_id);
      
      toast({
        title: `Welcome back, ${selectedChild.first_name}!`,
        description: "Ready to continue learning?",
      });
      
      navigate("/child-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (child: ChildProfile) => {
    if (child.avatar_url) return child.avatar_url;
    
    // Use placeholder images based on child's name/age
    const avatarOptions = [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face", 
      "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=150&h=150&fit=crop&crop=face"
    ];
    
    const index = child.first_name.charCodeAt(0) % avatarOptions.length;
    return avatarOptions[index];
  };

  if (childrenLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold gradient-text">ENTETEYE</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Who's Learning Today?</h1>
            <p className="text-muted-foreground">
              Choose your avatar and enter your PIN
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">
                {selectedChild ? `Hi ${selectedChild.first_name}!` : "Select Your Avatar"}
              </CardTitle>
              <CardDescription className="text-center">
                {selectedChild ? "Enter your PIN to continue" : "Tap your picture to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedChild ? (
                /* Avatar Selection */
                <div className="space-y-4">
                  {children.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No child accounts are set up yet.
                      </p>
                      <Link to="/parent-dashboard">
                        <Button variant="outline">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Parent Dashboard
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setSelectedChild(child)}
                          className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 hover:scale-105"
                        >
                          <Avatar className="w-20 h-20 mb-3 ring-2 ring-primary/20">
                            <AvatarImage 
                              src={getAvatarUrl(child)} 
                              alt={`${child.first_name}'s avatar`}
                            />
                            <AvatarFallback className="text-lg font-bold">
                              {child.first_name[0]}{child.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-center">
                            {child.first_name}
                          </span>
                          {child.age && (
                            <span className="text-sm text-muted-foreground">
                              Age {child.age}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* PIN Input */
                <div className="space-y-6">
                  {/* Selected Child Display */}
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-3 ring-2 ring-primary">
                      <AvatarImage 
                        src={getAvatarUrl(selectedChild)} 
                        alt={`${selectedChild.first_name}'s avatar`}
                      />
                      <AvatarFallback className="text-xl font-bold">
                        {selectedChild.first_name[0]}{selectedChild.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={() => {
                        setSelectedChild(null);
                        setPin("");
                      }}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Change Avatar
                    </button>
                  </div>

                  {/* PIN Display */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold ${
                          i < pin.length
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-muted-foreground/30 bg-muted/20"
                        }`}
                      >
                        {i < pin.length ? "•" : ""}
                      </div>
                    ))}
                  </div>

                  {/* Number Pad */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                      <Button
                        key={digit}
                        variant="outline"
                        size="lg"
                        onClick={() => handlePinInput(digit.toString())}
                        className="h-14 text-xl font-bold hover:bg-primary hover:text-primary-foreground"
                        disabled={pin.length >= 6}
                      >
                        {digit}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleClear}
                      className="h-14 hover:bg-destructive hover:text-destructive-foreground"
                      disabled={pin.length === 0}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handlePinInput("0")}
                      className="h-14 text-xl font-bold hover:bg-primary hover:text-primary-foreground"
                      disabled={pin.length >= 6}
                    >
                      0
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleBackspace}
                      className="h-14 hover:bg-muted"
                      disabled={pin.length === 0}
                    >
                      ⌫
                    </Button>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={handleLogin}
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={pin.length < 4 || loading}
                  >
                    {loading ? "Signing In..." : "Start Learning!"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildLoginPage;