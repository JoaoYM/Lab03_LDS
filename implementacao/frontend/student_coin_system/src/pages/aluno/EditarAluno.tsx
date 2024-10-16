import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditarAluno = () => {
  const { id } = useParams<{ id: string }>();
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    cpf: '',
    rg: '',
    endereco: '',
    instituicaoId: '',
    curso: ''
  });

  useEffect(() => {
    axios.get(`/api/alunos/${id}`)
      .then(response => setAluno(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const atualizarAluno = () => {
    axios.put(`/api/alunos/${id}`, aluno)
      .then(() => alert('Aluno atualizado com sucesso!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Editar Aluno</h2>
      <input type="text" placeholder="Nome" value={aluno.nome} onChange={e => setAluno({ ...aluno, nome: e.target.value })} />
      <input type="text" placeholder="Email" value={aluno.email} onChange={e => setAluno({ ...aluno, email: e.target.value })} />
      <input type="text" placeholder="CPF" value={aluno.cpf} onChange={e => setAluno({ ...aluno, cpf: e.target.value })} />
      <input type="text" placeholder="RG" value={aluno.rg} onChange={e => setAluno({ ...aluno, rg: e.target.value })} />
      <input type="text" placeholder="Endereço" value={aluno.endereco} onChange={e => setAluno({ ...aluno, endereco: e.target.value })} />
      <input type="text" placeholder="Curso" value={aluno.curso} onChange={e => setAluno({ ...aluno, curso: e.target.value })} />
      <button onClick={atualizarAluno}>Atualizar</button>
    </div>
  );
};

export default EditarAluno;
