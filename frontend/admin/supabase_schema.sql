-- Schema for Dr. Joel
-- Run this in your Supabase SQL Editor once the project is created.

-- Table: public.posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: public.team
CREATE TABLE IF NOT EXISTS public.team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    area TEXT NOT NULL,
    img TEXT,
    email TEXT,
    phone TEXT,
    bio TEXT,
    habilitacoes TEXT,
    experiencia TEXT,
    associacoes TEXT,
    linguas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: public.artes
CREATE TABLE IF NOT EXISTS public.artes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: public.expertise
CREATE TABLE IF NOT EXISTS public.expertise (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: public.sobrenos_pages
CREATE TABLE IF NOT EXISTS public.sobrenos_pages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Mock Data (Based on mockDB.js)
INSERT INTO public.team (name, role, area, img, email, phone, bio, habilitacoes, experiencia, associacoes, linguas) VALUES
('António Caxito Marques', 'Sócio Internacional*', 'Direito Público', 'assets/images/bg-1.jpg', 'amarques@marioejoeladv.com', '(+244) 928 186 060', 'António Caxito Marques tem uma vasta experiência...', 'Licenciatura em Direito', 'Mais de 20 anos de experiência', 'Ordem dos Advogados de Angola', 'Português, Inglês, Francês'),
('Djamila Pinto de Andrade', 'Sócia Internacional*', 'Contencioso', 'assets/images/bg-1.jpg', 'dandrade@marioejoeladv.com', '(+244) 928 186 060', 'Djamila Pinto de Andrade integra a firma...', 'Licenciatura em Direito', '15 anos de experiência', 'Ordem dos Advogados', 'Português, Inglês');

INSERT INTO public.artes (title, image, description) VALUES
('Estatueta Cokwe', 'assets/images/abstract_sphere.png', 'Uma representação clássica da arte tradicional angolana, simbolizando o poder e a sabedoria ancestral.'),
('Máscara Mwana Pwo', 'assets/images/dark_diamonds.png', 'Máscara feminina utilizada em rituais, destacando-se pelos seus detalhes faciais minuciosos e escarificações.'),
('Pensador de Cokwe', 'assets/images/bg-1.jpg', 'A figura icónica nacional que expressa profunda reflexão e respeito pela cultura e tradições orais.');

INSERT INTO public.expertise (title, description) VALUES
('Financeiro e Governance', 'Assessoria jurídica integral em operações financeiras...'),
('Reestruturação Empresarial e Privatizações', 'Apoio altamente especializado em processos de reestruturação...'),
('Comercial, Societário e M&A', 'Prestamos assessoria transversal ao ciclo de vida das empresas...');

INSERT INTO public.sobrenos_pages (id, title, content) VALUES
('a-firma', 'A Firma', '<p>A Mário & Joel - Sociedade de Advogados, RL é uma firma de referência...</p>'),
('premios', 'Prémios e Reconhecimento', '<p>A nossa dedicação tem sido sucessivamente reconhecida...</p>'),
('carreiras', 'Carreiras', '<p>Estamos sempre à procura de talentos excepcionais...</p>');

-- RLS (Row Level Security)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sobrenos_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Allow public read access to artes" ON public.artes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to expertise" ON public.expertise FOR SELECT USING (true);
CREATE POLICY "Allow public read access to sobrenos_pages" ON public.sobrenos_pages FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow auth write to posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write to team" ON public.team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write to artes" ON public.artes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write to expertise" ON public.expertise FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write to sobrenos_pages" ON public.sobrenos_pages FOR ALL USING (auth.role() = 'authenticated');
