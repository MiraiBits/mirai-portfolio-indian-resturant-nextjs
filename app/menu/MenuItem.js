import Image from 'next/image';
import styles from './menu.module.css';

export default function MenuItem({ item, onSelect }) {
    const renderSpice = (level) => {
        return "🌶️".repeat(level);
    };

    return (
        <div className={styles.item} onClick={() => onSelect(item)}>
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
}
