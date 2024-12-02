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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">
          Transferir Moedas
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label className="block text-lg font-medium text-gray-800">Quantidade</label>
        <input
          type="text"
          value={quantidade}
          onChange={handleQuantityChange}
          placeholder="Digite a quantidade (R$)"
          className={`mt-2 mb-4 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring ${
            error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
          }`}
        />

        <label className="block text-lg font-medium text-gray-800">Motivo</label>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Digite o motivo da transferência"
          className={`mt-2 mb-4 p-3 border rounded-lg w-full h-28 resize-none text-gray-700 focus:outline-none focus:ring ${
            error && !motivo ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
          }`}
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleTransfer}
            disabled={!quantidade || parseFloat(quantidade.replace(/[^\d]/g, "")) <= 0 || !motivo.trim()}
            className={`px-5 py-2 rounded-lg text-white focus:outline-none focus:ring ${
              !quantidade || parseFloat(quantidade.replace(/[^\d]/g, "")) <= 0 || !motivo.trim()
                ? "bg-blue-300 cursor-not-allowed focus:ring-blue-200"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
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