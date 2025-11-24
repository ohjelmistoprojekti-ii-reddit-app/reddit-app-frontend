import { test, expect } from "./fixtures/auth";

test('should show account page', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByText('My Account')).toBeVisible();
});

test.describe('subscription page elements render correctly', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        await authenticatedPage.goto('/subscription');
    });

    test('subscription page header is visible', async ({ authenticatedPage }) => {
        const subscriptionInfo = authenticatedPage.getByTestId('subscription-info');
        await expect(subscriptionInfo).toBeVisible();
        await expect(subscriptionInfo.locator('h2')).toHaveText('You are subscribed to');
    });

    test('topic grid is visible', async ({ authenticatedPage }) => {
        const topicsGrid = authenticatedPage.getByTestId('trending-topics-grid');
        await expect(topicsGrid).toBeVisible();
    });
});