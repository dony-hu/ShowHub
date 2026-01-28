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
const SpatioTemporalKGPage = React.lazy(() => import('./pages/SpatioTemporalKGPage').then(m => ({ default: m.SpatioTemporalKGPage })))
const ArticleDetailPage = React.lazy(() => import('./pages/ArticleDetailPage').then(m => ({ default: m.ArticleDetailPage })))
const InnovationLabPage = React.lazy(() => import('./pages/InnovationLab/InnovationLabPage'))
const MapToGraphPage = React.lazy(() => import('./pages/MapToGraphPage'))
const ImprovementPage = React.lazy(() => import('./pages/ImprovementPage'))
const PartnersPage = React.lazy(() => import('./pages/PartnersPage'))
const BlackboardPage = React.lazy(() => import('./pages/BlackboardPage'))
const ArticleEditorPage = React.lazy(() => import('./pages/ArticleEditorPage').then(m => ({ default: m.ArticleEditorPage })))
const MapCorrectionPage = React.lazy(() => import('./pages/MapCorrectionPage').then(m => ({ default: m.MapCorrectionPage })))
const AdminDeletedArticlesPage = React.lazy(() => import('./pages/AdminDeletedArticlesPage').then(m => ({ default: m.AdminDeletedArticlesPage })))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const PolicePage = React.lazy(() => import('./pages/PolicePage'))
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'))
const ChangePasswordPage = React.lazy(() => import('./pages/ChangePasswordPage'))
const MachineryAgePage = React.lazy(() => import('./pages/MachineryAgePage'))
const MilestonePage = React.lazy(() => import('./pages/MilestonePage'))
const GovDataPage = React.lazy(() => import('./pages/GovDataPage'))
const SalesTrainingPage = React.lazy(() => import('./pages/SalesTrainingPage'))
const AITransformationPresentation = React.lazy(() => import('./pages/AITransformationPresentation.tsx'))
const AITransformationPresenterPage = React.lazy(() =>
  import('./pages/AITransformationPresentation.tsx').then(m => ({ default: m.AITransformationPresenter })),
)

const AppContent: React.FC = () => {
  const [aboutOpen, setAboutOpen] = React.useState(false)

  return (
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
                <ProductServicesMenu />
              </li>
              <li>
                <Link to="/data-factory">核心技术体系</Link>
              </li>
              <li>
                <Link to="/innovation-lab">开放创新实验室</Link>
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
              <li className="nav-dropdown">
                <button
                  className="nav-dropdown-toggle"
                  type="button"
                  onClick={() => setAboutOpen(open => !open)}
                >
                  关于丰图
                </button>
                <ul className={`nav-submenu ${aboutOpen ? 'open' : ''}`}>
                  <li>
                    <Link to="/sales-training" onClick={() => setAboutOpen(false)}>
                      丰图市场
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai-transformation" onClick={() => setAboutOpen(false)}>
                      丰图AI Talk
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        
        <main className="main-content">
          <React.Suspense fallback={<div style={{padding:'24px'}}>页面加载中...</div>}>
            <Routes>
              <Route path="/data-factory" element={<DataFactoryPage />} />
              <Route path="/data-factory-detail" element={<DataFactoryDetailPage />} />
              <Route path="/data-factory/stkg" element={<SpatioTemporalKGPage />} />
              <Route path="/knowledge-graph-detail" element={<KnowledgeGraphDetailPage />} />
              <Route path="/improvement" element={<ImprovementPage />} />
              <Route path="/innovation-lab" element={<InnovationLabPage />} />
              <Route path="/map-to-graph" element={<MapToGraphPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/open-platform" element={<OpenPlatformPage />} />
              <Route path="/private-network" element={<PrivateNetworkPage />} />
              <Route path="/industry/police" element={<PolicePage />} />
              <Route path="/industry/gov-data" element={<GovDataPage />} />
              <Route path="/blackboard" element={<BlackboardPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/sales-training" element={<SalesTrainingPage />} />
              <Route path="/articles/new" element={<ArticleEditorPage />} />
              <Route path="/articles/:id/edit" element={<ArticleEditorPage />} />
              <Route path="/articles/:id" element={<ArticleDetailPage />} />
              <Route path="/map-correction" element={<MapCorrectionPage />} />
              <Route path="/admin/deleted-articles" element={<AdminDeletedArticlesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/machinery-age" element={<MachineryAgePage />} />
              <Route path="/milestone-2025" element={<MilestonePage />} />
              <Route path="/ai-transformation" element={<AITransformationPresentation />} />
              <Route path="/ai-transformation/presenter" element={<AITransformationPresenterPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
