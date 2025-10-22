import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Services.css';

const Services = () => {
    const { currentLanguage } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const serviceIcons = [
        'fas fa-search',
        'fas fa-handshake',
        'fas fa-shield-alt',
        'fas fa-graduation-cap',
        'fas fa-clock',
        'fas fa-map-marked-alt'
    ];

    const services = getTranslation(currentLanguage, 'services.items').map((service, index) => ({
        ...service,
        icon: serviceIcons[index]
    }));

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2>{getTranslation(currentLanguage, 'services.title')}</h2>
                    <p>{getTranslation(currentLanguage, 'services.subtitle')}</p>
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
