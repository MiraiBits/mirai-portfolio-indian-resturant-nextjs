from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the menu page
            print("Navigating to /menu...")
            page.goto("http://localhost:3000/menu")

            # Click on a curry item to open the modal
            # "Butter Chicken (Makhani)" is a curry
            print("Clicking 'Butter Chicken (Makhani)'...")
            page.click("text=Butter Chicken (Makhani)")

            # Wait for the modal to appear
            page.wait_for_selector("[role='dialog']")
            print("Modal opened.")

            # Wait a bit for focus to settle
            page.wait_for_timeout(500)

            # Check if focus is inside the modal
            # Initial focus should be on the first button "Add Garlic Naan (+$4)"
            focused_element_text = page.evaluate("document.activeElement.innerText").upper()
            print(f"Initial focused element: '{focused_element_text}'")

            if "ADD GARLIC NAAN" not in focused_element_text:
                 print("FAIL: Initial focus is not on the first button.")
            else:
                 print("SUCCESS: Initial focus is on the first button.")

            # Press Tab
            page.keyboard.press("Tab")
            focused_element_text = page.evaluate("document.activeElement.innerText").upper()
            print(f"Focused element after Tab: '{focused_element_text}'")

            if "ADD JEERA RICE" not in focused_element_text:
                print("FAIL: Focus did not move to the second button.")
            else:
                print("SUCCESS: Focus moved to the second button.")

            # Press Tab
            page.keyboard.press("Tab")
            focused_element_text = page.evaluate("document.activeElement.innerText").upper()
            print(f"Focused element after 2nd Tab: '{focused_element_text}'")

            if "NO, THANKS" not in focused_element_text:
                 print("FAIL: Focus did not move to the third button.")
            else:
                 print("SUCCESS: Focus moved to the third button.")

            # Press Tab again - should cycle back to first button
            page.keyboard.press("Tab")
            focused_element_text = page.evaluate("document.activeElement.innerText").upper()
            print(f"Focused element after 3rd Tab (loop): '{focused_element_text}'")

            if "ADD GARLIC NAAN" not in focused_element_text:
                print("FAIL: Focus did not loop back to the first button.")
            else:
                print("SUCCESS: Focus looped back to the first button.")

             # Press Shift+Tab - should go to last button
            page.keyboard.press("Shift+Tab")
            focused_element_text = page.evaluate("document.activeElement.innerText").upper()
            print(f"Focused element after Shift+Tab (loop back): '{focused_element_text}'")

            if "NO, THANKS" not in focused_element_text:
                print("FAIL: Focus did not loop back to the last button with Shift+Tab.")
            else:
                print("SUCCESS: Focus looped back to the last button with Shift+Tab.")


            # Close modal with Escape
            print("Pressing Escape...")
            page.keyboard.press("Escape")
            # Wait for modal to disappear
            page.wait_for_selector("[role='dialog']", state="hidden")
            print("Modal closed.")

            # Check focus restoration
            # Focus should return to the trigger element (Butter Chicken)
            # Note: Depending on implementation, it might focus the container div or the image/text inside it.
            # But the Butter Chicken item should have focus.
            # In MenuItem.js, the div has tabindex=0.

            focused_element_text = page.evaluate("document.activeElement.innerText")
            # The text content of the MenuItem includes name, price etc.
            # We check if "Butter Chicken" is in the text content of the focused element
            print(f"Focused element after close: '{focused_element_text}'")

            if "Butter Chicken" in focused_element_text:
                print("SUCCESS: Focus restored to trigger element.")
            else:
                 print("FAIL: Focus NOT restored to trigger element.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
