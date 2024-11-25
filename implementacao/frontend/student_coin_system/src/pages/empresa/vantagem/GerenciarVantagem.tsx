import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Supondo que você está usando React Router para navegação

const GerenciarVantagem = ({ vantagens, onDelete, onView, onEdit }) => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Gerenciar Vantagens</h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nome</th>
                        <th className="py-2 px-4 border-b">Descrição</th>
                        <th className="py-2 px-4 border-b">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vantagens.map(vantagem => (
                        <tr key={vantagem.id}>
                            <td className="py-2 px-4 border-b">{vantagem.nome}</td>
                            <td className="py-2 px-4 border-b">{vantagem.descricao}</td>
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button
                                    onClick={() => onView(vantagem)}
                                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                                >
                                    Visualizar
                                </button>
                                <button
                                    onClick={() => onEdit(vantagem)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(vantagem.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GerenciarVantagem;