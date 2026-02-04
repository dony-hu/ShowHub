import { test, expect } from '@playwright/test';

test.describe('导航与基础可用性', () => {
  test('NAV-001: 首页可访问', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#root')).toBeVisible();
  });

  test('NAV-002: 顶部导航入口可点击', async ({ page }) => {
    await page.goto('/');
    
    // 测试主要导航链接
    const navLinks = [
      { text: '核心技术体系', url: '/data-factory' },
      { text: '开放创新实验室', url: '/innovation-lab' },
      { text: '反馈与建议', url: '/improvement' },
      { text: '合作伙伴', url: '/partners' },
      { text: '黑板报', url: '/blackboard' }
    ];

    for (const link of navLinks) {
      await page.goto('/');
      const navLink = page.locator(`a:has-text("${link.text}")`).first();
      await navLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain(link.url);
    }
  });

  test('NAV-003: 关于丰图下拉菜单', async ({ page }) => {
    await page.goto('/');
    
    // 点击"关于丰图"按钮
    const aboutButton = page.locator('button:has-text("关于丰图")');
    await aboutButton.click();
    
    // 等待下拉菜单显示
    await page.waitForTimeout(300);
    
    // 点击"市场分享"
    const salesTrainingLink = page.locator('a:has-text("市场分享")');
    if (await salesTrainingLink.isVisible()) {
      await salesTrainingLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/sales-training');
    }
    
    // 返回首页并测试 AI Talk
    await page.goto('/');
    await aboutButton.click();
    await page.waitForTimeout(300);
    
    const aiTalkLink = page.locator('a:has-text("AI Talk")');
    if (await aiTalkLink.isVisible()) {
      await aiTalkLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/ai-transformation');
    }
  });
});
