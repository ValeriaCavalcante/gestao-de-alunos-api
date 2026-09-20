import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';

describe('Login', () => {
  it('deve realizar login com credenciais válidas', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@escola.com',
        senha: 'admin123'
      });

    expect(resposta.status).to.equal(200);
  });

  it('deve retornar 400 quando os campos não forem informados', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(resposta.status).to.equal(400);
  });

  it('deve retornar 400 quando a senha não for informada', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@escola.com'
      });

    expect(resposta.status).to.equal(400);
  });
});

