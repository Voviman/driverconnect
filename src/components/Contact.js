import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { sendFormEmail, sendToMultipleRecipients } from '../services/emailService';
import './Contact.css';

const Contact = () => {
    const { currentLanguage } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        cdlType: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        
        if (!formData.experience) {
            newErrors.experience = 'Please select your experience level';
        }
        
        if (!formData.cdlType) {
            newErrors.cdlType = 'Please select your CDL type';
        }
        
        return newErrors;
    };

    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type} show`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Send email using basic EmailJS function
            const result = await sendFormEmail(formData, currentLanguage);
            
            if (result.success) {
                console.log('Email sent successfully:', result);
                showNotification(
                    getTranslation(currentLanguage, 'contact.form.success') || 
                    "Application submitted successfully! We'll contact you within 24 hours.", 
                    'success'
                );
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    experience: '',
                    cdlType: '',
                    message: ''
                });
                setErrors({});
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification(
                getTranslation(currentLanguage, 'contact.form.error') || 
                'There was an error submitting your application. Please try again.', 
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <h2>{getTranslation(currentLanguage, 'contact.title')}</h2>
                    <p>{getTranslation(currentLanguage, 'contact.subtitle')}</p>
                </div>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="contact-details">
                                <h4>{getTranslation(currentLanguage, 'contact.info.call')}</h4>
                                <p>1-800-DRIVERS (1-800-374-8377)</p>
                                <span>{getTranslation(currentLanguage, 'contact.info.available')}</span>
                            </div>
                        </div>
                        
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-details">
                                <h4>{getTranslation(currentLanguage, 'contact.info.email')}</h4>
                                <p>careers@driverconnect.com</p>
                                <span>{getTranslation(currentLanguage, 'contact.info.response')}</span>
                            </div>
                        </div>
                        
                        <div className="contact-item">
                            <div className="contact-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="contact-details">
                                <h4>{getTranslation(currentLanguage, 'contact.info.visit')}</h4>
                                <p>1280 Powis Rd, West Chicago IL, 60185</p>
                                <span>{getTranslation(currentLanguage, 'contact.info.hours')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form-container">
                        <form id="apply" className="contact-form" onSubmit={handleSubmit}>
                            <h3>{getTranslation(currentLanguage, 'contact.form.title')}</h3>
                            
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={getTranslation(currentLanguage, 'contact.form.name')}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={errors.name ? 'error' : ''}
                                    required
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>
                            
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={getTranslation(currentLanguage, 'contact.form.email')}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                    required
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder={getTranslation(currentLanguage, 'contact.form.phone')}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                    required
                                />
                                {errors.phone && <div className="error-message">{errors.phone}</div>}
                            </div>
                            
                            <div className="form-group">
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className={errors.experience ? 'error' : ''}
                                    required
                                >
                                    <option value="">Years of Experience</option>
                                    <option value="0-1">0-1 Years</option>
                                    <option value="2-5">2-5 Years</option>
                                    <option value="6-10">6-10 Years</option>
                                    <option value="10+">10+ Years</option>
                                </select>
                                {errors.experience && <div className="error-message">{errors.experience}</div>}
                            </div>
                            
                            <div className="form-group">
                                <select
                                    name="cdlType"
                                    value={formData.cdlType}
                                    onChange={handleInputChange}
                                    className={errors.cdlType ? 'error' : ''}
                                    required
                                >
                                    <option value="">CDL Type</option>
                                    <option value="class-a">Class A</option>
                                    <option value="class-b">Class B</option>
                                    <option value="class-c">Class C</option>
                                    <option value="none">No CDL (Need Training)</option>
                                </select>
                                {errors.cdlType && <div className="error-message">{errors.cdlType}</div>}
                            </div>
                            
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder={getTranslation(currentLanguage, 'contact.form.message')}
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> {getTranslation(currentLanguage, 'contact.form.processing')}
                                    </>
                                ) : (
                                    getTranslation(currentLanguage, 'contact.form.submit')
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
