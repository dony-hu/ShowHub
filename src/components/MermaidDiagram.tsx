import React, { useEffect, useMemo, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  code: string
  theme?: 'default' | 'dark' | 'neutral'
  className?: string
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code, theme = 'neutral', className }) => {
  const [svg, setSvg] = useState<string>('')
  const id = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, [])

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme })
    ;(async () => {
      try {
        const { svg } = await mermaid.render(id, code)
        setSvg(svg)
      } catch (err) {
        console.error('Mermaid render error:', err)
        setSvg(`<pre style="color:#fff;">${String(err)}</pre>`) // fallback
      }
    })()
  }, [code, id, theme])

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}

export default MermaidDiagram
