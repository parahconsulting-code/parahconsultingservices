# Tasks — Plateforme Digitale PARAH Consulting

## Phase 1 : Fondation

- [x] **Task 1.1 : Initialiser le projet Next.js**
  - Exécuter `npx create-next-app@latest` avec TypeScript, App Router, Tailwind
  - Configurer `tsconfig.json` (paths, strict)
  - Installer les dépendances : `@supabase/supabase-js`, `zod`, `clsx`, `tailwind-merge`
  - Configurer le `.env.local` avec les variables Supabase
  - Vérifier : `npm run dev` → page blanche sans erreur

- [x] **Task 1.2 : Configurer Supabase**
  - Créer les tables SQL (participants, tests, questions, question_options, test_passages, reponses, admins)
  - Configurer Row Level Security (RLS) : lectures publiques, écritures authentifiées admin
  - Créer le client Supabase dans `src/lib/supabase/client.ts`
  - Vérifier : connexion Supabase fonctionnelle depuis le serveur

- [x] **Task 1.3 : Layout global et composants UI**
  - Header responsive avec navigation (mobile hamburger)
  - Footer complet (3 colonnes)
  - Composants : Button, Card, Input, Select, Badge, ProgressBar
  - Palette Tailwind issue des fichiers HTML existants (primary #000, secondary #9d4300, etc.)
  - Vérifier : layout visible avec navigation entre pages vides

## Phase 2 : Pages vitrine

- [x] **Task 2.1 : Page d'accueil (/)**
  - Hero section avec gradient overlay et CTA
  - Bande logos partenaires
  - 3 piliers d'accompagnement (Consulting, Opérationnel, Capital Humain)
  - Section statistiques (120+, 350+, 98%, 15+)
  - Témoignages
  - Newsletter CTA
  - Vérifier : responsive, animations au scroll

- [x] **Task 2.2 : Page Services (/services)**
  - Hero + 3 sections (Consulting, Opérationnel, Capital Humain)
  - Cards avec icônes Material Symbols
  - CTA vers rendez-vous
  - Vérifier : navigation depuis l'accueil

- [x] **Task 2.3 : Page Formations (/formations)**
  - Header avec filtres (Tous, Certification, Workshop)
  - Sidebar catégories (checkbox)
  - Grid de cartes formation (image, titre, durée, prix, bouton)
  - Vérifier : filtres fonctionnels

- [x] **Task 2.4 : Page Rendez-vous (/rendez-vous)**
  - Présentation des 7 tests d'orientation (cards avec description, durée)
  - Section calendrier de réservation (statique pour l'instant)
  - Sélection du service et de l'expert
  - Vérifier : navigation vers les tests depuis les cards

## Phase 3 : Système de tests

- [x] **Task 3.1 : Data layer — questions des tests**
  - Créer les fichiers JSON avec toutes les questions pour les 7 tests (seed data)
  - Créer les types TypeScript (Question, Option, Test, etc.)
  - Fonction de seed pour importer dans Supabase
  - Vérifier : questions accessibles depuis une API Route

- [x] **Task 3.2 : Formulaire profil participant**
  - Formulaire intégré dans `/tests/[slug]` avec prénom, nom, profession, niveau, téléphone, email
  - Participant créé via API submit

- [x] **Task 3.3 : Composant QuestionCard et progression**
  - QuestionCard avec sélection d'option, ProgressBar, navigation précédente/suivante

- [x] **Task 3.4 : Moteur de scoring**
  - Scoring normalisé sur 100 par dimension depuis les valeurs réelles des options

- [x] **Task 3.5 : Enregistrement et fin du test**
  - Sauvegarde réponses + scores + token → redirection vers `/tests/resultat?token=...`

## Phase 4 : Rapport PDF

- [x] **Task 4.1 : Moteur PDF — structure de base**
  - `@react-pdf/renderer` installé
  - Composants : ReportDocument, styles (palette NAVY/TEAL/ACCENT), page de garde, sommaire, intro

- [x] **Task 4.2 : Graphiques de scores**
  - HorizontalBarChart SVG avec barres proportionnelles et labels

- [x] **Task 4.3 : Sections complètes du rapport**
  - Sections test + synthèse + plan d'action + disclaimer + footer paginé

- [x] **Task 4.4 : Page résultat et téléchargement**
  - Scores affichés sur `/tests/resultat`
  - Bouton "Télécharger le rapport PDF" → `/api/pdf?token=...`
  - CTA vers autres tests et rendez-vous

## Phase 5 : Panel Admin

- [x] **Task 5.1 : Authentification admin**
  - Login page + JWT session (jose) + bcrypt
  - API: login, logout, setup
  - Middleware protégeant `/admin/*`
  - Admin seedé : parahconsulting@gmail.com

- [x] **Task 5.2 : Gestion des questions**
  - Liste des tests avec nombre de questions
  - Éditeur par test : ajout, modification, suppression, réordonnancement
  - API CRUD : POST/PATCH/DELETE questions + options
  - Routes : `/admin/questions`, `/admin/questions/[testId]`

- [x] **Task 5.3 : Dashboard et résultats**
  - Stats : tests complétés, participants, tests disponibles, popularité
  - Liste des 20 derniers passages
  - Export CSV complet avec endpoint dédié
  - Routes : `/admin/resultats`, `/api/admin/resultats/export`
