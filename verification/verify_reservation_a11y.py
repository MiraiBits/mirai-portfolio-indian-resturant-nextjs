from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            print("Navigating to /reserve...")
            page.goto("http://localhost:3000/reserve")

            # Wait for form to load
            page.wait_for_selector('form')

            # Locate the Large Group checkbox
            checkbox = page.locator('#largeGroup')

            # Check aria-describedby
            aria_describedby = checkbox.get_attribute('aria-describedby')
            print(f"Checkbox aria-describedby: {aria_describedby}")

            if aria_describedby == 'largeGroup-help':
                print("SUCCESS: Checkbox has correct aria-describedby attribute.")
            else:
                print(f"FAIL: Checkbox aria-describedby is '{aria_describedby}', expected 'largeGroup-help'.")
                return

            # Verify the helper text element exists
            helper_text_element = page.locator(f'#{aria_describedby}')
            if helper_text_element.count() > 0:
                text_content = helper_text_element.inner_text()
                print(f"Helper text content: '{text_content}'")
                if "For large groups, we will contact you" in text_content:
                    print("SUCCESS: Helper text element exists and contains expected text.")
                else:
                    print("FAIL: Helper text element content mismatch.")
            else:
                print(f"FAIL: Helper text element with id '{aria_describedby}' not found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
