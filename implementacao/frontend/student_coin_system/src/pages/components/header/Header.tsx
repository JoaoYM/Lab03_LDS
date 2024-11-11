// src/components/Header.js
import React, { useState } from "react";

const Header = ({ userType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <nav className="space-x-4">
        {userType !== "Admin" && (
          <>
            <a href="/" className="hover:underline">Home</a>
            {userType !== "professor" && (
              <a href="/vantagens" className="hover:underline">Minhas Vantagens</a>
            )}
            <a href="/transacoes" className="hover:underline">Minhas Transações</a>
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
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
              <a href="/perfil" className="block px-4 py-2 hover:bg-gray-200">Meu Perfil</a>
              <a href="/login" className="block px-4 py-2 hover:bg-gray-200">Sair</a>
            </div>
          )}
        </div>
    </header>
  );
};

export default Header;