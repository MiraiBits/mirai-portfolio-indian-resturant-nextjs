from playwright.sync_api import sync_playwright
import time

def verify_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_logs = []
        page.on("console", lambda msg: console_logs.append(msg.text))

        print("Navigating to /menu...")
        page.goto("http://localhost:3000/menu")

        # Wait for content to load
        page.wait_for_selector("h1")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/menu_optimized.png")
        print("Screenshot saved to /home/jules/verification/menu_optimized.png")

        # Check logs for key warning
        key_warning_found = False
        for log in console_logs:
            if "Each child in a list should have a unique \"key\" prop" in log:
                key_warning_found = True
                print(f"FOUND KEY WARNING: {log}")

        if not key_warning_found:
            print("No key warning found in console logs.")

        browser.close()

if __name__ == "__main__":
    verify_menu()
