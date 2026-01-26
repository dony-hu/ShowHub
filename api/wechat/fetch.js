import * as cheerio from 'cheerio';

/**
 * 后端 API 路由：提取微信公众号文章内容
 * 处理跨域问题并提取文章元数据
 * 
 * 使用方式：
 * POST /api/wechat/fetch
 * Body: { "url": "https://mp.weixin.qq.com/..." }
 */

interface WechatArticle {
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
}

export async function fetchWechatContent(url: string): Promise<WechatArticle> {
  try {
    // 验证 URL
    if (!isValidWechatUrl(url)) {
      throw new Error('无效的微信公众号链接');
    }

    // 设置请求头，模拟浏览器访问
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Referer': 'https://mp.weixin.qq.com/'
    };

    const response = await fetch(url, { 
      headers,
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 提取标题
    let title = $('h1.rich_media_title').text().trim() ||
                $('title').text().trim() ||
                '微信公众号文章';

    // 提取摘要（使用 meta description 或文章摘要）
    let summary = $('meta[name="description"]').attr('content') ||
                  $('meta[property="og:description"]').attr('content') ||
                  '';
    summary = summary.trim().substring(0, 200);

    // 提取内容
    const richMediaContent = $('.rich_media_content');
    let content = richMediaContent.text().trim().substring(0, 3000);
    
    if (!content) {
      // 备用方案：尝试提取其他可能的内容区域
      content = $('article').text().trim().substring(0, 3000) ||
                $('main').text().trim().substring(0, 3000) ||
                $('body').text().trim().substring(0, 3000);
    }

    // 提取第一张图片
    let imageUrl = $('meta[property="og:image"]').attr('content') ||
                   $('img.rich_media_thumb_wrp').first().attr('data-src') ||
                   $('img').first().attr('src') ||
                   undefined;

    // 处理相对 URL
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = new URL(imageUrl, url).href;
    }

    return {
      title: title || '微信公众号文章',
      summary,
      content: content || `来自微信公众号：${url}`,
      imageUrl
    };
  } catch (error) {
    console.error('微信内容提取失败:', error);
    throw new Error(`微信内容提取失败: ${(error as Error).message}`);
  }
}

function isValidWechatUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return /mp\.weixin\.qq\.com|weixin\.qq\.com|h5\.new\.qq\.com/.test(urlObj.hostname);
  } catch {
    return false;
  }
}

/**
 * Vercel Serverless Function Handler
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: '缺少 URL 参数' });
    }

    const result = await fetchWechatContent(url);
    return res.status(200).json(result);
  } catch (error) {
    console.error('API 错误:', error);
    return res.status(500).json({ 
      error: (error as Error).message || '内容提取失败'
    });
  }
}
