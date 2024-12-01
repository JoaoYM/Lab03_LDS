import React, { useEffect, useState } from "react";
import { decodeToken } from "../../../utils/token.tsx";
import axios from "axios";
import Header from "../header/Header.tsx";

interface HistoricoItem {
  id: number;
  dataOperacao: string;
  pagador: string;
  beneficiario: string;
  entrada: number;
  saida: number;
  motivo: string;
  saldoFinal: number;
}

interface Usuario {
  id: number;
  nome: string;
  contaCorrenteId: number;
}

const HistoricoConta: React.FC = () => {
  const [token, setToken] = useState<any | null>(null);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [selectedMotivo, setSelectedMotivo] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken: any = decodeToken(storedToken);
      setToken(decodedToken);
    }
  }, []);

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
          if (response.data.length > 0) {
            setSaldo(response.data[0].saldoFinal);
          }
        } catch (error) {
          console.error("Erro ao buscar histórico: ", error);
        }
      };

      fetchHistorico();
    }
  }, [usuario]);

  const closeModal = () => setSelectedMotivo(null);

  return (
    <>
      <section>
        <Header role={undefined} id={undefined}></Header>
      </section>
      <section className="mt-[150px]">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Histórico de Transações
          </h1>
          <p className="text-xl mb-6 text-center font-semibold text-gray-700">
            Saldo Atual: R$ {saldo.toFixed(2)}
          </p>
          <div className="overflow-y-auto max-h-96 border-t border-b border-gray-300">
            {historico.length > 0 ? (
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left border-b">Data</th>
                    <th className="py-3 px-6 text-left border-b">Pagador</th>
                    <th className="py-3 px-6 text-left border-b">Beneficiário</th>
                    <th className="py-3 px-6 text-center border-b">Entrada</th>
                    <th className="py-3 px-6 text-center border-b">Saída</th>
                    <th className="py-3 px-6 text-center border-b">Saldo Final</th>
                    <th className="py-3 px-6 text-center border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-100 even:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left text-gray-700">
                        {new Date(item.dataOperacao).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-left text-gray-700">
                        {item.pagador}
                      </td>
                      <td className="py-3 px-6 text-left text-gray-700">
                        {item.beneficiario}
                      </td>
                      <td className="py-3 px-6 text-center text-green-600 font-medium">
                        {item.entrada.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-center text-red-600 font-medium">
                        {item.saida.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-center text-gray-800 font-semibold">
                        {item.saldoFinal.toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {item.motivo ? (
                          <button
                            onClick={() => setSelectedMotivo(item.motivo)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Ver motivo
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-600 py-8">
                Nenhum histórico encontrado.
              </div>
            )}
          </div>
        </div>
      </section>
      {selectedMotivo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[70vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Motivo</h2>
            <p className="text-gray-700 break-words">{selectedMotivo}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoricoConta;