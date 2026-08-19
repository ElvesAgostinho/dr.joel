-- Schema for Dr. Joel / M&J - Sociedade de Advogados
-- Run this in your Supabase SQL Editor.
-- Safe to run multiple times (uses IF NOT EXISTS and ADD COLUMN IF NOT EXISTS)

-- ============================================================
-- TABLE: public.posts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    category TEXT DEFAULT 'ARTIGO',  -- FIX: coluna em falta
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar coluna category e pdf_url se a tabela já existia sem elas
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'ARTIGO';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- ============================================================
-- TABLE: public.team
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    area TEXT,
    img TEXT,
    email TEXT,
    phone TEXT,
    bio TEXT,
    habilitacoes TEXT,
    experiencia TEXT,
    associacoes TEXT,
    linguas TEXT,
    cv TEXT,  -- FIX: coluna em falta
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar colunas se a tabela já existia sem elas
ALTER TABLE public.team ADD COLUMN IF NOT EXISTS cv TEXT;
ALTER TABLE public.team ALTER COLUMN area DROP NOT NULL;

-- ============================================================
-- TABLE: public.artes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.artes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLE: public.expertise
-- ============================================================
CREATE TABLE IF NOT EXISTS public.expertise (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- TABLE: public.sobrenos_pages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.sobrenos_pages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- SEED DATA (apenas inserir se as tabelas estiverem vazias)
-- ============================================================

-- Inserir dados da equipa apenas se ainda não existirem
INSERT INTO public.team (name, role, area, img, email, phone, bio, habilitacoes, experiencia, associacoes, linguas)
SELECT 'António Caxito Marques', 'Sócio Internacional*', 'Direito Público', 'assets/images/bg-1.jpg',
       'amarques@marioejoeladv.com', '(+244) 928 186 060',
       'António Caxito Marques tem uma vasta experiência...', 'Licenciatura em Direito',
       'Mais de 20 anos de experiência', 'Ordem dos Advogados de Angola', 'Português, Inglês, Francês'
WHERE NOT EXISTS (SELECT 1 FROM public.team WHERE name = 'António Caxito Marques');

INSERT INTO public.team (name, role, area, img, email, phone, bio, habilitacoes, experiencia, associacoes, linguas)
SELECT 'Djamila Pinto de Andrade', 'Sócia Internacional*', 'Contencioso', 'assets/images/bg-1.jpg',
       'dandrade@marioejoeladv.com', '(+244) 928 186 060',
       'Djamila Pinto de Andrade integra a firma...', 'Licenciatura em Direito',
       '15 anos de experiência', 'Ordem dos Advogados', 'Português, Inglês'
WHERE NOT EXISTS (SELECT 1 FROM public.team WHERE name = 'Djamila Pinto de Andrade');

-- Inserir artes apenas se ainda não existirem
INSERT INTO public.artes (title, image, description)
SELECT 'Estatueta Cokwe', 'assets/images/abstract_sphere.png',
       'Uma representação clássica da arte tradicional angolana, simbolizando o poder e a sabedoria ancestral.'
WHERE NOT EXISTS (SELECT 1 FROM public.artes WHERE title = 'Estatueta Cokwe');

INSERT INTO public.artes (title, image, description)
SELECT 'Máscara Mwana Pwo', 'assets/images/dark_diamonds.png',
       'Máscara feminina utilizada em rituais, destacando-se pelos seus detalhes faciais minuciosos e escarificações.'
WHERE NOT EXISTS (SELECT 1 FROM public.artes WHERE title = 'Máscara Mwana Pwo');

INSERT INTO public.artes (title, image, description)
SELECT 'Pensador de Cokwe', 'assets/images/bg-1.jpg',
       'A figura icónica nacional que expressa profunda reflexão e respeito pela cultura e tradições orais.'
WHERE NOT EXISTS (SELECT 1 FROM public.artes WHERE title = 'Pensador de Cokwe');

-- Inserir expertise apenas se ainda não existirem
INSERT INTO public.expertise (title, description)
SELECT 'Financeiro e Governance', 'Assessoria jurídica integral em operações financeiras...'
WHERE NOT EXISTS (SELECT 1 FROM public.expertise WHERE title = 'Financeiro e Governance');

INSERT INTO public.expertise (title, description)
SELECT 'Reestruturação Empresarial e Privatizações', 'Apoio altamente especializado em processos de reestruturação...'
WHERE NOT EXISTS (SELECT 1 FROM public.expertise WHERE title = 'Reestruturação Empresarial e Privatizações');

INSERT INTO public.expertise (title, description)
SELECT 'Comercial, Societário e M&A', 'Prestamos assessoria transversal ao ciclo de vida das empresas...'
WHERE NOT EXISTS (SELECT 1 FROM public.expertise WHERE title = 'Comercial, Societário e M&A');

-- Inserir páginas sobre nós apenas se ainda não existirem
INSERT INTO public.sobrenos_pages (id, title, content)
SELECT 'a-firma', 'A Firma', '<p>A Mário &amp; Joel - Sociedade de Advogados, RL é uma firma de referência...</p>'
WHERE NOT EXISTS (SELECT 1 FROM public.sobrenos_pages WHERE id = 'a-firma');

INSERT INTO public.sobrenos_pages (id, title, content)
SELECT 'premios', 'Prémios e Reconhecimento', '<p>A nossa dedicação tem sido sucessivamente reconhecida...</p>'
WHERE NOT EXISTS (SELECT 1 FROM public.sobrenos_pages WHERE id = 'premios');

INSERT INTO public.sobrenos_pages (id, title, content)
SELECT 'carreiras', 'Carreiras', '<p>Estamos sempre à procura de talentos excepcionais...</p>'
WHERE NOT EXISTS (SELECT 1 FROM public.sobrenos_pages WHERE id = 'carreiras');

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sobrenos_pages ENABLE ROW LEVEL SECURITY;

-- Leitura pública (site principal)
CREATE POLICY IF NOT EXISTS "Allow public read access to posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access to team" ON public.team FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access to artes" ON public.artes FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access to expertise" ON public.expertise FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access to sobrenos_pages" ON public.sobrenos_pages FOR SELECT USING (true);

-- Escrita autenticada (painel admin)
CREATE POLICY IF NOT EXISTS "Allow auth write to posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Allow auth write to team" ON public.team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Allow auth write to artes" ON public.artes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Allow auth write to expertise" ON public.expertise FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "Allow auth write to sobrenos_pages" ON public.sobrenos_pages FOR ALL USING (auth.role() = 'authenticated');
