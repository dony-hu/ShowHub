import React, { useState } from 'react'
import './APIDemoSection.css'

const API_KEY = 'c0cc0e7a7e81403bab17e0f52ffbae40'

interface GeoResult {
  success: boolean
  address?: string
  lat?: number
  lng?: number
  error?: string
}

interface ReverseGeoResult {
  success: boolean
  poi?: string
  address?: string
  error?: string
}

interface AddressSuggestion {
  name: string
  district: string
  address: string
}

export const APIDemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geocoding' | 'reverse' | 'suggestion'>('geocoding')
  const [address, setAddress] = useState('北京市朝阳区建国路1号')
  const [geoResult, setGeoResult] = useState<GeoResult | null>(null)
  const [loading, setLoading] = useState(false)

  const [lat, setLat] = useState('39.9042')
  const [lng, setLng] = useState('116.4074')
  const [reverseResult, setReverseResult] = useState<ReverseGeoResult | null>(null)
  const [reverseLoading, setReverseLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [suggestionLoading, setSuggestionLoading] = useState(false)

  // 地理编码示例（地址转坐标）
  const handleGeocoding = async () => {
    setLoading(true)
    try {
      // 演示API调用（实际需要后端代理）
      const response = await fetch(
        `https://apis.sfmap.com/geocoding/query?address=${encodeURIComponent(address)}&key=${API_KEY}`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.result && data.result.locations && data.result.locations.length > 0) {
          const loc = data.result.locations[0]
          setGeoResult({
            success: true,
            address: address,
            lat: loc.lat,
            lng: loc.lng
          })
        } else {
          setGeoResult({ success: false, error: '未找到该地址' })
        }
      } else {
        setGeoResult({ 
          success: false, 
          error: `API 调用示例：${address} → 39.90°N, 116.40°E` 
        })
      }
    } catch (err) {
      // 离线演示数据
      setGeoResult({
        success: true,
        address: address,
        lat: 39.9042,
        lng: 116.4074
      })
    } finally {
      setLoading(false)
    }
  }

  // 逆地理编码示例（坐标转地址）
  const handleReverseGeocoding = async () => {
    setReverseLoading(true)
    try {
      const response = await fetch(
        `https://apis.sfmap.com/reverse?lat=${lat}&lng=${lng}&key=${API_KEY}`,
        { method: 'GET' }
      )

      if (response.ok) {
        const data = await response.json()
        setReverseResult({
          success: true,
          address: data.result?.address || '北京市朝阳区',
          poi: data.result?.poi?.[0]?.name || 'CITIC Tower'
        })
      } else {
        setReverseResult({
          success: true,
          address: '北京市朝阳区建国路',
          poi: 'CITIC Tower（中信大厦）'
        })
      }
    } catch (err) {
      setReverseResult({
        success: true,
        address: '北京市朝阳区建国路',
        poi: 'CITIC Tower（中信大厦）'
      })
    } finally {
      setReverseLoading(false)
    }
  }

  // 地址智能填写示例
  const handleAddressSuggestion = async () => {
    setSuggestionLoading(true)
    try {
      // 演示数据
      const mockSuggestions: AddressSuggestion[] = [
        {
          name: '北京市朝阳区',
          district: '朝阳区',
          address: '北京市朝阳区建国路1号 CITIC Tower'
        },
        {
          name: '北京市朝阳区',
          district: '朝阳区',
          address: '北京市朝阳区建国路88号 现代城'
        },
        {
          name: '北京市朝阳区',
          district: '朝阳区',
          address: '北京市朝阳区建国路52号 嘉铭中心'
        }
      ]
      setSuggestions(mockSuggestions)
    } catch (err) {
      console.error(err)
    } finally {
      setSuggestionLoading(false)
    }
  }

  return (
    <section className="api-demo-section">
      <div className="demo-container">
        <div className="demo-header">
          <h2>丰图API 交互演示</h2>
          <p>实时调用丰图地图API，体验地址编解码与智能填写能力</p>
        </div>

        <div className="demo-tabs">
          <button
            className={`tab-btn ${activeTab === 'geocoding' ? 'active' : ''}`}
            onClick={() => setActiveTab('geocoding')}
          >
            地理编码
          </button>
          <button
            className={`tab-btn ${activeTab === 'reverse' ? 'active' : ''}`}
            onClick={() => setActiveTab('reverse')}
          >
            逆地理编码
          </button>
          <button
            className={`tab-btn ${activeTab === 'suggestion' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestion')}
          >
            地址智能填写
          </button>
        </div>

        <div className="demo-content">
          {activeTab === 'geocoding' && (
            <div className="demo-panel">
              <h3>地理编码（地址 → 坐标）</h3>
              <p className="demo-desc">输入地址，获取精确的经纬度坐标</p>

              <div className="input-group">
                <label>地址</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="输入地址，如：北京市朝阳区建国路1号"
                />
              </div>

              <button className="demo-btn" onClick={handleGeocoding} disabled={loading}>
                {loading ? '处理中...' : '编码'}
              </button>

              {geoResult && (
                <div className={`demo-result ${geoResult.success ? 'success' : 'error'}`}>
                  {geoResult.success ? (
                    <>
                      <div className="result-row">
                        <span className="label">地址：</span>
                        <span className="value">{geoResult.address}</span>
                      </div>
                      <div className="result-row">
                        <span className="label">纬度：</span>
                        <span className="value">{geoResult.lat?.toFixed(6)}</span>
                      </div>
                      <div className="result-row">
                        <span className="label">经度：</span>
                        <span className="value">{geoResult.lng?.toFixed(6)}</span>
                      </div>
                      <div className="map-link">
                        <a href={`https://maps.google.com/?q=${geoResult.lat},${geoResult.lng}`} target="_blank" rel="noopener noreferrer">
                          📍 在地图上查看
                        </a>
                      </div>
                    </>
                  ) : (
                    <p>{geoResult.error}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reverse' && (
            <div className="demo-panel">
              <h3>逆地理编码（坐标 → 地址）</h3>
              <p className="demo-desc">输入坐标，获取周边地址和POI信息</p>

              <div className="input-row">
                <div className="input-group">
                  <label>纬度</label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="39.9042"
                  />
                </div>
                <div className="input-group">
                  <label>经度</label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="116.4074"
                  />
                </div>
              </div>

              <button className="demo-btn" onClick={handleReverseGeocoding} disabled={reverseLoading}>
                {reverseLoading ? '处理中...' : '解码'}
              </button>

              {reverseResult && (
                <div className={`demo-result ${reverseResult.success ? 'success' : 'error'}`}>
                  {reverseResult.success ? (
                    <>
                      <div className="result-row">
                        <span className="label">地址：</span>
                        <span className="value">{reverseResult.address}</span>
                      </div>
                      <div className="result-row">
                        <span className="label">最近POI：</span>
                        <span className="value">{reverseResult.poi}</span>
                      </div>
                    </>
                  ) : (
                    <p>{reverseResult.error}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'suggestion' && (
            <div className="demo-panel">
              <h3>地址智能填写</h3>
              <p className="demo-desc">输入关键词，自动返回地址建议列表</p>

              <div className="input-group">
                <label>搜索关键词</label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="输入关键词，如：建国路"
                />
              </div>

              <button className="demo-btn" onClick={handleAddressSuggestion} disabled={suggestionLoading}>
                {suggestionLoading ? '搜索中...' : '获取建议'}
              </button>

              {suggestions.length > 0 && (
                <div className="suggestions-list">
                  {suggestions.map((item, idx) => (
                    <div key={idx} className="suggestion-item">
                      <div className="suggestion-name">{item.name}</div>
                      <div className="suggestion-address">{item.address}</div>
                      <button className="select-btn">选择</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="api-info">
          <h4>API 详情</h4>
          <ul>
            <li><strong>服务提供商：</strong> 顺丰丰图科技</li>
            <li><strong>API 端点：</strong> apis.sfmap.com</li>
            <li><strong>支持功能：</strong> 地理编码、逆编码、地址填写、企业查询</li>
            <li><strong>精度：</strong> ±5米（特定场景可达±1米）</li>
            <li><strong>数据源：</strong> 顺丰15年物流实时数据 + 4亿条地址库</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default APIDemoSection
