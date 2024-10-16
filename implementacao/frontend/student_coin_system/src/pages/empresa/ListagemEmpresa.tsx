import React, { useState, useEffect } from 'react';
import axios from 'axios';

const empresa = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1, // Ajustando o ID para ser único em cada linha
  nome: `empresa${index + 1}`,
  email: `empresa${index + 1}@gmail.com`,
}));

const ListagemEmpresa = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios.get('/api/empresas')
      .then(response => setEmpresas(response.data))
      .catch(error => console.error(error));
  }, []);

  const excluirEmpresa = (id: number) => {
    axios.delete(`/api/empresas/${id}`)
      .then(() => {
        setEmpresas(empresas.filter(empresa => empresa.id !== id));
        alert('Empresa excluída com sucesso!');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="table-container">
      <h2>Listagem de Empresas</h2>
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
          {empresas.map(empresa => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome}</td>
              <td>{empresa.email}</td>
              <td>
                <button onClick={() => excluirEmpresa(empresa.id)}>Excluir</button>
                <a href={`/empresas/editar/${empresa.id}`}>Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemEmpresa;
