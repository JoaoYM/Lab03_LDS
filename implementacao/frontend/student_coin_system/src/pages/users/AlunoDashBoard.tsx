import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlunoDashboard = () => {
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    axios.get('/api/alunos/1')
      .then(response => setAluno(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {aluno?.nome}</h1>
      <p>Seu saldo atual: {aluno?.contaCorrente?.saldo}</p>
      {/* Listagem de histórico de transações */}
    </div>
  );
};

export default AlunoDashboard;