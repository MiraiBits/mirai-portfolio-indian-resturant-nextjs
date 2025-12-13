import styles from '../catering/catering.module.css'; // Reusing form styles for consistency

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

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Name</label>
                        <input type="text" id="name" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="date">Date</label>
                        <input type="date" id="date" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="time">Time</label>
                        <input type="time" id="time" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="guests">Number of Guests</label>
                        <input type="number" id="guests" className={styles.input} min="1" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <input type="checkbox" id="largeGroup" style={{ marginRight: '10px' }} />
                            Large Group (10+ people)?
                        </label>
                        <small style={{ color: '#ccc' }}>For large groups, we will contact you to confirm arrangements.</small>
                    </div>

                    <button type="submit" className="btn-primary">Confirm Reservation</button>
                </form>
            </div>
        </div>
    );
}
