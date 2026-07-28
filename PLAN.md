# Plan d'implémentation — Plateforme Digitale PARAH Consulting

## Dépendances entre composants

```
Supabase (DB)
    │
    ▼
Projet Next.js + Tailwind  ──►  Pages vitrine
    │                               │
    ├── Components UI               │
    ├── Layout (Header/Footer)  ◄───┘
    │
    ▼
Système de tests
    │
    ├── Lecture questions depuis Supabase
    ├── Composant QuestionCard + ProgressBar
    ├── Formulaire profil participant
    ├── Moteur de scoring
    └── Enregistrement des résultats
            │
            ▼
    Générateur PDF (port build_pdf.py)
            │
            ▼
    Panel Admin (CRUD questions, stats)
```

## Ordre d'implémentation

### Phase 1 : Fondation
1. Initialiser le projet Next.js + Tailwind + TypeScript
2. Configurer Supabase (projet, tables, RLS)
3. Créer le layout global (Header, Footer) avec la charte graphique existante
4. Créer les composants UI de base (Button, Card, Input, etc.)

### Phase 2 : Pages vitrine (indépendant)
5. Page d'accueil (/)
6. Page Services (/services)
7. Page Formations (/formations)
8. Page Rendez-vous (/rendez-vous)

### Phase 3 : Système de tests (dépend de 1-4)
9. Formulaire profil participant
10. Lecteur de questions depuis Supabase
11. Composant QuestionCard + progression
12. Moteur de scoring par type de test
13. Enregistrement des réponses et scores

### Phase 4 : Rapport PDF (dépend de 12)
14. Port du générateur PDF (build_pdf.py → TypeScript)
15. Graphiques de scores intégrés au PDF
16. Page résultat avec téléchargement et lien unique

### Phase 5 : Admin (indépendant)
17. Authentification admin
18. CRUD questions / options
19. Dashboard statistiques
20. Vue des résultats participants

## Risques et mitigation

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Complexité du scoring multidimensionnel (RIASEC, intelligences multiples) | Medium | Définir l'algo de scoring dans un module dédié et testé unitairement |
| Génération PDF côté serveur (Next.js) | Medium | Utiliser `@react-pdf/renderer` ou `pdfmake` en API Route |
| Portage du script Python PDF | Medium | Garder la même structure JSON en entrée, réécrire la logique de rendu |
| Questions des tests volumineuses (60 questions/test) | Low | Importer les questions via seed Supabase depuis des fichiers JSON |
| Pas d'authentification → retrouver ses résultats | Low | Token unique dans l'URL + possibilité de le recevoir par email |

## Parallélisation possible

- Phase 2 (pages vitrine) peut commencer dès que la fondation (Phase 1) est prête
- Phase 5 (admin) est indépendante des phases 3-4

## Checkpoints de vérification

1. **CP1** (après Phase 1) : `npm run dev` fonctionne, Supabase connecté, layout visible
2. **CP2** (après Phase 2) : Toutes les pages vitrine sont navigables et responsives
3. **CP3** (après Phase 3) : Un test complet peut être passé de bout en bout
4. **CP4** (après Phase 4) : PDF généré avec scores et graphiques
5. **CP5** (après Phase 5) : Admin peut créer/modifier des questions et voir les résultats
