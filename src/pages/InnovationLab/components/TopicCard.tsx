import React, { useState } from 'react';
import './TopicCard.css';

interface Topic {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  description: string;
  details: string;
  highlights: string[];
  cooperation: string;
  diagram: React.ReactNode;
}

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="topic-card-wrapper">
      <div className="topic-card">
        {/* 左侧内容区 */}
        <div className="topic-content">
          <div className="topic-header">
            <h3 className="topic-number">{topic.title}</h3>
            <h2 className="topic-title">{topic.subtitle}</h2>
            <p className="topic-title-en">{topic.titleEn}</p>
          </div>

          <p className="topic-description">{topic.description}</p>
          <p className="topic-details">{topic.details}</p>

          {/* 研究重点 */}
          <div className="highlights-section">
            <h4 className="highlights-title">研究重点</h4>
            <ul className="highlights-list">
              {topic.highlights.map((highlight, index) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-dot"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* 合作方式 */}
          <div className="cooperation-section">
            <h4 className="cooperation-title">合作方式</h4>
            <p className="cooperation-text">{topic.cooperation}</p>
          </div>

          {/* CTA 按钮 */}
          <div className="topic-cta-buttons">
            <button className="topic-cta-btn btn-explore">了解更多</button>
            <button className="topic-cta-btn btn-contact">联系我们</button>
          </div>
        </div>

        {/* 右侧图表区 */}
        <div className="topic-diagram">
          {topic.diagram}
        </div>
      </div>
    </div>
  );
};
