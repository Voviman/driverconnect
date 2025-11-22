// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
    SPREADSHEET_ID: '1vzqLJjfVaU1DLYlBmY4iaS515dv7EOY3c7C5ptMBui0',
    RANGE: 'Sheet1!A:H', // Adjust range as needed
    API_KEY: process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
};

/**
 * Add data to Google Sheets using Google Sheets API
 * @param {Object} formData - Form data to add to sheets
 * @param {string} currentLanguage - Current language
 * @returns {Promise} - Google Sheets API response
 */
export const addToGoogleSheets = async (formData, currentLanguage = 'en') => {
    try {
        // Validate Google Sheets configuration
        if (!GOOGLE_SHEETS_CONFIG.API_KEY) {
            throw new Error('Google Sheets API key is not configured');
        }

        // Prepare row data
        const rowData = prepareRowData(formData, currentLanguage);
        
        // Use Google Sheets API v4 to append data
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.RANGE}:append`;
        
        const params = new URLSearchParams({
            key: GOOGLE_SHEETS_CONFIG.API_KEY,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS'
        });

        const payload = {
            values: [rowData]
        };

        console.log('Adding data to Google Sheets:', payload);

        const response = await fetch(`${url}?${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Google Sheets API error: ${errorData.error?.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('Data added to Google Sheets successfully:', result);

        return {
            success: true,
            message: 'Data added to Google Sheets successfully',
            response: result
        };

    } catch (error) {
        console.error('Google Sheets operation failed:', error);
        return {
            success: false,
            message: 'Failed to add data to Google Sheets',
            error: error.message
        };
    }
};

/**
 * Prepare row data for Google Sheets
 */
const prepareRowData = (formData, language) => {
    const submissionDate = new Date().toLocaleString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Chicago'
    });

    const experienceText = formatExperienceForSheets(formData.experience, language);
    const cdlTypeText = formatCDLTypeForSheets(formData.cdlType, language);

    // Return array of values for the row
    // Adjust the order and number of columns based on your Google Sheets structure
    return [
        submissionDate,           // A: Date/Time
        formData.name,           // B: Name
        formData.email,          // C: Email
        formData.phone,          // D: Phone
        experienceText,          // E: Experience
        cdlTypeText,             // F: CDL Type
        formData.message || '',  // G: Message
        language                 // H: Language
    ];
};

/**
 * Format experience for Google Sheets
 */
const formatExperienceForSheets = (experience, language) => {
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
 * Format CDL type for Google Sheets
 */
const formatCDLTypeForSheets = (cdlType, language) => {
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
 * Initialize Google Sheets (create headers if needed)
 * This function can be used to set up the spreadsheet with proper headers
 */
export const initializeGoogleSheets = async () => {
    try {
        // Headers for the spreadsheet
        const headers = [
            'Date/Time',
            'Name',
            'Email', 
            'Phone',
            'Experience',
            'CDL Type',
            'Message',
            'Language'
        ];

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/Sheet1!A1:H1`;
        
        const params = new URLSearchParams({
            key: GOOGLE_SHEETS_CONFIG.API_KEY,
            valueInputOption: 'USER_ENTERED'
        });

        const payload = {
            values: [headers]
        };

        const response = await fetch(`${url}?${params}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Google Sheets API error: ${errorData.error?.message || response.statusText}`);
        }

        const result = await response.json();
        
        return {
            success: true,
            message: 'Google Sheets initialized with headers',
            response: result
        };

    } catch (error) {
        console.error('Google Sheets initialization failed:', error);
        return {
            success: false,
            message: 'Failed to initialize Google Sheets',
            error: error.message
        };
    }
};

/**
 * Test Google Sheets connection
 */
export const testGoogleSheetsConnection = async () => {
    try {
        if (!GOOGLE_SHEETS_CONFIG.API_KEY) {
            throw new Error('Google Sheets API key is not configured');
        }

        // Try to read the spreadsheet metadata
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}`;
        const params = new URLSearchParams({
            key: GOOGLE_SHEETS_CONFIG.API_KEY,
            fields: 'properties.title,sheets.properties.title'
        });

        const response = await fetch(`${url}?${params}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Google Sheets API error: ${errorData.error?.message || response.statusText}`);
        }

        const result = await response.json();
        
        return {
            success: true,
            spreadsheetInfo: result
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

