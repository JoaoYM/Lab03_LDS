import React, { useState } from "react";
import { Link } from "react-router-dom";
import { decodeToken } from "../../../utils/token.tsx";

const Header = ({ role, id }) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const HomePages                       = { admin: "/admin", aluno: "/aluno", empresa: "/empresa", professor: "/professor" };
  const userPage                        = HomePages[decodeToken(localStorage.getItem("token")).role];

  return (
    <nav className="flex items-center h-auto w-full">
      {role !== "admin" && (
        <div className="flex space-x-4">
          <Link to={{pathname: userPage}} className="hover:underline">
            Home
          </Link>
          {role === "aluno" && (
            <a href="/gerenciar-aluno-vantagem" className="hover:underline">
              Minhas Vantagens
            </a>
          )}
          {role === "empresa" && (
            <a href="/gerenciar-empresa-vantagem" className="hover:underline">
              Gerenciar Vantagens
            </a>
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
        </div>
      )}
      {/* Added ml-auto to push user icon to the right */}
      <div className="ml-auto relative">
        <button
          className="bg-blue-800 px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          User Icon ▼
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
            <a
              href="/perfil"
              className="block px-4 py-2 hover:bg-gray-200 text-black transition-colors"
            >
              Meu Perfil
            </a>
            <a
              href="/login"
              className="block px-4 py-2 hover:bg-gray-200 text-black transition-colors"
            >
              Sair
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;