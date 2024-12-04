const  { beforeEach, describe, expect, test } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('log in to application')
        await expect(locator).toBeVisible()
    })
})