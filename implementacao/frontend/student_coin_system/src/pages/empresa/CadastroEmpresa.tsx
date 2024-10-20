import React, { useState } from "react";
import axios from "axios";

const CadastroEmpresa: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    razaoSocial: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/empresas", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Empresa cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar empresa", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Empresa</h1>
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
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroEmpresa;