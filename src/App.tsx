import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ChildLoginPage from "./components/auth/ChildLoginPage";
import ParentDashboard from "./components/ParentDashboard";
import ChildDashboard from "./components/ChildDashboard";
import CoursePlayer from "./components/CoursePlayer";
import CurriculumPreview from "./components/CurriculumPreview";
import ExerciseGenerator from "./components/ExerciseGenerator";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminOverview } from "./components/admin/AdminOverview";
import { AdminAnalytics } from "./components/admin/AdminAnalytics";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminContent } from "./components/admin/AdminContent";
import { AdminSafety } from "./components/admin/AdminSafety";
import { AdminCourseGenerator } from "./components/admin/AdminCourseGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/child-login" element={<ChildLoginPage />} />
            <Route 
              path="/parent-dashboard" 
              element={
                <ProtectedRoute>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/child-dashboard" 
              element={
                <ProtectedRoute>
                  <ChildDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/course-player" element={<CoursePlayer />} />
            <Route path="/curriculum-preview" element={<CurriculumPreview />} />
            <Route path="/exercise-generator" element={<ExerciseGenerator />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="safety" element={<AdminSafety />} />
              <Route path="course-generator" element={<AdminCourseGenerator />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
