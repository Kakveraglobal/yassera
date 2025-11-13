import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedCollections from './components/FeaturedCollections';
import Footer from './components/Footer';
import AuthCallback from './components/auth/AuthCallback';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthCallback, setIsAuthCallback] = useState(false);

  useEffect(() => {
    // Check if this is an auth callback (email confirmation, password reset, etc.)
    const hash = window.location.hash;
    const search = window.location.search;
    
    // Supabase adds tokens in hash or query params
    if (hash.includes('access_token') || hash.includes('type=recovery') || 
        search.includes('token') || hash.includes('type=email')) {
      setIsAuthCallback(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show auth callback page if this is an auth redirect
  if (isAuthCallback) {
    return <AuthCallback />;
  }

  return (
    <div className="min-h-screen bg-bordeaux-50">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedCollections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
