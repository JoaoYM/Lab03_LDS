import axios from 'axios';
import { Aluno } from '../types/types';

const API_URL = 'http://localhost:8080/api/alunos';

export const getAlunos = async (): Promise<Aluno[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInstituicoes = async (): Promise<any[]> => {
  const response = await axios.get('http://localhost:8080/api/instituicao');
  return response.data;
};

export const createAluno = async (aluno: Aluno): Promise<void> => {
  await axios.post(API_URL, aluno);
};

export const updateAluno = async (aluno: Aluno): Promise<void> => {
  await axios.put(`${API_URL}/${aluno.id}`, aluno);
};

export const deleteAluno = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
