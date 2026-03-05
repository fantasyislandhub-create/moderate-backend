const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'moderate_ustaz_secret_key_2024';

// Admin user (in production, store in database)
const adminUser = {
    email: process.env.ADMIN_EMAIL || 'admin@moderateustaz.com',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10)
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email !== adminUser.email) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, adminUser.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: adminUser.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: 'Login successful' });
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const validPassword = await bcrypt.compare(currentPassword, adminUser.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
    }

    adminUser.password = bcrypt.hashSync(newPassword, 10);
    res.json({ message: 'Password changed successfully' });
};

exports.changeEmail = async (req, res) => {
    const { currentPassword, newEmail } = req.body;

    const validPassword = await bcrypt.compare(currentPassword, adminUser.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
    }

    adminUser.email = newEmail;
    res.json({ message: 'Email changed successfully' });
};

exports.verify = (req, res) => {
    res.json({ valid: true, user: req.user });
};
