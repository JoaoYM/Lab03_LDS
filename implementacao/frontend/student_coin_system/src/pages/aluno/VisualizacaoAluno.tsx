import React, { useState, useEffect } from "react";
import axios from "axios";
import CadastroAluno from "./CadastroAluno.tsx"; // Importa o componente de edição

interface Aluno {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  instituicaoId: number;
  cursoId: number;
}

const VisualizacaoAluno: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletingAluno, setDeletingAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    // Função para buscar a lista de alunos
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

    fetchAlunos();
  }, []);

  // Função para deletar um aluno
  const handleDelete = async (alunoId: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este aluno?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:8080/api/aluno/${alunoId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Aluno deletado com sucesso!");
            setAlunos(alunos.filter((aluno) => aluno.id !== alunoId));
        } catch (error) {
            console.error("Erro ao deletar aluno", error);
            alert("Erro ao deletar aluno.");
        }
    }
};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Alunos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alunos.map((aluno) => (
          <li key={aluno.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">{aluno.nome}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => {
                  setEditingAluno(aluno);
                  setShowEditForm(true);
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => setDeletingAluno(aluno)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
  
      {/* Exibe o formulário de edição */}
      {showEditForm && editingAluno && (
        <CadastroAluno
          aluno={editingAluno}
          onClose={() => setShowEditForm(false)}
        />
      )}
  
      {/* Modal de confirmação de deleção */}
      {deletingAluno && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg">
              Tem certeza que deseja deletar o aluno{" "}
              <span className="font-bold">{deletingAluno.nome}</span>? Essa ação é
              irreversível.
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => setDeletingAluno(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => {
                  handleDelete(deletingAluno.id);
                  setDeletingAluno(null);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default VisualizacaoAluno;
