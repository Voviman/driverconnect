import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './LanguageSelector.css';

const LanguageSelector = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'en', name: getTranslation(currentLanguage, 'language.english'), flag: 'us', image: '/img/united-states.png' },
        { code: 'es', name: getTranslation(currentLanguage, 'language.spanish'), flag: 'es', image: '/img/spain.png' }
    ];

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="language-selector" ref={dropdownRef}>
            <button 
                className="language-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={getTranslation(currentLanguage, 'language.select')}
            >
                {currentLang?.image ? (
                    <img 
                        src={currentLang.image} 
                        alt={`${currentLang.name} flag`}
                        className="flag flag-image"
                    />
                ) : (
                    <span className={`flag flag-${currentLang?.flag}`}></span>
                )}
                <span className="language-code">{currentLanguage.toUpperCase()}</span>
                <span className={`chevron ${isOpen ? 'rotate' : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(language.code)}
                        >
                            {language.image ? (
                                <img 
                                    src={language.image} 
                                    alt={`${language.name} flag`}
                                    className="flag flag-image"
                                />
                            ) : (
                                <span className={`flag flag-${language.flag}`}></span>
                            )}
                            <span className="language-name">{language.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
