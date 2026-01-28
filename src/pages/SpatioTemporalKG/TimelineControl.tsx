import React from 'react';
import './TimelineControl.css';
import { AOIStatus } from './demoData';

interface TimelineControlProps {
  timeline: AOIStatus[];
  currentIndex: number;
  onChange: (index: number) => void;
}

export const TimelineControl: React.FC<TimelineControlProps> = ({
  timeline,
  currentIndex,
  onChange
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      onChange(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < timeline.length - 1) {
      onChange(currentIndex + 1);
    }
  };
  
  return (
    <div className="timeline-control">
      <div className="timeline-header">
        <span className="timeline-icon">⏱️</span>
        <span className="timeline-title">时间轴</span>
        <span className="timeline-subtitle">Time Slider</span>
      </div>
      
      <div className="timeline-main">
        <button 
          className="timeline-button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ◀
        </button>
        
        <div className="timeline-slider-container">
          <input
            type="range"
            min="0"
            max={timeline.length - 1}
            value={currentIndex}
            onChange={handleSliderChange}
            className="timeline-slider"
          />
          
          <div className="timeline-markers">
            {timeline.map((status, index) => (
              <div
                key={index}
                className={`timeline-marker ${index === currentIndex ? 'active' : ''}`}
                style={{ 
                  left: `${(index / (timeline.length - 1)) * 100}%`,
                }}
                onClick={() => onChange(index)}
              >
                <div 
                  className="marker-dot"
                  style={{ backgroundColor: status.color }}
                ></div>
                <div className="marker-label">
                  <div className="marker-time">{status.time}</div>
                  <div className="marker-status">{status.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="timeline-button"
          onClick={handleNext}
          disabled={currentIndex === timeline.length - 1}
        >
          ▶
        </button>
      </div>
      
      <div className="timeline-current">
        <span className="current-time">{timeline[currentIndex].time}</span>
        <span className="current-separator">|</span>
        <span 
          className="current-status"
          style={{ color: timeline[currentIndex].color }}
        >
          {timeline[currentIndex].description}
        </span>
      </div>
    </div>
  );
};
