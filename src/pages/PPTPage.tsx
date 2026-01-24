import React, { useState } from 'react'
import './PPTPage.css'

interface Slide {
  id: number
  title: string
  description: string
  imageUrl?: string
}

const PPTPage: React.FC = () => {
  const [slides] = useState<Slide[]>([
    {
      id: 1,
      title: '共享智能',
      description: 'AI分享 - 智能展示系统'
    },
    {
      id: 2,
      title: '功能介绍',
      description: '展示高质量的演示文稿'
    },
    {
      id: 3,
      title: '应用场景',
      description: '适用于团队协作和知识分享'
    }
  ])

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="ppt-page">
      <div className="ppt-container">
        <div className="slide-viewer">
          <div className="slide">
            <h2>{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].description}</p>
            {slides[currentSlide].imageUrl && (
              <img 
                src={slides[currentSlide].imageUrl} 
                alt={slides[currentSlide].title}
                className="slide-image"
              />
            )}
          </div>
        </div>

        <div className="ppt-controls">
          <button onClick={prevSlide} className="control-btn prev-btn">
            ← 上一页
          </button>
          
          <div className="slide-counter">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <button onClick={nextSlide} className="control-btn next-btn">
            下一页 →
          </button>
        </div>

        <div className="slide-thumbnails">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <span>{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="ppt-info">
          <h3>演示文稿信息</h3>
          <p>
            <strong>文件名：</strong> AI分享 (1).pptx
          </p>
          <p>
            <strong>总幻灯片数：</strong> {slides.length}
          </p>
          <p>
            <strong>当前幻灯片：</strong> {currentSlide + 1}
          </p>
          <a href="/AI分享 (1).pptx" download className="download-btn">
            📥 下载演示文稿
          </a>
        </div>
      </div>
    </div>
  )
}

export default PPTPage
