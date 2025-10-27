import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        // Get saved language from localStorage or default to English
        return localStorage.getItem('selectedLanguage') || 'en';
    });

    const changeLanguage = (languageCode) => {
        setCurrentLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);
    };

    useEffect(() => {
        // Save language preference
        localStorage.setItem('selectedLanguage', currentLanguage);
    }, [currentLanguage]);

    const value = {
        currentLanguage,
        changeLanguage,
        isEnglish: currentLanguage === 'en',
        isSpanish: currentLanguage === 'es'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
