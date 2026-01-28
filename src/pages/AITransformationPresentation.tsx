import React, { useEffect, useState } from 'react';
import './AITransformationPresentation.css';
import { slides, SlideData } from './aiTransformationSlides';

const useKeyboardNavigation = (
  total: number,
  goPrev: () => void,
  goNext: () => void,
  toggleOverview: () => void,
  toggleNotes: () => void
) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        toggleOverview();
      } else if (event.key === 'n' || event.key === 'N') {
        event.preventDefault();
        toggleNotes();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total, goPrev, goNext, toggleOverview, toggleNotes]);
};

const SlideView: React.FC<{
  slide: SlideData;
  index: number;
  total: number;
  showNotes: boolean;
}> = ({ slide, index, total, showNotes }) => {
  const renderHTMLBlock = (Tag: 'h1' | 'h2' | 'p' | 'li', text?: string, className?: string) => {
    if (!text) return null;
    const Component: any = Tag;
    return <Component className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  };

  const isMachineryClosing = slide.id === 19;

  return (
    <div className={
      'ai-slide-frame' + (isMachineryClosing ? ' ai-slide-frame-machinery' : '')
    }>
      <div className="ai-slide-inner">
        <header className="ai-slide-header">
          <div className="ai-slide-tag">
            {(() => {
              const segments = slide.tag.split('·');
              if (segments.length === 1) {
                return <span className="ai-slide-tag-part-only">{slide.tag}</span>;
              }
              const left = segments[0].trim();
              const right = segments.slice(1).join('·').trim();
              return (
                <>
                  <span className="ai-slide-tag-part">{left}</span>
                  <span className="ai-slide-tag-sep"> · </span>
                  <span className="ai-slide-tag-phase">{right}</span>
                </>
              );
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

        <main className="ai-slide-main">
          {renderHTMLBlock('h1', slide.title, 'ai-slide-title')}
          {renderHTMLBlock('h2', slide.subtitle, 'ai-slide-subtitle')}

          {slide.bullets && (
            <ul className="ai-slide-bullets">
              {slide.bullets.map((bullet, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
              ))}
            </ul>
          )}

          {slide.buttons && slide.buttons.length > 0 && (
            <div className="ai-slide-buttons">
              {slide.buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    'ai-slide-button ' + (btn.variant === 'secondary' ? 'secondary' : 'primary')
                  }
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}

          {slide.emphasis && <p className="ai-slide-emphasis">{slide.emphasis}</p>}
        </main>

        <footer className="ai-slide-footer">
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
  );
};

const OverviewGrid: React.FC<{
  slides: SlideData[];
  currentIndex: number;
  onSelect: (index: number) => void;
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
  );
};

const AITransformationPresentation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const total = slides.length;

  const goPrev = () => {
    setCurrentIndex((index) => (index > 0 ? index - 1 : index));
  };

  const goNext = () => {
    setCurrentIndex((index) => (index < total - 1 ? index + 1 : index));
  };

  const toggleOverview = () => {
    setShowOverview((v) => !v);
  };

  const toggleNotes = () => {
    setShowNotes((v) => !v);
  };

  useKeyboardNavigation(total, goPrev, goNext, toggleOverview, toggleNotes);

  const currentSlide = slides[currentIndex];

  return (
    <div className="ai-transformation-root">
      <div className="ai-deck-shell">
        <div className="ai-deck-topbar">
          <div className="ai-deck-logo">丰图 AI</div>
          <div className="ai-deck-shortcuts">
            <span>← / → 翻页 · Space 下一页 · Esc 总览 · N 备注</span>
          </div>
        </div>

        <div className="ai-deck-main">
          {showOverview ? (
            <OverviewGrid
              slides={slides}
              currentIndex={currentIndex}
              onSelect={(index) => {
                setCurrentIndex(index);
                setShowOverview(false);
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
  );
};

export const AITransformationPresenter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);

  const total = slides.length;

  const goPrev = () => {
    setCurrentIndex((index) => (index > 0 ? index - 1 : index));
  };

  const goNext = () => {
    setCurrentIndex((index) => (index < total - 1 ? index + 1 : index));
  };

  const toggleOverview = () => {
    // Presenter 模式不进入总览，仅忽略 Esc
  };

  const toggleNotes = () => {
    setShowNotes((v) => !v);
  };

  useKeyboardNavigation(total, goPrev, goNext, toggleOverview, toggleNotes);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[currentIndex + 1];

  return (
    <div className="ai-transformation-presenter-root">
      <div className="ai-presenter-layout">
        <section className="ai-presenter-left">
          <SlideView
            slide={currentSlide}
            index={currentIndex}
            total={total}
            showNotes={false}
          />
        </section>
        <section className="ai-presenter-right">
          <header className="ai-presenter-header">
            <div className="ai-presenter-title">Presenter View</div>
            <div className="ai-presenter-meta">
              <span>
                Slide {currentIndex + 1} / {total}
              </span>
              <button type="button" onClick={toggleNotes} className="ai-presenter-notes-toggle">
                {showNotes ? '隐藏备注 (N)' : '显示备注 (N)'}
              </button>
            </div>
          </header>

          <div className="ai-presenter-notes">
            <h2 className="ai-presenter-slide-title">{currentSlide.title}</h2>
            {currentSlide.subtitle && (
              <p className="ai-presenter-slide-subtitle">{currentSlide.subtitle}</p>
            )}
            {showNotes && currentSlide.notes && (
              <p className="ai-presenter-notes-text">{currentSlide.notes}</p>
            )}
          </div>

          <footer className="ai-presenter-footer">
            {nextSlide ? (
              <div className="ai-presenter-next">
                <div className="ai-presenter-next-label">下一页预览</div>
                <div className="ai-presenter-next-title">{nextSlide.title}</div>
                {nextSlide.subtitle && (
                  <div className="ai-presenter-next-subtitle">{nextSlide.subtitle}</div>
                )}
              </div>
            ) : (
              <div className="ai-presenter-next">
                <div className="ai-presenter-next-label">已到最后一页</div>
              </div>
            )}
          </footer>
        </section>
      </div>
    </div>
  );
};

export default AITransformationPresentation;
