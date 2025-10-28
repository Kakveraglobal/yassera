import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedCollections from './components/FeaturedCollections';
import Footer from './components/Footer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
