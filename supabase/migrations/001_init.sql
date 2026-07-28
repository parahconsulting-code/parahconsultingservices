-- Migration initiale : Structure de la base PARAH Platform

-- 1. Participants (profil rempli avant un test)
CREATE TABLE IF NOT EXISTS participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         TEXT NOT NULL,
  prenom      TEXT NOT NULL,
  profession  TEXT,
  niveau_etude TEXT,
  telephone   TEXT,
  email       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Tests disponibles
CREATE TABLE IF NOT EXISTS tests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  titre       TEXT NOT NULL,
  description TEXT,
  duree_min   INT,
  cible       TEXT DEFAULT 'tout'
);

-- 3. Questions d'un test
CREATE TABLE IF NOT EXISTS questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id     UUID REFERENCES tests(id) ON DELETE CASCADE,
  texte       TEXT NOT NULL,
  ordre       INT NOT NULL,
  dimension   TEXT
);

-- 4. Options de réponse pour chaque question
CREATE TABLE IF NOT EXISTS question_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  texte       TEXT NOT NULL,
  valeur      INT NOT NULL DEFAULT 1,
  ordre       INT NOT NULL
);

-- 5. Passage de test par un participant
CREATE TABLE IF NOT EXISTS test_passages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id),
  test_id       UUID REFERENCES tests(id),
  scores        JSONB,
  interpretation TEXT,
  token_acces   TEXT UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 6. Réponses individuelles
CREATE TABLE IF NOT EXISTS reponses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id  UUID REFERENCES test_passages(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  option_id   UUID REFERENCES question_options(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 7. Admins (panel de gestion)
CREATE TABLE IF NOT EXISTS admins (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email    TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nom      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON questions(test_id);
CREATE INDEX IF NOT EXISTS idx_question_options_question_id ON question_options(question_id);
CREATE INDEX IF NOT EXISTS idx_test_passages_participant_id ON test_passages(participant_id);
CREATE INDEX IF NOT EXISTS idx_test_passages_token ON test_passages(token_acces);
CREATE INDEX IF NOT EXISTS idx_reponses_passage_id ON reponses(passage_id);

-- Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reponses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Politiques : lectures publiques, écritures via API
CREATE POLICY "Lecture publique tests" ON tests FOR SELECT USING (true);
CREATE POLICY "Lecture publique questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Lecture publique options" ON question_options FOR SELECT USING (true);
CREATE POLICY "Insertion participants" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Insertion passages" ON test_passages FOR INSERT WITH CHECK (true);
CREATE POLICY "Insertion reponses" ON reponses FOR INSERT WITH CHECK (true);

-- Politiques admin
CREATE POLICY "Admins lecture seule" ON admins FOR SELECT USING (true);
CREATE POLICY "Admins insertion" ON admins FOR INSERT WITH CHECK (true);
