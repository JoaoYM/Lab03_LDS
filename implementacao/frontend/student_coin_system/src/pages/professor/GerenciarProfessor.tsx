import React, { useEffect, useState } from "react";
import axios from "axios";
import CadastroProfessor from "./CadastroProfessor.tsx";
import AtualizarProfessor from "./AtualizarProfessor.tsx";

const GerenciarProfessor: React.FC = () => {
  const [professores, setProfessores] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/professor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setProfessores(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar professores", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedProfessor(null);
  };

  const handleEdit = (professor: any) => {
    setSelectedProfessor(professor);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Você realmente deseja excluir este professor?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/professor/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchProfessores();
      } catch (error) {
        console.error("Erro ao deletar professor", error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-md rounded-lg">
      <div className="flex justify-center mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Criar Novo Professor
        </button>
      </div>

      <div className="mb-6">
        {isCreating && <CadastroProfessor />}
        {isEditing && <AtualizarProfessor professor={selectedProfessor} />}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Visualização dos Professores</h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-center">Nome</th>
                <th className="p-4 text-center">Email</th>
                <th className="p-4 text-center">Departamento</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor: any) => (
                <tr key={professor.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{professor.nome}</td>
                  <td className="p-4">{professor.email}</td>
                  <td className="p-4">{professor.departamento?.nome}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(professor)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(professor.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GerenciarProfessor;
