CREATE TABLE IF NOT EXISTS instituicao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    instituicao_id BIGINT,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);

CREATE TABLE IF NOT EXISTS departamento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    instituicao_id BIGINT,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);

CREATE TABLE IF NOT EXISTS conta_corrente (
    id SERIAL PRIMARY KEY,
    saldo DECIMAL(10, 2) NOT NULL,
    limite DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    complemento VARCHAR(255),
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    cep VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL,
    endereco_id BIGINT,
    instituicao_id BIGINT,
    curso_id BIGINT,
    conta_corrente_id BIGINT,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id),
    FOREIGN KEY (curso_id) REFERENCES curso(id),
    FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE IF NOT EXISTS empresa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    razao_social VARCHAR(255) NOT NULL,
    conta_corrente_id BIGINT,
    FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id)
);

CREATE TABLE IF NOT EXISTS professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    departamento_id BIGINT,
    conta_corrente_id BIGINT,
    FOREIGN KEY (departamento_id) REFERENCES departamento(id),
    FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id)
);

CREATE TABLE IF NOT EXISTS vantagem (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    foto_url VARCHAR(255),
    custo_moedas DECIMAL(10, 2) NOT NULL,
    empresa_id BIGINT,
    instituicao_id BIGINT,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id),
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);


-- Desabilitar checagem de chave estrangeira (se necessário)

-- -- Deletar tabelas se existirem
-- DROP TABLE IF EXISTS vantagem CASCADE;
-- DROP TABLE IF EXISTS professor CASCADE;
-- DROP TABLE IF EXISTS empresa CASCADE;
-- DROP TABLE IF EXISTS aluno CASCADE;
-- DROP TABLE IF EXISTS conta_corrente CASCADE;
-- DROP TABLE IF EXISTS departamento CASCADE;
-- DROP TABLE IF EXISTS curso CASCADE;
-- DROP TABLE IF EXISTS instituicao CASCADE;

-- -- Criar tabelas
-- CREATE TABLE IF NOT EXISTS instituicao (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     cnpj VARCHAR(20) NOT NULL UNIQUE
-- );

-- CREATE TABLE IF NOT EXISTS curso (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     instituicao_id BIGINT,
--     FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
-- );

-- CREATE TABLE IF NOT EXISTS departamento (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     instituicao_id BIGINT,
--     FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
-- );

-- CREATE TABLE IF NOT EXISTS conta_corrente (
--     id SERIAL PRIMARY KEY,
--     saldo DECIMAL(10, 2) NOT NULL,
--     limite DECIMAL(10, 2)
-- );

-- CREATE TABLE IF NOT EXISTS aluno (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     cpf VARCHAR(14) NOT NULL UNIQUE,
--     rg VARCHAR(20) NOT NULL,
--     endereco VARCHAR(255) NOT NULL,
--     instituicao_id BIGINT,
--     curso_id BIGINT,
--     conta_corrente_id BIGINT,
--     FOREIGN KEY (instituicao_id) REFERENCES instituicao(id),
--     FOREIGN KEY (curso_id) REFERENCES curso(id),
--     FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id)
-- );

-- CREATE TABLE IF NOT EXISTS empresa (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     cnpj VARCHAR(20) NOT NULL UNIQUE,
--     razao_social VARCHAR(255) NOT NULL,
--     conta_corrente_id BIGINT,
--     FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id)
-- );

-- CREATE TABLE IF NOT EXISTS professor (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     cpf VARCHAR(14) NOT NULL UNIQUE,
--     departamento_id BIGINT,
--     conta_corrente_id BIGINT,
--     FOREIGN KEY (departamento_id) REFERENCES departamento(id),
--     FOREIGN KEY (conta_corrente_id) REFERENCES conta_corrente(id)
-- );

-- CREATE TABLE IF NOT EXISTS vantagem (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     descricao TEXT,
--     foto_url VARCHAR(255),
--     custo_moedas DECIMAL(10, 2) NOT NULL,
--     empresa_id BIGINT,
--     instituicao_id BIGINT,
--     FOREIGN KEY (empresa_id) REFERENCES empresa(id),
--     FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
-- );


