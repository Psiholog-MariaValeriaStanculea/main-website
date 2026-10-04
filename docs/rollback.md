# Publicare și rollback

Procedură pregătită la 4 octombrie 2026. Exercițiul local de restaurare a candidatului nu dovedește restaurarea GitHub Pages. Nu declanșa un deployment până când verificările de publicare au dovezi complete.

## Păstrarea artifact-ului

Workflow-ul principal păstrează `website-release-BUILD_ID` pentru 90 de zile, inclusiv `.nojekyll`. Descarcă și păstrează arhiva separat de Actions; expirarea sau ștergerea unui run poate elimina artifact-ul. Consemnează commit, run, URL, build ID și data verificării live, împreună cu valorile publice de configurare utilizate la build. Artifact-ul conține deja configurația client compilată. Nu arhiva parole, tokenuri sau chei private în repository.

Pentru un candidat local, după build:

```powershell
node scripts/release-artifact.mjs save dist .release-archives/candidate-NAME
node scripts/release-artifact.mjs verify .release-archives/candidate-NAME
node scripts/release-artifact.mjs restore .release-archives/candidate-NAME .release-archives/restored-NAME
node scripts/serve-pages.mjs --root .release-archives/restored-NAME --port 4183
```

În alt terminal, folosește build ID-ul și URL-ul canonic din `snapshot.json`:

```powershell
node scripts/check-pages.mjs --url http://127.0.0.1:4183/main-website/ --build-id BUILD_ID --canonical-base https://psiholog-mariavaleriastanculea.github.io/main-website/
```

Scriptul refuză suprascrierea, modificările de hash, fișierele lipsă/suplimentare și symlink-urile; restaurarea are loc într-un director nou din `.release-archives`. Nu înlocuiește directorul `dist` curent.

## Revenirea în producție

1. Oprește publicările noi și înregistrează motivul revenirii. Nu slăbi condițiile de aprobare pentru a face un rollback.
2. Selectează un artifact care a trecut verificarea live după publicare. Verifică hash-urile și configurarea lui. Un run reușit sau un commit vechi, fără verificare live și artifact, nu este suficient.
3. Publică acel artifact integral prin GitHub Pages/Actions, cu permisiunile și mediul `github-pages` existente. Workflow-ul curent nu oferă încă restaurarea automată după un run ID: o asemenea operațiune necesită un flux separat revizuit înainte de folosire. Nu rula build-ul curent și nu îl numi artifact-ul vechi.
4. Dacă artifact-ul lipsește, reconstruiește commit-ul vechi într-un checkout separat, cu lockfile-ul și configurarea lui originală. Verifică-l ca pe un candidat nou; un rebuild nu garantează aceiași octeți sau aceeași identitate de build.
5. Verifică HTTPS, root, RO, contact EN, limbile și rutele incluse în artifact, JS/CSS și 404. Pentru artifact-uri cu build marker, verifică identitatea independentă cu `check-pages.mjs --build-id`.
6. Verifică din nou livrarea reală și politica de confidențialitate aplicabilă configurației restaurate. Consemnează finalizarea numai după verificarea live.

## Situația observată

Ultimul run Pages reușit disponibil este [36725639357](https://github.com/Psiholog-MariaValeriaStanculea/main-website/actions/runs/36725639357), commit `82fdfba5c8d85afbb64eab467e7d3850ef47a8bf`, din 30 septembrie 2026. API-ul Actions nu mai listează artifact-uri pentru acest run. Site-ul live răspunde prin HTTPS, dar nu are markerul nou `site-build-id` sau `build-info.json`, iar paginile noi Resources/privacy/cookies lipsesc. Nu există dovadă suficientă pentru a-l declara un artifact de rollback complet și verificat.

De aceea, condiția `rollback` din registrul de release rămâne pending. Pentru prima publicare a noului site, păstrează artifact-ul validat și încheie verificarea live imediat; acesta va deveni apoi referința de revenire, fără a pretinde că s-a făcut deja un rollback de producție.
