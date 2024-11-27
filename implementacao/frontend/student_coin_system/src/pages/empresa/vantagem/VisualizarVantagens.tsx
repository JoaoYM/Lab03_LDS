import React, { useEffect, useState } from "react";
import axios from "axios";
import { decodeToken } from "../../../utils/token.tsx";

interface Empresa {
    id: number;
    nome: string;
    email: string;
    cnpj: string;
    razaoSocial: string;
}

interface Instituicao {
    id: number;
    nome: string;
}

interface Vantagem {
    id: number;
    nome: string;
    descricao: string;
    fotoUrl: string;
    custoMoedas: number;
    empresa: Empresa | null;
    instituicao: Instituicao | null;
}

const VisualizarVantagens: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [vantagens, setVantagens] = useState<Vantagem[]>([]);
    const [empresa, setEmpresa] = useState<Empresa | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: any = decodeToken(token);
            console.log("Decoded Token:", decodedToken);
            setToken(decodedToken);
        }
    }, []);

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {    
                const empresaLogada = await axios.get(`http://localhost:8080/api/empresa/email/${token?.sub}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setEmpresa(empresaLogada.data);
                
            } catch (error) {
                alert(error.response?.data || "Erro ao pegar empresa logada.");
            }
            
        };

        if (token) {
            fetchEmpresa();
        }

    }, [token]);

    useEffect(() => {
        const fetchVantagens = async () => {
            if (empresa?.id) {
                try {
                    const response = await axios.get("http://localhost:8080/api/vantagem", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    // Filtrar vantagens pela empresa logada
                    const vantagensFiltradas = response.data.filter(
                        (vantagem: Vantagem) => vantagem.empresa?.id === empresa?.id
                    );

                    setVantagens(vantagensFiltradas);
                } catch (error) {
                    console.error("Erro ao buscar vantagens", error);
                }
            }
        };

        fetchVantagens();
    }, [empresa]);

    return (
        <div className="p-6 bg-blue-100 rounded-lg">
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Vantagens da {empresa?.nome}</h1>
            {vantagens.length > 0 ? (
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
                                <p className="text-md font-semibold text-purple-700 mt-4">
                                    Custo: {vantagem.custoMoedas} Moedas
                                </p>
                                <h3 className="text-md text-teal-600 mt-4">
                                    Instituição: {vantagem.instituicao?.nome || "N/A"}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Nenhuma vantagem cadastrada.</p>
            )}
        </div>
    );
};

export default VisualizarVantagens;
