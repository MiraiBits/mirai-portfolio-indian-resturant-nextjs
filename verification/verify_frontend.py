from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        page.goto("http://localhost:3000/reserve")
        page.wait_for_selector('h1:has-text("Book a Table")', timeout=10000)

        # Scroll to the bottom where the checkbox is
        checkbox = page.locator('input[type="checkbox"][id="largeGroup"]')
        checkbox.scroll_into_view_if_needed()

        # Take a screenshot of the form
        page.screenshot(path="verification/reservation_form.png", full_page=True)
        print("Screenshot saved to verification/reservation_form.png")

    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
