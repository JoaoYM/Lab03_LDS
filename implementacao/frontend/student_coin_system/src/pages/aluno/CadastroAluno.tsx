import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface Instituicao {
  id: number;
  nome: string;
}

interface Curso {
  id: number;
  nome: string;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  instituicaoId: number;
  cursoId: number;
}

interface CadastroAlunoProps {
  aluno?: Aluno;
  onClose: () => void; // Função para fechar o formulário de edição
}

const CadastroAluno: React.FC<CadastroAlunoProps> = ({ aluno, onClose }) => {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [formData, setFormData] = useState({
    nome: aluno?.nome || "",
    email: aluno?.email || "",
    cpf: aluno?.cpf || "",
    rg: aluno?.rg || "",
    endereco: aluno?.endereco || "",
    instituicaoId: aluno?.instituicaoId || "",
    cursoId: aluno?.cursoId || "",
  });

  useEffect(() => {
    if (aluno) {
      setFormData({
        nome: aluno.nome,
        email: aluno.email,
        cpf: aluno.cpf,
        rg: aluno.rg,
        endereco: aluno.endereco,
        instituicaoId: aluno.instituicaoId,
        cursoId: aluno.cursoId,
      });
    }
  }, [aluno]);

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
        if (aluno) {
            await axios.put(`http://localhost:8080/api/aluno/${aluno.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Aluno atualizado com sucesso!");
        } else {
            await axios.post("http://localhost:8080/api/aluno", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Aluno cadastrado com sucesso!");
        }
        onClose(); // Fecha o formulário de edição ao finalizar
    } catch (error) {
        console.error("Erro ao salvar aluno", error);
        alert("Erro ao salvar aluno.");
    }
};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">{aluno ? "Editar Aluno" : "Cadastrar Aluno"}</h1>
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
          name="cursoId"
          value={formData.cursoId}
          onChange={handleInputChange}
          disabled={!formData.instituicaoId}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
<<<<<<< HEAD
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {aluno ? "Salvar" : "Cadastrar"}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">
          Cancelar
        </button>
=======
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </div>
>>>>>>> 562914334e82d0bd626432fa7056aef7bad50ae5
      </form>
    </div>
  );
};

export default CadastroAluno;