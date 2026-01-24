import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import OpenPlatformPage from './pages/OpenPlatformPage'
import PrivateNetworkPage from './pages/PrivateNetworkPage'
import { DataFactoryPage } from './pages/DataFactoryPage'
import MapToGraphPage from './pages/MapToGraphPage'
import ImprovementPage from './pages/ImprovementPage'
import PartnersPage from './pages/PartnersPage'
import BlackboardPage from './pages/BlackboardPage'
import PartnersPage from './pages/PartnersPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">ShowHub</h1>
            <ul className="nav-menu">
              <li>
                <Link to="/home">丰图</Link>
              </li>
              <li>
                <Link to="/open-platform">开放平台</Link>
              </li>
              <li>
                <Link to="/private-network">专网地图</Link>
              </li>
              <li>
                <Link to="/data-factory">数据工厂</Link>
              </li>
              <li>
                <Link to="/map-to-graph">空间智能实验室</Link>
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
          <Routes>
            <Route path="/data-factory" element={<DataFactoryPage />} />
            <Route path="/improvement" element={<ImprovementPage />} />
            <Route path="/map-to-graph" element={<MapToGraphPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/open-platform" element={<OpenPlatformPage />} />
            <Route path="/private-network" element={<PrivateNetworkPage />} />
            <Route path="/blackboard" element={<BlackboardPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
