import { test as base, Page } from "@playwright/test";

type Fixtures = {
    authenticatedPage: Page;
}
export const test = base.extend<Fixtures>({
    authenticatedPage: async ({ page }, use ) => {
        await page.goto("/login");
        await page.fill("input[name=username]", "");
        await page.fill("input[name=password]", "");
        await page.click("button[type=submit]");

        await page.waitForURL("/account")

        await use(page);
    }
});

export const expect = test.expect;