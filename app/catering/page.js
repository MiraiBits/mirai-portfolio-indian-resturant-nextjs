import styles from './catering.module.css';
import CateringForm from './CateringForm';

export const metadata = {
    title: "Catering & Events | Saffron & Spice",
    description: "Host your wedding or party with authentic Indian catering.",
};

export default function CateringPage() {
    return (
        <div className={styles.cateringPage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Event Catering</h1>
                <p className={styles.subtitle}>Let us bring the taste of India to your special occasion.</p>
                <CateringForm />
            </div>
        </div>
    );
}
