import React, { useEffect, useState } from 'react'
import './AITransformationPresentation.css'
import './FengtouTechSystemPresentation.css'
import { slides, SlideData } from './fengtouTechSystemSlides'

const useKeyboardNavigation = (
  total: number,
  goPrev: () => void,
  goNext: () => void,
  toggleOverview: () => void,
  toggleNotes: () => void,
  toggleFullscreen?: () => void
) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goPrev()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          }
        } else {
          toggleOverview()
        }
      } else if (event.key === 'n' || event.key === 'N') {
        event.preventDefault()
        toggleNotes()
      } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault()
        if (toggleFullscreen) toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total, goPrev, goNext, toggleOverview, toggleNotes])
}

const SlideView: React.FC<{
  slide: SlideData
  index: number
  total: number
  showNotes: boolean
}> = ({ slide, index, total, showNotes }) => {
  const renderHTMLBlock = (Tag: 'h1' | 'h2' | 'p' | 'li', text?: string, className?: string) => {
    if (!text) return null
    const Component: any = Tag
    return <Component className={className} dangerouslySetInnerHTML={{ __html: text }} />
  }

  return (
    <div className="ai-slide-frame fengtou-slide-frame fengtou-enterprise-frame">
      <div className="ai-slide-inner fengtou-enterprise-inner">
        <header className="ai-slide-header fengtou-enterprise-header">
          <div className="ai-slide-tag">
            {(() => {
              const segments = slide.tag.split('·')
              if (segments.length === 1) {
                return <span className="ai-slide-tag-part-only">{slide.tag}</span>
              }
              const left = segments[0].trim()
              const right = segments.slice(1).join('·').trim()
              return (
                <>
                  <span className="ai-slide-tag-part">{left}</span>
                  <span className="ai-slide-tag-sep"> · </span>
                  <span className="ai-slide-tag-phase">{right}</span>
                </>
              )
            })()}
          </div>
          <div className="ai-slide-progress">
            <span>
              {index + 1} / {total}
            </span>
            <div className="ai-slide-progress-bar">
              <div
                className="ai-slide-progress-fill"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </header>

        <main className="ai-slide-main fengtou-enterprise-main">
          <div className="fengtou-title-section">
            {renderHTMLBlock('h1', slide.title, 'ai-slide-title fengtou-enterprise-title')}
            {renderHTMLBlock('h2', slide.subtitle, 'ai-slide-subtitle fengtou-enterprise-subtitle')}
          </div>

          {slide.strategicTheme && (
            <section className="fengtou-strategic-theme">
              <p>{slide.strategicTheme}</p>
            </section>
          )}

          {slide.platforms && (
            <section className="fengtou-platforms-section">
              <div className="fengtou-platforms-grid">
                {slide.platforms.map((platform: any, idx: number) => (
                  <div key={idx} className="fengtou-platform-card">
                    <div className="fengtou-platform-name">{platform.name}</div>
                    <div className="fengtou-platform-desc">{platform.description}</div>
                  </div>
                ))}
              </div>
              <div className="fengtou-platforms-connections" />
            </section>
          )}

          {slide.panels && (
            <section className="fengtou-panels-section">
              {slide.panels.map((panel: any, panelIdx: number) => (
                <article key={panelIdx} className="fengtou-panel">
                  <h3 className="fengtou-panel-title">{panel.title}</h3>
                  <div className="fengtou-panel-content">
                    {panel.sections.map((section: any, sectionIdx: number) => (
                      <div key={sectionIdx} className="fengtou-panel-section">
                        <div className="fengtou-panel-section-heading">{section.heading}</div>
                        <ul className="fengtou-panel-section-list">
                          {section.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>

        <footer className="ai-slide-footer fengtou-enterprise-footer">
          <div className="ai-slide-footer-left">{slide.part}</div>
          <div className="ai-slide-footer-center">Press N 查看备注</div>
          <div className="ai-slide-footer-right">{slide.tag}</div>
        </footer>
      </div>

      {showNotes && slide.notes && (
        <aside className="ai-slide-notes">
          <div className="ai-slide-notes-label">Speaker Notes</div>
          <p>{slide.notes}</p>
        </aside>
      )}
    </div>
  )
}

const OverviewGrid: React.FC<{
  slides: SlideData[]
  currentIndex: number
  onSelect: (index: number) => void
}> = ({ slides, currentIndex, onSelect }) => {
  return (
    <div className="ai-overview-grid">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          className={
            'ai-overview-item' + (index === currentIndex ? ' ai-overview-item-active' : '')
          }
          onClick={() => onSelect(index)}
        >
          <div className="ai-overview-index">{index + 1}</div>
          <div className="ai-overview-tag">{slide.tag}</div>
          <div className="ai-overview-title">{slide.title}</div>
        </button>
      ))}
    </div>
  )
}

const FengtouTechSystemPresentation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showOverview, setShowOverview] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const total = slides.length

  const goPrev = () => {
    setCurrentIndex((index) => (index > 0 ? index - 1 : index))
  }

  const goNext = () => {
    setCurrentIndex((index) => (index < total - 1 ? index + 1 : index))
  }

  const toggleOverview = () => {
    setShowOverview((v) => !v)
  }

  const toggleNotes = () => {
    setShowNotes((v) => !v)
  }

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return
    const elem = document.documentElement as any
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useKeyboardNavigation(total, goPrev, goNext, toggleOverview, toggleNotes, toggleFullscreen)

  const currentSlide = slides[currentIndex]

  return (
    <div className="ai-transformation-root fengtou-report-root">
      <div className="ai-deck-shell">
        {!isFullscreen && (
          <div className="ai-deck-topbar">
            <div className="ai-deck-logo">丰图技术体系</div>
            <div className="ai-deck-shortcuts">
              <span>← / → 翻页 · Space 下一页 · Esc 总览 · N 备注 · F 全屏</span>
            </div>
            <button
              className="ai-deck-fullscreen-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? '退出全屏 (F / Esc)' : '全屏 (F)'}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
          </div>
        )}

        <div className="ai-deck-main">
          {showOverview ? (
            <OverviewGrid
              slides={slides}
              currentIndex={currentIndex}
              onSelect={(index) => {
                setCurrentIndex(index)
                setShowOverview(false)
              }}
            />
          ) : (
            <SlideView
              slide={currentSlide}
              index={currentIndex}
              total={total}
              showNotes={showNotes}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FengtouTechSystemPresentation
