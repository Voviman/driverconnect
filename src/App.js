import React from 'react';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import VideoSection from './components/VideoSection';
import Jobs from './components/Jobs';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <SEO />
        <StructuredData />
        <div className="App">
          <Navbar />
          <Hero />
          <Services />
          <VideoSection />
          <Jobs />
          <Testimonials />
          <About />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
