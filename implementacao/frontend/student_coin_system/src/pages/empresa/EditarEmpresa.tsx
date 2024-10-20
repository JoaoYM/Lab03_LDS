import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditarEmpresa = () => {
  const { id } = useParams<{ id: string }>();
  const [empresa, setEmpresa] = useState({
    nome: '',
    email: '',
    descricao: ''
  });

  useEffect(() => {
    axios.get(`/api/empresas/${id}`)
      .then(response => setEmpresa(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const atualizarEmpresa = () => {
    axios.put(`/api/empresas/${id}`, empresa)
      .then(() => alert('Empresa atualizada com sucesso!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Editar Empresa</h2>
      <input type="text" placeholder="Nome" value={empresa.nome} onChange={e => setEmpresa({ ...empresa, nome: e.target.value })} />
      <input type="text" placeholder="Email" value={empresa.email} onChange={e => setEmpresa({ ...empresa, email: e.target.value })} />
      <input type="text" placeholder="Descrição" value={empresa.descricao} onChange={e => setEmpresa({ ...empresa, descricao: e.target.value })} />
      <button onClick={atualizarEmpresa}>Atualizar</button>
    </div>
  );
};

export default EditarEmpresa;
