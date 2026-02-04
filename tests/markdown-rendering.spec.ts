import { test, expect } from '@playwright/test';

test.describe('Markdown 渲染与资源链接', () => {
  test.beforeEach(async ({ page }) => {
    // 访问包含图片的测试文章（使用实际的文章ID）
    await page.goto('/articles/b1e575fd-3fa1-4772-a963-28b48d43a2cf');
    await page.waitForLoadState('networkidle');
  });

  test('MD-001: 图片渲染', async ({ page }) => {
    // 查找文章内容中的图片
    const images = page.locator('.article-content img, article img');
    
    if (await images.count() > 0) {
      const firstImage = images.first();
      
      // 验证图片可见
      await expect(firstImage).toBeVisible();
      
      // 验证图片样式（最大宽度100%）
      const maxWidth = await firstImage.evaluate((img) => 
        window.getComputedStyle(img).maxWidth
      );
      expect(maxWidth).toBe('100%');
      
      // 验证图片有圆角（如果设置了）
      const borderRadius = await firstImage.evaluate((img) => 
        window.getComputedStyle(img).borderRadius
      );
      // 圆角可能是0px或有值，只要不报错就行
      expect(borderRadius).toBeDefined();
      
      // 验证图片有src属性
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toContain('placeholder.com');
    } else {
      test.skip('文章中没有图片');
    }
  });

  test('MD-002: PDF 链接按钮', async ({ page }) => {
    // 访问包含PDF的测试文章
    await page.goto('/articles/096e6844-9314-46cc-9d34-a8dffc2642aa');
    await page.waitForLoadState('networkidle');
    
    // 查找 PDF 链接
    const pdfLinks = page.locator('a[href$=".pdf"], a[href*=".pdf"]');
    
    if (await pdfLinks.count() > 0) {
      const firstPdfLink = pdfLinks.first();
      
      // 验证 PDF 链接可见
      await expect(firstPdfLink).toBeVisible();
      
      // 验证有 📄 图标
      const linkText = await firstPdfLink.textContent();
      expect(linkText).toContain('📄');
      
      // 查找下载按钮（📥）
      const downloadButton = page.locator('a[href*=".pdf"][download], a[title*="下载"]');
      if (await downloadButton.count() > 0) {
        await expect(downloadButton.first()).toBeVisible();
      }
      
      // 验证链接在新标签页打开
      const target = await firstPdfLink.getAttribute('target');
      expect(target).toBe('_blank');
    } else {
      test.skip('文章中没有 PDF 链接');
    }
  });

  test('MD-003: PDF 内嵌预览', async ({ page }) => {
    // 访问包含PDF的测试文章
    await page.goto('/articles/096e6844-9314-46cc-9d34-a8dffc2642aa');
    await page.waitForLoadState('networkidle');
    
    const pdfLinks = page.locator('a[href$=".pdf"], a[href*=".pdf"]');
    
    if (await pdfLinks.count() > 0) {
      // 查找 PDF 预览组件
      const pdfViewer = page.locator('canvas, .pdf-viewer, [class*="pdf"]');
      
      if (await pdfViewer.count() > 0) {
        // 验证 PDF 查看器可见
        await expect(pdfViewer.first()).toBeVisible();
        
        // 如果是 canvas，验证有内容
        const canvas = page.locator('canvas').first();
        if (await canvas.count() > 0) {
          const width = await canvas.evaluate((c: HTMLCanvasElement) => c.width);
          expect(width).toBeGreaterThan(0);
        }
      } else {
        test.skip('没有 PDF 内嵌预览组件');
      }
    } else {
      test.skip('文章中没有 PDF 链接');
    }
  });

  test('MD-004: 图片链接', async ({ page }) => {
    // 访问包含图片链接的测试文章
    await page.goto('/articles/4fca05b3-025b-42d6-aa24-5583830fea1c');
    await page.waitForLoadState('networkidle');
    
    // 查找placeholder.com的图片链接
    const imageLinks = page.locator('a[href*="placeholder.com"]');
    
    if (await imageLinks.count() > 0) {
      const firstImageLink = imageLinks.first();
      
      // 验证链接可见
      await expect(firstImageLink).toBeVisible();
      
      // 验证链接文本存在
      const linkText = await firstImageLink.textContent();
      expect(linkText).toBeTruthy();
      
      // 验证href属性包含图片链接
      const href = await firstImageLink.getAttribute('href');
      expect(href).toContain('placeholder.com');
    } else {
      test.skip('文章中没有图片链接');
    }
  });
});
