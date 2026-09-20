import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';
import { loginAdmin } from './loginAdmin.js';
import { loginUsuario } from './loginUsuario.js';
import fs from 'fs';

const alunos = JSON.parse(
  fs.readFileSync('./test/dados/alunos.json', 'utf-8')
);

describe('Entrega de trabalho do aluno', () => {

  it('deve registrar um trabalho com sucesso', async () => {

    const aluno = {
      ...alunos[0],
      email: `trabalho.${Date.now()}@email.com`,
      matricula: `TRAB${Date.now()}`
    };

    // 1. Login do administrador
    const tokenAdmin = await loginAdmin();

    // 2. Cadastra o aluno
    const cadastro = await request(app)
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(aluno);

    expect(cadastro.status).to.equal(201);

    const alunoId = cadastro.body.id;

    // 3. Matricula o aluno em Matemática
    const matricula = await request(app)
      .post('/api/admin/disciplinas/disciplina-matematica/matriculas')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        alunoId
      });

    expect(matricula.status).to.equal(201);

    // 4. Login do aluno
    const tokenAluno = await loginUsuario(aluno);

    // 5. Registra o trabalho
    const resposta = await request(app)
      .post(`/api/alunos/${alunoId}/trabalhos`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send({
        disciplinaId: 'disciplina-matematica',
        titulo: 'Lista de Exercícios 2',
        descricao: 'Resolução dos exercícios'
      });
    expect(resposta.status).to.equal(201);
  });

});