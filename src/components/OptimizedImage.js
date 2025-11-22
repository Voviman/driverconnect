import React, { useState } from 'react';

/**
 * OptimizedImage component with lazy loading and SEO-friendly alt tags
 * Usage: <OptimizedImage src="image.jpg" alt="Description" />
 */
const OptimizedImage = ({ 
    src, 
    alt, 
    className = '', 
    width, 
    height,
    loading = 'lazy',
    style = {}
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
    };

    if (hasError) {
        return (
            <div 
                className={`image-placeholder ${className}`}
                style={{
                    ...style,
                    width: width || '100%',
                    height: height || 'auto',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                }}
            >
                Image not available
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={loading}
            style={{
                ...style,
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
            onLoad={handleLoad}
            onError={handleError}
        />
    );
};

export default OptimizedImage;

