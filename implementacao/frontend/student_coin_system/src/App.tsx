// src/App.tsx
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/Router.tsx';
import { decodeToken } from './utils/token.tsx';

interface JwtPayload {
  exp: number;
  role: "admin" | "aluno" | "professor" | "empresa";
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<"admin" | "aluno" | "professor" | "empresa" | null>(null);

  useEffect(() => {
    // Verifica se o token está armazenado e ainda válido
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      const decodedToken = decodeToken(token);
      const isExpired = decodedToken ? Date.now() >= decodedToken.exp * 1000 : true;

      if (!isExpired) {
        setIsAuthenticated(true);
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          setUserType(decodedToken.role as "admin" | "aluno" | "professor" | "empresa"); // Assume que o token contém o campo "role" para identificar o tipo de usuário
        }
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <AppRouter
          isAuthenticated={isAuthenticated}
          setToken={setToken}
          setIsAuthenticated={setIsAuthenticated}
          setUserType={setUserType}
          userType={userType}
        />
      </Router>
    </div>
  );
}

export default App;