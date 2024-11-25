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
    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
    instituicao: Instituicao | null;
    cursoId: Curso | null;
    contaCorrente: ContaCorrente;
}

const VantagensAluno: React.FC = () => {
    const [vantagens, setVantagens] = useState<Vantagem[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [aluno, setAluno] = useState<Aluno | null>(null);

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken: any = decodeToken(token);
        console.log("Decoded Token:", decodedToken);
        setToken(decodedToken);
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
        console.log(userType);
    }, []);

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
        const fetchAluno = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/aluno/email/${token?.sub}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,

                        "Content-Type": "application/json",
                    },
                });
                setAluno(response.data);
                console.log(response);
            } catch (error) {
                console.error("Erro ao buscar aluno", error);
            }
        };

        if (token) {
            fetchAluno();
        }
    }, [token]);

    useEffect(() => {
        const fetchVantagens = async () => {
            if (aluno && aluno.instituicao) {
                try {
                    const response = await axios.get("http://localhost:8080/api/vantagem", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
                        },
                    });

                    const vantagensFiltradas = response.data.filter((vantagem: Vantagem) =>
                        vantagem.instituicao?.id === aluno.instituicao?.id
                    );

                    setVantagens(vantagensFiltradas);
                } catch (error) {
                    console.error("Erro ao buscar as vantagens", error);
                }
            }
        };

        fetchVantagens();
    }, [aluno]);

    // const obterVantagem = (id: number) => {
    //     console.log(`Vantagem ${id} obtida!`);
    // };

    const obterVantagem = async (vantagemId: number) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/conta-corrente/resgatar-vantagem`,
                null,
                {
                    params: { alunoId: aluno?.id, vantagemId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
                    },
                }
            );
            alert(response.data); // Mensagem de sucesso
    
            // Atualize os dados do aluno após a operação
            setTimeout(async () => {
                const alunoAtualizado = await axios.get(`http://localhost:8080/api/aluno/email/${token?.sub}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setAluno(alunoAtualizado.data);
            }, 500); // Delay de 500ms para garantir consistência
            
        } catch (error) {
            console.error("Erro ao resgatar a vantagem:", error);
            alert(error.response?.data?.message || error.message || "Erro ao resgatar a vantagem.");
        }
        
    };
    

    return (
        <div className="p-6 bg-blue-300 rounded-lg">
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
