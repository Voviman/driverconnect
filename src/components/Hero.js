import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const [counters, setCounters] = useState({
        drivers: 0,
        companies: 0,
        salary: 0
    });

    useEffect(() => {
        const animateCounters = () => {
            const targets = { drivers: 5000, companies: 500, salary: 75 };
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                
                setCounters({
                    drivers: Math.floor(targets.drivers * progress),
                    companies: Math.floor(targets.companies * progress),
                    salary: Math.floor(targets.salary * progress)
                });

                if (currentStep >= steps) {
                    clearInterval(timer);
                    setCounters(targets);
                }
            }, stepDuration);
        };

        // Start animation after component mounts
        const timeout = setTimeout(animateCounters, 500);
        return () => clearTimeout(timeout);
    }, []);

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
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Connect with <span className="highlight">Premium</span> Trucking Opportunities
                    </h1>
                    <p className="hero-subtitle">
                        Join America's leading truck driver hiring agency. We connect experienced drivers with top-paying positions nationwide.
                    </p>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">{counters.drivers.toLocaleString()}+</span>
                            <span className="stat-label">Drivers Placed</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">{counters.companies}+</span>
                            <span className="stat-label">Partner Companies</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">${counters.salary}K+</span>
                            <span className="stat-label">Average Salary</span>
                        </div>
                    </div>
                    <div className="hero-buttons">
                        <button 
                            className="btn btn-primary"
                            onClick={() => scrollToSection('apply')}
                        >
                            Find Your Next Job
                        </button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('services')}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="truck-animation">
                        <i className="fas fa-truck"></i>
                    </div>
                    <div className="road-lines"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
