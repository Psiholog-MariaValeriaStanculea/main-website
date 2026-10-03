# Valeria Stănculea — site de psihologie

## Overview

Site de prezentare pentru Valeria Stănculea, psiholog clinician și psihoterapeut integrativ relațional. Se adresează părinților, copiilor, adolescenților și familiilor care caută informații despre sprijinul psihologic și o modalitate de a iniția contactul.

Conținutul este disponibil în română, engleză, italiană și spaniolă. Site-ul explică serviciile și abordarea terapeutică, oferă resurse educative și permite trimiterea unei solicitări. Nu oferă diagnostic online și nu confirmă automat programări.

Acest README documentează utilizarea și întreținerea proiectului. Istoricul modificărilor, rapoartele de verificare și evidențele de implementare sunt păstrate separat, în `docs/` și în istoricul Git.

## Features

- Prezentarea psihologului, a pregătirii profesionale, valorilor și abordării terapeutice.
- O pagină de servicii pentru copii, adolescenți, părinți și relații de familie, cu linkuri către secțiuni și informații despre formatul online.
- Întrebări frecvente organizate pe teme, cu răspunsuri extensibile.
- Formular de contact și link direct către email; serviciul ales poate fi transmis ca parte a solicitării.
- Resurse și articole educative, cu filtrare pe categorii și căutare.
- Navigare în patru limbi și aspect luminos, întunecat sau adaptat sistemului.
- Layout responsive pentru telefoane, tablete, dispozitive pliabile și ecrane mari.
- Pagini prerandate, metadata SEO, sitemap, Open Graph și date structurate.
- Controale accesibile prin tastatură, focus vizibil, suport pentru text mărit și mișcare redusă.
- Pagini de confidențialitate și preferințe, cu colectare limitată în formular. Revizuirea completă a informațiilor de privacy este o condiție de publicare.

## Tech Stack

| Domeniu | Tehnologii |
| --- | --- |
| Interfață | React 18, TypeScript |
| Dezvoltare și build | Vite, plugin React SWC, npm |
| Stiluri | Tailwind CSS 4, PostCSS, CSS propriu, fonturi locale Inter și Source Serif 4 |
| Navigare și traduceri | React Router 7, i18next, react-i18next |
| Componente UI | Componente shadcn/ui și primitive Radix UI, pictograme Lucide |
| Contact | EmailJS, încărcat la trimiterea solicitării |
| SEO și prerandare | react-helmet-async, randare React la build, scripturi Node.js |
| Verificare | ESLint, TypeScript, Node.js test runner, Playwright |
| Găzduire și CI/CD | GitHub Pages, GitHub Actions |

Proiectul folosește Vite; Next.js nu face parte din stack. Găzduirea servește fișiere statice, fără un server de aplicație sau o bază de date proprie.

## Project Structure

| Locație | Rol |
| --- | --- |
| `src/pages/` | Home, About, Services, Resources, articole, FAQ, Contact și pagini legale |
| `src/components/editorial/` | Componente comune pentru butoane, articole, FAQ și elemente vizuale |
| `src/components/ui/` | Primitivele UI reutilizabile |
| `src/components/Navigation.tsx`, `Layout.tsx`, `Footer.tsx` | Header, navigare mobilă, structură comună și footer |
| `src/components/InquiryProvider.tsx` | Draftul și starea solicitării, păstrate în memorie |
| `src/locales/{ro,en,it,es}/` | Textele localizate; conținutul activ folosește `editorial.json` și `master-about.json` |
| `src/data/blogPosts.ts` | Articole, categorii și traducerile acestora |
| `src/lib/` | Configurația site-ului, rutele, traducerile, utilitarele SEO și logica formularului |
| `src/index.css`, `tailwind.config.ts` | Temele, tipografia și regulile de layout |
| `src/entry-server.tsx`, `scripts/postbuild-pages.mjs` | Prerandarea paginilor și generarea fișierelor de publicare |
| `public/images/`, `src/assets/fonts/` | Portrete, variante de logo și fonturi locale |
| `scripts/` | Build, verificări de fișiere/SEO/Pages și serverul de preview |
| `tests/` | Teste unitare, de browser, responsive și Contact |
| `.github/workflows/` | Validarea proiectului și publicarea pe GitHub Pages |
| `docs/` | Specificația de design, condițiile de publicare și rapoartele de verificare |

## Getting Started

### Requirements

- Node.js 24 și npm; aceeași versiune majoră de Node este folosită în CI.
- Git pentru lucrul cu repository-ul.
- Un browser modern. Tailwind CSS 4 necesită Safari 16.4+, Chrome 111+ sau Firefox 128+, conform [documentației oficiale](https://tailwindcss.com/docs/upgrade-guide#browser-requirements).

### Instalare și pornire

Din directorul proiectului:

```sh
npm ci
npm run dev
```

`npm ci` instalează versiunile din `package-lock.json` și este comanda folosită în CI. Folosește `npm install` când modifici intenționat dependențele și actualizezi lockfile-ul.

Deschide adresa afișată de Vite. Serverul de dezvoltare actualizează interfața în timpul editării.

### Environment variables

Pentru configurare locală, copiază `.env.example` în `.env.local`. În PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Pentru override-uri ale build-ului de producție, folosește `.env.production.local`. Fișierele locale sunt ignorate de Git. Repornește serverul de dezvoltare după modificarea variabilelor; pentru producție este necesar un build nou.

| Variabilă | Utilizare |
| --- | --- |
| `VITE_GITHUB_PAGES` | Indicator pentru configurarea GitHub Pages |
| `VITE_BASE_PATH` | Prefixul rutelor și asset-urilor: `/` sau, de exemplu, `/main-website/` |
| `VITE_SITE_URL` | URL-ul canonic, inclusiv subdirectorul proiectului dacă există |
| `VITE_PRIVACY_REVIEWED` | `true` numai după completarea și revizuirea notificării de confidențialitate |
| `VITE_EMAILJS_SERVICE_ID` | Identificatorul public al serviciului EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | Identificatorul public al template-ului EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Cheia publică EmailJS pentru client |

Prefixul `VITE_` expune valoarea în aplicația livrată vizitatorilor. Nu introduce chei private, parole de email sau alte secrete. Adresa de contact este definită în `src/lib/siteConfig.ts`; câmpurile `VITE_CONTACT_EMAIL` și `VITE_CONTACT_PHONE` din template nu sunt conectate la configurația activă. Înlocuiește URL-ul exemplu înaintea unui build destinat publicării.

### Verificare și preview de producție

```sh
npx playwright install chromium
npm run lint
npx tsc -b
npm test
```

Pe Linux/CI, instalarea browserului poate necesita `npx playwright install --with-deps chromium`. `npm test` verifică fișierele, testele unitare, build-ul de producție, SEO, structura Pages, navigarea, layout-urile responsive și stările Contact.

Testele Contact interceptează cererile către furnizor și nu trimit emailuri reale. Artifact-ul `.contact-test-dist` folosește configurare fictivă și nu trebuie publicat. Rapoartele și capturile automate sunt salvate în directoarele ignorate `test-results/`, `responsive-test-results/`, `contact-test-results/` și directoarele corespunzătoare `playwright-report/`.

Pentru a verifica paginile statice generate:

```sh
npm run build:github-pages
node scripts/serve-pages.mjs --port 4181
```

Cu configurația de producție din repository, preview-ul este la `http://127.0.0.1:4181/main-website/ro/`. Acest server verifică și rutele inexistente cu HTTP 404. După editări, reconstruiește proiectul și reîncarcă pagina.

## Content Management

Conținutul se editează în cod și fișiere JSON; nu există CMS sau panou de administrare.

| Ce se modifică | Unde |
| --- | --- |
| Nume și identitate de contact | `src/lib/siteConfig.ts`; textele profesionale trebuie sincronizate în traduceri |
| Biografie, abordare și pregătire | `src/locales/{ro,en,it,es}/master-about.json`; titluri și valori în `editorial.json`, secțiunea `about` |
| Home și descrierile introductive | `editorial.json`, secțiunea `home` |
| Servicii și exemple | `editorial.json`, secțiunea `services` |
| Tarife | Nu există o secțiune activă de tarife. Publicarea lor necesită informații confirmate și conținut/localizare explicită; fișierele vechi de pricing nu controlează pagina actuală |
| Email și formular | `siteConfig.ts` pentru adresă; secțiunea `contact` din `editorial.json` pentru etichete și feedback; variabilele EmailJS pentru transport |
| FAQ | `editorial.json`, secțiunea `faq` |
| Articole și categorii | `src/data/blogPosts.ts`; textele hub-ului în secțiunea `resources` din `editorial.json` |
| Confidențialitate și preferințe | `editorial.json`, secțiunea `legal`, în toate limbile |
| Portrete și logo | `public/images/`; referințe în `Home.tsx`, `About.tsx` și `Logo.tsx` |
| Titluri și descrieri SEO | `src/components/SEOHead.tsx`, textele active din `editorial.json` și datele articolelor |
| Pagini și navigare | `src/lib/routes.ts` și `src/SiteRoutes.tsx`; integrarea prerandării în `src/entry-server.tsx` |

Păstrează formularea și ordinea aprobate ale textelor românești Home/About din documentul sursă. Conținutul clinic nou, traducerile și informațiile profesionale necesită revizuire înainte de publicare. Nu adăuga tarife, acreditări, disponibilitate sau garanții de răspuns neconfirmate.

Păstrează ID-urile articolelor și ancorele serviciilor pentru a nu întrerupe linkurile existente. Articolele includ HTML controlat în repository; nu conecta acest câmp direct la conținut introdus de vizitatori sau dintr-un CMS fără validare și sanitizare adecvată.

Există și componente și fișiere de traducere din versiuni anterioare. Pentru paginile actuale, urmărește importurile din `SiteRoutes.tsx` și din componente; modificarea unui fișier neutilizat nu schimbă site-ul.

## Deployment

Platforma configurată este **GitHub Pages**, prin GitHub Actions. Artifact-ul publicat este directorul complet `dist/`, cu pagini prerandate, asset-uri, sitemap, `robots.txt`, `404.html` și `.nojekyll`.

1. În **Settings → Pages**, selectează **GitHub Actions** ca sursă. Păstrează workflow-ul **Deploy GitHub Pages** ca singur flux de publicare.
2. Confirmă URL-ul și base path-ul. Configurația din repository folosește `https://psiholog-mariavaleriastanculea.github.io/main-website` și `/main-website/`. Pentru un domeniu la rădăcină, valorile trebuie să folosească domeniul verificat și `/`.
3. Configurează cele trei variabile publice EmailJS în **Settings → Secrets and variables → Actions → Variables**. În template-ul furnizorului, fixează destinatarul la adresa cabinetului din `siteConfig.ts` și Reply-To la `{{reply_to}}`. Nu utiliza un destinatar controlat de vizitator.
4. Completează [condițiile de publicare](docs/implementation-review.md#publication-and-rollback-conditions): conținut, privacy, livrare reală, domeniu/HTTPS și rollback. Setează apoi variabilele repository `VITE_PRIVACY_REVIEWED=true` și `WEBSITE_RELEASE_APPROVED=true`.
5. Publică prin push pe `main` sau declanșare manuală a workflow-ului. Acesta validează sursele, construiește site-ul, rulează verificările, verifică aprobările și publică artifact-ul.
6. Verifică rutele, limbile, HTTPS și sosirea reală a emailului. Păstrează artifact-ul anterior verificat și configurația lui pentru rollback.

Workflow-ul citește valorile din `vars`: valorile introduse exclusiv în Secrets sau numai în mediul jobului de deploy nu completează variabilele repository ale jobului de build. O aprobare lipsă oprește publicarea; nu reprezintă o eroare de compilare.

După o modificare de configurare, reia workflow-ul de la build. Poți verifica un deployment față de artifact-ul local corespunzător cu:

```sh
npm run check:pages -- --url YOUR_DEPLOYMENT_URL
```

Verificatorul compară identitatea build-ului cu `dist/build-info.json`. Fără artifact-ul local, furnizează `--build-id EXPECTED_ID` din evidența build-ului de încredere. Workflow-ul de regresie validează pull request-uri fără să publice.

## SEO

- **Metadata:** titluri și descrieri localizate, limba documentului, canonical și `hreflang`, inclusiv varianta implicită română.
- **Sitemap și robots.txt:** generate la build de `scripts/postbuild-pages.mjs`, pe baza inventarului paginilor și URL-ului canonic.
- **Date structurate:** JSON-LD pentru `Person`, `WebSite`, `WebPage`, `AboutPage`, `ContactPage` și `BlogPosting`, după tipul paginii.
- **Open Graph:** titlu, descriere, imagine, URL și locale; sunt incluse și metadate pentru cardurile Twitter.
- **Indexare:** notificarea de confidențialitate rămâne `noindex` și este exclusă din sitemap până la revizuire. Paginile inexistente au recuperare și comportament 404.
- **Citire fără JavaScript:** conținutul principal este inclus în HTML-ul prerandat, inclusiv paginile de articole.
- **Local SEO:** identitatea este centralizată; proiectul nu integrează un profil Google Business verificat sau o schemă `LocalBusiness` cu adresă și program. Acestea necesită informații confirmate înainte de adăugare.

După schimbări de pagini, conținut sau URL, rulează `npm run build:github-pages`, `npm run check:seo` și `npm run check:pages`. Fișierul vechi `src/data/seoMetadata.ts` nu este sursa activă pentru metadata paginilor actuale.

## Privacy & Security

Formularul solicită **nume, adresă de email, categoria solicitării și un mesaj opțional**. Payload-ul include și limba și, când există, contextul serviciului ales. Aceste informații sunt transmise prin EmailJS către adresa cabinetului atunci când transportul este configurat; destinatarul trebuie fixat în template-ul furnizorului.

Draftul este păstrat numai în memoria aplicației, pentru navigare internă și schimbarea limbii. Reîncărcarea paginii îl elimină, iar acceptarea solicitării golește câmpurile personale. Preferința de aspect poate fi salvată în `localStorage`; limba este determinată de URL.

**Aplicația nu solicită și nu colectează prin câmpuri dedicate:** CNP, data nașterii, adresa domiciliului, numărul de telefon, documente medicale, diagnostic, date de plată sau fișiere atașate. Nu există conturi de utilizator, instrumente active de analytics/publicitate sau urmărire a locației. Formularul avertizează să nu fie introduse informații medicale ori alte date sensibile; mesajul liber poate totuși conține date introduse voluntar.

Nu se salvează drafturi în `localStorage` sau `sessionStorage` și nu se înregistrează conținutul formularului în logurile aplicației. Furnizorii de hosting și email pot prelucra date tehnice și datele transmise conform propriilor politici; aceste practici și retenția trebuie documentate în notificarea completă. Pagina legală include linkuri către politicile furnizorilor.

Măsurile din aplicație includ validarea câmpurilor, limitarea lungimii mesajului, acceptarea doar a contextelor de servicii cunoscute, blocarea trimiterilor concurente și feedback distinct pentru trimitere, acceptare, respingere, rezultat incert sau indisponibilitate. Erorile păstrează draftul, fără retry automat. Variabilele client conțin doar identificatori publici; fișierele locale de configurare sunt ignorate de Git.

Configurarea originilor permise, protecția antiabuz și verificarea livrării se fac și în contul EmailJS. Publicarea depinde de revizuirea completă a informațiilor de privacy; existența paginilor legale și a controalelor tehnice nu reprezintă o certificare GDPR.

## Accessibility

Standardul urmărit este [WCAG 2.2, nivel AA](https://www.w3.org/TR/WCAG22/). Implementările principale includ:

- Structură semantică, titluri ierarhice, regiuni de navigare și link pentru trecerea directă la conținut.
- Navigare prin tastatură, focus vizibil și restabilirea focusului după închiderea meniurilor sau schimbarea paginii.
- Etichete pentru formular, erori asociate câmpurilor și anunțarea stărilor de trimitere.
- Meniu mobil cu gestionarea focusului, închidere prin Escape și controale accesibile pe ecrane scurte.
- Text alternativ pentru portrete și ascunderea decorațiunilor față de tehnologiile asistive.
- Reflow pentru text mărit, traduceri lungi și ecrane înguste; respectarea `prefers-reduced-motion`.
- Conținut și link de email disponibile fără JavaScript în build-ul de producție.

Testele automate și verificările manuale susțin acest obiectiv, dar nu reprezintă un audit complet sau o declarație de conformitate. Testarea cu tehnologii asistive și utilizatori reali rămâne necesară.

## Performance

Nu sunt disponibile rezultate Lighthouse validate sau măsurători Core Web Vitals din trafic real. README-ul nu atribuie scoruri ori timpi neverificați.

Optimizările implementate includ portrete WebP cu variante responsive, dimensiuni explicite pentru imagini, încărcare amânată pentru imagini secundare, fonturi WOFF2 găzduite local cu preload și `font-display: swap`, separarea bundle-urilor și încărcarea EmailJS la trimitere. Paginile statice prerandate oferă conținut înaintea inițializării interfeței React.

Măsurătorile viitoare trebuie făcute pe artifact-ul de producție și să precizeze pagina, dispozitivul, browserul și condițiile de rețea. Rezultatele de laborator și datele din trafic real se documentează separat în rapoarte de performanță.

## Known Limitations

- Formularul necesită JavaScript și configurare EmailJS; fără acestea, contactul rămâne disponibil prin email. Solicitarea și acceptarea furnizorului nu confirmă programarea sau sosirea în inbox.
- Configurația de producție inclusă nu furnizează identificatorii EmailJS. Livrarea reală și revizuirea completă a notificării de confidențialitate sunt condiții încă de verificat înainte de release.
- Nu există calendar de programări, plăți, conturi, upload de documente sau CMS.
- Compatibilitatea nativă cu macOS/iOS, Android și Linux, precum și Safari/Firefox, nu este stabilită de emularea viewport-urilor pe Windows. Browserele mai vechi decât cerințele Tailwind 4 nu sunt acoperite.
- Traducerile și datele profesionale necesită validare editorială; articolele educative nu înlocuiesc evaluarea individuală.
- Conformitatea completă de accesibilitate, performanța în trafic real și optimizarea pentru căutare locală nu sunt validate integral.
- În repository există fișiere istorice neutilizate; acestea trebuie diferențiate de sursele active înainte de editare sau eliminare.

Condițiile și evidențele detaliate sunt în [implementation review](docs/implementation-review.md), [specificația de design](docs/website-design-and-usability-plan.md) și [revizuirea responsive/platforme](docs/responsive-and-platform-review-2026-10-03.md).

## Roadmap

Următoarele direcții sunt propuse sau rămân de finalizat; nu sunt prezentate ca funcționalități deja livrate:

- Revizuirea finală a conținutului clinic, traducerilor și informațiilor profesionale.
- Completarea notificării de confidențialitate și verificarea setărilor furnizorilor, protecției antiabuz și livrării reale a emailului.
- Verificarea domeniului, HTTPS, deployment-ului și procedurii de rollback înainte de publicare.
- Testare pe dispozitive native, în Safari/Firefox și cu tehnologii asistive, plus evaluare cu cititori reprezentativi.
- Măsurarea Lighthouse și Core Web Vitals, urmată de optimizări bazate pe rezultate.
- Adăugarea informațiilor verificate pentru local SEO, dacă practica confirmă adresa și datele publicabile.
- Consolidarea surselor de conținut și eliminarea controlată a fișierelor istorice neutilizate.

Planificarea și rapoartele fiecărei etape se păstrează în documente dedicate, fără a transforma README-ul într-un jurnal al modificărilor.
