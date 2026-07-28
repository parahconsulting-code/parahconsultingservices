# Spec : Plateforme Digitale PARAH Consulting

## Objectif

Plateforme web combinant un site vitrine institutionnel et une application de tests d'orientation en ligne pour PARAH Consulting & Services. L'utilisateur découvre les services et formations, puis passe des tests psychotechniques validés (RIASEC, intelligences multiples, etc.) après avoir rempli un profil rapide. Un rapport PDF détaillé est généré à la fin de chaque test.

**Utilisateurs cibles :**
- Grand public / prospects cherchant des services de conseil et formation
- Élèves (12-17 ans) et adultes en reconversion souhaitant s'orienter
- Clients existants accompagnés par PARAH Consulting

## Tech Stack

- **Framework :** Next.js 14+ (App Router, SSR/SSG)
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Base de données :** Supabase (PostgreSQL)
- **Authentification :** Pas de compte utilisateur — profil rapide avant le test
- **PDF :** Bibliothèque TypeScript (pdfmake ou @react-pdf/renderer) pour générer les rapports
- **Admin panel :** Interface protégée pour gérer les questions des tests
- **Déploiement :** Vercel

## Commandes

```
Build:       npm run build
Dev:         npm run dev
Lint:        npm run lint
Type check:  npm run typecheck
Test:        npm test
```

## Structure du projet

```
src/
├── app/                    # App Router pages
│   ├── (public)/           # Pages vitrine (layout public)
│   │   ├── page.tsx        # Accueil
│   │   ├── services/       # Services
│   │   ├── formations/     # Formations
│   │   └── rendez-vous/    # Présentation des tests + réservation
│   ├── tests/              # Tests d'orientation
│   │   ├── [slug]/         # Page de pré-test (profil) + test
│   │   └── resultat/       # Page de résultat avec PDF
│   ├── admin/              # Panel admin (routes protégées)
│   │   ├── questions/      # Gestion des questions
│   │   ├── resultats/      # Vue des résultats utilisateurs
│   │   └── dashboard/      # Statistiques
│   ├── layout.tsx          # Layout racine
│   └── globals.css         # Styles globaux
├── components/             # Composants React réutilisables
│   ├── ui/                 # Boutons, Cards, Inputs, etc.
│   ├── layout/             # Header, Footer, Navigation
│   └── tests/              # Composants spécifiques aux tests (QuestionCard, ProgressBar, etc.)
├── lib/                    # Utilitaires
│   ├── supabase/           # Client Supabase
│   ├── pdf/                # Générateur de PDF (port du script Python build_pdf.py)
│   └── utils.ts
├── types/                  # Types TypeScript
└── data/                   # Données statiques (contenus des pages, métadonnées)
public/                     # Assets statiques
```

## Code Style

```tsx
// Conventions : composants React en PascalCase, fonctions en camelCase,
// fichiers en kebab-case, types en PascalCase
// Tailwind pour le styling

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 font-label-md transition-all active:scale-95",
        variant === "primary" && "bg-primary text-on-primary",
        variant === "secondary" && "bg-secondary text-white",
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

## Modèle de Données (Supabase)

```sql
-- Participant (profil rempli avant le test)
CREATE TABLE participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         TEXT NOT NULL,
  prenom      TEXT NOT NULL,
  profession  TEXT,
  niveau_etude TEXT,
  telephone   TEXT,
  email       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tests disponibles
CREATE TABLE tests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL, -- riasec-junior, riasec-adulte, etc.
  titre       TEXT NOT NULL,
  description TEXT,
  duree_min   INT,
  cible       TEXT -- 'junior', 'adulte', 'tout'
);

-- Questions d'un test
CREATE TABLE questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id     UUID REFERENCES tests(id) ON DELETE CASCADE,
  texte       TEXT NOT NULL,
  ordre       INT NOT NULL,
  dimension   TEXT -- pour les tests multidimensionnels (ex: "R", "I", "A" pour RIASEC)
);

-- Options de réponse pour chaque question
CREATE TABLE question_options (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  texte       TEXT NOT NULL,
  valeur      INT NOT NULL, -- score pour cette option
  ordre       INT NOT NULL
);

-- Passage de test par un participant
CREATE TABLE test_passages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id),
  test_id       UUID REFERENCES tests(id),
  scores        JSONB, -- {"R": 80, "I": 65, ...}
  interpretation TEXT,
  token_acces   TEXT UNIQUE, -- token pour retrouver les résultats plus tard
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Réponses individuelles
CREATE TABLE reponses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passage_id  UUID REFERENCES test_passages(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  option_id   UUID REFERENCES question_options(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Admin (compte classique avec mot de passe)
CREATE TABLE admins (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email    TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nom      TEXT NOT NULL
);
```

## Flux utilisateur (tests)

1. L'utilisateur arrive sur la page **Rendez-vous** qui liste les 7 tests
2. Il clique sur un test (ex: RIASEC Junior)
3. Un **formulaire profil** s'affiche : Nom, Prénom, Profession, Niveau d'étude, Téléphone, Email (optionnel)
4. Après soumission, le **test démarre** — questions une par une avec barre de progression
5. À la fin, les **scores sont calculés** côté serveur
6. Un **rapport PDF** est généré (port du script Python existant en TypeScript)
7. L'utilisateur peut télécharger le PDF et/ou recevoir un lien unique pour retrouver ses résultats

## Génération PDF

Le script Python `build_pdf.py` (reportlab) sera réécrit en TypeScript avec `pdfmake` ou `@react-pdf/renderer`. Le rapport inclut :
- Page de garde (titre, nom du candidat, date)
- Sommaire
- Introduction
- Sections par test avec graphiques de scores (barres horizontales)
- Synthèse croisée
- Plan d'action
- Disclaimer

Format des données d'entrée (JSON) — voir `SKILLS/Skill-redacteur/references/schema.md`.

## Tests d'orientation (7 tests)

| Test | Slug | Cible | Questions |
|------|------|-------|-----------|
| RIASEC Junior | `riasec-junior` | 12-17 ans | 60 |
| RIASEC Adulte | `riasec-adulte` | Adultes | ~60 |
| Intérêts professionnels | `interets-professionnels` | Tous | ~40 |
| Aptitudes scolaires | `aptitudes-scolaires` | Tous | ~40 |
| Styles d'apprentissage | `styles-apprentissage` | Tous | ~30 |
| Intelligences Multiples | `intelligences-multiples` | Tous | ~40 |
| Personnalité | `personnalite` | Tous | ~50 |

## Pages vitrine (reproduction des HTML existants)

1. **Accueil** (/): Hero, statistiques, témoignages, newsletter, logos partenaires
2. **Services** (/services): Consulting stratégique, Opérationnel, Capital Humain
3. **Formations** (/formations): Catalogue avec filtres, prix, bouton d'inscription
4. **Rendez-vous** (/rendez-vous): Présentation des 7 tests + calendrier de réservation RDV

## Panel Admin

- Routes protégées sous `/admin`
- **Dashboard** : statistiques (tests passés, participants, tendances)
- **Gestion des questions** : CRUD questions/options par test
- **Résultats** : consulter les résultats des participants
- Accès via email + mot de passe (table `admins`)

## Stratégie de Test

- **Framework :** Vitest + React Testing Library
- **Tests unitaires :** fonctions utilitaires, calcul de scores
- **Tests composants :** composants réutilisables
- Coverage >= 70% pour les fonctions critiques

## Boundaries

### Always do
- TypeScript strict
- Validation des entrées utilisateur (Zod)
- Responsive design (mobile-first)
- Accessibilité (a11y)
- Tests sur les fonctions critiques (calcul scores, génération PDF)
- Lint et typecheck avant commit

### Ask first
- Ajouter une dépendance npm
- Modifier le schéma de base de données
- Changer l'architecture des pages
- Ajouter une API externe
- Modifier la config Tailwind

### Never do
- Commiter des secrets / clés API
- Stocker des mots de passe en clair (hash bcrypt pour admins)
- Supprimer des tests sans approbation
- Ignorer les erreurs TypeScript

## Critères de succès

- [ ] Toutes les pages vitrine reproduisent le design des fichiers HTML existants
- [ ] Les 7 tests d'orientation sont fonctionnels avec scoring automatique
- [ ] Le formulaire profil avant test collecte les infos et crée un participant
- [ ] Le rapport PDF est généré avec graphiques et synthèse (port du script Python)
- [ ] Le panel admin permet de gérer les questions des tests
- [ ] L'utilisateur peut retrouver ses résultats via un lien unique
- [ ] Le site est responsive (mobile + desktop)
- [ ] Lighthouse performance > 80
