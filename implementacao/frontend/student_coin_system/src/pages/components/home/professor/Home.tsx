// src/pages/Home.js
import React from "react";
import Header from "../../header/Header.tsx";
import BoxItem from "../../box/BoxItem.tsx";
import axios from "axios";
import { decodeToken} from "../../../../utils/token.tsx"
import Transferencia from "../../financeiro/Transferencia.tsx";

interface Aluno {
  id: number;
  nome: string;
  email: string;
}

interface Professor {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  departamentoId: number;
  contaCorrenteId: number;
}

const Home = () => {
  
  const [alunos, setAlunos] = React.useState<Aluno[]>([]);
  const [professor, setProfessor] = React.useState<Professor>();
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [selectedAluno, setSelectedAluno] = React.useState<Aluno | null>(null);

  const token = localStorage.getItem("token");

  if(token){
    const user = decodeToken(token);
  }

  React.useEffect(() => {

    const token = localStorage.getItem("token");


    const fetchAlunos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/aluno", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos", error);
      }
    };

    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/professor/login/${token ? decodeToken(token).sub : ""}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setProfessor(response.data);
      } catch (error) {
        console.error("Erro ao buscar professor: ", error);
      }
    }

    fetchProfessor();
    fetchAlunos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {professor && professor.id && (
          <Header role="professor" id={professor.id} />
      )}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">SISTEMA DE MOEDA ESTUDANTIL</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alunos.map((aluno, index) => (
            <BoxItem
              key={index}
              title={aluno.nome}
              description="Curso: Engenharia de Software"
              actionText="Transferir Moedas"
              onAction={() => {
                setSelectedAluno(aluno);
                setShowTransfer(true);
              }}
            />
          ))}
        </div>
        {showTransfer && selectedAluno && professor && (
          <Transferencia
            professorId={professor.id}
            alunoId={selectedAluno.id}
            onClose={() => setShowTransfer(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Home;