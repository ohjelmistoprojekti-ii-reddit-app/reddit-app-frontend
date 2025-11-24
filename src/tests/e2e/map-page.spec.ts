import { test, expect } from "./fixtures/auth";

test.describe('world map elements render correctly', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        await authenticatedPage.goto('/map');
    });

    test('world map header is visible', async ({ authenticatedPage }) => {
        const mapHeader = authenticatedPage.getByTestId('map-header');
        await expect(mapHeader).toBeVisible();
        await expect(mapHeader.locator('h1')).toHaveText('Reddit Map');
    });

    test('world map region filter is visible', async ({ authenticatedPage }) => {
        const regionFilter = authenticatedPage.getByTestId('map-region-filter');
        await expect(regionFilter).toBeVisible();
    });

    test('world map is visible', async ({ authenticatedPage }) => {
        const worldSvg = authenticatedPage.locator("svg.world-svg-zoom");
        await expect(worldSvg).toBeVisible();
    });

    test('chosen country modal is visible', async ({ authenticatedPage }) => {
        const path = authenticatedPage.locator('[name="Germany"]');
        await expect(path).toBeVisible();
        await path.click();
        const countryModal = authenticatedPage.getByRole("dialog");
        await expect(countryModal).toBeVisible();
        await expect(countryModal.locator("h2")).toHaveText("r/de");
    })
});