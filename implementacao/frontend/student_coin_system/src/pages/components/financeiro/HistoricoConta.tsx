// src/components/HistoricoConta.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';
import { decodeToken } from "../../../utils/token.tsx";
import axios from "axios";

interface HistoricoItem {
  id: number;
  dataOperacao: string;
  pagador: string;
  beneficiario: string;
  entrada: number;
  saida: number;
  saldoFinal: number;
}

interface Usuario {
  id: number;
  nome: string;
  contaCorrenteId: number;
}

interface ContaCorrente {
  id: number;
  saldo: number;
}

const HistoricoConta: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  //const role = location.state?.role || searchParams.get("role");
  //const id = location.state?.id || searchParams.get("id");
  //const token = localStorage.getItem("token");
  const [token, setToken] = useState<any | null>(null);

  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [conta, setConta] = useState<ContaCorrente| null>(null);

  // Decodifica o token e armazena no estado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken: any = decodeToken(storedToken);
      setToken(decodedToken);
    }
  }, []);

  // Busca o usuário baseado no token
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/${token.role}/login/${token.sub}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUsuario(response.data);
        } catch (error) {
          console.error("Erro ao buscar usuário: ", error);
        }
      };

      fetchUser();
    }
  }, [token]);

   // Busca o histórico da conta baseado no usuário
   useEffect(() => {
    if (usuario) {
      const fetchHistorico = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/historico-conta/conta/${usuario.contaCorrenteId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          setHistorico(response.data);
          setSaldo(response.data[response.data.length - 1].saldoFinal);
        } catch (error) {
          console.error("Erro ao buscar histórico: ", error);
        }
      };

      fetchHistorico();
    }
  }, [usuario]);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Histórico de Transações</h2>
      <p className="text-lg mb-6 text-center font-semibold text-gray-700">Saldo Atual: R$ {saldo}</p>
      <div className="overflow-y-auto max-h-96 border-t border-b border-gray-300">
        {historico.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Data</th>
                <th className="py-3 px-6 text-left">Pagador</th>
                <th className="py-3 px-6 text-left">Beneficiário</th>
                <th className="py-3 px-6 text-center">Entrada</th>
                <th className="py-3 px-6 text-center">Saída</th>
                <th className="py-3 px-6 text-center">Saldo Final</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left text-gray-700">{new Date(item.dataOperacao).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left text-gray-700">{item.pagador}</td>
                  <td className="py-3 px-6 text-left text-gray-700">{item.beneficiario}</td>
                  <td className="py-3 px-6 text-center text-green-600">{item.entrada.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center text-red-600">{item.saida.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center text-gray-800 font-semibold">{item.saldoFinal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-600 py-8">Nenhum histórico encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default HistoricoConta;