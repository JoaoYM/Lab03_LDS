import React, { useState } from "react";

interface EnderecoProps {
  enderecoDto: Endereco;
  onEnderecoChange: (endereco: Endereco) => void;
}

interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

const Endereco: React.FC<EnderecoProps> = ({ enderecoDto, onEnderecoChange }) => {
  const [endereco, setEndereco] = useState<Endereco>({
    cep: enderecoDto.cep,
    logradouro: enderecoDto.logradouro,
    bairro: enderecoDto.bairro,
    cidade: enderecoDto.cidade,
    estado: enderecoDto.estado,
    numero: enderecoDto.numero,
    complemento: enderecoDto.complemento,
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setEndereco({ ...endereco, cep });

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          const novoEndereco = {
            ...endereco,
            cep: cep || "",
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          };
          setEndereco(novoEndereco);
          onEnderecoChange(novoEndereco);
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const novoEndereco = { ...endereco, [name]: value };
    setEndereco(novoEndereco);
    onEnderecoChange(novoEndereco);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          name="cep"
          value={endereco.cep}
          onChange={handleCepChange}
          placeholder="Digite o CEP"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          name="logradouro"
          value={endereco.logradouro}
          onChange={handleChange}
          placeholder="Rua, Avenida, etc."
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          name="bairro"
          value={endereco.bairro}
          onChange={handleChange}
          placeholder="Exemplo: Centro"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          name="cidade"
          value={endereco.cidade}
          onChange={handleChange}
          placeholder="Nome da cidade"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          name="estado"
          value={endereco.estado}
          onChange={handleChange}
          placeholder="Estado (ex: SP)"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          name="numero"
          value={endereco.numero}
          onChange={handleChange}
          placeholder="Número da residência"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          name="complemento"
          value={endereco.complemento}
          onChange={handleChange}
          placeholder="Complemento (ex: Apto 101)"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
};

export default Endereco;