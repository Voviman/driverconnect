import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Footer.css';

const Footer = () => {
    const { currentLanguage } = useLanguage();
    
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img src="/img/DRIVER CONNECT LOGO AZUL.png" alt="DriverConnect" />
                        </div>
                        <p>{getTranslation(currentLanguage, 'footer.description')}</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h4>{getTranslation(currentLanguage, 'footer.services')}</h4>
                        <ul>
                            <li>
                                <button onClick={() => scrollToSection('services')}>
                                    Job Placement
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('services')}>
                                    Career Guidance
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('services')}>
                                    CDL Training
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('services')}>
                                    Benefits Support
                                </button>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>{getTranslation(currentLanguage, 'footer.jobTypes')}</h4>
                        <ul>
                            <li>
                                <button onClick={() => scrollToSection('jobs')}>
                                    OTR Driving
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('jobs')}>
                                    Regional Routes
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('jobs')}>
                                    Local Delivery
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('jobs')}>
                                    Specialized Freight
                                </button>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>{getTranslation(currentLanguage, 'footer.company')}</h4>
                        <ul>
                            <li>
                                <button onClick={() => scrollToSection('about')}>
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('contact')}>
                                    Contact
                                </button>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>{getTranslation(currentLanguage, 'footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
