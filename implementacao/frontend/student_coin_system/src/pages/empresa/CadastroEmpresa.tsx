import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

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
        alert("Empresa cadastrada com sucesso!");;
      }
      onClose(); // Fecha o formulário de edição ao finalizar
    } catch (error) {
      console.error("Erro ao cadastrar empresa", error);
      alert("Erro ao cadastrar empresa.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{empresa ? "Editar Empresa" : "Cadastrar Empresa"}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputMask
          mask="99.999.999/9999-99"
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="razaoSocial"
          placeholder="Razão Social"
          value={formData.razaoSocial}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {empresa ? "Salvar" : "Cadastrar"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroEmpresa;
