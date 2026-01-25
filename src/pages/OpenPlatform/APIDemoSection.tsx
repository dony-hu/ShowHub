import React, { useState } from 'react'
import './APIDemoSection.css'
const SFMapViewer = React.lazy(() => import('./SFMapViewer'))

// Prefer env for client (dev) and keep fallback for now
const CLIENT_API_KEY = (import.meta as any).env?.VITE_SFMAP_KEY || 'c0cc0e7a7e81403bab17e0f52ffbae40'

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
  const [address, setAddress] = useState('深圳市软件产业基地')
  const [geoResult, setGeoResult] = useState<GeoResult | null>(null)
  const [loading, setLoading] = useState(false)

  const [lat, setLat] = useState('39.9042')
  const [lng, setLng] = useState('116.4074')
  const [reverseResult, setReverseResult] = useState<ReverseGeoResult | null>(null)
  const [reverseLoading, setReverseLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [suggestionLoading, setSuggestionLoading] = useState(false)

  // 地理编码示例（地址转坐标）- 优先通过服务端代理调用（ak 放在 header）
  const handleGeocoding = async () => {
    if (!address.trim()) {
      setGeoResult({ success: false, error: '请输入地址' })
      return
    }
    
    setLoading(true)
    setGeoResult(null)

    try {
      const qs = new URLSearchParams({ address })
      const url = `/api/sfmap/geocoding?${qs.toString()}`
      console.log('调用地理编码 API (proxy):', url)
      const r = await fetch(url)
      const data = await r.json()
      console.log('地理编码 API 返回:', data)

      // 兼容不同返回结构，尽量提取 lat/lng
      const extract = (obj: any): {lat: number, lng: number} | null => {
        if (!obj || typeof obj !== 'object') return null
        if (typeof obj.lat === 'number' && typeof obj.lng === 'number') return { lat: obj.lat, lng: obj.lng }
        if (typeof obj.latitude === 'number' && typeof obj.longitude === 'number') return { lat: obj.latitude, lng: obj.longitude }
        if (obj.location) {
          const l = extract(obj.location)
          if (l) return l
        }
        if (obj.result?.locations?.[0]) {
          const loc = obj.result.locations[0]
          if (typeof loc.lat === 'number' && typeof loc.lng === 'number') return { lat: loc.lat, lng: loc.lng }
        }
        if (obj.data) {
          const l = extract(obj.data)
          if (l) return l
        }
        return null
      }

      const loc = extract(data)
      if (loc) {
        setGeoResult({ success: true, address, lat: loc.lat, lng: loc.lng })
      } else {
        setGeoResult({ success: false, error: `未能解析坐标，请查看返回：${JSON.stringify(data).slice(0, 300)}...` })
      }
    } catch (err) {
      console.error('地理编码请求失败', err)
      setGeoResult({ success: false, error: '请求失败，请稍后再试' })
    } finally {
      setLoading(false)
    }
  }

  // 逆地理编码示例（坐标转地址）- 使用 JSONP 直接调用
  const handleReverseGeocoding = async () => {
    if (!lat || !lng) {
      setReverseResult({ success: false, error: '请输入坐标' })
      return
    }
    
    setReverseLoading(true)
    setReverseResult(null)

    return new Promise<void>((resolve) => {
      const callback = `sfmapRgeoCallback_${Date.now()}`
      const url = `https://apis.sfmap.com/reverse?lat=${lat}&lng=${lng}&key=${CLIENT_API_KEY}&output=jsonp&callback=${callback}`
      
      console.log('调用逆地理编码 API (JSONP):', url)
      
      const script = document.createElement('script')
      script.src = url
      script.async = true
      
      const timeoutId = window.setTimeout(() => {
        cleanup()
        console.error('逆地理编码请求超时')
        setReverseResult({ success: false, error: '请求超时（10秒）' })
        setReverseLoading(false)
        resolve()
      }, 10000)
      
      const cleanup = () => {
        window.clearTimeout(timeoutId)
        delete (window as any)[callback]
        if (script.parentNode) {
          document.head.removeChild(script)
        }
      }
      
      (window as any)[callback] = (data: any) => {
        cleanup()
        console.log('逆地理编码 API 返回:', data)
        
        if (data && data.result && data.result.address) {
          setReverseResult({
            success: true,
            address: data.result.address,
            poi: data.result.poi && data.result.poi[0] ? data.result.poi[0].name : '暂无附近POI',
          })
        } else {
          setReverseResult({ success: false, error: `解码失败：${data?.msg || '无返回数据'}` })
        }
        setReverseLoading(false)
        resolve()
      }
      
      script.onerror = () => {
        cleanup()
        console.error('JSONP 脚本加载失败')
        setReverseResult({ success: false, error: '网络请求失败，请检查网络连接' })
        setReverseLoading(false)
        resolve()
      }
      
      document.head.appendChild(script)
    })
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
                      <div className="map-iframe-wrapper">
                        <React.Suspense fallback={<div style={{height:'300px',display:'flex',alignItems:'center',justifyContent:'center'}}>地图加载中...</div>}>
                          <SFMapViewer lat={geoResult.lat!} lng={geoResult.lng!} address={geoResult.address} apiKey={CLIENT_API_KEY} />
                        </React.Suspense>
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
                      <div className="map-iframe-wrapper">
                        <React.Suspense fallback={<div style={{height:'300px',display:'flex',alignItems:'center',justifyContent:'center'}}>地图加载中...</div>}>
                          <SFMapViewer lat={parseFloat(lat)} lng={parseFloat(lng)} address={reverseResult.address} apiKey={CLIENT_API_KEY} />
                        </React.Suspense>
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
