"use client";

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import styles from './catering.module.css';

export default function CateringForm() {
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
                <h2 className={styles.title}>Request Received!</h2>
                <p className={styles.subtitle}>
                    Thank you for your interest in our catering services.
                    <br />
                    Our events team will review your details and contact you within 24 hours.
                </p>
                <button
                    className="btn-secondary"
                    onClick={() => setStatus('idle')}
                    style={{ marginTop: '1rem' }}
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    required
                    disabled={status === 'submitting'}
                    placeholder="Enter your full name"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    className={styles.input}
                    required
                    disabled={status === 'submitting'}
                    placeholder="name@example.com"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="date">Date of Event</label>
                <input
                    type="date"
                    id="date"
                    className={styles.input}
                    required
                    disabled={status === 'submitting'}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="guests">Estimated Guests</label>
                <select
                    id="guests"
                    className={styles.select}
                    required
                    disabled={status === 'submitting'}
                    defaultValue=""
                >
                    <option value="" disabled>Select Count</option>
                    <option value="10-50">10-50</option>
                    <option value="50-100">50-100</option>
                    <option value="100-300">100-300</option>
                    <option value="300+">300+</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="type">Event Type</label>
                <select
                    id="type"
                    className={styles.select}
                    required
                    disabled={status === 'submitting'}
                    defaultValue=""
                >
                    <option value="" disabled>Select Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="details">Additional Details</label>
                <textarea
                    id="details"
                    className={styles.textarea}
                    placeholder="Tell us about your dietary requirements or special requests..."
                    disabled={status === 'submitting'}
                ></textarea>
            </div>

            <button
                type="submit"
                className={`btn-primary ${styles.submitContent}`}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? (
                    <>
                        <Loader2 className="spin" size={20} />
                        Sending Request...
                    </>
                ) : (
                    "Request Quote"
                )}
            </button>
        </form>
    );
}
