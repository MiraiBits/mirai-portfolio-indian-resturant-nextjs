from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to menu page...")
            page.goto("http://localhost:3000/menu")

            # Wait for content to load
            page.wait_for_selector("h1")

            # Find a curry item (e.g., Butter Chicken)
            # In the code, item.type === 'curry' makes it interactive.
            # Butter Chicken is a curry.
            print("Clicking 'Butter Chicken'...")
            butter_chicken = page.get_by_text("Butter Chicken (Makhani)")
            butter_chicken.click()

            # Wait for modal to appear
            print("Waiting for modal...")
            modal_title = page.locator("#modal-title")
            modal_title.wait_for(state="visible")

            # Check focus
            print("Checking focus...")
            # We need to wait a tiny bit for the useEffect to run and focus to apply
            time.sleep(0.5)

            is_focused = modal_title.evaluate("el => document.activeElement === el")
            print(f"Is modal title focused? {is_focused}")

            if is_focused:
                print("SUCCESS: Modal title is focused.")
            else:
                print("FAILURE: Modal title is NOT focused.")
                active_element_html = page.evaluate("document.activeElement.outerHTML")
                print(f"Active element is: {active_element_html}")

            # Take screenshot
            page.screenshot(path="verification/modal_focus.png")
            print("Screenshot saved to verification/modal_focus.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
