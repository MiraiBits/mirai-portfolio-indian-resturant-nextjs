import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/hero.png"
            alt="Steaming Biryani"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.headline}>Authentic Flavors of Punjab in the Heart of the City</h1>
          <p className={styles.subheadline}>From our clay Tandoor to your table. Experience spices ground fresh daily.</p>
          <div className={styles.ctaGroup}>
            <Link href="/reserve" className="btn-primary">Reserve a Table</Link>
            <Link href="/menu" className="btn-secondary">Order Online</Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Experience the Tradition</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Fresh Ingredients</h3>
            <p>We source the finest spices and freshest produce to ensure every dish bursts with authentic flavor.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Clay Oven Tandoor</h3>
            <p>Our breads and meats are cooked in a traditional clay oven for that perfect char and smoky taste.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Fine Dining</h3>
            <p>Enjoy an elegant atmosphere with ambient lighting and curated music for a memorable evening.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
