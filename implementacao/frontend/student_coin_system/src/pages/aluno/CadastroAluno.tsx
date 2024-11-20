import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface Instituicao {
  id: number;
  nome: string;
  departamentos: Departamento[];
}

interface Curso {
  id: number;
  nome: string;
}

interface Departamento {
  id: number;
  nome: string;
  cursos: Curso[];
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
    cursosIds: [] as string[],  // Define cursosIds como array de strings
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
        setInstituicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar instituições", error);
      }
    };

    fetchInstituicoes();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      if (formData.instituicaoId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/instituicao/${formData.instituicaoId}/cursos`,
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
  }, [formData.instituicaoId]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, options } = e.target as HTMLSelectElement;

      if (name === "cursosIds") {
        // Obtém as opções selecionadas para permitir múltiplos cursos
        const selectedValues = Array.from(options)
          .filter(option => option.selected)
          .map(option => option.value);
        
        setFormData({
          ...formData,
          cursosIds: selectedValues,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Cadastro de Aluno</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputMask
          mask="999.999.999-99"
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={formData.rg}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="instituicaoId"
          value={formData.instituicaoId}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione a Instituição</option>
          {instituicoes.map((instituicao) => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))}
        </select>
        <select
          name="cursosIds"
          value={formData.cursosIds}
          onChange={handleInputChange}
          multiple
          disabled={!formData.instituicaoId}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroAluno;