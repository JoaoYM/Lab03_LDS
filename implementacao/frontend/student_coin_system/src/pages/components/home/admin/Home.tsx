// src/pages/Home.js
import React from "react";
import Header from "../../header/Header";
import { Link } from "react-router-dom"; // Certifique-se de ter o React Router configurado

const Home = () => {
  const managementOptions = [
    { name: "Gerenciar Aluno", path: "/gerenciar-aluno" },
    { name: "Gerenciar Empresa", path: "/gerenciar-empresa" },
    { name: "Gerenciar Professor", path: "/gerenciar-professor" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="Admin" />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">SISTEMA DE MOEDA ESTUDANTIL</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {managementOptions.map((option, index) => (
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