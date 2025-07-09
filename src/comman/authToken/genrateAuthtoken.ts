import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_KEY as string;

export function generateToken(user_id: number, expiresIn: any): string {
    const token = jwt.sign(
        { userId: user_id },
        SECRET_KEY,
        { expiresIn }
    );
    return token;
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Invalid or expired token', error);
        return null;
    }
}