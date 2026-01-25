export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { lat = '', lng = '' } = req.query || {}
    if (!lat || !lng) {
      return res.status(400).json({ msg: 'missing lat/lng' })
    }

    const key = process.env.SFMAP_API_KEY || process.env.VITE_SFMAP_KEY || ''
    if (!key) {
      console.warn('[sfmap proxy] missing API key')
    }

    const url = `https://apis.sfmap.com/reverse?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&key=${key}`
    const r = await fetch(url, { headers: { Accept: 'application/json' } })
    const data = await r.json()
    return res.status(r.status).json(data)
  } catch (err) {
    console.error('[sfmap proxy] reverse error', err)
    return res.status(500).json({ msg: 'proxy error', error: String(err) })
  }
}
