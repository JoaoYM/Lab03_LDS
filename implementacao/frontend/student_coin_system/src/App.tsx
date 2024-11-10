import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login.tsx';
import GerenciarAluno from './pages/aluno/GerenciarAluno.tsx';
import GerenciarEmpresa from './pages/empresa/GerenciarEmpresa.tsx';
import GerenciarProfessor from './pages/professor/GerenciarProfessor.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'gerenciamentoProfessor' | 'gerenciamentoAluno' | 'gerenciamentoEmpresa'>('login');
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
      
    </div>
  );
}

export default App;