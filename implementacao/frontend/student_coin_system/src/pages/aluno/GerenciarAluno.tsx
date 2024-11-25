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
    <div>
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create</button>
      {isCreating && <CadastroAluno />}
      {isEditing && <AtualizarAluno aluno={selectedAluno} />}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Curso</th>
            <th>Instituição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno: any) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.curso.nome}</td>
              <td>{aluno.curso.instituicao.nome}</td>
              <td>
                <button onClick={() => handleEdit(aluno)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => handleDelete(aluno.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GerenciarAluno;