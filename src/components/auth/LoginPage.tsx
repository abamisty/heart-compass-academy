import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, User, ArrowRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      toast({
        title: "Account created",
        description: message,
      });
    }
  }, [searchParams, toast]);

  const handleParentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: parentEmail,
        password: parentPassword,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
        navigate("/parent-dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChildLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to child dashboard demo
    toast({
      title: "Child login coming soon!",
      description: "For now, try the child dashboard demo.",
    });
    navigate("/child-dashboard");
  };

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
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Continue your character-building journey
            </p>
          </div>

          {/* Login Tabs */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Choose your account type to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="parent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="parent" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Parent
                  </TabsTrigger>
                  <TabsTrigger value="child" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Child
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="parent" className="space-y-4 mt-6">
                  <form onSubmit={handleParentLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email Address</Label>
                      <Input
                        id="parent-email"
                        type="email"
                        placeholder="parent@example.com"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-password">Password</Label>
                      <Input
                        id="parent-password"
                        type="password"
                        placeholder="••••••••"
                        value={parentPassword}
                        onChange={(e) => setParentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="hero" 
                      className="w-full"
                      disabled={loading}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {loading ? "Signing In..." : "Sign In as Parent"}
                    </Button>
                  </form>
                  
                  <div className="text-center">
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="child" className="space-y-4 mt-6">
                  <form onSubmit={handleChildLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="child-username">Username</Label>
                      <Input
                        id="child-username"
                        type="text"
                        placeholder="your-username"
                        value={childUsername}
                        onChange={(e) => setChildUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-password">Password</Label>
                      <Input
                        id="child-password"
                        type="password"
                        placeholder="••••••••"
                        value={childPassword}
                        onChange={(e) => setChildPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Start Learning!
                    </Button>
                  </form>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Ask your parent if you need help logging in
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-border space-y-4">
                <div className="text-center">
                  <Link to="/child-login">
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Child Login (PIN)
                    </Button>
                  </Link>
                </div>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    Sign up for free
                  </Link>
                </div>
              </div>
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

export default LoginPage;