import styles from './catering.module.css';

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

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Your Name</label>
                        <input type="text" id="name" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input type="email" id="email" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="date">Date of Event</label>
                        <input type="date" id="date" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="guests">Estimated Guests</label>
                        <select id="guests" className={styles.select} required>
                            <option value="">Select Count</option>
                            <option value="10-50">10-50</option>
                            <option value="50-100">50-100</option>
                            <option value="100-300">100-300</option>
                            <option value="300+">300+</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="type">Event Type</label>
                        <select id="type" className={styles.select} required>
                            <option value="">Select Type</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="details">Additional Details</label>
                        <textarea id="details" className={styles.textarea} placeholder="Tell us about your dietary requirements or special requests..."></textarea>
                    </div>

                    <button type="submit" className="btn-primary">Request Quote</button>
                </form>
            </div>
        </div>
    );
}
