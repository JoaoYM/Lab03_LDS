import React, { useState } from 'react';
import axios from 'axios';

interface User {
  login: string;
  password: string;
}

const initialState: User = {
  login: '',
  password: ''
};

interface LoginProps {
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setIsAuthenticated }) => {
  const [dados, setDados] = useState<User>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", dados, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setIsAuthenticated(true);
        alert("Login realizado com sucesso!");
      }
    } catch (error) {
      alert("Erro ao fazer login, verifique os dados e tente novamente!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={dados.login}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={dados.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;