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
    try {
      await axios.delete(`http://localhost:8080/api/empresa/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEmpresas();
    } catch (error) {
      console.error("Erro ao deletar empresa", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create</button>
      {isCreating && <CadastroEmpresa />}
      {isEditing && <AtualizarEmpresa empresa={selectedEmpresa} />}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa: any) => (
            <tr key={empresa.id}>
              <td>{empresa.nome}</td>
              <td>{empresa.email}</td>
              <td>{empresa.cnpj}</td>
              <td>{empresa.razaoSocial}</td>
              <td>
                <button onClick={() => handleEdit(empresa)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => handleDelete(empresa.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GerenciarEmpresa;