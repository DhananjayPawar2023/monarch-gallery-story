import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WalletProvider } from "./contexts/WalletContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
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
            <WalletProvider>
              <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/artwork/:id" element={<ArtworkDetail />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/artists/:id" element={<ArtistDetail />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<JournalDetail />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/interviews/:slug" element={<InterviewDetail />} />
                <Route path="/collectors" element={<Collectors />} />
                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="/exhibitions/:slug" element={<ExhibitionDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/artists" element={<ArtistsManager />} />
                <Route path="/admin/artworks" element={<ArtworksManager />} />
                <Route path="/admin/collections" element={<CollectionsManager />} />
                <Route path="/admin/journal" element={<JournalManager />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </main>
              <Footer />
            </div>
              </AuthProvider>
            </WalletProvider>
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
