"use client";

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import styles from '../catering/catering.module.css';

export default function ReservationForm() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // In a real app, we would reset the form here
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className={styles.successContainer} role="alert" aria-live="polite">
                <div className={styles.successIconWrapper}>
                    <CheckCircle size={64} color="var(--saffron)" />
                </div>
                <h2 className={styles.title}>Reservation Confirmed!</h2>
                <p className={styles.subtitle}>
                    We&apos;ve received your request and look forward to hosting you.
                    <br />
                    A confirmation email has been sent to you.
                </p>
                <button
                    className="btn-secondary"
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '1rem' }}
                >
                    Make Another Reservation
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input type="text" id="name" className={styles.input} required disabled={status === 'submitting'} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="date">Date</label>
                <input type="date" id="date" className={styles.input} required disabled={status === 'submitting'} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="time">Time</label>
                <input type="time" id="time" className={styles.input} required disabled={status === 'submitting'} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="guests">Number of Guests</label>
                <input type="number" id="guests" className={styles.input} min="1" required disabled={status === 'submitting'} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>
                    <input
                        type="checkbox"
                        id="largeGroup"
                        style={{ marginRight: '10px' }}
                        disabled={status === 'submitting'}
                        aria-describedby="largeGroup-desc"
                    />
                    Large Group (10+ people)?
                </label>
                <small id="largeGroup-desc" style={{ color: '#ccc' }}>For large groups, we will contact you to confirm arrangements.</small>
            </div>

            <button
                type="submit"
                className={`btn-primary ${styles.submitContent}`}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? (
                    <>
                        <Loader2 className="spin" size={20} />
                        Confirming...
                    </>
                ) : (
                    "Confirm Reservation"
                )}
            </button>
        </form>
    );
}
