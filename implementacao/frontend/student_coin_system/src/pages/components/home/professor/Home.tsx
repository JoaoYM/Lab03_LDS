// src/pages/Home.js
import React from "react";
import Header from "../../header/Header";
import BoxItem from "../../box/BoxItem";

const Home = () => {
  const alunos = [
    { nome: "João Silva", curso: "Engenharia", email: "joao.silva@email.com" },
    // Adicionar outros alunos...
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="Professor" />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">SISTEMA DE MOEDA ESTUDANTIL</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alunos.map((aluno, index) => (
            <BoxItem
              key={index}
              title={aluno.nome}
              description={`Curso: ${aluno.curso}`}
              actionText="Transferir Moedas"
              onAction={() => alert(`Transferência para: ${aluno.nome}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;