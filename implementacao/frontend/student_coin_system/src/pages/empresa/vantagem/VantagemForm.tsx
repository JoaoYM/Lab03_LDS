import React, { useState, useEffect } from 'react';

const VantagemForm = ({ initialData, empresas, instituicoes, onSubmit, isReadOnly }) => {
    const [vantagem, setVantagem] = useState({
        nome: '',
        descricao: '',
        fotoUrl: '',
        custoMoedas: '',
        empresaId: '',
        instituicaoId: ''
    });

    useEffect(() => {
        if (initialData) {
            setVantagem({
                nome: initialData.nome,
                descricao: initialData.descricao,
                fotoUrl: initialData.fotoUrl,
                custoMoedas: initialData.custoMoedas,
                empresaId: initialData.empresa?.id || '',
                instituicaoId: initialData.instituicao?.id || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVantagem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(vantagem);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
                {isReadOnly ? 'Visualizar Vantagem' : (initialData ? 'Editar Vantagem' : 'Cadastrar Vantagem')}
            </h2>

            <div className="mb-4">
                <label htmlFor="nome" className="block text-gray-700">Nome</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={vantagem.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    readOnly={isReadOnly}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="descricao" className="block text-gray-700">Descrição</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    value={vantagem.descricao}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    readOnly={isReadOnly}
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="fotoUrl" className="block text-gray-700">Foto URL</label>
                <input
                    type="text"
                    id="fotoUrl"
                    name="fotoUrl"
                    value={vantagem.fotoUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    readOnly={isReadOnly}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="custoMoedas" className="block text-gray-700">Custo em Moedas</label>
                <input
                    type="number"
                    id="custoMoedas"
                    name="custoMoedas"
                    value={vantagem.custoMoedas}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    readOnly={isReadOnly}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="empresaId" className="block text-gray-700">Empresa</label>
                <select
                    id="empresaId"
                    name="empresaId"
                    value={vantagem.empresaId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isReadOnly}
                >
                    <option value="">Selecione a Empresa</option>
                    {empresas.map(empresa => (
                        <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="instituicaoId" className="block text-gray-700">Instituição</label>
                <select
                    id="instituicaoId"
                    name="instituicaoId"
                    value={vantagem.instituicaoId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isReadOnly}
                >
                    <option value="">Selecione a Instituição</option>
                    {instituicoes.map(instituicao => (
                        <option key={instituicao.id} value={instituicao.id}>{instituicao.nome}</option>
                    ))}
                </select>
            </div>

            {!isReadOnly && (
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Salvar Vantagem
                </button>
            )}
        </form>
    );
};

export default VantagemForm;