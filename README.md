# DriverConnect - React Website

A modern, responsive website for a truck drivers hiring agency built with React.

## Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Components**: Smooth scrolling navigation, animated counters, and form validation
- **Performance Optimized**: Uses React hooks and intersection observer for optimal performance
- **Accessibility**: Keyboard navigation support and ARIA compliance

## Tech Stack

- React 18
- CSS3 with CSS Variables
- FontAwesome Icons
- React Intersection Observer
- Framer Motion (optional for advanced animations)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd driverconnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation component
│   ├── Hero.js         # Hero section with animated counters
│   ├── Services.js     # Services showcase
│   ├── Jobs.js         # Job listings
│   ├── Testimonials.js # Customer testimonials
│   ├── About.js        # About section with stats
│   ├── Contact.js      # Contact form and info
│   └── Footer.js       # Footer component
├── App.js              # Main app component
├── App.css             # Global app styles
├── index.js            # React entry point
└── index.css           # Global styles and CSS variables
```

## Key Features

### Navigation
- Fixed navigation with scroll effects
- Mobile-responsive hamburger menu
- Smooth scrolling to sections
- Active section highlighting

### Hero Section
- Animated statistics counters
- Floating truck animation
- Responsive grid layout
- Call-to-action buttons

### Services
- Grid layout with hover effects
- Icon-based service cards
- Intersection observer animations

### Jobs
- Featured job listings
- Salary and benefit information
- Apply now functionality

### Contact Form
- Real-time form validation
- Loading states
- Success/error notifications
- Complete contact information

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes

## Customization

### Colors
Update CSS variables in `src/index.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #f59e0b;
    /* ... other variables */
}
```

### Content
- Update company information in components
- Modify job listings in `Jobs.js`
- Change testimonials in `Testimonials.js`
- Update contact details in `Contact.js`

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your Git repository for automatic deployments

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Performance Optimizations

- Intersection Observer for scroll animations
- Lazy loading ready
- Optimized images and assets
- Minimal bundle size
- Efficient re-renders with React hooks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact the development team.
