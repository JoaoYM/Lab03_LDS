import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroAluno = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [endereco, setEndereco] = useState('');
  const [instituicaoId, setInstituicaoId] = useState('');
  const [instituicoes, setInstituicoes] = useState([]);
  const [curso, setCurso] = useState('');

  useEffect(() => {
    // Buscar instituições pré-cadastradas
    axios.get('/api/instituicoes')
      .then(response => setInstituicoes(response.data))
      .catch(error => console.error(error));
  }, []);

  const cadastrarAluno = () => {
    axios.post('/api/alunos', {
      nome,
      email,
      cpf,
      rg,
      endereco,
      instituicaoId,
      curso
    })
      .then(() => alert('Aluno cadastrado com sucesso!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Cadastrar Aluno</h2>
      <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)} />
      <input type="text" placeholder="RG" onChange={e => setRg(e.target.value)} />
      <input type="text" placeholder="Endereço" onChange={e => setEndereco(e.target.value)} />
      <select onChange={e => setInstituicaoId(e.target.value)}>
        <option value="">Selecione a Instituição</option>
        {instituicoes.map(instituicao => (
          <option key={instituicao.id} value={instituicao.id}>
            {instituicao.nome}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Curso" onChange={e => setCurso(e.target.value)} />
      <button onClick={cadastrarAluno}>Cadastrar</button>
    </div>
  );
};

export default CadastroAluno;
