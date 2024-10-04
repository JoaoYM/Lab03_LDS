import React, { useState } from 'react';
import axios from 'axios';

const TransferenciaForm = () => {
  const [alunoId, setAlunoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [motivo, setMotivo] = useState('');

  const enviarMoedas = () => {
    axios.post('/api/professores/transferir', {
      professorId: 1, // ID do professor logado
      alunoId: alunoId,
      quantidade: quantidade,
      motivo: motivo
    }).then(() => alert('Moedas enviadas!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Enviar Moedas</h2>
      <input type="text" placeholder="ID do Aluno" onChange={e => setAlunoId(e.target.value)} />
      <input type="text" placeholder="Quantidade" onChange={e => setQuantidade(e.target.value)} />
      <input type="text" placeholder="Motivo" onChange={e => setMotivo(e.target.value)} />
      <button onClick={enviarMoedas}>Enviar</button>
    </div>
  );
};

export default TransferenciaForm;