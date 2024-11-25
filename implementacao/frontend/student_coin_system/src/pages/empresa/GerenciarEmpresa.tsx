import React, { useEffect, useState } from "react";
import axios from "axios";
import CadastroEmpresa from "./CadastroEmpresa.tsx";
import AtualizarEmpresa from "./AtualizarEmpresa.tsx";

const GerenciarEmpresa: React.FC = () => {
  const [empresas, setEmpresas] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

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

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedEmpresa(null);
  };

  const handleEdit = (empresa: any) => {
    setSelectedEmpresa(empresa);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Você realmente deseja excluir esta empresa?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/empresa/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchEmpresas(); // Atualiza a lista de empresas
      } catch (error) {
        console.error("Erro ao deletar empresa", error);
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
          Criar Nova Empresa
        </button>
      </div>

      <div className="mb-6">
        {isCreating && <CadastroEmpresa />}
        {isEditing && <AtualizarEmpresa empresa={selectedEmpresa} />}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Visualização das Empresas</h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-center">Nome</th>
                <th className="p-4 text-center">Email</th>
                <th className="p-4 text-center">CNPJ</th>
                <th className="p-4 text-center">Razão Social</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa: any) => (
                <tr key={empresa.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{empresa.nome}</td>
                  <td className="p-4">{empresa.email}</td>
                  <td className="p-4">{empresa.cnpj}</td>
                  <td className="p-4">{empresa.razaoSocial}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(empresa)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(empresa.id)}
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

export default GerenciarEmpresa;
