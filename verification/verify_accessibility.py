from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # --- VERIFY RESERVATION FORM ---
        print("Navigating to Reservation page...")
        try:
            page.goto("http://localhost:3000/reserve")
            page.wait_for_selector("form", timeout=10000)

            # Check for the checkbox and its aria-describedby attribute
            checkbox = page.locator("#largeGroup")
            aria_describedby = checkbox.get_attribute("aria-describedby")

            print(f"Checkbox aria-describedby: {aria_describedby}")

            if aria_describedby == "largeGroup-desc":
                print("SUCCESS: Checkbox has correct aria-describedby attribute.")
            else:
                print(f"FAILURE: Checkbox has incorrect aria-describedby attribute: {aria_describedby}")

            # Check if the description element exists
            description = page.locator("#largeGroup-desc")
            if description.count() > 0:
                print("SUCCESS: Description element with id 'largeGroup-desc' found.")
            else:
                print("FAILURE: Description element with id 'largeGroup-desc' not found.")

            page.screenshot(path="verification/reservation_form.png")
            print("Screenshot saved to verification/reservation_form.png")

        except Exception as e:
            print(f"ERROR verifying reservation form: {e}")

        # --- VERIFY MENU PAGE ---
        print("\nNavigating to Menu page...")
        try:
            page.goto("http://localhost:3000/menu")
            # Wait for Samosa Chaat to appear
            page.wait_for_selector("text=Samosa Chaat", timeout=10000)

            print("SUCCESS: Menu page loaded and 'Samosa Chaat' is visible.")
            page.screenshot(path="verification/menu_page.png")
            print("Screenshot saved to verification/menu_page.png")

        except Exception as e:
            print(f"ERROR verifying menu page: {e}")

        browser.close()

if __name__ == "__main__":
    run()
