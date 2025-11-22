import axios from 'axios';

// Telegram Bot configuration
const TELEGRAM_CONFIG = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID
};

/**
 * Send message to Telegram group via Bot API
 * @param {Object} formData - Form data to send
 * @param {string} currentLanguage - Current language for message formatting
 * @returns {Promise} - Telegram API response
 */
export const sendToTelegram = async (formData, currentLanguage = 'en') => {
    try {
        // Validate Telegram configuration
        if (!TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
            throw new Error('Telegram configuration is incomplete. Please check BOT_TOKEN and CHAT_ID.');
        }

        // Format message based on language
        const message = formatTelegramMessage(formData, currentLanguage);
        
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
        
        const payload = {
            chat_id: TELEGRAM_CONFIG.CHAT_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true
        };

        console.log('Sending message to Telegram:', payload);

        const response = await axios.post(telegramApiUrl, payload);

        console.log('Telegram message sent successfully:', response.data);
        
        return {
            success: true,
            message: 'Message sent to Telegram successfully',
            response: response.data
        };

    } catch (error) {
        console.error('Telegram sending failed:', error);
        return {
            success: false,
            message: 'Failed to send message to Telegram',
            error: error.response?.data || error.message
        };
    }
};

/**
 * Format message for Telegram based on language
 */
const formatTelegramMessage = (formData, language) => {
    const templates = {
        en: {
            title: '🚛 <b>New Job Application - DriverConnect</b>',
            name: '👤 <b>Name:</b>',
            email: '📧 <b>Email:</b>',
            phone: '📞 <b>Phone:</b>',
            experience: '🎯 <b>Experience:</b>',
            cdlType: '🆔 <b>CDL Type:</b>',
            message: '💬 <b>Message:</b>',
            date: '📅 <b>Submitted:</b>',
            noMessage: 'No additional message provided'
        },
        es: {
            title: '🚛 <b>Nueva Solicitud de Empleo - DriverConnect</b>',
            name: '👤 <b>Nombre:</b>',
            email: '📧 <b>Email:</b>',
            phone: '📞 <b>Teléfono:</b>',
            experience: '🎯 <b>Experiencia:</b>',
            cdlType: '🆔 <b>Tipo de CDL:</b>',
            message: '💬 <b>Mensaje:</b>',
            date: '📅 <b>Enviado:</b>',
            noMessage: 'No se proporcionó mensaje adicional'
        }
    };

    const t = templates[language] || templates.en;
    
    const submissionDate = new Date().toLocaleString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Chicago'
    });

    const experienceText = formatExperienceForTelegram(formData.experience, language);
    const cdlTypeText = formatCDLTypeForTelegram(formData.cdlType, language);

    return `${t.title}

${t.name} ${formData.name}
${t.email} ${formData.email}
${t.phone} ${formData.phone}
${t.experience} ${experienceText}
${t.cdlType} ${cdlTypeText}
${t.message} ${formData.message || t.noMessage}

${t.date} ${submissionDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
};

/**
 * Format experience for Telegram message
 */
const formatExperienceForTelegram = (experience, language) => {
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
 * Format CDL type for Telegram message
 */
const formatCDLTypeForTelegram = (cdlType, language) => {
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
 * Test Telegram bot connection
 */
export const testTelegramConnection = async () => {
    try {
        if (!TELEGRAM_CONFIG.BOT_TOKEN) {
            throw new Error('Bot token is not configured');
        }

        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/getMe`;
        const response = await axios.get(telegramApiUrl);

        return {
            success: true,
            botInfo: response.data.result
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};
