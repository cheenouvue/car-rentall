import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id, userRole: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};