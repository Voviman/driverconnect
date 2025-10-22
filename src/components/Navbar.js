import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import LanguageSelector from './LanguageSelector';
import './Navbar.css';

const Navbar = () => {
    const { currentLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            
            // Update active section
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        closeMenu();
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => scrollToSection('home')}>
                    <img src="/img/ISOTIPO AZUL D CONNECT.png" alt="DriverConnect" />
                </div>
                
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                            onClick={() => scrollToSection('home')}
                        >
                            {getTranslation(currentLanguage, 'navbar.home')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                            onClick={() => scrollToSection('services')}
                        >
                            {getTranslation(currentLanguage, 'navbar.services')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'videos' ? 'active' : ''}`}
                            onClick={() => scrollToSection('videos')}
                        >
                            {getTranslation(currentLanguage, 'navbar.videos')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'jobs' ? 'active' : ''}`}
                            onClick={() => scrollToSection('jobs')}
                        >
                            {getTranslation(currentLanguage, 'navbar.jobs')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                            onClick={() => scrollToSection('about')}
                        >
                            {getTranslation(currentLanguage, 'navbar.about')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                            onClick={() => scrollToSection('contact')}
                        >
                            {getTranslation(currentLanguage, 'navbar.contact')}
                        </button>
                    </li>
                    <li>
                        <button 
                            className="nav-link cta-button"
                            onClick={() => scrollToSection('apply')}
                        >
                            {getTranslation(currentLanguage, 'navbar.applyNow')}
                        </button>
                    </li>
                </ul>
                
                <div className="nav-actions">
                    <LanguageSelector />
                    <div 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
