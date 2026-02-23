from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000/menu ...")

            connected = False
            for i in range(30):
                try:
                    page.goto("http://localhost:3000/menu", timeout=10000)
                    connected = True
                    break
                except Exception as e:
                    print(f"Connection attempt {i+1} failed: {e}")
                    time.sleep(2)

            if not connected:
                print("Failed to connect to server.")
                return

            print("Page loaded. Checking for content...")
            # Check for "Samosa Chaat"
            page.wait_for_selector("text=Samosa Chaat", timeout=30000)
            print("Found 'Samosa Chaat'!")

            # Take screenshot
            path = "verification/menu_page.png"
            page.screenshot(path=path, full_page=True)
            print(f"Screenshot saved to {path}")

        except Exception as e:
            print(f"Error during verification: {e}")
            try:
                page.screenshot(path="verification/error_state.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    run()
