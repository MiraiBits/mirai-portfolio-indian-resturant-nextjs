import Image from 'next/image';
import styles from './menu.module.css';

const renderSpice = (level) => {
    return "🌶️".repeat(level);
};

export default function MenuItem({ item, onClick }) {
    return (
        <div className={styles.item} onClick={() => onClick(item)}>
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
