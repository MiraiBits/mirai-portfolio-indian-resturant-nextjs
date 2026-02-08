from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the menu page
            page.goto("http://localhost:3000/menu")

            # Wait for the menu items to load
            page.wait_for_selector("text=Samosa Chaat")

            # Verify Veg/Non-Veg aria-labels
            veg_items = page.locator("[aria-label='Vegetarian']")
            non_veg_items = page.locator("[aria-label='Non-vegetarian']")

            print(f"Found {veg_items.count()} vegetarian items")
            print(f"Found {non_veg_items.count()} non-vegetarian items")

            # Verify Spice level aria-labels
            spice_items = page.locator("[aria-label^='Spice level']")
            print(f"Found {spice_items.count()} spiced items")

            # Verify that Samosa Chaat appears exactly once (no duplicated rendering)
            samosa_chaat = page.locator("text=Samosa Chaat")
            count = samosa_chaat.count()
            print(f"Samosa Chaat count: {count}")

            if count != 1:
                print("WARNING: Samosa Chaat appears multiple times!")
            else:
                print("SUCCESS: Samosa Chaat appears exactly once.")

            # Take a screenshot
            page.screenshot(path="verification/menu_page.png", full_page=True)
            print("Screenshot saved to verification/menu_page.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
