import { memo } from 'react';
import Image from 'next/image';
import styles from './menu.module.css';

const renderSpice = (level) => {
    return "🌶️".repeat(level);
};

const MenuItem = memo(function MenuItem({ item, onSelect }) {
    const isInteractive = item.type === 'curry';

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
        if (isInteractive && onSelect && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect(item);
        }
    };

    return (
        <div
            className={styles.item}
            onClick={isInteractive ? handleClick : undefined}
            onClick={isInteractive ? () => onSelect(item) : undefined}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={(e) => {
                if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelect(item);
                }
            }}
            onClick={handleClick}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={handleKeyDown}
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
                    <span className={item.veg ? styles.veg : styles.nonVeg}>
                        {item.veg ? "● V" : "▲ NV"}
                    </span>
                    {item.spice > 0 && <span>{renderSpice(item.spice)}</span>}
                </div>
            </div>
        </div>
    );
});

export default MenuItem;
