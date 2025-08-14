import LandingPage from "../components/LandingPage";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      <LandingPage />
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button 
          onClick={() => window.location.href = '/parent-dashboard'}
          className="shadow-lg"
          variant="default"
        >
          👨‍👩‍👧‍👦 Parent Dashboard
        </Button>
        <Button 
          onClick={() => window.location.href = '/student-dashboard'}
          className="shadow-lg"
          variant="outline"
        >
          🎓 Student Dashboard
        </Button>
        <Button 
          onClick={() => window.location.href = '/admin-dashboard'}
          className="shadow-lg"
          variant="secondary"
        >
          ⚙️ Admin Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
