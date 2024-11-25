import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface Instituicao {
  id: number;
  nome: string;
}

interface Departamento {
  id: number;
  nome: string;
  cursos: Curso[];
}

interface Curso {
  id: number;
  nome: string;
}

const CadastroProfessor: React.FC = () => {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    instituicaoId: "",
    departamentoId: "",
    cursoId: [], 
  });

  useEffect(() => {
    const fetchInstituicoes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/instituicao", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        console.log(JSON.stringify(response.data));
        setInstituicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar instituições", error);
      }
    };

    fetchInstituicoes();
  }, []);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      if (formData.instituicaoId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/instituicao/${formData.instituicaoId}/departamentos`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          setDepartamentos(response.data);
        } catch (error) {
          console.error("Erro ao buscar departamentos", error);
        }
      }
    };

    fetchDepartamentos();
  }, [formData.instituicaoId]);

  useEffect(() => {
    if (formData.departamentoId) {
      setCursos(departamentos.find((d) => d.id === Number(formData.departamentoId))?.cursos || []);
    }
  }, [formData.departamentoId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/professor", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Professor cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar professor", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Professor</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputMask
          mask="999.999.999-99"
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="instituicaoId"
          value={formData.instituicaoId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a Instituição</option>
          {Array.isArray(instituicoes) && instituicoes.map((instituicao) => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))}
        </select>
        <select
          name="departamentoId"
          value={formData.departamentoId}
          onChange={handleInputChange}
          disabled={!formData.instituicaoId}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Departamento</option>
          {(departamentos || []).map((departamento) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nome}
            </option>
          ))}
        </select>

        <select
          name="cursoId"
          value={formData.cursoId}
          onChange={handleInputChange}
          disabled={!formData.departamentoId}
          multiple
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Selecione o Curso</option>
          {(cursos || []).map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroProfessor;