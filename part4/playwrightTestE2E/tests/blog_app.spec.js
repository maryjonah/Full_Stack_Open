const  { beforeEach, describe, expect, test } = require('@playwright/test')
const { loginWith } = require('./blog_helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Ekua Kakra Jonah',
                username: 'kajonah',
                password: 'HelloWorld'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'kajonah', 'HelloWorld')
            await expect(page.getByText('Ekua Kakra Jonah logged')).toBeVisible()
        })
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mjay', 'World')
            await expect(page.getByText('Ekua Kakra Jonah')).not.toBeVisible()
        })
    })
})
