// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  isAuthenticated: boolean;
  userType: "admin" | "aluno" | "professor" | "empresa" | null;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, userType }) => {
  const navigate = useNavigate();

  useEffect(() => {

    if (isAuthenticated) {
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "aluno":
          navigate("/aluno");
          break;
        case "professor":
          navigate("/professor");
          break;
        case "empresa":
          navigate("/empresa");
          break;
        default:
          navigate("/login"); 
      }
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <img
          src="./MoedaEstudantil.png"
          alt="Bem-vindo ao Sistema"
          className="mx-auto mb-6 w-auto h-auto"
        />
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Ir para Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;