import { expect, test } from '@playwright/test';

test('navbar loads correctly', async ({ page }) => {
    await page.goto('/');

    const navBarTitle = page.getByRole('link', { name: 'Reddit Analyzer' });
    await expect(navBarTitle).toBeVisible();

    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();

    const mapLink = page.getByRole('link', { name: 'Map' });
    await expect(mapLink).toBeVisible();
});