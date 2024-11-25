// src/pages/Home.js
import React from "react";
import Header from "../../header/Header.tsx";
import BoxItem from "../../box/BoxItem.tsx";
import { Link } from "react-router-dom";

const Home = () => {
  const vantagens = [
    { nome: "Desconto em Eletrônicos", descricao: "15% de desconto em toda a loja." },
    // Adicionar outras vantagens...
  ];

  const gerenciarVantagens = [
    { name: "Gerenciar Vantagens", path: "/gerenciar-empresa-vantagem" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="Empresa" />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">SISTEMA DE MOEDA ESTUDANTIL</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vantagens.map((vantagem, index) => (
            <BoxItem
              key={index}
              title={vantagem.nome}
              description={vantagem.descricao}
              actionText="Ver Detalhes"
              onAction={() => alert(`Detalhes de: ${vantagem.nome}`)}
            />
          ))}

          {gerenciarVantagens.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="p-4 border rounded shadow-sm bg-white hover:bg-gray-200"
            >
              <h2 className="text-lg font-semibold">{option.name}</h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;