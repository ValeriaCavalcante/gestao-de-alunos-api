import request from 'supertest';
import app from '../src/app.js';
import fs from 'fs';

const alunos = JSON.parse(
  fs.readFileSync('./test/dados/alunos.json', 'utf-8')
);

export async function loginUsuario(aluno = alunos[0]) {
  const resposta = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: aluno.email,
      senha: aluno.senha
    });

  return resposta.body.token;
}