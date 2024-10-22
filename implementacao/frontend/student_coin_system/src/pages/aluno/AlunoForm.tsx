import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Aluno {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  instituicaoId: string;
  curso: string;
}

const AlunoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [instituicoes, setInstituicoes] = useState<{ id: string; nome: string }[]>([]);
  const [aluno, setAluno] = useState<Aluno>({
    nome: '',
    email: '',
    cpf: '',
    rg: '',
    endereco: '',
    instituicaoId: '',
    curso: '',
  });
  const [editando, setEditando] = useState(false);

  const carregarAlunos = async () => {
    const response = await axios.get('/api/alunos');
    setAlunos(response.data);
  };

  const carregarInstituicoes = async () => {
    const response = await axios.get('/api/instituicao');
    setInstituicoes(response.data);
  };

  useEffect(() => {
    carregarAlunos();
    carregarInstituicoes();
    if (id) {
      axios.get(`/api/alunos/${id}`).then(response => {
        setAluno(response.data);
        setEditando(true);
      });
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editando) {
      await axios.put(`/api/alunos/${aluno.id}`, aluno);
    } else {
      await axios.post('/api/alunos', aluno);
    }
    setAluno({
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      endereco: '',
      instituicaoId: '',
      curso: '',
    });
    setEditando(false);
    carregarAlunos();
  };

  const editarAluno = (alunoSelecionado: Aluno) => {
    setAluno(alunoSelecionado);
    setEditando(true);
  };

  const excluirAluno = async (id: number | undefined) => {
    if (id) {
      await axios.delete(`/api/alunos/${id}`);
      carregarAlunos();
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editando ? 'Editar Aluno' : 'Cadastrar Aluno'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={aluno.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          value={aluno.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="cpf"
          value={aluno.cpf}
          onChange={handleChange}
          placeholder="CPF"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="rg"
          value={aluno.rg}
          onChange={handleChange}
          placeholder="RG"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="endereco"
          value={aluno.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          name="instituicaoId"
          value={aluno.instituicaoId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Selecione a Instituição</option>
          {instituicoes.map(instituicao => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="curso"
          value={aluno.curso}
          onChange={handleChange}
          placeholder="Curso"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          {editando ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Listagem de Alunos</h2>
      <ul className="mt-4 space-y-2">
        {alunos.map(aluno => (
          <li key={aluno.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
            <span>{aluno.nome} - {aluno.email}</span>
            <div>
              <button onClick={() => editarAluno(aluno)} className="text-blue-500 hover:underline mr-2">Editar</button>
              <button onClick={() => excluirAluno(aluno.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlunoForm;
