// src/components/Header.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Header = ({ role, id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center shadow-lg">
      <nav className="space-x-4">
        {role !== "admin" && (
          <>
            <a href="/" className="hover:underline">Home</a>
            {role === "aluno" && (
              <a href="/gerenciar-aluno-vantagem" className="hover:underline">Minhas Vantagens</a>
            )}
            {role === "empresa" && (
              <a href="/gerenciar-empresa-vantagem" className="hover:underline">Gerenciar Vantagens</a>
            )}
            <Link
              to={{
                pathname: "/historico-conta",
                search: `id=${id}&role=${role}`,
              }}
              className="hover:underline"
            >
              Minhas Transações
            </Link>  
          </>
        )}
      </nav>
      <div className="relative">
        <button
          className="bg-blue-800 px-4 py-2 rounded-full"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          User Icon ▼
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
            <a href="/perfil" className="block px-4 py-2 hover:bg-gray-200">Meu Perfil</a>
            <a href="/login" className="block px-4 py-2 hover:bg-gray-200">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;