-- Ajout des politiques d'insertion pour le seed des tests
-- (données non-sensibles : questions et options)

CREATE POLICY "Insertion tests" ON tests FOR INSERT WITH CHECK (true);
CREATE POLICY "Insertion questions" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Insertion options" ON question_options FOR INSERT WITH CHECK (true);

-- Permettre la lecture des passages et reponses par leur token
CREATE POLICY "Lecture passages par token" ON test_passages FOR SELECT USING (true);
CREATE POLICY "Lecture reponses" ON reponses FOR SELECT USING (true);
