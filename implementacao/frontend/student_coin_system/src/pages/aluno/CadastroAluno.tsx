import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Instituicao {
  id: number;
  nome: string;
}

const CadastroAluno = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [endereco, setEndereco] = useState('');
  const [instituicaoId, setInstituicaoId] = useState('');
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [curso, setCurso] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/instituicao')
      .then(response => {
        console.log('Resposta da API:', response.data); // Verifique se está retornando uma lista
        setInstituicoes(response.data);
        console.log('Instituições carregadas:', instituicoes); // Verificar o estado após setInstituicoes
      })
      .catch(error => console.error('Erro ao buscar instituições:', error));
  }, [instituicoes]);
  
  

  const cadastrarAluno = () => {
    axios.post('/api/alunos', {
      nome,
      email,
      cpf,
      rg,
      endereco,
      instituicao: { id: instituicaoId }, // Aqui você envia o objeto com o ID da Instituição
      curso
    })
      .then(() => alert('Aluno cadastrado com sucesso!'))
      .catch(error => console.error(error));
    
  };

  return (
    <div>
      <h2>Cadastrar Aluno</h2>
      <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)} />
      <input type="text" placeholder="RG" onChange={e => setRg(e.target.value)} />
      <input type="text" placeholder="Endereço" onChange={e => setEndereco(e.target.value)} />
      <select className="inputField" onChange={e => setInstituicaoId(e.target.value)}>
        <option value="">Selecione a Instituição</option>
        {instituicoes.length > 0 ? (
          instituicoes.map(instituicao => (
            <option key={instituicao.id} value={instituicao.id}>
              {instituicao.nome}
            </option>
          ))
        ) : (
          <option value="">Nenhuma instituição disponível</option>
        )}
      </select>
      <input type="text" placeholder="Curso" onChange={e => setCurso(e.target.value)} />
      <button onClick={cadastrarAluno}>Cadastrar</button>
    </div>
  );
};

export default CadastroAluno;