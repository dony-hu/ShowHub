import { test, expect } from '@playwright/test';

test.describe('黑板报（Blackboard）与文章浏览', () => {
  test('BB-001: 黑板报列表加载', async ({ page }) => {
    await page.goto('/blackboard');
    
    // 等待页面加载
    await page.waitForLoadState('networkidle');
    
    // 检查页面标题或关键元素
    await expect(page.locator('h1, .page-title')).toBeVisible();
    
    // 检查是否有文章列表（至少有一篇文章或空状态提示）
    const articleList = page.locator('article, .article-item, .article-card');
    const emptyState = page.locator('.empty-state, .no-articles');
    
    const hasArticles = await articleList.count() > 0;
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    
    expect(hasArticles || hasEmptyState).toBeTruthy();
  });

  test('BB-002: 文章详情页加载', async ({ page }) => {
    // 先访问黑板报列表
    await page.goto('/blackboard');
    await page.waitForLoadState('networkidle');
    
    // 查找第一篇文章（黑板报使用article.bulletin-item而不是链接）
    const firstArticle = page.locator('article.bulletin-item').first();
    
    if (await firstArticle.count() > 0) {
      // 点击进入文章详情
      await firstArticle.click();
      
      // 等待详情页加载（等待文章内容容器出现）
      await page.waitForSelector('.article-content', { timeout: 10000 });
      await page.waitForLoadState('networkidle');
      
      // 验证 URL 包含 /articles/
      expect(page.url()).toContain('/articles/');
      
      // 验证文章标题存在（在article-header中）
      const title = page.locator('.article-header h1').first();
      await expect(title).toBeVisible();
    } else {
      test.skip('没有可用的文章进行测试');
    }
  });

  test('BB-003: 文章浏览量增加', async ({ page }) => {
    await page.goto('/blackboard');
    await page.waitForLoadState('networkidle');
    
    const firstArticle = page.locator('article.bulletin-item').first();
    
    if (await firstArticle.count() > 0) {
      // 点击文章进入详情页
      await firstArticle.click();
      await page.waitForLoadState('networkidle');
      const articleUrl = page.url();
      
      // 页面已加载
      await page.waitForLoadState('networkidle');
      
      // 尝试找到浏览量元素（可能的选择器）
      const viewCountElement = page.locator('[class*="view"], [class*="count"]').first();
      
      if (await viewCountElement.isVisible().catch(() => false)) {
        const initialViewText = await viewCountElement.textContent();
        
        // 刷新页面
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        const newViewText = await viewCountElement.textContent();
        
        // 浏览量应该增加（至少文本不同）
        expect(newViewText).not.toBe(initialViewText);
      }
    } else {
      test.skip('没有可用的文章进行测试');
    }
  });

  test('BB-004: 标签展示', async ({ page }) => {
    await page.goto('/blackboard');
    await page.waitForLoadState('networkidle');
    
    const firstArticle = page.locator('article.bulletin-item').first();
    
    if (await firstArticle.count() > 0) {
      // 查找文章内的标签元素
      const tags = firstArticle.locator('.tag, [class*="tag"]');
      
      if (await tags.count() > 0) {
        // 验证标签可见
        await expect(tags.first()).toBeVisible();
        
        // 验证没有显示内部标签（__internal）
        const tagTexts = await tags.allTextContents();
        const hasInternalTag = tagTexts.some(text => text.includes('__internal'));
        
        expect(hasInternalTag).toBeFalsy();
      }
    } else {
      test.skip('没有可用的文章进行测试');
    }
  });
});
