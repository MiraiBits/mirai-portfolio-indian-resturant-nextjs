"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Flame } from 'lucide-react';
import styles from './menu.module.css';

const MENU_DATA = {
    Starters: [
        { name: "Samosa Chaat", description: "Crispy pastry filled with spiced potatoes, topped with tangy tamarind chutney and yogurt.", price: "$8", veg: true, spice: 2, image: "/images/samosa-chaat.png" },
        { name: "Chicken Tikka", description: "Tandoor-grilled chicken chunks marinated in yogurt and spices.", price: "$12", veg: false, spice: 2, image: "/images/chicken-tikka.png" },
        { name: "Onion Bhaji", description: "Crispy fried onion fritters tailored with gram flour and spices.", price: "$7", veg: true, spice: 1, image: "/images/onion-bhaji.png" },
    ],
    Mains: [
        { name: "Butter Chicken (Makhani)", description: "Tandoor-grilled chicken simmered in a rich, creamy tomato and fenugreek sauce.", price: "$18", veg: false, spice: 1, type: 'curry', image: "/images/butter-chicken.png" },
        { name: "Lamb Vindaloo", description: "Tender lamb cooked in a fiery Goan sauce with vinegar and red chilies.", price: "$20", veg: false, spice: 3, type: 'curry', image: "/images/lamb-vindaloo.png" },
        { name: "Palak Paneer", description: "Cottage cheese cubes cooked in a smooth spinach gravy with garlic and cream.", price: "$16", veg: true, spice: 1, type: 'curry', image: "/images/palak-paneer.png" },
        { name: "Dal Makhani", description: "Black lentils slow-cooked overnight with butter and cream.", price: "$14", veg: true, spice: 1, type: 'curry', image: "/images/dal-makhani.png" },
    ],
    "Rice & Breads": [
        { name: "Garlic Naan", description: "Leavened flatbread topped with minced garlic and cilantro.", price: "$4", veg: true, spice: 0, image: "/images/garlic-naan.png" },
        { name: "Jeera Rice", description: "Basmati rice flavored with cumin seeds.", price: "$5", veg: true, spice: 0, image: "/images/jeera-rice.png" },
        { name: "Chicken Biryani", description: "Aromatic basmati rice cooked with spiced chicken, saffron, and fried onions.", price: "$18", veg: false, spice: 2, image: "/images/chicken-biryani.png" },
    ]
};

export default function MenuPage() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        if (item.type === 'curry') {
            setSelectedItem(item);
        }
    };

    const closeModal = () => setSelectedItem(null);

    const renderSpice = (level) => {
        return (
            <span className={styles.spiceContainer} aria-label={`Spice level: ${level} out of 3`}>
                {Array.from({ length: level }).map((_, i) => (
                    <Flame key={i} className={styles.spiceIcon} fill="currentColor" />
                ))}
            </span>
        );
    };

    return (
        <div className={styles.menuPage}>
            <header className={styles.header}>
                <h1>Our Menu</h1>
                <p>A culinary journey through the spices of India.</p>
            </header>

            {Object.entries(MENU_DATA).map(([category, items]) => (
                <section key={category} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{category}</h2>
                    <div className={styles.grid}>
                        {items.map((item, index) => {
                            const isInteractive = item.type === 'curry';
                            return (
                                <div
                                    key={index}
                                    className={styles.item}
                                    onClick={isInteractive ? () => handleItemClick(item) : undefined}
                                    role={isInteractive ? "button" : undefined}
                                    tabIndex={isInteractive ? 0 : undefined}
                                    onKeyDown={(e) => {
                                        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                                            e.preventDefault();
                                            handleItemClick(item);
                                        }
                                    }}
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
                        })}
                    </div>
                </section>
            ))}

            {selectedItem && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Complete Your Meal</h3>
                        <p>Would you like to add <strong>Garlic Naan</strong> or <strong>Jeera Rice</strong> to go with your {selectedItem.name}?</p>
                        <div className={styles.modalActions}>
                            <button className="btn-primary" onClick={closeModal}>Add Garlic Naan (+$4)</button>
                            <button className="btn-primary" onClick={closeModal}>Add Jeera Rice (+$5)</button>
                            <button className="btn-secondary" onClick={closeModal}>No, Thanks</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
