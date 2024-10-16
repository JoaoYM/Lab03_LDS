import React, { useState, useEffect } from 'react';
import axios from 'axios';

const aluno = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1, // Ajustando o ID para ser único em cada linha
  nome: `aluno${index + 1}`,
  email: `aluno${index + 1}@gmail.com`,
}));

const ListagemAluno = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    axios.get('/api/alunos')
      .then(response => setAlunos(response.data))
      .catch(error => console.error(error));
  }, []);

  const excluirAluno = (id: number) => {
    axios.delete(`/api/alunos/${id}`)
      .then(() => {
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        alert('Aluno excluído com sucesso!');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="table-container">
      <h2>Listagem de Alunos</h2>
      <table className="tabela-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>
                <button onClick={() => excluirAluno(aluno.id)}>Excluir</button>
                <a href={`/alunos/editar/${aluno.id}`}>Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemAluno;
