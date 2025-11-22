import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "EmploymentAgency",
        "name": "DriverConnect",
        "description": "Premier truck driver hiring agency connecting skilled CDL drivers with top-paying positions nationwide",
        "url": "https://driverconnect.com",
        "logo": "https://driverconnect.com/img/DRIVER CONNECT LOGO AZUL.png",
        "image": "https://driverconnect.com/img/DRIVER CONNECT LOGO AZUL.png",
        "telephone": "+1-XXX-XXX-XXXX",
        "email": "jose@driverconnect.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "sameAs": [
            "https://www.facebook.com/driverconnect",
            "https://www.linkedin.com/company/driverconnect"
        ],
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "serviceType": [
            "CDL Driver Placement",
            "Truck Driver Recruitment",
            "Commercial Driver Jobs",
            "Class A CDL Jobs",
            "Class B CDL Jobs"
        ]
    };

    // Website Schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "DriverConnect",
        "url": "https://driverconnect.com",
        "description": "Premier truck driver hiring agency",
        "publisher": {
            "@type": "Organization",
            "name": "DriverConnect"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://driverconnect.com/#jobs?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Employment Agency",
        "provider": {
            "@type": "Organization",
            "name": "DriverConnect"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "CDL Driver Jobs",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Class A CDL Driver Positions"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Class B CDL Driver Positions"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "OTR Truck Driver Jobs"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Local Truck Driver Jobs"
                    }
                }
            ]
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://driverconnect.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://driverconnect.com/#services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Jobs",
                "item": "https://driverconnect.com/#jobs"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact",
                "item": "https://driverconnect.com/#contact"
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(serviceSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
        </Helmet>
    );
};

export default StructuredData;

