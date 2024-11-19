import React, { useState, useEffect } from "react";
import axios from "axios";

interface Instituicao {
  id: number;
  nome: string;
}

interface Empresa {
  id: number;
  nome: string;
}

interface CadastroVantagemProps {
  onVantagemSaved: () => void;
}

const CadastroVantagem: React.FC<CadastroVantagemProps> = ({ onVantagemSaved }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    fotoUrl: "",
    custoMoedas: "",
    empresaId: "",
    instituicaoId: ""
  });

  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchInstituicoes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/instituicao", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setInstituicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar instituições", error);
      }
    };

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

    fetchInstituicoes();
    fetchEmpresas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        custoMoedas: parseFloat(formData.custoMoedas),
        empresa: { id: formData.empresaId },
        instituicao: { id: formData.instituicaoId }
      };

      await axios.post("http://localhost:8080/api/vantagem", formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Vantagem cadastrada com sucesso!");
      onVantagemSaved(); 
    } catch (error) {
      console.error("Erro ao cadastrar vantagem", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Vantagem</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="fotoUrl"
          placeholder="URL da Foto"
          value={formData.fotoUrl}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="custoMoedas"
          placeholder="Custo em Moedas"
          value={formData.custoMoedas}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="empresaId"
          value={formData.empresaId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a Empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nome}
            </option>
          ))}
        </select>
        <select
          name="instituicaoId"
          value={formData.instituicaoId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a Instituição</option>
          {instituicoes.map((instituicao) => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))}
        </select>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroVantagem;
