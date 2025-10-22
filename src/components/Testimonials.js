import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Testimonials.css';

const Testimonials = () => {
    const { currentLanguage } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const testimonials = [
        {
            content: "DriverConnect helped me find the perfect OTR position. The pay is great and the company treats drivers with respect. Best career move I've made!",
            author: "Mike Rodriguez",
            position: "OTR Driver, 8 years experience"
        },
        {
            content: "As a new CDL holder, I was nervous about finding work. DriverConnect's team guided me through everything and found me a local position with great benefits.",
            author: "Sarah Johnson",
            position: "Local Driver, 1 year experience"
        },
        {
            content: "The support doesn't end after placement. DriverConnect continues to check in and help with career advancement. They truly care about their drivers.",
            author: "David Thompson",
            position: "Regional Driver, 5 years experience"
        }
    ];

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>{getTranslation(currentLanguage, 'testimonials.title')}</h2>
                    <p>{getTranslation(currentLanguage, 'testimonials.subtitle')}</p>
                </div>
                <div ref={ref} className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className={`testimonial-card ${inView ? 'fade-in visible' : 'fade-in'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="testimonial-content">
                                <p>"{testimonial.content}"</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="author-info">
                                    <h4>{testimonial.author}</h4>
                                    <span>{testimonial.position}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
