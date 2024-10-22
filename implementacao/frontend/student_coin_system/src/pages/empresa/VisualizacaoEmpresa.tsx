import React, { useState, useEffect } from "react";
import axios from "axios";
import CadastroEmpresa from "./CadastroEmpresa.tsx";

interface Empresa {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  razaoSocial: string;
}

const VisualizacaoEmpresa: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deletingEmpresa, setDeletingEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/empresa", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setEmpresas(response.data);
      } catch (error) {
        console.error("Erro ao buscar empresas", error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleDelete = async (empresaId: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta empresa?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/empresa/${empresaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        alert("Empresa deletada com sucesso!");
        setEmpresas(empresas.filter((empresa) => empresa.id !== empresaId));
      } catch (error) {
        console.error("Erro ao deletar empresa", error);
        alert("Erro ao deletar empresa.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Empresas</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empresas.map((empresa) => (
          <li key={empresa.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">{empresa.nome}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => {
                  setEditingEmpresa(empresa);
                  setShowEditForm(true);
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => setDeletingEmpresa(empresa)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Exibe o formulário de edição */}
      {showEditForm && editingEmpresa && (
        <CadastroEmpresa
          empresa={editingEmpresa}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {/* Modal de confirmação de deleção */}
      {deletingEmpresa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg">
              Tem certeza que deseja deletar a empresa{" "}
              <span className="font-bold">{deletingEmpresa.nome}</span>? Essa ação é
              irreversível.
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => setDeletingEmpresa(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-200"
                onClick={() => {
                  handleDelete(deletingEmpresa.id);
                  setDeletingEmpresa(null);
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

export default VisualizacaoEmpresa;
