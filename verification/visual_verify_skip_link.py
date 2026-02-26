from playwright.sync_api import sync_playwright

def verify_skip_link_visual():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the local dev server
        page.goto("http://localhost:3000")

        # Wait for hydration
        page.wait_for_load_state("networkidle")

        # Press Tab to focus the first element (the skip link)
        page.keyboard.press("Tab")

        # Take a screenshot of the top left corner where the link should appear
        page.screenshot(path="verification/skip_link_focused.png")
        print("Screenshot saved to verification/skip_link_focused.png")

        browser.close()

if __name__ == "__main__":
    verify_skip_link_visual()
