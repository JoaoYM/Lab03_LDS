// src/pages/Home.js
import React from "react";
import Header from "../../header/Header.tsx";
import BoxItem from "../../box/BoxItem.tsx";
import { Link } from "react-router-dom";
import VantagensAluno from "../../../aluno/vantagem/VantagensAluno.tsx";

const Home = () => {
  /*
  const vantagens = [
    {
      nome: "Desconto em Livraria",
      descricao: "10% de desconto em compras acima de R$50.",
      empresa: "Livraria Central",
      instituicao: "Instituição ABC",
      custoMoedas: 20,
    },
    // Adicionar outras vantagens...
  ];
  */

  return (
    <div className="min-h-screen bg-gray-100">
      <Header role="aluno" id=""/>
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">SISTEMA DE MOEDA ESTUDANTIL</h1>
        

          <VantagensAluno />
        
      </main>
    </div>
  );
};
/*
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vantagens.map((vantagem, index) => (
            <BoxItem
              key={index}
              title={vantagem.nome}
              description={vantagem.descricao}
              actionText="Resgatar"
              onAction={() => alert(`Resgatado: ${vantagem.nome}`)}
            />
          ))}
</div>
*/

export default Home;