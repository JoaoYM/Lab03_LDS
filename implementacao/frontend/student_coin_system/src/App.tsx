import './App.css';
import React, { useState } from 'react';
import Login from './pages/login/Login.tsx';
import CadastroAluno from './pages/aluno/CadastroAluno.tsx';
import CadastroEmpresa from './pages/empresa/CadastroEmpresa.tsx';
import CadastroProfessor from './pages/professor/CadastroProfessor.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<
    'login' | 'cadastroProfessor' | 'cadastroAluno' |'cadastroEmpresa' >('login');

  return (
    <div className="App">
      {/* Criação de um simples menu de navegação */}
      <nav className="p-4 bg-gray-800">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setCurrentPage('login')} className="text-white">
              Login
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('cadastroAluno')} className="text-white">
              Cadastrar Aluno
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('cadastroEmpresa')} className="text-white">
              Cadastrar Empresa
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('cadastroProfessor')} className="text-white">
              Cadastrar Empresa
            </button>
          </li>
        </ul>
      </nav>

      <div id="body" className="container mx-auto p-4">
        {/* Renderização condicional dos componentes */}
        {currentPage === 'login' && <Login />}
        {currentPage === 'cadastroAluno' && <CadastroAluno />}
        {currentPage === 'cadastroEmpresa' && <CadastroEmpresa />}
        {currentPage === 'cadastroProfessor' && <CadastroProfessor />}
      </div>
    </div>
  );
}

export default App;