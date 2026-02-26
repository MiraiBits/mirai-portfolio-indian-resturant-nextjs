from playwright.sync_api import sync_playwright

def verify_skip_link():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the local dev server
        page.goto("http://localhost:3000")

        # Wait for hydration
        page.wait_for_load_state("networkidle")

        # Press Tab to focus the first element
        page.keyboard.press("Tab")

        # Check if the active element is the skip link
        active_element_text = page.evaluate("document.activeElement.innerText")
        print(f"Active element text after first Tab: '{active_element_text}'")

        if "Skip to content" not in active_element_text:
            print("FAIL: First tab focus is not 'Skip to content'")
            browser.close()
            return

        # Check if it is visible (part of the requirement is visibility on focus)
        # Note: Playwright's is_visible() checks if the element is attached to the DOM and style is not hidden.
        # Since we use CSS to move it on screen on focus, we can check its computed style or position.
        is_visible_on_screen = page.evaluate("""
            () => {
                const el = document.activeElement;
                const rect = el.getBoundingClientRect();
                return rect.top >= 0 && rect.left >= 0;
            }
        """)

        if not is_visible_on_screen:
             print("FAIL: Skip link is not visible on screen after focus")
             browser.close()
             return

        print("SUCCESS: Skip link is focused and visible.")

        # Press Enter to activate the skip link
        page.keyboard.press("Enter")

        # Check if the focus moved to #main-content or if the scroll position changed.
        # Since #main-content is a div and might not be focusable by default without tabindex=-1,
        # browsers handle "skip to content" by scrolling to the ID.
        # Modern browsers also shift focus if tabindex="-1" is present, or just scroll.
        # Let's check if the URL has the fragment.

        if "#main-content" not in page.url:
             print(f"FAIL: URL does not contain #main-content. URL is: {page.url}")
        else:
             print("SUCCESS: URL updated with #main-content anchor.")

        browser.close()

if __name__ == "__main__":
    verify_skip_link()
