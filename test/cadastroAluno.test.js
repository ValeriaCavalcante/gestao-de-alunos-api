import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';
import { loginAdmin } from './loginAdmin.js';
import fs from 'fs';

const alunos = JSON.parse(
  fs.readFileSync('./test/dados/alunos.json', 'utf-8')
);


describe('Cadastro de aluno', () => {

  it('deve cadastrar um aluno com sucesso', async () => {
    const aluno = {
      ...alunos[0],
      email: `aluno.${Date.now()}@email.com`,
      matricula: `MAT${Date.now()}` 
    };

    const tokenAdmin = await loginAdmin();

    const resposta = await request(app)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(aluno);

    expect(resposta.status).to.equal(201);
    expect(resposta.body).to.have.property('id');
  });

}); 