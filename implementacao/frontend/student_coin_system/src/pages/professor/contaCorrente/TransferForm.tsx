import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransferForm({ professorId, alunoId }) {
  const [aluno, setAluno] = useState({});
  const [saldoProfessor, setSaldoProfessor] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para buscar dados do aluno
  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await axios.get(`/api/alunos/${alunoId}`);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
      }
    }
    fetchAluno();
  }, [alunoId]);

  // Função para buscar saldo do professor
  useEffect(() => {
    async function fetchSaldoProfessor() {
      try {
        const response = await axios.get(`/api/professores/${professorId}`);
        setSaldoProfessor(response.data.contaCorrente.saldo);
      } catch (error) {
        console.error("Erro ao buscar saldo do professor:", error);
      }
    }
    fetchSaldoProfessor();
  }, [professorId, SubmitEvent]);

  // Função para realizar transferência
  const handleTransfer = async () => {
    try {
      await axios.post('/api/conta-corrente/transferirMoedas', {
        professorId,
        alunoId,
        quantidade: parseFloat(quantidade),
        motivo,
      });
      setMensagem("Transferência realizada com sucesso!");
      setQuantidade('');
      setMotivo('');
    } catch (error) {
      setMensagem("Erro ao realizar transferência. Saldo insuficiente ou dados incorretos.");
      console.error("Erro na transferência:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Transferência de Moedas</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Aluno</label>
        <p className="mt-1 text-gray-800">{aluno.nome || 'Carregando...'}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Saldo do Professor</label>
        <p className="mt-1 text-gray-800">{saldoProfessor}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantidade de Moedas</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Motivo</label>
        <input
          type="text"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleTransfer}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Realizar Transferência
      </button>
      {mensagem && (
        <p className="mt-2 text-center text-green-600">{mensagem}</p>
      )}
    </div>
  );
}

export default TransferForm;