import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import SplashScreen from "./pages/SplashScreen";
import LanguageScreen from "./pages/LanguageScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import RoutesScreen from "./pages/RoutesScreen";
import NavigationScreen from "./pages/NavigationScreen";
import SOSScreen from "./pages/SOSScreen";
import ReportScreen from "./pages/ReportScreen";
import SettingsScreen from "./pages/SettingsScreen";
import FakeCallScreen from "./pages/FakeCallScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto min-h-screen relative">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/language" element={<LanguageScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/routes" element={<RoutesScreen />} />
              <Route path="/navigate" element={<NavigationScreen />} />
              <Route path="/sos" element={<SOSScreen />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/fake-call" element={<FakeCallScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
