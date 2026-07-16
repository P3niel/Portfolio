# Portfolio – Résumé du projet

## C'est quoi

Portfolio personnel avec une interface terminal et un fond spatial animé (galaxie, planètes, étoiles).
Stack : **Next.js 15 / React 19 / Three.js** avec Tailwind pour le style.

---

## Où on en est

| Étape                        | État       |
|------------------------------|------------|
| Mockups HTML (classic, split) | Fait      |
| Scaffold Next.js              | Fait      |
| Fond galaxie 3D (R3F)         | Fait      |
| Terminal UI (contenu)         | À faire   |
| Déploiement                   | À faire   |

Le fond spatial tourne (`GalaxyScene` → `GalaxyBackground` + `PlanetsLayer`).
La page principale est vide — le terminal portfolio n'est pas encore construit.

---

## Commandes du quotidien

```bash
# Voir les mockups HTML (port 8765)
make serve

# Lancer le dev Next.js (port 3000)
make dev

# Vérifier les types
make typecheck

# Linter
make lint
```

---

## Fichiers clés

| Fichier / Dossier | Rôle |
|---|---|
| `terminal-portfolio/app/page.tsx` | Page principale — point d'entrée du contenu |
| `terminal-portfolio/components/GalaxyScene.tsx` | Orchestrateur de la scène 3D |
| `terminal-portfolio/components/GalaxyBackground.tsx` | Canvas Three.js (client component) |
| `terminal-portfolio/components/PlanetsLayer.tsx` | Planètes animées |
| `mockups/classic.html` | Mockup design 1 — terminal classique |
| `mockups/split.html` | Mockup design 2 — split screen |

---

## Décisions techniques prises

- **@react-three/fiber v9** (pas v8) — obligatoire pour React 19
- **Tailwind uniquement** — pas de CSS modules, pas de styled-components
- **App Router Next.js** — pas de `src/`, routes directement dans `app/`
- **z-index** : fond 3D à `z-0`, contenu à `z-[1]`

---

## Prochaines étapes suggérées

1. Construire l'interface terminal (commandes, output, prompt)
2. Brancher le contenu (projets, skills, contact) sur les commandes terminal
3. Animations de transition entre sections
4. Déploiement Vercel
