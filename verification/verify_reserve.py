import os
import time
from playwright.sync_api import sync_playwright, expect

def verify_reservation(page):
    print("Navigating to /reserve...")
    try:
        page.goto("http://localhost:3000/reserve", timeout=30000)
    except Exception as e:
        print(f"Navigation failed: {e}")
        return

    # Fill form
    print("Filling form...")
    page.fill("#name", "Palette Tester")
    page.fill("#date", "2024-12-25")
    page.fill("#time", "19:00")
    page.fill("#guests", "4")

    # Click submit
    print("Submitting form...")
    # Using get_by_role is better
    submit_btn = page.get_by_role("button", name="Confirm Reservation")
    expect(submit_btn).to_be_visible()
    submit_btn.click()

    # Verify loading state
    print("Checking loading state...")
    # The button text changes to "Confirming..."
    loading_btn = page.get_by_role("button", name="Confirming...")
    expect(loading_btn).to_be_visible()

    # Screenshot loading state
    page.screenshot(path="verification/loading.png")
    print("Screenshot loading.png taken")

    # Wait for success state (it takes 1.5s in the code)
    print("Waiting for success state...")
    success_msg = page.get_by_role("heading", name="Reservation Confirmed!")
    expect(success_msg).to_be_visible(timeout=5000)

    # Screenshot success state
    page.screenshot(path="verification/success.png")
    print("Screenshot success.png taken")

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_reservation(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
