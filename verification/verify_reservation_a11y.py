from playwright.sync_api import sync_playwright
import sys

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        page.goto("http://localhost:3000/reserve")
        page.wait_for_selector('h1:has-text("Book a Table")', timeout=10000)

        # Locate the "Large Group" checkbox
        # It's wrapped in a label with "Large Group (10+ people)?"
        checkbox = page.locator('input[type="checkbox"][id="largeGroup"]')

        if checkbox.count() == 0:
            print("FAIL: Checkbox not found")
            sys.exit(1)

        aria_describedby = checkbox.get_attribute("aria-describedby")

        if not aria_describedby:
            print("FAIL: Checkbox missing aria-describedby attribute")
            sys.exit(1)

        description_element = page.locator(f"#{aria_describedby}")
        if description_element.count() == 0:
             print(f"FAIL: Element with id '{aria_describedby}' not found")
             sys.exit(1)

        description_text = description_element.inner_text()
        expected_text = "For large groups, we will contact you to confirm arrangements."

        if expected_text not in description_text:
             print(f"FAIL: Description text mismatch. Expected '{expected_text}', got '{description_text}'")
             sys.exit(1)

        print("PASS: Checkbox has correct aria-describedby and helper text.")

    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
