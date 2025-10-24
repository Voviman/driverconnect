import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Jobs.css';

const Jobs = () => {
    const { currentLanguage } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const jobs = [
        {
            title: 'Trainee Truck Driver',
            salary: '$75K - $85K/year',
            location: 'Nationwide Routes',
            type: 'Class A CDL Required',
            experience: '0 Years Experience',
            benefits: ['Paid trainee Program', '401K Match', 'Free Transportation']
        },
        {
            title: 'Leare Operator position',
            salary: '$80K - $95K/year',
            location: 'Nationwide Routes',
            type: 'Class A CDL Required',
            experience: '1+ Years Experience',
            benefits: ['Lease to Purchase program', 'Performance Bonus', 'Equipment Provided']
        },
        {
            title: 'Owner Operator',
            salary: '$100K - $120K/year',
            location: 'Nationwide Routes',
            type: 'Class A CDL Required',
            experience: '1+ Years Experience',
            benefits: ['High Pay', 'Weekly Settlements', 'Union Benefits']
        }
    ];

    const scrollToApply = () => {
        const section = document.getElementById('apply');
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="jobs" className="jobs">
            <div className="container">
                <div className="section-header">
                    <h2>{getTranslation(currentLanguage, 'jobs.title')}</h2>
                    <p>{getTranslation(currentLanguage, 'jobs.subtitle')}</p>
                </div>
                <div ref={ref} className="jobs-grid">
                    {jobs.map((job, index) => (
                        <div 
                            key={index}
                            className={`job-card ${inView ? 'fade-in visible' : 'fade-in'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="job-header">
                                <h3>{job.title}</h3>
                                <span className="job-salary">{job.salary}</span>
                            </div>
                            <div className="job-details">
                                <div className="job-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{job.location}</span>
                                </div>
                                <div className="job-type">
                                    <i className="fas fa-truck"></i>
                                    <span>{job.type}</span>
                                </div>
                                <div className="job-experience">
                                    <i className="fas fa-calendar"></i>
                                    <span>{job.experience}</span>
                                </div>
                            </div>
                            <div className="job-benefits">
                                {job.benefits.map((benefit, benefitIndex) => (
                                    <span key={benefitIndex} className="benefit">{benefit}</span>
                                ))}
                            </div>
                            <button className="btn btn-outline" onClick={scrollToApply}>
                                {getTranslation(currentLanguage, 'jobs.applyButton')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Jobs;
