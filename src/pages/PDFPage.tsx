import React, { useState } from 'react'
import './PDFPage.css'

const PDFPage: React.FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [totalPages] = useState<number | null>(null)

  const nextPage = () => {
    if (totalPages === null || pageNum < totalPages) {
      setPageNum(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(prev => prev - 1)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && (totalPages === null || page <= totalPages)) {
      setPageNum(page)
    }
  }

  return (
    <div className="pdf-page">
      <div className="pdf-container">
        <div className="pdf-header">
          <h2>📄 PDF文档展示</h2>
          <p className="file-name">数据可信_决策底座.pdf</p>
        </div>

        <div className="pdf-viewer">
          <div className="pdf-iframe-container">
            <iframe
              src="/数据可信_决策底座.pdf"
              title="PDF文档"
              className="pdf-iframe"
            ></iframe>
          </div>
        </div>

        <div className="pdf-controls">
          <button 
            onClick={prevPage} 
            className="control-btn prev-btn"
            disabled={pageNum <= 1}
          >
            ← 上一页
          </button>
          
          <div className="page-input-group">
            <input
              type="number"
              min="1"
              value={pageNum}
              onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
              className="page-input"
            />
            {totalPages && <span className="page-total"> / {totalPages}</span>}
          </div>
          
          <button 
            onClick={nextPage} 
            className="control-btn next-btn"
          >
            下一页 →
          </button>
        </div>

        <div className="pdf-info">
          <h3>文档信息</h3>
          <p>
            <strong>文件名：</strong> 数据可信_决策底座.pdf
          </p>
          <p>
            <strong>当前页码：</strong> {pageNum}
          </p>
          <a href="/数据可信_决策底座.pdf" download className="download-btn">
            📥 下载PDF文档
          </a>
          <a href="/数据可信_决策底座.pdf" target="_blank" rel="noopener noreferrer" className="fullscreen-btn">
            🔓 全屏打开
          </a>
        </div>
      </div>
    </div>
  )
}

export default PDFPage
