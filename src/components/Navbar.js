import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
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
                            Home
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                            onClick={() => scrollToSection('services')}
                        >
                            Services
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'videos' ? 'active' : ''}`}
                            onClick={() => scrollToSection('videos')}
                        >
                            Videos
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'jobs' ? 'active' : ''}`}
                            onClick={() => scrollToSection('jobs')}
                        >
                            Jobs
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button 
                            className="nav-link cta-button"
                            onClick={() => scrollToSection('apply')}
                        >
                            Apply Now
                        </button>
                    </li>
                </ul>
                
                <div 
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
