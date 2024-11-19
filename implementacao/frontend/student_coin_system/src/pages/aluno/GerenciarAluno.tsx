import React, { useEffect, useState } from "react";
import axios from "axios";
import CadastroAluno from "./CadastroAluno.tsx";
import AtualizarAluno from "./AtualizarAluno.tsx";

const GerenciarAluno: React.FC = () => {
  const [alunos, setAlunos] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/aluno", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedAluno(null);
  };

  const handleEdit = (aluno: any) => {
    setSelectedAluno(aluno);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/aluno/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao deletar aluno", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-md rounded-lg">
      {/* Seção para Criar ou Editar Alunos */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Criar Novo Aluno
        </button>
      </div>

      <div className="mb-8">
        {isCreating && <CadastroAluno />}
        {isEditing && <AtualizarAluno aluno={selectedAluno} />}
      </div>

      {/* Seção para Visualizar Alunos */}
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Visualização dos Alunos</h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-center">Nome</th>
                <th className="p-4 text-center">Email</th>
                <th className="p-4 text-center">Curso</th>
                <th className="p-4 text-center">Instituição</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno: any) => (
                <tr key={aluno.id} className="border-b">
                  <td className="p-4">{aluno.nome}</td>
                  <td className="p-4">{aluno.email}</td>
                  <td className="p-4">{aluno.curso?.nome}</td>
                  <td className="p-4">{aluno.instituicao?.nome}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(aluno)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(aluno.id)}
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

export default GerenciarAluno;
