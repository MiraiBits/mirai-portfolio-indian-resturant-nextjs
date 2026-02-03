"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './menu.module.css';

const MENU_DATA = {
    Starters: [
        { id: "samosa-chaat", name: "Samosa Chaat", description: "Crispy pastry filled with spiced potatoes, topped with tangy tamarind chutney and yogurt.", price: "$8", veg: true, spice: 2, image: "/images/samosa-chaat.png" },
        { id: "chicken-tikka", name: "Chicken Tikka", description: "Tandoor-grilled chicken chunks marinated in yogurt and spices.", price: "$12", veg: false, spice: 2, image: "/images/chicken-tikka.png" },
        { id: "onion-bhaji", name: "Onion Bhaji", description: "Crispy fried onion fritters tailored with gram flour and spices.", price: "$7", veg: true, spice: 1, image: "/images/onion-bhaji.png" },
    ],
    Mains: [
        { id: "butter-chicken", name: "Butter Chicken (Makhani)", description: "Tandoor-grilled chicken simmered in a rich, creamy tomato and fenugreek sauce.", price: "$18", veg: false, spice: 1, type: 'curry', image: "/images/butter-chicken.png" },
        { id: "lamb-vindaloo", name: "Lamb Vindaloo", description: "Tender lamb cooked in a fiery Goan sauce with vinegar and red chilies.", price: "$20", veg: false, spice: 3, type: 'curry', image: "/images/lamb-vindaloo.png" },
        { id: "palak-paneer", name: "Palak Paneer", description: "Cottage cheese cubes cooked in a smooth spinach gravy with garlic and cream.", price: "$16", veg: true, spice: 1, type: 'curry', image: "/images/palak-paneer.png" },
        { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with butter and cream.", price: "$14", veg: true, spice: 1, type: 'curry', image: "/images/dal-makhani.png" },
    ],
    "Rice & Breads": [
        { id: "garlic-naan", name: "Garlic Naan", description: "Leavened flatbread topped with minced garlic and cilantro.", price: "$4", veg: true, spice: 0, image: "/images/garlic-naan.png" },
        { id: "jeera-rice", name: "Jeera Rice", description: "Basmati rice flavored with cumin seeds.", price: "$5", veg: true, spice: 0, image: "/images/jeera-rice.png" },
        { id: "chicken-biryani", name: "Chicken Biryani", description: "Aromatic basmati rice cooked with spiced chicken, saffron, and fried onions.", price: "$18", veg: false, spice: 2, image: "/images/chicken-biryani.png" },
    ]
};

function MenuItem({ item, onClick }) {
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
                    {item.spice > 0 && <span>{"🌶️".repeat(item.spice)}</span>}
                </div>
            </div>
        </div>
    );
}

export default function MenuPage() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        if (item.type === 'curry') {
            setSelectedItem(item);
        }
    };

    const closeModal = () => setSelectedItem(null);

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
                        {items.map((item) => (
                            <MenuItem key={item.id} item={item} onClick={handleItemClick} />
                        ))}
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
