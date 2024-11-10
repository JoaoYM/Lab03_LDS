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

interface Vantagem {
  id: string;
  nome: string;
  descricao: string;
  fotoUrl: string;
  custoMoedas: number;
  empresaId: string;
  instituicaoId: string;
}

interface AtualizarVantagemProps {
  vantagem: any;
}

const AtualizarVantagem: React.FC<AtualizarVantagemProps> = ({ vantagem }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    fotoUrl: "",
    custoMoedas: 0,
    empresaId: "",
    instituicaoId: "",
  });

  useEffect(() => {
    setFormData({
      nome: vantagem.nome,
      descricao: vantagem.descricao,
      fotoUrl: vantagem.fotoUrl,
      custoMoedas: vantagem.custoMoedas,
      empresaId: vantagem.empresaId,
      instituicaoId: vantagem.instituicaoId,
    });
  }, [vantagem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/vantagem/${vantagem.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });
      alert("Vantagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar vantagem", error);
    } finally {
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Editar Vantagem</h1>
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
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Descrição:</label>
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Foto Url:</label>
          <input
            name="fotoUrl"
            placeholder="Foto Url"
            value={formData.fotoUrl}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Custo Moedas:</label>
          <input
            type="number"
            name="custoMoedas"
            placeholder="Custo Moedas"
            value={formData.custoMoedas}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Empresa:</label>
          <select
            name="empresaId"
            value={formData.empresaId}
            onChange={(e) => setFormData({ ...formData, empresaId: e.target.value })} // Correção)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione a Empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Instituicao:</label>
          <select
            name="instituicaoId"
            value={formData.instituicaoId}
            onChange={(e) => setFormData({ ...formData, instituicaoId: e.target.value })} // Correção)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione a Instituição</option>
            {instituicoes.map((instituicao) => (
              <option key={instituicao.id} value={instituicao.id}>
                {instituicao.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarVantagem;
