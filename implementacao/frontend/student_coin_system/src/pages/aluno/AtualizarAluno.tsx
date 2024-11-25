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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Curso:</label>
        <select
          value={curso}
          onChange={(e) => setCurso(Number(e.target.value))}
          className="border p-2 w-full"
        >
          {cursos.map((curso: any) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Atualizar
      </button>
    </form>
  );
};

export default AtualizarAluno;