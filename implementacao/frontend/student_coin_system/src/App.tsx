import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import CadastroAluno from './pages/aluno/CadastroAluno';
import ListagemAlunos from './pages/aluno/ListagemAluno';
import EditarAluno from './pages/aluno/EditarAluno';
import CadastroEmpresa from './pages/empresa/CadastroEmpresa';
import ListagemEmpresas from './pages/empresa/ListagemEmpresa';
import EditarEmpresa from './pages/empresa/EditarEmpresa';
import React from 'react';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" Component={Login} />
        <Route path="/alunos" Component={ListagemAlunos} />
        <Route path="/alunos/cadastrar" Component={CadastroAluno} />
        <Route path="/alunos/editar/:id" Component={EditarAluno} />
        <Route path="/empresas" Component={ListagemEmpresas} />
        <Route path="/empresas/cadastrar" Component={CadastroEmpresa} />
        <Route path="/empresas/editar/:id" Component={EditarEmpresa} />
      </Switch>
    </Router>
  );
};

export default App;
