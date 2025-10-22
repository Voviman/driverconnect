import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './VideoSection.css';

const VideoSection = () => {
    const { currentLanguage } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const [activeVideo, setActiveVideo] = useState(0);
    const videoPlayerRef = useRef(null);
    const mainVideoRef = useRef(null);

    // Get translated video data
    const videoData = getTranslation(currentLanguage, 'videoSection.videos');
    const videos = [
        {
            src: '/img/video 1.mp4',
            title: videoData[0]?.title || 'Жизнь водителя дальнобойщика',
            description: videoData[0]?.description || 'Погрузитесь в захватывающий мир дальнобойщиков и их приключений на дорогах lorem1000  ipsum dolor sit amet consectetur adipiscing elit'
        },
        {
            src: '/img/video 2.mp4',
            title: videoData[1]?.title || 'Карьерные возможности',
            description: videoData[1]?.description || 'Откройте для себя множество возможностей в транспортной индустрии'
        }
    ];

    

    return (
        <section id="videos" className="video-section">
            <div className="container">
                <div className="section-header">
                    <h2>{getTranslation(currentLanguage, 'videoSection.title')}</h2>
                    <p>{getTranslation(currentLanguage, 'videoSection.subtitle')}</p>
                </div>
                
                <div ref={ref} className={`video-content ${inView ? 'fade-in visible' : 'fade-in'}`}>
                    <div ref={videoPlayerRef} className="video-player">
                        <div className="video-blur-bg"></div>
                        <video
                            ref={mainVideoRef}
                            key={activeVideo}
                            controls
                            className="main-video"
                            preload="metadata"
                        >
                            <source src={videos[activeVideo].src} type="video/mp4" />
                            {getTranslation(currentLanguage, 'videoSection.browserNotSupported')}
                        </video>
                        
                        <div className="video-info">
                            <h3>{videos[activeVideo].title}</h3>
                            <p>{videos[activeVideo].description}</p>
                        </div>
                    </div>
                    
                    <div className="video-thumbnails">
                        {videos.map((video, index) => (
                            <div
                                key={index}
                                className={`video-thumbnail ${activeVideo === index ? 'active' : ''}`}
                                onClick={() => setActiveVideo(index)}
                            >
                                <div className="thumbnail-blur-bg"></div>
                                <video
                                    muted
                                    className="thumbnail-video"
                                    preload="metadata"
                                    onMouseEnter={(e) => {
                                        e.target.currentTime = 1;
                                        e.target.play();
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.pause();
                                        e.target.currentTime = 1;
                                    }}
                                >
                                    <source src={video.src} type="video/mp4" />
                                </video>
                                <div className="thumbnail-overlay">
                                    <i className="fas fa-play"></i>
                                </div>
                                <div className="thumbnail-info">
                                    <h4>{video.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
