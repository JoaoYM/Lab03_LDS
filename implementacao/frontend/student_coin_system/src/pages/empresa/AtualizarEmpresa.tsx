import React, { useState } from "react";
import axios from "axios";

interface AtualizarEmpresaProps {
  empresa: any; // Tipagem pode ser ajustada com base no seu modelo de empresa
}

const AtualizarEmpresa: React.FC<AtualizarEmpresaProps> = ({ empresa }) => {
  const [nome, setNome] = useState(empresa.nome);
  const [email, setEmail] = useState(empresa.email);
  const [cnpj, setCnpj] = useState(empresa.cnpj);
  const [razaoSocial, setRazaoSocial] = useState(empresa.razaoSocial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/empresa/${empresa.id}`,
        { nome, email, cnpj, razaoSocial },
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>CNPJ:</label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Razão Social:</label>
        <input
          type="text"
          value={razaoSocial}
          onChange={(e) => setRazaoSocial(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Atualizar
      </button>
    </form>
  );
};

export default AtualizarEmpresa;