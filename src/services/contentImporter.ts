import * as pdfjsLib from 'pdfjs-dist';

// Set worker path for PDF.js - use local file instead of CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export interface ImportedContent {
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  sourceUrl?: string;
}

/**
 * 从 PDF 文件提取内容
 */
export async function extractPdfContent(file: File): Promise<ImportedContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    let images: string[] = [];
    
    // 提取文本和图片
    for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += text + '\n';
      
      // 尝试提取图片
      try {
        const operatorList = await page.getOperatorList();
        // 基本的图片提取（高级用法需要更多配置）
      } catch (e) {
        // 忽略图片提取错误
      }
    }
    
    // 提取标题（使用第一行作为标题）
    const lines = fullText.trim().split('\n').filter(l => l.trim());
    const title = lines[0]?.substring(0, 100) || file.name.replace('.pdf', '');
    
    // 提取摘要（前 200 个字符）
    const summary = lines.slice(0, 5).join(' ').substring(0, 200);
    
    // 准备内容，添加 PDF 链接
    const content = `来自 PDF 文件：**${file.name}**\n\n${fullText.substring(0, 2000)}`;
    
    return {
      title,
      summary,
      content,
      sourceUrl: undefined
    };
  } catch (error) {
    throw new Error(`PDF 提取失败: ${(error as Error).message}`);
  }
}

/**
 * 从微信公众号链接提取内容
 * 需要后端支持，因为直接调用会有跨域限制
 */
export async function extractWechatContent(url: string): Promise<ImportedContent> {
  try {
    // 调用后端 API 来获取微信文章内容
    const response = await fetch('/api/wechat/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`获取失败: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      title: data.title || '微信公众号文章',
      summary: data.summary || '',
      content: data.content || `[微信公众号文章](${url})`,
      imageUrl: data.imageUrl,
      sourceUrl: url
    };
  } catch (error) {
    // 如果后端不可用，返回带链接的基本内容
    console.warn('无法自动提取微信内容，将使用链接形式');
    return {
      title: '微信公众号文章',
      summary: '',
      content: `[微信公众号文章](${url})`,
      sourceUrl: url
    };
  }
}

/**
 * 验证 URL 是否为微信链接
 */
export function isWechatUrl(url: string): boolean {
  return /mp\.weixin\.qq\.com|weixin\.qq\.com|h5\.new\.qq\.com/.test(url);
}
