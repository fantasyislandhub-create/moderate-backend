const Combo = require('../models/Combo');
const { cloudinary } = require('../config/cloudinary');

exports.getAllCombos = async (req, res) => {
    try {
        const combos = await Combo.find().populate('products').sort({ createdAt: -1 });
        res.json(combos);
    } catch (error) {
        console.error('Error fetching combos:', error);
        res.json([]);
    }
};

exports.getComboById = async (req, res) => {
    try {
        const combo = await Combo.findById(req.params.id).populate('products');
        if (!combo) {
            return res.status(404).json({ error: 'Combo not found' });
        }
        res.json(combo);
    } catch (error) {
        console.error('Error fetching combo:', error);
        res.status(404).json({ error: 'Combo not found' });
    }
};

exports.createCombo = async (req, res) => {
    try {
        const { name, description, products, originalPrice, comboPrice, savings, popular } = req.body;

        const images = req.files && req.files.length > 0
            ? req.files.map(file => file.path)
            : ['https://via.placeholder.com/400x400'];

        const cloudinaryIds = req.files && req.files.length > 0
            ? req.files.map(file => file.public_id)
            : [];

        const newCombo = new Combo({
            name,
            description,
            products: JSON.parse(products),
            originalPrice,
            comboPrice,
            savings,
            images,
            cloudinaryIds,
            popular: popular === 'true'
        });

        const savedCombo = await newCombo.save();
        const populatedCombo = await Combo.findById(savedCombo._id).populate('products');
        res.json(populatedCombo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create combo' });
    }
};

exports.updateCombo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, products, originalPrice, comboPrice, savings, popular } = req.body;

        const combo = await Combo.findById(id);
        if (!combo) {
            return res.status(404).json({ error: 'Combo not found' });
        }

        let updateData = {
            name: name || combo.name,
            description: description || combo.description,
            products: products ? JSON.parse(products) : combo.products,
            originalPrice: originalPrice || combo.originalPrice,
            comboPrice: comboPrice || combo.comboPrice,
            savings: savings || combo.savings,
            popular: popular !== undefined ? popular === 'true' : combo.popular
        };

        if (req.files && req.files.length > 0) {
            if (combo.cloudinaryIds && combo.cloudinaryIds.length > 0) {
                for (const id of combo.cloudinaryIds) {
                    await cloudinary.uploader.destroy(id);
                }
            }

            const newImages = req.files.map(file => file.path);
            const newCloudinaryIds = req.files.map(file => file.public_id);

            updateData.images = newImages;
            updateData.cloudinaryIds = newCloudinaryIds;
        }

        const updatedCombo = await Combo.findByIdAndUpdate(id, updateData, { new: true }).populate('products');
        res.json(updatedCombo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update combo' });
    }
};

exports.deleteCombo = async (req, res) => {
    try {
        const { id } = req.params;
        const combo = await Combo.findById(id);

        if (!combo) {
            return res.status(404).json({ error: 'Combo not found' });
        }

        try {
            if (combo.cloudinaryIds && combo.cloudinaryIds.length > 0) {
                for (const cloudinaryId of combo.cloudinaryIds) {
                    if (cloudinaryId) {
                        await cloudinary.uploader.destroy(cloudinaryId);
                    }
                }
            } else if (combo.cloudinaryId) {
                await cloudinary.uploader.destroy(combo.cloudinaryId);
            }
        } catch (cloudinaryError) {
            console.log('Cloudinary deletion error (ignored):', cloudinaryError);
        }

        await Combo.findByIdAndDelete(id);
        res.json({ message: 'Combo deleted successfully' });
    } catch (error) {
        console.error('Delete combo error:', error);
        res.status(500).json({ error: 'Failed to delete combo' });
    }
};
