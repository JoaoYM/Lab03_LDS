import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import Endereco from "../components/utils/Endereço.tsx";

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

interface CadastroAlunoProps {

  aluno?: AlunoDTO | null;

}

interface AlunoDTO {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    complemento: string;
  };
  instituicaoId: string;
  cursosIds: string[];
} 

const CadastroAluno: React.FC<CadastroAlunoProps> = ({ aluno }) => {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [formData, setFormData] = useState({
    id: aluno?.id || "",
    nome: aluno?.nome || "",
    email: aluno?.email || "",
    cpf: aluno?.cpf || "",
    rg: aluno?.rg || "",
    endereco: aluno?.endereco || {
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
    },
    instituicaoId: aluno?.instituicaoId || "",
    cursosIds: aluno?.cursosIds || [],
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
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
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

  const handleEnderecoChange = (endereco: any) => {
    setFormData({
      ...formData,
      endereco: endereco,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (formData.id) {
        // PUT para atualizar um aluno existente
        await axios.put(
          `http://localhost:8080/api/aluno/${formData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Aluno atualizado com sucesso!");
      } else {
        // POST para criar um novo aluno
        await axios.post("http://localhost:8080/api/aluno", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        alert("Aluno cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar aluno", error);
      alert("Ocorreu um erro ao salvar o aluno. Tente novamente.");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Cadastro de Aluno</h1>
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
        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={formData.rg}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="instituicaoId"
          value={formData.instituicaoId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            {formData.instituicaoId
              ? instituicoes.find((i) => i.id.toString() === formData.instituicaoId)?.nome
              : "Selecione a instituição"}
          </option>
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
          disabled={!formData.instituicaoId}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {formData.cursosIds.length > 0 ? (
            <option disabled>
              {formData.cursosIds.map((id) =>
                cursos.find((curso) => curso.id.toString() === formData.cursosIds[0].toString())?.nome
              )}
            </option>
          ) : (
            <option value="">Selecione o Curso</option>
          )}
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>

        <div className="col-span-2">
          <Endereco enderecoDto={formData.endereco} onEnderecoChange={handleEnderecoChange} />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            {formData.id ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroAluno;