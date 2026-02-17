from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the catering page
        page.goto("http://localhost:3000/catering")

        # Check if the page loaded
        print("Page title:", page.title())

        # Fill out the form
        page.fill('input[id="name"]', "Test User")
        page.fill('input[id="email"]', "test@example.com")
        page.fill('input[id="date"]', "2024-12-25")
        page.select_option('select[id="guests"]', "10-50")
        page.select_option('select[id="type"]', "Birthday")
        page.fill('textarea[id="details"]', "This is a test request.")

        # Submit the form
        submit_button = page.get_by_role("button", name="Request Quote")
        submit_button.click()

        # Check for loading state (button text should change to "Sending Request...")
        print("Checking loading state...")
        page.wait_for_selector('button:has-text("Sending Request...")')

        # Wait for success message
        print("Waiting for success message...")
        page.wait_for_selector('h2:has-text("Request Received!")')

        # Take a screenshot
        page.screenshot(path="verification/catering_success.png")
        print("Screenshot saved to verification/catering_success.png")

        browser.close()

if __name__ == "__main__":
    run()
