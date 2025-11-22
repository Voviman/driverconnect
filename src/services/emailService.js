import emailjs from '@emailjs/browser';
import { sendToTelegram } from './telegramService';
import { addToGoogleSheets } from './googleSheetsService';

// EmailJS configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_lebubvi', // Replace with your Service ID from EmailJS
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_l2jcwnb', // Replace with your Template ID from EmailJS
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'yUbQP4K87uPcCM6d4' // Replace with your Public Key from EmailJS
};

// Email recipients configuration
const EMAIL_RECIPIENTS = process.env.REACT_APP_EMAIL_RECIPIENTS 
    ? process.env.REACT_APP_EMAIL_RECIPIENTS.split(',')
    : ['jose@Driverconnect.com', 'sam@cdl4hire.com'];

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Send form data via EmailJS
 * @param {Object} formData - Form data to send
 * @param {string} currentLanguage - Current language for email template
 * @returns {Promise} - EmailJS send promise
 */
export const sendFormEmail = async (formData, currentLanguage = 'en') => {
    try {
        // Validate EmailJS configuration
        if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
            throw new Error('EmailJS configuration is incomplete. Please check your Service ID, Template ID, and Public Key.');
        }

        // Prepare email template parameters
        const templateParams = {
            // Basic form data
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            experience: formData.experience,
            cdl_type: formData.cdlType,
            message: formData.message || 'No additional message',
            
            // Additional info
            language: currentLanguage,
            submission_date: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            
            // Subject line based on language
            subject: getEmailSubject(currentLanguage),
            
            // Formatted experience and CDL type for better readability
            experience_text: formatExperience(formData.experience, currentLanguage),
            cdl_type_text: formatCDLType(formData.cdlType, currentLanguage),
            
            // Recipients for template (used in EmailJS template)
            to_name: 'DriverConnect Team',
            reply_to: formData.email
        };

        console.log('Sending email with params:', templateParams);

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return {
            success: true,
            message: 'Email sent successfully',
            response
        };

    } catch (error) {
        console.error('Email sending failed:', error);
        return {
            success: false,
            message: 'Failed to send email',
            error: error.message
        };
    }
};

/**
 * Get email subject based on language
 */
const getEmailSubject = (language) => {
    const subjects = {
        en: 'New Job Application - DriverConnect',
        es: 'Nueva Solicitud de Empleo - DriverConnect'
    };
    return subjects[language] || subjects.en;
};

/**
 * Format experience for email
 */
const formatExperience = (experience, language) => {
    const experienceLabels = {
        en: {
            '0-1': '0-1 Years',
            '2-5': '2-5 Years',
            '6-10': '6-10 Years',
            '10+': '10+ Years'
        },
        es: {
            '0-1': '0-1 Años',
            '2-5': '2-5 Años',
            '6-10': '6-10 Años',
            '10+': '10+ Años'
        }
    };
    return experienceLabels[language]?.[experience] || experience;
};

/**
 * Format CDL type for email
 */
const formatCDLType = (cdlType, language) => {
    const cdlLabels = {
        en: {
            'class-a': 'Class A',
            'class-b': 'Class B',
            'class-c': 'Class C',
            'none': 'No CDL (Need Training)'
        },
        es: {
            'class-a': 'Clase A',
            'class-b': 'Clase B',
            'class-c': 'Clase C',
            'none': 'Sin CDL (Necesita Entrenamiento)'
        }
    };
    return cdlLabels[language]?.[cdlType] || cdlType;
};

/**
 * Send form data to all services: Email, Telegram, and Google Sheets
 * @param {Object} formData - Form data to send
 * @param {string} currentLanguage - Current language for formatting
 * @returns {Promise} - Combined results from all services
 */
export const sendToAllServices = async (formData, currentLanguage = 'en') => {
    const results = {
        email: { success: false },
        telegram: { success: false },
        googleSheets: { success: false }
    };

    try {
        // Send to all services in parallel for better performance
        const [emailResult, telegramResult, googleSheetsResult] = await Promise.allSettled([
            sendFormEmail(formData, currentLanguage),
            sendToTelegram(formData, currentLanguage),
            addToGoogleSheets(formData, currentLanguage)
        ]);

        // Process email result
        if (emailResult.status === 'fulfilled') {
            results.email = emailResult.value;
        } else {
            results.email = {
                success: false,
                error: emailResult.reason?.message || 'Email sending failed'
            };
        }

        // Process Telegram result
        if (telegramResult.status === 'fulfilled') {
            results.telegram = telegramResult.value;
        } else {
            results.telegram = {
                success: false,
                error: telegramResult.reason?.message || 'Telegram sending failed'
            };
        }

        // Process Google Sheets result
        if (googleSheetsResult.status === 'fulfilled') {
            results.googleSheets = googleSheetsResult.value;
        } else {
            results.googleSheets = {
                success: false,
                error: googleSheetsResult.reason?.message || 'Google Sheets operation failed'
            };
        }

        // Determine overall success
        const successCount = Object.values(results).filter(r => r.success).length;
        const totalServices = Object.keys(results).length;

        return {
            success: successCount > 0, // Success if at least one service worked
            results,
            successCount,
            totalServices,
            message: `Successfully sent to ${successCount}/${totalServices} services`,
            partialSuccess: successCount > 0 && successCount < totalServices
        };

    } catch (error) {
        console.error('Error in sendToAllServices:', error);
        return {
            success: false,
            results,
            error: error.message,
            message: 'Failed to send to any service'
        };
    }
};

/**
 * Send email to multiple recipients by calling EmailJS multiple times
 */
export const sendToMultipleRecipients = async (formData, currentLanguage = 'en') => {
    try {
        const results = [];
        
        // Send to each email separately
        for (const email of EMAIL_RECIPIENTS) {
            try {
                // Create separate parameters for each recipient
                const templateParams = {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    experience: formData.experience,
                    cdl_type: formData.cdlType,
                    message: formData.message,
                    language: currentLanguage,
                    submission_date: new Date().toLocaleString(),
                    subject: getEmailSubject(currentLanguage),
                    experience_text: formatExperience(formData.experience, currentLanguage),
                    cdl_type_text: formatCDLType(formData.cdlType, currentLanguage),
                    to_name: 'DriverConnect Team',
                    reply_to: formData.email,
                    recipient_email: email // Specific recipient
                };

                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );

                results.push({
                    email,
                    success: true,
                    response
                });

            } catch (error) {
                results.push({
                    email,
                    success: false,
                    error: error.message
                });
            }
        }

        const successCount = results.filter(r => r.success).length;
        
        return {
            success: successCount > 0,
            results,
            successCount,
            totalRecipients: EMAIL_RECIPIENTS.length,
            message: `Sent to ${successCount}/${EMAIL_RECIPIENTS.length} recipients`
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
