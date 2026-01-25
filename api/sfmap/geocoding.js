export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { address = '', city = '', cc = '1' } = req.query || {}
    if (!address) {
      return res.status(400).json({ msg: 'missing address' })
    }

    const ak = process.env.SFMAP_API_KEY || process.env.VITE_SFMAP_KEY || ''
    if (!ak) {
      console.warn('[sfmap proxy] missing API key (ak)')
    }

    // New official endpoint requiring ak in header
    const base = 'https://gis-apis.sf-express.com/all/api/geocode/geo'
    const params = new URLSearchParams({ address })
    if (city) params.set('city', city)
    if (cc) params.set('cc', cc)
    const url = `${base}?${params.toString()}`

    const r = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ak: ak
      }
    })

    const text = await r.text()
    let data
    try { data = JSON.parse(text) } catch { data = { raw: text } }
    return res.status(r.status).json(data)
  } catch (err) {
    console.error('[sfmap proxy] geocoding error', err)
    return res.status(500).json({ msg: 'proxy error', error: String(err) })
  }
}
