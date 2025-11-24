import { expect, test } from '@playwright/test';

test('navbar loads correctly', async ({ page }) => {
    await page.goto('/');

    const navBarTitle = page.getByRole('link', { name: 'Reddit Analyzer' });
    await expect(navBarTitle).toBeVisible();

    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();

    const mapLink = page.getByRole('link', { name: 'Map' });
    await expect(mapLink).toBeVisible();

    const subscriptionLink = page.getByRole('link', { name: 'Subscription' });
    await expect(subscriptionLink).toBeVisible();

    const signInButton = page.getByRole('link', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();
});

test.describe('trending topics load correctly', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('trending topics header has default values', async({ page }) => {
        const topicsHeader = page.getByTestId('trending-topics-header');
        await expect(topicsHeader.locator('h1')).toHaveText('Trending Topics - Programming');
        await expect(topicsHeader.locator('[data-slot="select-value"]')).toHaveText('programming');
    });

    test('analytics header elements are rendered', async({ page }) => {
        const analyticsHeader = page.getByTestId('analytics-header');
        await expect(analyticsHeader.locator('h2')).toHaveText('Analytics');
        await expect(analyticsHeader.locator('[data-slot="select-value"]')).toHaveText('Last 7 days');
    });

    test('chart render correctly', async ({ page }) => {
        const lines = page.locator('[data-testid="posts-line-chart"] path');
        await expect(lines).not.toHaveCount(0);
        const bars = page.locator('[data-testid="topics-bar-chart"] .recharts-bar-rectangle');
        await expect(bars).toHaveCount(7);
    })

    test('12 trending topic cards are displayed', async ({ page }) => {
    const trendingTopicsGrid = page.getByTestId('trending-topics-grid');
    await expect(trendingTopicsGrid).toBeVisible();
    const topicCards = trendingTopicsGrid.getByTestId('topic-card');
    await expect(topicCards).toHaveCount(12);
    });

    test('each topic card displays correct elements', async ({ page }) => {
        const trendingTopicsGrid = page.getByTestId('trending-topics-grid');
        const topicCards = trendingTopicsGrid.getByTestId('topic-card');
        const topicCardCount = await topicCards.count();

        for (let i = 0; i < topicCardCount; i++) {
            const topicCard = topicCards.nth(i);
            await expect(topicCard.locator('[data-slot="card-title"]')).toBeVisible();
            const cardContent = topicCard.locator('[data-slot="card-content"]');

            await expect(cardContent.getByRole('button', { name: /Read full summary/ })).toBeVisible();
            await expect(cardContent.locator("p")).toBeVisible();
            await expect(cardContent.locator('[data-slot="chart"]')).toBeVisible();
            await expect(topicCard.locator('[data-slot="card-footer"]')).toBeVisible();
        }
    });
});