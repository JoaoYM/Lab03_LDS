import React, { useEffect, useState } from "react";
import axios from "axios";

interface Empresa {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  razaoSocial: string;
}

interface CadastroEmpresaProps {
  empresa?: Empresa;
  onClose: () => void;
}

const CadastroEmpresa: React.FC<CadastroEmpresaProps> = ({ empresa, onClose }) => {
  const [formData, setFormData] = useState({
    nome: empresa?.nome || "",
    email:empresa?.email || "",
    cnpj: empresa?.cnpj || "",
    razaoSocial: empresa?.razaoSocial || "",
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        nome: empresa.nome,
        email: empresa.email,
        cnpj: empresa.cnpj,
        razaoSocial: empresa.razaoSocial,
      });
    }
  }, [empresa]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (empresa) {
        await axios.put(`http://localhost:8080/api/empresa/${empresa.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        alert("Empresa atualizada com sucesso!");
      } else {
        await axios.post("http://localhost:8080/api/empresa", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        alert("Empresa cadastrada com sucesso!");
      }
      onClose(); // Fecha o formulário de edição ao finalizar
    } catch (error) {
      console.error("Erro ao cadastrar empresa", error);
      alert("Erro ao cadastrar empresa.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">{empresa ? "Editar Empresa" : "Cadastrar Empresa"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="razaoSocial"
          placeholder="Razão Social"
          value={formData.razaoSocial}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {empresa ? "Salvar" : "Cadastrar"}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CadastroEmpresa;
