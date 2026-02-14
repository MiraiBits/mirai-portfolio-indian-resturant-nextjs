from playwright.sync_api import sync_playwright, expect
import time

def verify_modal_focus():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the menu page
            print("Navigating to menu page...")
            page.goto("http://localhost:3000/menu")

            # Wait for the menu to load
            expect(page.get_by_text("Our Menu")).to_be_visible()

            # Find a curry item (e.g., Butter Chicken) and click it
            print("Clicking Butter Chicken...")
            butter_chicken = page.get_by_text("Butter Chicken (Makhani)")
            butter_chicken.click()

            # Wait for modal to appear
            print("Waiting for modal...")
            modal = page.get_by_role("dialog")
            expect(modal).to_be_visible()

            # Verify focus is on the modal
            # Note: In Playwright, .to_be_focused() checks if the element is the active element
            print("Checking focus...")
            # Allow a small grace period for requestAnimationFrame
            time.sleep(0.5)
            expect(modal).to_be_focused()

            # Take a screenshot
            page.screenshot(path="verification/modal_focused.png")
            print("Verification successful: Modal opened and received focus.")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_modal_focus()
