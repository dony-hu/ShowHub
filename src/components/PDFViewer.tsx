import React, { useEffect, useRef } from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let pdfDoc: any = null;
    let pageRendering = false;
    let pageNumPending: number | null = null;
    let pageNum = 1;

    let cancelled = false;

    (async () => {
      // 动态导入pdfjs-dist ESM
      const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      pdfjsLib.getDocument(url).promise.then((doc: any) => {
        if (cancelled) return;
        pdfDoc = doc;
        const renderPage = (num: number) => {
          pageRendering = true;
          if (!pdfDoc) return;
          pdfDoc.getPage(num).then((page: any) => {
            const viewport = page.getViewport({ scale: 1.2 });
            const canvas = canvasRef.current;
            if (!canvas) return;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: context!,
              viewport: viewport,
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(() => {
              pageRendering = false;
              if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
              }
            });
          });
        };
        renderPage(pageNum);
      });
    })();

    return () => {
      cancelled = true;
      pdfDoc = null;
    };
  }, [url]);

  return <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 8px #0002', margin: '16px 0' }} />;
};

export default PDFViewer;
