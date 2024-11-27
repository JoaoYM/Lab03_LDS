import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface AtualizarEmpresaProps {
  empresa: any; // Tipagem pode ser ajustada com base no seu modelo de empresa
}

const AtualizarEmpresa: React.FC<AtualizarEmpresaProps> = ({ empresa }) => {
  const [formData, setFormData] = useState({
    nome: empresa.nome,
    email: empresa.email,
    cnpj: empresa.cnpj,
    razaoSocial: empresa.razaoSocial,
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
      await axios.put(
        `http://localhost:8080/api/empresa/${empresa.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar empresa", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Empresa</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">CNPJ:</label>
          <InputMask
            mask="99.999.999/9999-99"
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Razão Social:</label>
          <input
            type="text"
            name="razaoSocial"
            placeholder="Razão Social"
            value={formData.razaoSocial}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarEmpresa;