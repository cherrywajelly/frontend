// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('홈 페이지 Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    // 기본 홈 페이지로 이동
    await page.goto('/');
  });

  test('홈 페이지가 정상 로드되고 타이틀에 TimeToast 포함', async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/TimeToast/i);
  });

  test('토큰 없을 때 Carousel 컴포넌트가 보인다', async ({ page }) => {
    await page.evaluate(() => {
      sessionStorage.clear();
      localStorage.clear();
    });

    await page.goto('/'); // reload 대신 goto 권장

    await page
      .locator('text=시간을 담는 새로운 방법')
      .first()
      .waitFor({ state: 'visible' });
    await expect(
      page.locator('text=시간을 담는 새로운 방법').first(),
    ).toBeVisible();

    await page.locator('text=타임토스트 시작하기').last().click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('refreshToken 있을 때 /home으로 리다이렉션', async ({ page }) => {
    // localStorage/sessionStorage에 토큰 세팅
    await page.evaluate(() => {
      sessionStorage.setItem('accessToken', 'dummy-access-token');
      localStorage.setItem('refreshToken', 'dummy-refresh-token');
    });

    await page.goto('/');
    await page.waitForURL(/\/home/, { timeout: 20000 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/home/);
  });
});
