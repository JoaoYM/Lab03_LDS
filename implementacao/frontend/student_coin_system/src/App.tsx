import './App.css';
import React, { useState } from 'react';
import Login from './pages/login/Login.tsx';
import CadastroAluno from './pages/aluno/CadastroAluno.tsx';
import ListagemAlunos from './pages/aluno/ListagemAluno.tsx';
import EditarAluno from './pages/aluno/EditarAluno.tsx';
import CadastroEmpresa from './pages/empresa/CadastroEmpresa.tsx';
import ListagemEmpresas from './pages/empresa/ListagemEmpresa.tsx';
import EditarEmpresa from './pages/empresa/EditarEmpresa.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<
    'login' | 'listagemAlunos' | 'cadastroAluno' | 'editarAluno' | 'listagemEmpresas' | 'cadastroEmpresa' | 'editarEmpresa'
  >('login');

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
            <button onClick={() => setCurrentPage('listagemAlunos')} className="text-white">
              Listagem Alunos
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('cadastroAluno')} className="text-white">
              Cadastrar Aluno
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('listagemEmpresas')} className="text-white">
              Listagem Empresas
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('cadastroEmpresa')} className="text-white">
              Cadastrar Empresa
            </button>
          </li>
        </ul>
      </nav>

      <div id="body" className="container mx-auto p-4">
        {/* Renderização condicional dos componentes */}
        {currentPage === 'login' && <Login />}
        {currentPage === 'listagemAlunos' && <ListagemAlunos />}
        {currentPage === 'cadastroAluno' && <CadastroAluno />}
        {currentPage === 'editarAluno' && <EditarAluno />}
        {currentPage === 'listagemEmpresas' && <ListagemEmpresas />}
        {currentPage === 'cadastroEmpresa' && <CadastroEmpresa />}
        {currentPage === 'editarEmpresa' && <EditarEmpresa />}
      </div>
    </div>
  );
}

export default App;
