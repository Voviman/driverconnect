import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Services.css';

const Services = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const services = [
        {
            icon: 'fas fa-search',
            title: 'Job Matching',
            description: 'Advanced algorithms match your skills and preferences with the perfect trucking opportunities.'
        },
        {
            icon: 'fas fa-handshake',
            title: 'Career Guidance',
            description: 'Expert career counselors help you navigate your trucking career path and maximize earnings.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Benefits Support',
            description: 'Assistance with health insurance, retirement planning, and other essential benefits.'
        },
        {
            icon: 'fas fa-graduation-cap',
            title: 'Training Programs',
            description: 'Access to CDL training, safety courses, and professional development opportunities.'
        },
        {
            icon: 'fas fa-clock',
            title: '24/7 Support',
            description: 'Round-the-clock assistance for drivers on the road and companies needing immediate help.'
        },
        {
            icon: 'fas fa-map-marked-alt',
            title: 'Route Optimization',
            description: 'Technology-driven route planning to maximize efficiency and minimize downtime.'
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2>Our Services</h2>
                    <p>Comprehensive solutions for drivers and trucking companies</p>
                </div>
                <div ref={ref} className="services-grid">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className={`service-card ${inView ? 'fade-in visible' : 'fade-in'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="service-icon">
                                <i className={service.icon}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
