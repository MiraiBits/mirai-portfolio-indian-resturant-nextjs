import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link href="/">Saffron & Spice</Link>
            </div>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/menu" className={styles.link}>Menu</Link>
                <Link href="/catering" className={styles.link}>Catering</Link>
            </div>
            <Link href="/menu" className={styles.cta}>Order Online</Link>
        </nav>
    );
}
