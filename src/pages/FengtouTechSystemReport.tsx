import React from 'react'
import './FengtouTechSystemReport.css'
import { slides } from './fengtouTechSystemSlides'
import html2pdf from 'html2pdf.js'

const FengtouTechSystemReport: React.FC = () => {
  const handleExportPDF = () => {
    const element = document.querySelector('.fengtou-report-content') as HTMLElement
    if (!element) return

    const opt = {
      margin: [12, 10, 12, 10], // top, left, bottom, right in mm - 减小边距
      filename: '丰图技术体系2026重点工作规划汇报.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    html2pdf().set(opt).from(element).save()
  }

  // 解析文本中的标记并转换为高亮
  const parseHighlights = (text: string) => {
    const parts = []
    let currentIndex = 0
    const regex = /(\*\*[^*]+\*\*|##[^#]+##|@@[^@]+@@|%%[^%]+%%)/g
    let match

    while ((match = regex.exec(text)) !== null) {
      // 添加标记前的普通文本
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index))
      }

      // 解析标记
      const fullMatch = match[0]
      let className = ''
      let content = ''

      if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
        className = 'highlight-strategic'
        content = fullMatch.slice(2, -2)
      } else if (fullMatch.startsWith('##') && fullMatch.endsWith('##')) {
        className = 'highlight-platform'
        content = fullMatch.slice(2, -2)
      } else if (fullMatch.startsWith('@@') && fullMatch.endsWith('@@')) {
        className = 'highlight-ai'
        content = fullMatch.slice(2, -2)
      } else if (fullMatch.startsWith('%%') && fullMatch.endsWith('%%')) {
        className = 'highlight-measure'
        content = fullMatch.slice(2, -2)
      }

      parts.push(<span key={match.index} className={className}>{content}</span>)
      currentIndex = regex.lastIndex
    }

    // 添加剩余的文本
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="fengtou-report-container">
      <div className="fengtou-report-toolbar">
        <button className="fengtou-report-export-btn" onClick={handleExportPDF}>
          📥 导出为 PDF
        </button>
      </div>
      <div className="fengtou-report-content">
        {slides.map((slide, slideIdx) => (
          <section key={slideIdx} className="fengtou-report-slide">
            {/* 标题和副标题 */}
            <header className="fengtou-report-header">
              <h1 className="fengtou-report-title">{slide.title}</h1>
              {slide.subtitle && <h2 className="fengtou-report-subtitle">{slide.subtitle}</h2>}
            </header>

            {/* 战略主题块 */}
            {slide.strategicTheme && (
              <div className="fengtou-report-strategic-theme">
                {slide.strategicTheme.split('\n').map((line, idx) => (
                  line.trim() ? <p key={idx}>{parseHighlights(line)}</p> : null
                ))}
              </div>
            )}

            {/* 平台架构（仅治理页显示） */}
            {slide.platforms && (
              <section className="fengtou-report-platforms">
                <h3 className="fengtou-report-section-title">平台化治理基础架构</h3>
                <div className="fengtou-report-platforms-grid">
                  {slide.platforms.map((platform: any, idx: number) => (
                    <div key={idx} className="fengtou-report-platform-card">
                      <div className="fengtou-report-platform-name">{platform.name}</div>
                      <div className="fengtou-report-platform-desc">{parseHighlights(platform.description)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 面板内容（诊断或治理抓手） */}
            {slide.panels && (
              <section className="fengtou-report-panels">
                {slide.part === '诊断' && (
                  <h3 className="fengtou-report-section-title">核心问题诊断</h3>
                )}
                {slide.part === '治理' && slide.id !== 3 && (
                  <h3 className="fengtou-report-section-title">核心治理抓手</h3>
                )}
                {slide.part === '治理' && slide.id === 3 && (
                  <h3 className="fengtou-report-section-title">四维衡量标准</h3>
                )}
                
                <div className={`fengtou-report-panels-list ${slide.id === 3 ? 'fengtou-report-panels-two-column' : ''}`}>
                  {slide.panels.map((panel: any, panelIdx: number) => (
                    <article key={panelIdx} className="fengtou-report-panel">
                      <h4 className="fengtou-report-panel-title">{panel.title}</h4>
                      
                      <div className="fengtou-report-panel-sections">
                        {panel.sections.map((section: any, sectionIdx: number) => (
                          <div key={sectionIdx} className="fengtou-report-panel-section">
                            <h5 className="fengtou-report-panel-section-heading">
                              {section.heading}
                            </h5>
                            <ul className="fengtou-report-panel-section-list">
                              {section.items.map((item: string, itemIdx: number) => (
                                <li key={itemIdx}>{parseHighlights(item)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* 分页符 */}
            {slideIdx < slides.length - 1 && <div className="fengtou-report-page-break" />}
          </section>
        ))}
      </div>
    </div>
  )
}

export default FengtouTechSystemReport
