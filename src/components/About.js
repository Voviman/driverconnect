import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './About.css';

const About = () => {
    const { currentLanguage } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const features = [
        {
            icon: 'fas fa-award',
            title: 'Industry Leaders',
            description: 'Recognized as the top truck driver placement agency in the US'
        },
        {
            icon: 'fas fa-users',
            title: 'Experienced Team',
            description: 'Our recruiters have decades of combined trucking industry experience'
        },
        {
            icon: 'fas fa-globe-americas',
            title: 'Nationwide Network',
            description: 'Partnerships with companies in all 50 states'
        }
    ];

    return (
        <section id="about" className="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>{getTranslation(currentLanguage, 'about.title')}</h2>
                        <p>
                            {getTranslation(currentLanguage, 'about.description')}
                        </p>
                        
                        <div className="about-features">
                            {getTranslation(currentLanguage, 'about.features').map((feature, index) => (
                                <div key={index} className="feature">
                                    <i className={features[index].icon}></i>
                                    <div>
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="about-visual">
                        <div ref={ref} className="stats-visualization">
                            <div className={`stat-circle ${inView ? 'animate' : ''}`}>
                                <span className="stat-value">98%</span>
                                <span className="stat-desc">{getTranslation(currentLanguage, 'about.stats.successRate')}</span>
                            </div>
                            <div className={`stat-circle ${inView ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                                <span className="stat-value">15</span>
                                <span className="stat-desc">{getTranslation(currentLanguage, 'about.stats.yearsExperience')}</span>
                            </div>
                            <div className={`stat-circle ${inView ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                                <span className="stat-value">24/7</span>
                                <span className="stat-desc">{getTranslation(currentLanguage, 'about.stats.support')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
