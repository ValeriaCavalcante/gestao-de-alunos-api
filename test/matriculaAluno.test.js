import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';
import { loginAdmin } from './loginAdmin.js';
import fs from 'fs';

const alunos = JSON.parse(
  fs.readFileSync('./test/dados/alunos.json', 'utf-8')
);

// Fiz pela IA: "Primeiro eu crio um aluno com dados únicos. Depois faço login como administrador. 
// Em seguida cadastro o aluno, pego o ID gerado pela API e uso esse ID para matriculá-lo na disciplina. 
// Por fim, verifico se a API retornou HTTP 201." 

describe('Matrícula do aluno', () => {
  it('deve matricular o aluno em uma disciplina com sucesso', async () => {
    const identificador = Date.now();

    const aluno = {
      ...alunos[0],
      email: `matricula.${identificador}@email.com`,
      matricula: `MAT${identificador}`
    };

    const tokenAdmin = await loginAdmin();

    const cadastro = await request(app)
      .post('/api/admin/alunos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(aluno);

    expect(cadastro.status).to.equal(201);

    const alunoId = cadastro.body.id;

    const resposta = await request(app)
      .post('/api/admin/disciplinas/disciplina-matematica/matriculas')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ alunoId });

    expect(resposta.status).to.equal(201);
  });
});