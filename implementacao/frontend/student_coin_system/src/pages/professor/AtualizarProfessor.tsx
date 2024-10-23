import React, { useState, useEffect } from "react";
import axios from "axios";

interface AtualizarProfessorProps {
  professor: any; // Tipagem pode ser ajustada com base no seu modelo de professor
}

const AtualizarProfessor: React.FC<AtualizarProfessorProps> = ({ professor }) => {
  const [nome, setNome] = useState(professor.nome);
  const [email, setEmail] = useState(professor.email);
  const [departamento, setDepartamento] = useState(professor.departamento.id);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/departamento", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setDepartamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar departamentos", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/professor/${professor.id}`,
        { nome, email, departamentoId: departamento },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Professor atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar professor", error);
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
        <label>Departamento:</label>
        <select
          value={departamento}
          onChange={(e) => setDepartamento(Number(e.target.value))}
          className="border p-2 w-full"
        >
          {departamentos.map((departamento: any) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nome}
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

export default AtualizarProfessor;