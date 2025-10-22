import React from 'react';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
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
                        <h2>About DriverConnect</h2>
                        <p>
                            For over a decade, DriverConnect has been the bridge between skilled truck drivers 
                            and leading transportation companies across America. We understand the unique challenges 
                            of the trucking industry and work tirelessly to create meaningful connections that 
                            benefit both drivers and employers.
                        </p>
                        
                        <div className="about-features">
                            {features.map((feature, index) => (
                                <div key={index} className="feature">
                                    <i className={feature.icon}></i>
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
                                <span className="stat-desc">Success Rate</span>
                            </div>
                            <div className={`stat-circle ${inView ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                                <span className="stat-value">15</span>
                                <span className="stat-desc">Years Experience</span>
                            </div>
                            <div className={`stat-circle ${inView ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                                <span className="stat-value">24/7</span>
                                <span className="stat-desc">Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
