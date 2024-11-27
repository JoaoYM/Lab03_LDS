import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage.tsx";
import HomeAluno from "../pages/components/home/aluno/Home.tsx";
import HomeAdmin from "../pages/components/home/admin/Home.tsx";
import HomeProfessor from "../pages/components/home/professor/Home.tsx";
import HomeEmpresa from "../pages/components/home/empresa/Home.tsx";
import GerenciarAluno from "../pages/aluno/GerenciarAluno.tsx";
import GerenciarEmpresa from "../pages/empresa/GerenciarEmpresa.tsx";
import GerenciarProfessor from "../pages/professor/GerenciarProfessor.tsx";
import HistoricoConta from "../pages/components/financeiro/HistoricoConta.tsx";
import Login from "../pages/login/Login.tsx";
import VantagensAluno from "../pages/aluno/vantagem/VantagensAluno.tsx";
import GerenciarVantagem from "../pages/empresa/vantagem/GerenciarVantagem.tsx";

interface AppRouterProps {
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserType: React.Dispatch<React.SetStateAction<"admin" | "aluno" | "professor" | "empresa" | null>>;
  userType: "admin" | "aluno" | "professor" | "empresa" | null;
}

const AppRouter: React.FC<AppRouterProps> = ({ isAuthenticated, setToken, setIsAuthenticated, setUserType, userType }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} userType={userType} />} />
      <Route path="/login" element={<Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} setUserType={setUserType}/>} />
      <Route path="/admin" element={<HomeAdmin />} />
      <Route path="/aluno" element={<HomeAluno />} />
      <Route path="/professor" element={<HomeProfessor />} />
      <Route path="/empresa" element={<HomeEmpresa />} />
      <Route path="/gerenciar-aluno" element={<GerenciarAluno />} />
      <Route path="/gerenciar-empresa" element={<GerenciarEmpresa />} />
      <Route path="/gerenciar-professor" element={<GerenciarProfessor />} />
      <Route path="/historico-conta" element={<HistoricoConta id={0} role={""}/>} />
      <Route path="/gerenciar-empresa-vantagem" element={<GerenciarVantagem />} />
      <Route path="/gerenciar-aluno-vantagem" element={<VantagensAluno />} />
    </Routes>
  );
};

export default AppRouter;