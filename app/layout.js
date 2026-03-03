import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Saffron & Spice | Authentic Indian Cuisine",
  description: "Experience the authentic flavors of Punjab in the heart of the city. Catering available for weddings and events.",
  keywords: ["Indian Restaurant", "Best Biryani", "North Indian Catering", "Tandoori"],
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Saffron & Spice",
  "image": "https://yourdomain.com/hero.png",
  "servesCuisine": "Indian",
  "priceRange": "$$",
  "menu": "https://yourdomain.com/menu",
  "acceptsReservations": "True",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${lato.variable}`}>
      <body>
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            top: '-40px',
            left: '0',
            backgroundColor: 'var(--saffron)',
            color: 'white',
            padding: '8px 16px',
            zIndex: 2000,
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'top 0.2s ease'
          }}
          onFocus={(e) => e.target.style.top = '0'}
          onBlur={(e) => e.target.style.top = '-40px'}
        >
          Skip to Content
        </a>
        <Navbar />
        <main id="main-content" tabIndex="-1">
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      </body>
    </html>
  );
}
