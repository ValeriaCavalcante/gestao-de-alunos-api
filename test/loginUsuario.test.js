import { expect } from 'chai';
import { loginUsuario } from './loginUsuario.js';

describe('Login do aluno', () => {

  it('deve realizar login do aluno com sucesso', async () => {

    const token = await loginUsuario();

    expect(token).to.be.a('string');
    expect(token).to.not.be.empty;

  });

});