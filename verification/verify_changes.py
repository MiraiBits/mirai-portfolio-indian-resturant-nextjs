from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Verifying Menu Page...")
            # Navigate to the menu page
            page.goto("http://localhost:3000/menu")

            # Wait for the menu items to load
            page.wait_for_selector("text=Samosa Chaat")

            # Verify Menu Items are rendered (basic check that the page is not broken)
            samosa_chaat = page.locator("text=Samosa Chaat")
            expect(samosa_chaat).to_be_visible()
            print("Menu Page verified: Samosa Chaat is visible.")

            print("Verifying Reservation Page Accessibility...")
            # Navigate to the reservation page
            page.goto("http://localhost:3000/reserve")

            # Wait for form
            page.wait_for_selector("form")

            # Locate the Large Group checkbox
            checkbox = page.locator("#largeGroup")
            expect(checkbox).to_be_visible()

            # Check for aria-describedby
            aria_describedby = checkbox.get_attribute("aria-describedby")
            print(f"Checkbox aria-describedby: {aria_describedby}")

            if aria_describedby == "largeGroupHelp":
                print("SUCCESS: Checkbox has correct aria-describedby attribute.")
            else:
                print(f"FAILURE: Checkbox has incorrect aria-describedby: {aria_describedby}")

            # Locate the helper text
            helper_text = page.locator("#largeGroupHelp")
            expect(helper_text).to_be_visible()

            # Verify helper text content
            text_content = helper_text.text_content()
            print(f"Helper text content: {text_content}")

            if "For large groups" in text_content:
                print("SUCCESS: Helper text found with correct ID.")
            else:
                print("FAILURE: Helper text content mismatch.")

            # Take a screenshot of the form
            page.screenshot(path="verification/reservation_form.png")
            print("Screenshot saved to verification/reservation_form.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
