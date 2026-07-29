-- Migration : Table formations

CREATE TABLE IF NOT EXISTS formations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'Formation',
  duration    TEXT NOT NULL,
  mode        TEXT NOT NULL,
  mode_icon   TEXT NOT NULL DEFAULT 'groups',
  description TEXT NOT NULL,
  price       TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT 'bg-secondary text-on-secondary',
  image       TEXT,
  active      BOOLEAN DEFAULT true,
  ordre       INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE formations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique formations" ON formations FOR SELECT USING (true);
CREATE POLICY "Admins tout accès formations" ON formations FOR ALL USING (true);

-- Seed data
INSERT INTO formations (title, category, type, duration, mode, mode_icon, description, price, color, ordre) VALUES
('Leadership Stratégique & Gouvernance', 'Management', 'Formation', '5 Jours', 'Présentiel', 'groups', 'Maîtrisez les outils de pilotage de la performance et apprenez à fédérer vos équipes autour d''une vision commune et transformative.', '450.000 FCFA', 'bg-secondary text-on-secondary', 1),
('Optimisation de la Marque Employeur', 'RH & Recrutement', 'Workshop', '3 Jours', 'Hybride', 'laptop_mac', 'Attirez et retenez les meilleurs talents en transformant votre culture d''entreprise en un avantage concurrentiel majeur.', '325.000 FCFA', 'bg-on-tertiary-container text-on-tertiary', 2),
('Business Model & Pitch Performance', 'Entrepreneurship', 'Workshop', '4 Jours', 'Intensif', 'workspace_premium', 'De l''idée au marché : structurez votre business model et maîtrisez l''art de convaincre les investisseurs institutionnels.', '500.000 FCFA', 'bg-secondary text-on-secondary', 3),
('Gestion de Projets Agiles (Scrum)', 'Management', 'Certification', '2 Jours', 'Certifiant', 'verified', 'Apprenez à diviser vos objectifs complexes en sprints gérables pour augmenter la vélocité et la qualité de vos livrables.', '275.000 FCFA', 'bg-on-tertiary-container text-on-tertiary', 4);

CREATE INDEX IF NOT EXISTS idx_formations_active ON formations(active);
CREATE INDEX IF NOT EXISTS idx_formations_ordre ON formations(ordre);

-- Table inscriptions aux formations
CREATE TABLE IF NOT EXISTS inscriptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation   TEXT NOT NULL,
  nom         TEXT NOT NULL,
  email       TEXT NOT NULL,
  telephone   TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insertion publique inscriptions" ON inscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins lecture inscriptions" ON inscriptions FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON inscriptions(created_at);
