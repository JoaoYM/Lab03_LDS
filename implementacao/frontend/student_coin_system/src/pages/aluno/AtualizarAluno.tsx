import React, { useState, useEffect } from "react";
import axios from "axios";

interface AtualizarAlunoProps {
  aluno: any; // Tipagem pode ser ajustada com base no seu modelo de aluno
}

const AtualizarAluno: React.FC<AtualizarAlunoProps> = ({ aluno }) => {
  const [nome, setNome] = useState(aluno.nome);
  const [email, setEmail] = useState(aluno.email);
  const [curso, setCurso] = useState(aluno.curso.id);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/curso", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar cursos", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/aluno/${aluno.id}`,
        { nome, email, cursoId: curso },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Aluno atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar aluno", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Aluno</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Curso:</label>
          <select
            value={curso}
            onChange={(e) => setCurso(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cursos.map((curso: any) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarAluno;