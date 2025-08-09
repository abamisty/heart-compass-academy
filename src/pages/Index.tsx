import LandingPage from "../components/LandingPage";
import LessonPreview from "../components/LessonPreview";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showPreview, setShowPreview] = useState(false);

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
            className="mb-4"
          >
            ← Back to Landing Page
          </Button>
          <LessonPreview />
        </div>
      </div>
    );
  }

  return (
    <div>
      <LandingPage />
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button 
          onClick={() => setShowPreview(true)}
          className="shadow-lg"
        >
          🎯 Preview Lesson
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/admin'}
          className="shadow-lg"
        >
          ⚙️ Admin Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
