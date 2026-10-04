# Sursele de conținut

Registru consolidat la 4 octombrie 2026. Fiecare informație are o singură sursă activă pentru fiecare limbă; rapoartele și capturile sunt dovezi istorice, nu surse pentru publicare.

| Conținut | Sursă activă | Autoritate și verificare |
| --- | --- | --- |
| Home, introduceri, valori, servicii, FAQ, interfață | `src/locales/{ro,en,it,es}/editorial.json` | Home/About română au baza PDF aprobată. Servicii, FAQ și interfață sunt propuneri editoriale; aprobarea clinică se consemnează separat. |
| Biografie, pregătire, experiență, cursuri și afilieri | `src/locales/{ro,en,it,es}/master-about.json` | Româna coincide exact cu reextracția PDF prin importator. Traducerile păstrează datele, orele și numele verificate structural; statutul APRICAS „în desfășurare” este acum explicit în toate limbile. Actualitatea atestatelor și afilierilor necesită confirmare. |
| Articole și categorii | `src/data/blogPosts.ts` | Șase articole în patru limbi, cu ID-uri 1–6 păstrate. Revizuirea editorială din 4 octombrie limitează afirmațiile universale, numerice și promisiunile despre rezultate. Nu este o validare clinică independentă. Datele istorice cu proveniență neconfirmată au fost eliminate. |
| Referințe, data revizuirii și adresele articolelor | `src/data/articleMetadata.ts` | Surse NHS, UNICEF și Association for Play Therapy asociate fiecărui subiect. Se afișează data revizuirii editoriale și a surselor, nu o dată inventată a publicării. URL-urile descriptive sunt canonice; cele numerice funcționează ca aliasuri. Detalii: [revizuirea conținutului și publicării](content-discovery-review-2026-10-04.md). |
| Contact și nume | `src/lib/siteConfig.ts` | Adresa publică existentă; nicio adresă profesională, acreditare sau disponibilitate nouă nu a fost inventată. |
| GDPR, cookies și termeni | `editorial.json`, `legal` | 14/8/12 secțiuni în patru limbi; cadrul verificat la 4 octombrie 2026 în `docs/legal-review-2026-10-04.md`. Faptele lipsă sunt marcate; toate paginile juridice sunt noindex până la validare. |
| Banner SAL | `public/consumer-protection/anpc-sal-2026.jpg` | Model oficial din anexa Ordinului 270/2026; link reclamatiisal.anpc.ro. Referința veche a utilizatorului rămâne numai în QA. |
| Rute și SEO | `src/lib/routes.ts`, `src/components/SEOHead.tsx`, `src/entry-server.tsx` | Un inventar comun pentru navigare și prerandare. |

Documentul sursă este `C:/Users/stanc/Downloads/Dosar master site valeriastaculea.ro.pdf`, 37 de pagini, SHA-256 `329e5371de816cda80f2a59026f1752b6e9e7b1a8a6dc533e8c7d46452580a03`. `scripts/import-master-copy.py` rămâne un instrument manual de proveniență, nu parte a build-ului. Un reimport viitor trebuie comparat cu versiunea activă și propagat în traduceri înainte de acceptare.

51 de fișiere istorice fără cale de import din `src/main.tsx` sau `src/entry-server.tsx` au fost eliminate: 36 de JSON-uri vechi, 11 componente locale, CookieBanner, LanguageContext, seoMetadata și pagina Index. Lista completă, hash-urile și commit-ul de recuperare sunt în `docs/content-cleanup-manifest.json`; analiza dependențelor anterioară eliminării este în `docs/content-dependency-audit.json`. Copiile identice se află local în `.release-archives/legacy-content-2026-10-04/`, ignorat de Git/build/lint. Într-un checkout nou, fișierele pot fi recuperate din commit-ul consemnat în manifest, fără restaurarea întregii versiuni a site-ului.

Nu au fost eliminate dovezile QA, portretele și alte asset-uri cu URL-uri publice sau primitivele UI reutilizabile. Existența unui fișier în `public` nu permite stabilirea absenței linkurilor externe doar prin analiza importurilor.

Testul de lectură folosește acum `docs/qa/about-services-text-2026-10-04.json`; diferența față de reperul istoric este limitată la cele trei propoziții APRICAS. Reperul original și raportul său rămân neschimbate.
