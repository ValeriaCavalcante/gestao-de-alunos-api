import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';
import { loginAdmin } from './loginAdmin.js';

describe('Login', () => {

  it('deve retornar 200 quando o usuário e senha forem corretos', async () => {
    const loginResposta = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ 'email': 'admin@escola.com', 'senha': 'admin123' });

    expect(loginResposta.status).to.equal(200);
  });
});

it('deve retornar 400 quando a requisição for inválida', async () => {
  const resposta = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({});

  expect(resposta.status).to.equal(400);
});

it ('deve retornar 400 quando a senha não for informada', async () => {
  const resposta = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
        email: 'admin@escola.com'
    });

  expect(resposta.status).to.equal(400);
});

