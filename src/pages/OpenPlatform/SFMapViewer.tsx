import React, { useEffect, useRef } from 'react'

interface SFMapViewerProps {
  lat: number
  lng: number
  address?: string
  apiKey?: string
}

declare global {
  interface Window {
    SFMap: any
  }
}

export const SFMapViewer: React.FC<SFMapViewerProps> = ({ 
  lat, 
  lng, 
  address,
  apiKey = 'c0cc0e7a7e81403bab17e0f52ffbae40'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    // 动态加载丰图 SDK
    if (!window.SFMap) {
      const script = document.createElement('script')
      script.src = `https://lbs.sfmap.com.cn/api/web/v1.0.0/sfmap.min.js?ak=${apiKey}`
      script.async = true
      script.onload = () => {
        initMap()
      }
      document.head.appendChild(script)
    } else {
      initMap()
    }

    return () => {
      // 清理
    }
  }, [apiKey])

  useEffect(() => {
    // 更新地图位置和标记
    if (map.current) {
      const newPos = [lat, lng]
      map.current.setCenter(newPos)
      map.current.setZoom(15)

      // 移除旧标记
      if (markerRef.current) {
        map.current.removeLayer(markerRef.current)
      }

      // 添加新标记
      const marker = window.SFMap.marker([lat, lng])
      marker.bindPopup(address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      map.current.addLayer(marker)
      markerRef.current = marker
    }
  }, [lat, lng, address])

  const initMap = () => {
    if (!mapContainer.current || map.current) return

    try {
      map.current = window.SFMap.map(mapContainer.current, {
        center: [lat, lng],
        zoom: 15,
        crs: window.SFMap.CRS.EPSG3857
      })

      // 添加初始标记
      const marker = window.SFMap.marker([lat, lng])
      marker.bindPopup(address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      map.current.addLayer(marker)
      markerRef.current = marker

      console.log('丰图地图已初始化')
    } catch (err) {
      console.error('丰图地图初始化失败:', err)
    }
  }

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '8px',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        overflow: 'hidden',
        background: '#0a0e19'
      }}
    />
  )
}

export default SFMapViewer
