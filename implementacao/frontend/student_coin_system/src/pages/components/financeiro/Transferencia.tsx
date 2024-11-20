// src/components/Transferencia.tsx
import React, { useState } from "react";
import axios from "axios";

interface TransferComponentProps {
  professorId: number;
  alunoId: number;
  onClose: () => void;
}

const Transferencia: React.FC<TransferComponentProps> = ({ professorId, alunoId, onClose }) => {
  const [quantidade, setQuantidade] = useState("");
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value.replace(/[^\d]/g, "")) < 0) {
      setError("A quantidade não pode ser negativa.");
    } else {
      setError(null);
      setQuantidade(formatCurrency(value));
    }
  };

  const handleTransfer = async () => {
    const parsedQuantity = parseFloat(quantidade.replace(/[R$\s.]/g, "").replace(",", "."));

    if (!parsedQuantity || parsedQuantity <= 0) {
      setError("Insira uma quantidade válida.");
      return;
    }
    if (!motivo.trim()) {
      setError("O motivo é obrigatório.");
      return;
    }

    const transferData = {
      professorId,
      alunoId,
      quantidade: parsedQuantity,
      motivo,
    };

    try {
      await axios.post("http://localhost:8080/api/conta-corrente/transferirMoedas", transferData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Transferência realizada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao transferir moedas:", error);
      alert("Erro ao transferir moedas" + error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Transferir Moedas</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <label className="block text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="text"
          value={quantidade}
          onChange={handleQuantityChange}
          placeholder="Digite a quantidade (R$)"
          className={`mt-1 mb-4 p-2 border rounded w-full ${error ? "border-red-500" : "border-gray-300"}`}
        />
        
        <label className="block text-sm font-medium text-gray-700">Motivo</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Digite o motivo da transferência"
          className={`mt-1 mb-4 p-2 border rounded w-full h-24 resize-none ${error && !motivo ? "border-red-500" : "border-gray-300"}`}
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={handleTransfer}
            disabled={!quantidade || parseFloat(quantidade.replace(/[^\d]/g, "")) <= 0 || !motivo.trim()}
            className={`px-4 py-2 rounded text-white focus:outline-none ${
              !quantidade || parseFloat(quantidade.replace(/[^\d]/g, "")) <= 0 || !motivo.trim()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Transferir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transferencia;