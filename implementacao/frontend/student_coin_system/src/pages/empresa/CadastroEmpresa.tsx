import React, { useState } from 'react';
import axios from 'axios';

const CadastroEmpresa = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [descricao, setDescricao] = useState('');

  const cadastrarEmpresa = () => {
    axios.post('/api/empresas', {
      nome,
      email,
      descricao
    })
      .then(() => alert('Empresa cadastrada com sucesso!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Cadastrar Empresa Parceira</h2>
      <input type="text" placeholder="Nome da Empresa" onChange={e => setNome(e.target.value)} />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Descrição" onChange={e => setDescricao(e.target.value)} />
      <button onClick={cadastrarEmpresa}>Cadastrar</button>
    </div>
  );
};

export default CadastroEmpresa;
