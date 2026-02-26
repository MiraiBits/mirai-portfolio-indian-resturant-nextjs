from playwright.sync_api import sync_playwright

def verify_font_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the home page
        response = page.goto("http://localhost:3000")

        # Check if the page loaded successfully
        if response.status != 200:
            print(f"Failed to load page: {response.status}")
            return

        # Wait for the font to be applied (fonts usually take a moment)
        page.wait_for_timeout(2000)

        # Get the computed style of the h1 element
        h1_font_family = page.eval_on_selector("h1", "el => window.getComputedStyle(el).fontFamily")
        print(f"H1 Font Family: {h1_font_family}")

        # Get the computed style of the body element
        body_font_family = page.eval_on_selector("body", "el => window.getComputedStyle(el).fontFamily")
        print(f"Body Font Family: {body_font_family}")

        # Take a screenshot to verify visual appearance
        page.screenshot(path="verification/font_verification.png")
        print("Screenshot saved to verification/font_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_font_loading()
