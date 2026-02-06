import styles from '../catering/catering.module.css';
import ReservationForm from './ReservationForm';

export const metadata = {
    title: "Reserve a Table | Saffron & Spice",
    description: "Book your table for an authentic Indian dining experience.",
};

export default function ReservePage() {
    return (
        <div className={styles.cateringPage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Book a Table</h1>
                <p className={styles.subtitle}>Join us for an unforgettable evening.</p>
                <ReservationForm />
            </div>
        </div>
    );
}
