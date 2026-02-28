import { memo } from 'react';
import Image from 'next/image';
import styles from './menu.module.css';

/**
 * MenuItem component extracted to allow React Compiler optimization.
 * By isolating this component, we enable granular memoization of list items.
 */
export default function MenuItem({ item, onSelect }) {
    const isInteractive = item.type === 'curry';

    const renderSpice = (level) => {
        return "🌶️".repeat(level);
    };

    const handleClick = () => {
        if (isInteractive && onSelect) {
            onSelect(item);
        }
    };

    const handleKeyDown = (e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            className={styles.item}
            onClick={isInteractive ? handleClick : undefined}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={isInteractive ? handleKeyDown : undefined}
            aria-haspopup={isInteractive ? "dialog" : undefined}
            style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        >
            <div className={styles.itemImageWrapper}>
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>{item.price}</span>
                </div>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.meta}>
                    <span
                        className={item.veg ? styles.veg : styles.nonVeg}
                        aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                        role="img"
                    >
                        {item.veg ? "● V" : "▲ NV"}
                    </span>
                    {item.spice > 0 && (
                        <span aria-label={`Spice level: ${item.spice}`} role="img">
                            {renderSpice(item.spice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
