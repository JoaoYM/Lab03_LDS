// src/pages/Home.js
import React from "react";
import Header from "../../header/Header";
import BoxItem from "../../box/BoxItem";

const Home = () => {
  const vantagens = [
    { nome: "Desconto em Eletrônicos", descricao: "15% de desconto em toda a loja." },
    // Adicionar outras vantagens...
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
        </div>
      </main>
    </div>
  );
};

export default Home;