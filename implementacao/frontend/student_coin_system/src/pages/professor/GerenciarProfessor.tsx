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
        },
      });
      console.log(response.data);
      setProfessores(response.data);
      console.log(professores.map((professor: any) => professor));
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
    try {
      await axios.delete(`http://localhost:8080/api/professor/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      fetchProfessores();
    } catch (error) {
      console.error("Erro ao deletar professor", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create</button>
      {isCreating && <CadastroProfessor />}
      {isEditing && <AtualizarProfessor professor={selectedProfessor} />}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Instituição</th>
            <th>Departamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* {professores.map((professor: any) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.email}</td>
              <td>{professor.departamento.instituicao.nome}</td>
              <td>{professor.departamento.nome}</td>
              <td>
                <button onClick={() => handleEdit(professor)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => handleDelete(professor.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default GerenciarProfessor;