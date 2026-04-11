import Image from 'next/image';
import styles from './menu.module.css';

/**
 * MenuItem component extracted to allow React Compiler optimization.
 * By isolating this component, we enable granular memoization of list items.
 *
 * Optimization Note:
 * 1. Removed manual React.memo wrapper as 'reactCompiler: true' in next.config.mjs
 *    automatically handles memoization for this component.
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
                {/*
                  Optimization: Updated 'sizes' prop to match actual layout breakpoints.
                  - (max-width: 768px) 100vw: Full width on mobile
                  - (max-width: 1000px) 50vw: 2 columns on tablet
                  - 500px: Fixed width on larger screens (approx. 33vw or max width constraint)
                  This prevents loading unnecessarily large images.
                */}
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 500px"
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
