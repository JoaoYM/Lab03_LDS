import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CadastroVantagem from "./CadastroVantagem.tsx";
import AtualizarVantagem from "./AtualizarVantagem.tsx";

const GerenciarVantagem: React.FC = () => {
  const [vantagens, setVantagens] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVantagem, setSelectedVantagem] = useState(null);
  const editSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVantagens();
  }, []);

  const fetchVantagens = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/vantagem", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setVantagens(response.data);
    } catch (error) {
      console.error("Erro ao buscar vantagens", error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedVantagem(null);
  };

  const handleEdit = (vantagem: any) => {
    setSelectedVantagem(vantagem);
    setIsCreating(false);
    setIsEditing(true);
    editSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Você realmente deseja excluir esta vantagem?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/vantagem/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchVantagens();
      } catch (error) {
        console.error("Erro ao deletar vantagem", error);
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
          Criar Nova Vantagem
        </button>
      </div>

      <div className="mb-6" ref={editSectionRef}>
        {isCreating && <CadastroVantagem onVantagemSaved={fetchVantagens} />}
        {isEditing && <AtualizarVantagem vantagem={selectedVantagem} onVantagemUpdated={fetchVantagens} />}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Visualização das Vantagens</h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-center">Nome</th>
                <th className="p-4 text-center">Descrição</th>
                <th className="p-4 text-center">Custo Moedas</th>
                <th className="p-4 text-center">Empresa</th>
                <th className="p-4 text-center">Instituição</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vantagens.map((vantagem: any) => (
                <tr key={vantagem.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{vantagem.nome}</td>
                  <td className="p-4">{vantagem.descricao}</td>
                  <td className="p-4">{vantagem.custoMoedas}</td>
                  <td className="p-4">{vantagem.empresa?.nome}</td>
                  <td className="p-4">{vantagem.instituicao?.nome}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(vantagem)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(vantagem.id)}
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

export default GerenciarVantagem;