import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login.tsx';
import CadastroAluno from './pages/aluno/CadastroAluno.tsx';
import CadastroEmpresa from './pages/empresa/CadastroEmpresa.tsx';
import CadastroProfessor from './pages/professor/CadastroProfessor.tsx';
import VisualizacaoAluno from './pages/aluno/VisualizacaoAluno.tsx';
import VisualizacaoEmpresa from './pages/empresa/VisualizacaoEmpresa.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'cadastroProfessor' | 'cadastroAluno' | 'cadastroEmpresa' | 'visualizacaoAluno' | 'visualizacaoEmpresa'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o token está armazenado e se ainda é válido
    const storedToken = localStorage.getItem('token'); // ou onde você armazena o token
    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split('.')[1])); // decodifica o token para verificar a expiração
      const isExpired = Date.now() >= payload.exp * 1000;
      if (!isExpired) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <div className="App">
      {/* Criação de um simples menu de navegação */}
      {isAuthenticated && (
        <nav className="p-4 bg-gray-800">
          <ul className="flex space-x-4">
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
                Cadastrar Professor
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('visualizacaoAluno')} className="text-white">
                Visualizar Alunos
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('visualizacaoEmpresa')} className="text-white">
                Visualizar Empresas
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div id="body" className="container mx-auto p-4">
        {/* Renderização condicional dos componentes */}
        {currentPage === 'login' && ( <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />)}
        {currentPage === 'cadastroAluno' && <CadastroAluno onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />}
        {currentPage === 'cadastroEmpresa' && <CadastroEmpresa onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />}
        {currentPage === 'cadastroProfessor' && <CadastroProfessor />}
        {currentPage === 'visualizacaoAluno' && <VisualizacaoAluno />}
        {currentPage === 'visualizacaoEmpresa' && <VisualizacaoEmpresa />}
      </div>
    </div>
  );
}

export default App;