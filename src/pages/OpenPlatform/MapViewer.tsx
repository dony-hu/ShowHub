import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapViewerProps {
  lat: number
  lng: number
  address?: string
}

export const MapViewer: React.FC<MapViewerProps> = ({ lat, lng, address }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const marker = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // 初始化地图
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([lat, lng], 15)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map.current)
    }

    // 更新地图视图和标记
    if (map.current) {
      map.current.setView([lat, lng], 15)

      // 移除旧标记
      if (marker.current) {
        marker.current.remove()
      }

      // 添加新标记
      marker.current = L.marker([lat, lng])
        .bindPopup(address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        .addTo(map.current)
        .openPopup()
    }

    return () => {
      // 清理
    }
  }, [lat, lng, address])

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '8px',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        overflow: 'hidden'
      }}
    />
  )
}

export default MapViewer
