// src/pages/api/auth/logout.ts
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  }));

  return res.status(200).json({ success: true });
}
