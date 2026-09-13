import request from 'supertest';
import app from '../src/app.js';
import 'dotenv/config';

export async function loginAdmin() {
  const resposta = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
        email: process.env.ADMIN_EMAIL,
        senha: process.env.ADMIN_SENHA
    });

  return resposta.body.token;
}