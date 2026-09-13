import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';
import { loginAdmin } from './loginAdmin.js';
import fs from 'fs';

const alunos = JSON.parse(
  fs.readFileSync('./test/dados/alunos.json', 'utf-8')
);

describe('Matrícula do aluno', () => {

  it('deve matricular o aluno em uma disciplina com sucesso', async () => {

    //const aluno = alunos[0];
    const aluno = {
  ...alunos[0],
     email: `matricula.${Date.now()}@email.com`,
     matricula: `MAT${Date.now()}`
};


    const tokenAdmin = await loginAdmin();

    // 1. Cadastra o aluno
    const cadastro = await request(app)
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(aluno);

    expect(cadastro.status).to.equal(201);

    // 2. Pega o ID gerado pela API
    const alunoId = cadastro.body.id;

    // 3. Matricula o aluno
    const resposta = await request(app)
      .post('/api/admin/disciplinas/disciplina-matematica/matriculas')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        alunoId: alunoId
      });

    console.log('STATUS:', resposta.status);
    console.log('BODY:', resposta.body);

    expect(resposta.status).to.equal(201);
  });

});