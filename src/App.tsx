import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import ProductServicesMenu from './components/ProductServicesMenu'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const OpenPlatformPage = React.lazy(() => import('./pages/OpenPlatformPage'))
const PrivateNetworkPage = React.lazy(() => import('./pages/PrivateNetworkPage'))
const DataFactoryPage = React.lazy(() => import('./pages/DataFactoryPage').then(m => ({ default: m.DataFactoryPage })))
const DataFactoryDetailPage = React.lazy(() => import('./pages/DataFactoryDetailPage').then(m => ({ default: m.DataFactoryDetailPage })))
const KnowledgeGraphDetailPage = React.lazy(() => import('./pages/KnowledgeGraphDetailPage').then(m => ({ default: m.KnowledgeGraphDetailPage })))
const MapToGraphPage = React.lazy(() => import('./pages/MapToGraphPage'))
const ImprovementPage = React.lazy(() => import('./pages/ImprovementPage'))
const PartnersPage = React.lazy(() => import('./pages/PartnersPage'))
const BlackboardPage = React.lazy(() => import('./pages/BlackboardPage'))
const ArticleEditorPage = React.lazy(() => import('./pages/ArticleEditorPage').then(m => ({ default: m.ArticleEditorPage })))

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <nav className="navbar">
            <div className="nav-container">
              <a href="/" className="logo">
                <img 
                  src="https://lbs.sfmap.com.cn/imgs/newHome/logo-alone.png" 
                  alt="丰图科技" 
                  className="logo-img"
                />
                <span className="logo-text">丰图科技</span>
              </a>
              <ul className="nav-menu">
                <li>
                  <Link to="/home">首页</Link>
                </li>
                <li>
                  <ProductServicesMenu />
                </li>
                <li>
                  <Link to="/data-factory">核心技术</Link>
                </li>
                <li>
                  <Link to="/map-to-graph">空间智能Lab</Link>
                </li>
                <li>
                  <Link to="/improvement">反馈与建议</Link>
                </li>
                <li>
                  <Link to="/partners">合作伙伴</Link>
                </li>
                <li>
                  <Link to="/blackboard">黑板报</Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <main className="main-content">
            <React.Suspense fallback={<div style={{padding:'24px'}}>页面加载中...</div>}>
              <Routes>
                <Route path="/data-factory" element={<DataFactoryPage />} />
                <Route path="/data-factory-detail" element={<DataFactoryDetailPage />} />
                <Route path="/knowledge-graph-detail" element={<KnowledgeGraphDetailPage />} />
                <Route path="/improvement" element={<ImprovementPage />} />
                <Route path="/map-to-graph" element={<MapToGraphPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/open-platform" element={<OpenPlatformPage />} />
                <Route path="/private-network" element={<PrivateNetworkPage />} />
                <Route path="/blackboard" element={<BlackboardPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/articles/new" element={<ArticleEditorPage />} />
                <Route path="/articles/:id/edit" element={<ArticleEditorPage />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </React.Suspense>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
