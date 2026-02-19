import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to /reserve...")
        # Wait for server
        connected = False
        for i in range(30):
            try:
                page.goto("http://localhost:3000/reserve")
                connected = True
                break
            except Exception as e:
                print(f"Waiting for server... ({i})")
                time.sleep(1)

        if not connected:
            print("Failed to connect to server")
            exit(1)

        print("Page loaded.")

        # Check for aria-describedby
        checkbox = page.locator("input[type='checkbox']")
        aria_describedby = checkbox.get_attribute("aria-describedby")
        print(f"Checkbox aria-describedby: {aria_describedby}")

        if aria_describedby != "largeGroupHelp":
            print("FAILED: aria-describedby is incorrect")
            exit(1)

        # Check for helper text ID
        helper_text = page.locator("#largeGroupHelp")
        if not helper_text.count(): # is_visible might be false if scrolled out or hidden, count checks existence
             print("FAILED: Helper text with ID largeGroupHelp not found")
             exit(1)

        # Check color (optional, but good)
        color = helper_text.evaluate("element => getComputedStyle(element).color")
        print(f"Helper text color: {color}")
        # Note: Computed style might be rgb(...) so verifying exact var is hard in JS runtime,
        # but we can verify it's not the old #ccc (rgb(204, 204, 204)) if we wanted.

        print("SUCCESS: Accessibility attributes verified")

        # Take screenshot
        page.screenshot(path="verification/reservation_form.png")
        browser.close()

if __name__ == "__main__":
    run()
