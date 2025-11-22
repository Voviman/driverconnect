import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = "DriverConnect - Premier Truck Driver Hiring Agency | CDL Jobs Nationwide",
    description = "DriverConnect connects skilled CDL truck drivers with top-paying positions nationwide. Find Class A, Class B CDL jobs with competitive pay, benefits, and flexible schedules.",
    keywords = "truck driver jobs, CDL jobs, Class A CDL, Class B CDL, trucking careers, driver placement, OTR jobs",
    image = "/img/DRIVER CONNECT LOGO AZUL.png",
    url = "https://driverconnect.com",
    type = "website"
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;

