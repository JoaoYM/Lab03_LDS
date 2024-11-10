// src/Router.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeAluno from "../pages/components/home/aluno/Home";
import HomeAdmin from "../pages/components/home/admin/Home";
import HomeProfessor from "../pages/components/home/professor/Home";
import HomeEmpresa from "../pages/components/home/empresa/Home";

import GerenciarAluno from "../pages/aluno/GerenciarAluno";
import GerenciarEmpresa from "../pages/empresa/GerenciarEmpresa";
import GerenciarProfessor from "../pages/professor/GerenciarProfessor";

function Router() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/aluno" element={<HomeAluno />} />
        <Route path="/professor" element={<HomeProfessor />} />
        <Route path="/empresa" element={<HomeEmpresa />} />
        <Route path="/gerenciar-aluno" element={<GerenciarAluno />} />
        <Route path="/gerenciar-empresa" element={<GerenciarEmpresa />} />
        <Route path="/gerenciar-professor" element={<GerenciarProfessor />} />
      </Routes>
    </Router>
  );
}

export default Router;