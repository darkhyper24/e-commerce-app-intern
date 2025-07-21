-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT
);
CREATE TABLE IF NOT EXISTS orders
(
    id uuid NOT NULL,
    user_id uuid,
    product_id uuid,
    order_date date,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES products (id) MATCH SIMPLE,
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