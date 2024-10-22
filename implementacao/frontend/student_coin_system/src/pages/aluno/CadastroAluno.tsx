import React, { useState, useEffect } from "react";
import axios from "axios";

interface Instituicao {
  id: number;
  nome: string;
}

interface Curso {
  id: number;
  nome: string;
}

const CadastroAluno: React.FC = () => {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicaoId: "",
    cursoId: "",
  });

  useEffect(() => {
    // Requisição para buscar as Instituições
    const fetchInstituicoes = async () => {

      try {
        const response = await axios.get("http://localhost:8080/api/instituicao", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setInstituicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar instituições", error);
      }
    };

    fetchInstituicoes();
  }, []);

  useEffect(() => {
    // Requisição para buscar os Cursos após seleção da Instituição

    const fetchCursos = async () => {
      if (formData.instituicaoId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/curso/${formData.instituicaoId}/instituicao`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          setCursos(response.data);
        } catch (error) {
          console.error("Erro ao buscar cursos", error);
        }
      }
    };
    fetchCursos();

    console.log(cursos);
  }, [formData.instituicaoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/aluno", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Aluno cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar aluno", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Aluno</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={formData.rg}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="instituicaoId"
          value={formData.instituicaoId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione a Instituição</option>
          {instituicoes.map((instituicao) => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))}
        </select>
        <select
          name="cursoId"
          value={formData.cursoId}
          onChange={handleInputChange}
          disabled={!formData.instituicaoId}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione o Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroAluno;