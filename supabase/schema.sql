-- Fuegos LA Inventory Manager — database schema for Supabase
-- Run this once in your Supabase project's SQL Editor (Database > SQL Editor > New query).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Staff (for login + attributing who did what)
-- ---------------------------------------------------------------------

create table staff (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  pin_hash text not null,
  created_at timestamptz not null default now()
);

-- Locked down on purpose: the app's public key can never read this table
-- directly (so PIN hashes are never exposed). Logins go through the
-- verify_pin() function below instead.
alter table staff enable row level security;

create or replace function list_staff_names()
returns table(name text)
language sql
security definer
set search_path = public, extensions
as $$
  select name from staff order by name;
$$;
grant execute on function list_staff_names() to anon;

create or replace function verify_pin(p_name text, p_pin text)
returns boolean
language sql
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1 from staff
    where name = p_name
    and pin_hash = encode(extensions.digest(p_pin, 'sha256'), 'hex')
  );
$$;
grant execute on function verify_pin(text, text) to anon;

-- To add a staff member who can log in, run (pick any name + 4+ digit PIN):
-- insert into staff (name, pin_hash) values ('Maria', encode(extensions.digest('1234', 'sha256'), 'hex'));

-- ---------------------------------------------------------------------
-- Fridge & freezer stock
-- ---------------------------------------------------------------------

create table ingredients (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_es text not null,
  quantity numeric not null default 0,
  unit text not null default 'units',
  location text not null default 'fridge',
  threshold numeric not null default 5
);
alter table ingredients enable row level security;
create policy "anon select ingredients" on ingredients for select using (true);
create policy "anon insert ingredients" on ingredients for insert with check (true);
create policy "anon update ingredients" on ingredients for update using (true);
create policy "anon delete ingredients" on ingredients for delete using (true);

-- ---------------------------------------------------------------------
-- Made products (finished goods)
-- ---------------------------------------------------------------------

create table products (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_es text not null,
  quantity numeric not null default 0,
  threshold numeric not null default 5
);
alter table products enable row level security;
create policy "anon select products" on products for select using (true);
create policy "anon insert products" on products for insert with check (true);
create policy "anon update products" on products for update using (true);
create policy "anon delete products" on products for delete using (true);

-- ---------------------------------------------------------------------
-- Grocery list
-- ---------------------------------------------------------------------

create table grocery_list (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  note text default '',
  checked boolean not null default false,
  source_id uuid,
  created_at timestamptz not null default now()
);
alter table grocery_list enable row level security;
create policy "anon select grocery_list" on grocery_list for select using (true);
create policy "anon insert grocery_list" on grocery_list for insert with check (true);
create policy "anon update grocery_list" on grocery_list for update using (true);
create policy "anon delete grocery_list" on grocery_list for delete using (true);

-- ---------------------------------------------------------------------
-- Activity log (who added/edited/deleted what, and when)
-- ---------------------------------------------------------------------

create table activity_log (
  id uuid primary key default gen_random_uuid(),
  staff_name text not null,
  action text not null,
  entity_name text default '',
  detail text default '',
  created_at timestamptz not null default now()
);
alter table activity_log enable row level security;
create policy "anon select activity_log" on activity_log for select using (true);
create policy "anon insert activity_log" on activity_log for insert with check (true);
-- No update/delete policy on purpose: history can't be edited or erased from the app.

-- ---------------------------------------------------------------------
-- Starter data matching the app's built-in defaults (safe to edit/skip)
-- ---------------------------------------------------------------------

insert into ingredients (name_en, name_es, quantity, unit, location, threshold) values
  ('Sirloin Beef', 'Carne de Res (Bola de Lomo)', 20, 'lbs', 'freezer', 5),
  ('Shredded Chicken', 'Pollo Desmenuzado', 15, 'lbs', 'freezer', 5),
  ('Spinach', 'Espinaca', 10, 'lbs', 'fridge', 5),
  ('Mushroom', 'Champiñones', 8, 'lbs', 'fridge', 5),
  ('Mozzarella Cheese', 'Queso Mozzarella', 12, 'lbs', 'fridge', 5),
  ('Vegan Cheese', 'Queso Vegano', 6, 'lbs', 'fridge', 5),
  ('Vegan Béchamel', 'Bechamel Vegana', 4, 'qt', 'fridge', 5),
  ('Onion', 'Cebolla', 25, 'lbs', 'pantry', 5),
  ('Red Bell Pepper', 'Pimiento Rojo', 15, 'lbs', 'fridge', 5),
  ('Tomato', 'Tomate', 10, 'lbs', 'fridge', 5),
  ('Basil', 'Albahaca', 3, 'bunches', 'fridge', 5),
  ('Ham', 'Jamón', 8, 'lbs', 'fridge', 5),
  ('Creamed Corn', 'Maíz Cremoso', 6, 'cans', 'pantry', 5),
  ('Vegan Beef', 'Carne Vegana', 5, 'lbs', 'freezer', 5),
  ('Malbec Wine', 'Vino Malbec', 2, 'bottles', 'pantry', 5),
  ('Garlic', 'Ajo', 4, 'lbs', 'pantry', 5),
  ('Parsley', 'Perejil', 5, 'bunches', 'fridge', 5),
  ('Olive Oil', 'Aceite de Oliva', 3, 'gal', 'pantry', 5),
  ('Empanada Dough Discs', 'Discos de Masa para Empanadas', 200, 'units', 'freezer', 5),
  ('Oregano', 'Orégano', 4, 'lbs', 'pantry', 5);

insert into products (name_en, name_es, quantity, threshold) values
  ('Hand Cut Beef Empanadas', 'Empanadas de Carne Cortada a Mano', 24, 5),
  ('Chicken Empanadas', 'Empanadas de Pollo', 18, 5),
  ('Spinach & Mushroom Empanadas', 'Empanadas de Espinaca y Champiñones', 12, 5),
  ('Cheese & Onion Empanadas', 'Empanadas de Queso y Cebolla', 10, 5),
  ('Ham & Cheese Empanadas', 'Empanadas de Jamón y Queso', 8, 5),
  ('Caprese Empanadas', 'Empanadas Caprese', 6, 5),
  ('Vegan Beef Empanadas', 'Empanadas de Carne Vegana', 4, 5),
  ('Humita Corn Empanadas', 'Empanadas de Humita', 3, 5),
  ('Chimichurri (8oz)', 'Chimichurri (8oz)', 15, 5);
