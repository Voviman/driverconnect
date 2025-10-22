import React from 'react';
import './Footer.css';

const Footer = () => {
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
                        <p>Connecting America's best drivers with premier trucking opportunities since 2010.</p>
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
                        <h4>Services</h4>
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
                        <h4>Job Types</h4>
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
                        <h4>Company</h4>
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
                    <p>&copy; 2024 DriverConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
