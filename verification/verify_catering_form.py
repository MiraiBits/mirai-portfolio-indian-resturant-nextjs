from playwright.sync_api import sync_playwright

def verify_catering_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the catering page
            print("Navigating to /catering...")
            page.goto("http://localhost:3000/catering")

            # Wait for the form to be visible
            page.wait_for_selector("form")

            # Fill out the form
            print("Filling out the form...")
            page.fill("#name", "Test User")
            page.fill("#email", "test@example.com")
            page.fill("#date", "2024-12-25")
            page.select_option("#guests", "50-100")
            page.select_option("#type", "Corporate")
            page.fill("#details", "This is a test request.")

            # Submit the form
            print("Submitting the form...")
            page.click("button[type='submit']")

            # Wait for the success message
            # The form takes 1.5s to submit
            print("Waiting for success message...")
            page.wait_for_selector("h2:has-text('Request Received!')", timeout=5000)

            # Take a screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/catering_success.png")
            print("Screenshot saved to verification/catering_success.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_catering_form()
