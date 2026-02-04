import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PageTransition } from "./components/PageTransition";
import { SwipeNavigation } from "./components/SwipeNavigation";
import { useIsTouchDevice } from "./hooks/useMobileGestures";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Journal from "./pages/Journal";
import JournalDetail from "./pages/JournalDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ArtworkDetail from "./pages/ArtworkDetail";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import ArtistsManager from "./pages/admin/ArtistsManager";
import ArtworksManager from "./pages/admin/ArtworksManager";
import CollectionsManager from "./pages/admin/CollectionsManager";
import JournalManager from "./pages/admin/JournalManager";
import Interviews from "./pages/Interviews";
import InterviewDetail from "./pages/InterviewDetail";
import Collectors from "./pages/Collectors";
import Exhibitions from "./pages/Exhibitions";
import ExhibitionDetail from "./pages/ExhibitionDetail";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";

const queryClient = new QueryClient();

// Animated routes wrapper component
function AnimatedRoutes() {
  const location = useLocation();
  const isTouch = useIsTouchDevice();

  return (
    <SwipeNavigation enabled={isTouch}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
          <Route path="/collections/:id" element={<PageTransition><CollectionDetail /></PageTransition>} />
          <Route path="/artwork/:id" element={<PageTransition><ArtworkDetail /></PageTransition>} />
          <Route path="/artworks/:id" element={<PageTransition><ArtworkDetail /></PageTransition>} />
          <Route path="/artists" element={<PageTransition><Artists /></PageTransition>} />
          <Route path="/artists/:id" element={<PageTransition><ArtistDetail /></PageTransition>} />
          <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
          <Route path="/journal/:slug" element={<PageTransition><JournalDetail /></PageTransition>} />
          <Route path="/interviews" element={<PageTransition><Interviews /></PageTransition>} />
          <Route path="/interviews/:slug" element={<PageTransition><InterviewDetail /></PageTransition>} />
          <Route path="/collectors" element={<PageTransition><Collectors /></PageTransition>} />
          <Route path="/exhibitions" element={<PageTransition><Exhibitions /></PageTransition>} />
          <Route path="/exhibitions/:slug" element={<PageTransition><ExhibitionDetail /></PageTransition>} />
          <Route path="/compare" element={<PageTransition><Compare /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/profile/edit" element={<PageTransition><ProfileEdit /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/artists" element={<PageTransition><ArtistsManager /></PageTransition>} />
          <Route path="/admin/artworks" element={<PageTransition><ArtworksManager /></PageTransition>} />
          <Route path="/admin/collections" element={<PageTransition><CollectionsManager /></PageTransition>} />
          <Route path="/admin/journal" element={<PageTransition><JournalManager /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </SwipeNavigation>
  );
}

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
