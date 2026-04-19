import jwt from 'jsonwebtoken';

export function generateToken(user: { email: string; id: string }) {
  const JWT_SECRET = process.env.JWT_SECRET!;

  return jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
    expiresIn: '15m', // string 10s, 15m, 1h, 7d || number of seconds
  });
}
