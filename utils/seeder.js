const Product = require('../models/Product');
const mongoose = require('mongoose');

const seedProducts = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log('Database not connected, skipping seeding');
            return;
        }
        const count = await Product.countDocuments();
        if (count === 0) {
            const initialProducts = [
                {
                    name: "Premium Cotton Kaftan",
                    price: "₦18,000",
                    category: "Traditional",
                    description: "Elegant traditional kaftan made from premium cotton fabric. Perfect for formal occasions and daily wear.",
                    fabricType: "100% Cotton",
                    texture: "Smooth and breathable",
                    quality: "Premium",
                    care: "Machine wash cold, hang dry",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/kaftan1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/kaftan1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/kaftan2"
                    ]
                },
                {
                    name: "Embroidered Agbada Set",
                    price: "₦35,000",
                    category: "Premium",
                    description: "Luxurious hand-embroidered Agbada with matching cap and trousers. Crafted for special occasions.",
                    fabricType: "Silk blend",
                    texture: "Smooth with intricate embroidery",
                    quality: "Luxury",
                    care: "Dry clean only",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/agbada1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/agbada1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/agbada2"
                    ]
                },
                {
                    name: "Ankara Print Fabric",
                    price: "₦8,500",
                    category: "Fabrics",
                    description: "Vibrant Ankara print fabric, 6 yards. High-quality wax print perfect for traditional and modern designs.",
                    fabricType: "Cotton wax print",
                    texture: "Smooth with vibrant colors",
                    quality: "Standard",
                    care: "Machine wash warm, iron on medium heat",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/ankara1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/ankara1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/ankara2"
                    ]
                },
                {
                    name: "Traditional Cap (Fila)",
                    price: "₦6,500",
                    category: "Accessories",
                    description: "Handwoven traditional cap available in multiple colors. Perfect complement to traditional wear.",
                    fabricType: "Cotton blend",
                    texture: "Woven with traditional patterns",
                    quality: "Standard",
                    care: "Hand wash gently, air dry",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/cap1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/cap1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/cap2"
                    ]
                },
                {
                    name: "Casual Jalabiya",
                    price: "₦15,000",
                    category: "Casual",
                    description: "Comfortable daily wear jalabiya in soft cotton. Ideal for prayers and casual outings.",
                    fabricType: "Cotton",
                    texture: "Soft and comfortable",
                    quality: "Standard",
                    care: "Machine wash cold, tumble dry low",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/jalabiya1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/jalabiya1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/jalabiya2"
                    ]
                },
                {
                    name: "Senator Suit Set",
                    price: "₦28,000",
                    category: "Traditional",
                    description: "Complete 3-piece senator suit with embroidered details. Includes top, trousers, and cap.",
                    fabricType: "Cotton blend",
                    texture: "Smooth with embroidered accents",
                    quality: "Premium",
                    care: "Dry clean recommended",
                    image: "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/senator1",
                    images: [
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/senator1",
                        "https://res.cloudinary.com/dyfi4enfl/image/upload/v1/moderate_ustaz_products/senator2"
                    ]
                }
            ];
            await Product.insertMany(initialProducts);
            console.log('Initial products seeded with detailed information');
        }
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts;
