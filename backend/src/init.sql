-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT
);
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,         
    product_id UUID NOT NULL,      
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),

    CONSTRAINT unique_user_product UNIQUE (user_id, product_id) 
);

CREATE TABLE IF NOT EXISTS order_items
(
    id uuid NOT NULL,
    product_id uuid,
    order_id uuid,
    quantity integer NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT order_id FOREIGN KEY (order_id)REFERENCES orders (id) MATCH SIMPLE,
    CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES products (id) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS orders
(
    id uuid NOT NULL,
    order_date timestamp with time zone,
    user_id uuid,
    status text COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey1 PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) MATCH SIMPLE

);
CREATE TABLE IF NOT EXISTS products
(
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    photo bytea,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);