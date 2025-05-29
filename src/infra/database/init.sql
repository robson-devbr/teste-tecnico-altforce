-- Criar a tabela users se não existir
CREATE TABLE IF NOT EXISTS users (
   id UUID PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role VARCHAR(50) NOT NULL
);

-- Criar a tabela products se não existir
CREATE TABLE IF NOT EXISTS products (
   id UUID PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   price NUMERIC(10, 2) NOT NULL,
   category VARCHAR(100) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar a tabela orders se não existir
CREATE TABLE IF NOT EXISTS orders (
   id UUID PRIMARY KEY,
   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   status VARCHAR(50) NOT NULL,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL
);

-- Criar a tabela order_items se não existir
CREATE TABLE IF NOT EXISTS order_items (
   id UUID PRIMARY KEY,
   order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
   product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
   quantity INTEGER NOT NULL
);
