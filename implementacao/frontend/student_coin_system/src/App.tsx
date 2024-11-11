import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login.tsx';
import GerenciarAluno from './pages/aluno/GerenciarAluno.tsx';
import GerenciarEmpresa from './pages/empresa/GerenciarEmpresa.tsx';
import GerenciarProfessor from './pages/professor/GerenciarProfessor.tsx';
import GerenciarVantagem from './pages/empresa/vantagem/GerenciarVantagem.tsx';
import VantagensAluno from './pages/aluno/vantagem/VantagensAluno.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'gerenciamentoProfessor' | 'gerenciamentoAluno' | 'gerenciamentoEmpresa' | 'gerenciamentoVantagem' | 'vantagensAluno'>('login');
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
              <button onClick={() => setCurrentPage('gerenciamentoAluno')} className="text-white">
                Gerenciar Aluno
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('vantagensAluno')} className="text-white">
                Vantagens Aluno
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('gerenciamentoEmpresa')} className="text-white">
                Gerenciar Empresa
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('gerenciamentoProfessor')} className="text-white">
                Gerenciar Professor
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('gerenciamentoVantagem')} className="text-white">
                Gerenciar Vantagem
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div id="body" className="container mx-auto p-4">
        {/* Renderização condicional dos componentes */}
        {currentPage === 'login' && ( <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />)}
        {currentPage === 'gerenciamentoAluno' && <GerenciarAluno />}
        {currentPage === 'vantagensAluno' && <VantagensAluno />}
        {currentPage === 'gerenciamentoEmpresa' && <GerenciarEmpresa />}
        {currentPage === 'gerenciamentoProfessor' && <GerenciarProfessor />}
        {currentPage === 'gerenciamentoVantagem' && <GerenciarVantagem />}
      </div>
    </div>
  );
}

export default App;