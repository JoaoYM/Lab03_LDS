import React, { useState, useEffect } from "react";
import axios from "axios";
import { decodeToken } from "../../../utils/token.tsx";

interface Instituicao {
    id: number;
    nome: string;
}

interface Empresa {
    id: number;
    nome: string;
    email: string;
    cnpj: string;
    razaoSocial: string;
}

interface Vantagem {
    id: number;
    nome: string;
    descricao: string;
    fotoUrl: string;
    empresa: Empresa | null;
    custoMoedas: number;
    instituicao: Instituicao | null;
}

interface Curso {
    id: number;
    nome: string;
}

interface ContaCorrente {
    id: number;
    saldo: number;
}

interface Aluno {
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
    instituicao: Instituicao | null;
    cursoId: Curso | null;
    contaCorrente: ContaCorrente;
}

// Simulação de uma instituiçãoId do aluno logado para o exemplo
const instituicaoDoAlunoLogado = 1;

const VantagensAluno: React.FC = () => {
    const [vantagens, setVantagens] = useState<Vantagem[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userType, setUserType] = useState<"admin" | "aluno" | "professor" | "empresa" | null>(null);
    const [aluno, setAluno] = useState<Aluno | null>(null);
    const [instituicaoId, setInstituicaoId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          const decodedToken: any = decodeToken(token);
          if (decodedToken && decodedToken.instituicaoId) {
            setInstituicaoId(decodedToken.instituicaoId); // Define o instituicaoId a partir do token
          }
        }
      }, []);
/*
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            const decodedToken = decodeToken(token);
            const isExpired = decodedToken ? Date.now() >= decodedToken.exp * 1000 : true;

            if (!isExpired) {
                setIsAuthenticated(true);
                setUserType(decodedToken?.role as "admin" | "aluno" | "professor" | "empresa");
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);
    */
/*
    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/aluno`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setAluno(response.data);
            } catch (error) {
                console.error("Erro ao buscar aluno", error);
            }
        };

        fetchAluno();
    }, []);
*/
/*
useEffect(() => {
    if (instituicaoId !== null) {
      // Faz a requisição com o filtro instituicaoId
      axios
        .get(`http://localhost:8080/api/vantagens?instituicaoId=${instituicaoId}`)
        .then((response) => {
          setVantagens(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar vantagens:", error);
        });
    }
  }, [instituicaoId]);
*/

    useEffect(() => {
        const fetchVantagens = async () => {
            //if (aluno && aluno.instituicao) {
            if (instituicaoId !== null) {
                try {
                    const response = await axios.get("http://localhost:8080/api/vantagem", {
                        headers: {
                           Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    const vantagensFiltradas = response.data.filter((vantagem: Vantagem) =>
                        //vantagem.instituicao?.id === aluno.instituicao?.id
                        vantagem.instituicao?.id === instituicaoId

                    );

                    setVantagens(vantagensFiltradas);
                } catch (error) {
                    console.error("Erro ao buscar as vantagens", error);
                }
            }
            //}
        };

        fetchVantagens();
    }, []);

    const obterVantagem = (id: number) => {
        console.log(`Vantagem ${id} obtida!`);
    };

    return (
        <div className="p-6">
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Vantagens Disponíveis</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vantagens.map((vantagem) => (
                    <div
                        key={vantagem.id}
                        className="border border-gray-200 rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105 text-center"
                    >
                        <div className="relative">
                            <img
                                src={vantagem.fotoUrl}
                                alt={`Foto da vantagem ${vantagem.nome}`}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{vantagem.nome}</h2>
                            <p className="text-sm text-gray-600 mt-2">{vantagem.descricao}</p>
                            <h3 className="text-lg text-teal-600 mt-4">
                                Empresa: {vantagem.empresa ? vantagem.empresa.nome : "N/A"}
                            </h3>
                            <p className="text-md font-semibold text-purple-700 mt-4">
                                Custo: {vantagem.custoMoedas} Moedas
                            </p>
                            <button
                                onClick={() => obterVantagem(vantagem.id)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Obter
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VantagensAluno;
