/**
 * Dynamic Sitemap Generator for DriverConnect
 * Run this script to generate sitemap.xml dynamically
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://driverconnect.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Define your pages here
const pages = [
    {
        url: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/#services',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/#jobs',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/#about',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/#contact',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
    },
    {
        url: '/#testimonials',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
    }
];

// Generate XML
const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
    xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
    xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
    xml += '    \n';

    pages.forEach(page => {
        xml += '    <url>\n';
        xml += `        <loc>${DOMAIN}${page.url}</loc>\n`;
        xml += `        <lastmod>${page.lastmod}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        xml += '    </url>\n';
        xml += '    \n';
    });

    xml += '</urlset>\n';

    return xml;
};

// Write sitemap to file
const writeSitemap = () => {
    try {
        const sitemap = generateSitemap();
        fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
        console.log('✅ Sitemap generated successfully!');
        console.log(`📄 Location: ${OUTPUT_PATH}`);
        console.log(`🔗 Pages included: ${pages.length}`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
};

// Run the script
writeSitemap();

