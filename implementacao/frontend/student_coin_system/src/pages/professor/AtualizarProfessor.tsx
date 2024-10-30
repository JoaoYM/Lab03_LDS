import React, { useState, useEffect } from "react";
import axios from "axios";

interface AtualizarProfessorProps {
  professor: any; // Tipagem pode ser ajustada com base no seu modelo de professor
}

const AtualizarProfessor: React.FC<AtualizarProfessorProps> = ({ professor }) => {
  const [nome, setNome] = useState(professor.nome);
  const [email, setEmail] = useState(professor.email);
  const [cpf, setCpf] = useState(professor.cpf || "");
  const [rg, setRg] = useState(professor.rg || "");
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
        { nome, email, cpf, rg, departamentoId: departamento },
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">RG:</label>
        <input
          type="text"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700">Departamento:</label>
        <select
          value={departamento}
          onChange={(e) => setDepartamento(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departamentos.map((departamento: any) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nome}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Atualizar
      </button>
    </form>
  );
};

export default AtualizarProfessor;