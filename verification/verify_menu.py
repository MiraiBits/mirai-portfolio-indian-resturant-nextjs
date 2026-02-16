from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/menu")

    # Wait for the menu to load
    page.wait_for_selector('h1:has-text("Our Menu")')

    # Take a screenshot of the menu
    page.screenshot(path="verification/menu_page.png", full_page=True)

    # Click on a curry item (e.g., Butter Chicken) to open the modal
    # Butter Chicken is a main course, index might vary, but we can search by text.
    butter_chicken = page.locator('text="Butter Chicken (Makhani)"')
    if butter_chicken.count() > 0:
        butter_chicken.click()
        # Wait for modal
        page.wait_for_selector('div[role="dialog"]')
        page.screenshot(path="verification/menu_modal.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
