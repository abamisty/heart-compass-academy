import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, ArrowRight, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    receiveUpdates: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement parent registration
    console.log("Parent signup:", formData);
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Safe & Secure",
      description: "Complete parental oversight and control"
    },
    {
      icon: <Star className="w-5 h-5 text-accent" />,
      title: "Proven Results",
      description: "Trusted by 10,000+ families worldwide"
    },
    {
      icon: <Heart className="w-5 h-5 text-success" />,
      title: "Character Growth",
      description: "Build values that last a lifetime"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold gradient-text">ENTETEYE</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Start Your Family's Journey</h1>
            <p className="text-xl text-muted-foreground">
              Join thousands of families building character and shaping futures
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Features */}
            <div className="space-y-6 lg:order-2">
              <Card className="border-0 bg-gradient-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">What You'll Get</h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm opacity-90">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 gradient-text">14-Day Free Trial</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Access to all age-appropriate courses
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Complete parent dashboard and analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      AI-powered course customization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      No credit card required
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Signup Form */}
            <div className="lg:order-1">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Create Parent Account
                  </CardTitle>
                  <CardDescription>
                    Start managing your children's character development today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters long
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                          required
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="receiveUpdates"
                          checked={formData.receiveUpdates}
                          onCheckedChange={(checked) => handleInputChange("receiveUpdates", checked)}
                        />
                        <Label htmlFor="receiveUpdates" className="text-sm">
                          Send me updates about new courses and features
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Start Free Trial
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Already have an account? </span>
                      <Link to="/login" className="text-primary font-medium hover:underline">
                        Sign in here
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;