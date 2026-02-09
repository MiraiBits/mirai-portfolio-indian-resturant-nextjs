from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")
            page.wait_for_selector("h1")

            print("Navigating to menu page...")
            # Click the 'Order Online' link which points to /menu
            page.click("text=Order Online")

            print("Waiting for menu items...")
            page.wait_for_selector("text=Samosa Chaat")
            page.wait_for_selector("text=Butter Chicken (Makhani)")

            # Wait a bit for images to load
            time.sleep(2)

            print("Taking screenshot...")
            page.screenshot(path="verification/menu.png", full_page=True)
            print("Screenshot saved to verification/menu.png")

        except Exception as e:
            print(f"Error: {e}")
            # Take screenshot on error
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
