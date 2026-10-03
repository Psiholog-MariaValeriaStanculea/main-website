# Revizuire locală a codului — 3 octombrie 2026

**Actualizare după remediere:** cele patru constatări de mai jos sunt închise local. [Raportul remedierilor și verificarea finală](code-review-fixes-2026-10-03.md) consemnează rezultatele curente. Descrierile și rezultatele inițiale de mai jos reprezintă starea dinaintea corecțiilor.

Au fost confirmate trei probleme de corectitudine/validare și o problemă cu prioritate redusă în pagina de eroare. Cea mai urgentă blochează suita obligatorie de browser și, implicit, publicarea prin workflow-ul existent.

Revizuirea privește starea actuală a proiectului, inclusiv modificările necomise și fișierele noi. Nu am modificat codul aplicației pentru a ascunde sau remedia constatările. Au fost adăugate acest raport și probe locale reproductibile; build-urile și testele au regenerat artefactele de verificare. Nu am consultat GitHub, site-ul public, contul EmailJS sau baze externe de vulnerabilități. Cererile către EmailJS din testele de contact au fost interceptate, cu identificatori fictivi.

## Constatări, în ordinea severității

### 1. [P1] Imaginile alternative ale logo-ului blochează testele obligatorii de rute

**Locație:** `src/components/Navigation.tsx:38–39`, în combinație cu `src/index.css:34` și `tests/browser/routes.spec.ts:31–33`.

Header-ul montează ambele imagini ale logo-ului și ascunde una cu `display:none`, în funcție de tema aplicată. Testul de încărcare/reîncărcare parcurge toate elementele `img` și încearcă să deruleze fiecare imagine în zona vizibilă. Playwright nu poate derula o imagine ascunsă; operația expiră după 30 de secunde. Logo-ul dark produce această eroare în light mode; logo-ul light ar produce aceeași eroare în dark mode.

**Reproducere locală:** `npm test` a eșuat pentru încărcarea directă a paginilor `ro`, `ro/despre` și `ro/servicii`, toate cu același timeout. Am oprit rularea după confirmarea repetată, pentru a evita repetarea aceleiași erori pentru toate rutele. Proba separată a confirmat explicit mesajul „element is not visible” la `.brand-logo-dark`. Site-ul se afișează; problema este incompatibilitatea implementării cu verificarea obligatorie. Workflow-urile de PR și publicare execută această suită, deci noul header împiedică trecerea lor.

**Remediere recomandată:** în test, verifică încărcarea tuturor imaginilor, dar execută `scrollIntoViewIfNeeded` numai pentru imaginile vizibile. Păstrează o verificare dedicată pentru schimbarea și încărcarea logo-ului în ambele teme. Alternativ, adaptează componenta astfel încât să existe o singură imagine, aleasă după tema efectivă a aplicației; preferința sistemului nu trebuie să înlocuiască o selecție explicită light/dark.

**Criteriu de închidere:** întreaga comandă `npm test` trebuie să treacă fără excluderea testelor de rute; aspectul și încărcarea ambelor variante ale logo-ului trebuie verificate.

### 2. [P2] Părăsirea și revenirea în Contact permit două trimiteri simultane

**Locație:** `src/pages/Contact.tsx:26–31,50–53` și `src/lib/inquiry.ts:9–13,25`.

Starea de trimitere și controller-ul aparțin instanței paginii Contact, în timp ce numai datele formularului sunt memorate între navigări. Părăsirea paginii apelează `dispose()`, care ascunde rezultatele ulterioare, dar nu oprește cererea deja pornită. La revenire, o nouă instanță pornește cu `pending:false`, restaurează aceleași date și activează butonul de trimitere.

**Reproducere locală:** am reținut răspunsul primei cereri interceptate, am deschis linkul de confidențialitate din formular și am revenit cu Back. Formularul a restaurat mesajul și a permis o nouă trimitere. Proba a înregistrat **două cereri simultane**, înainte de eliberarea primului răspuns. Nu a fost trimis niciun email real.

**Impact:** un utilizator care consultă informațiile despre date în timpul unei trimiteri lente poate trimite aceeași solicitare de două ori, fără să primească avertizarea de livrare incertă. Acceptarea primei cereri după părăsirea paginii nu actualizează starea restaurată și nu șterge draftul memorat.

**Remediere recomandată:** păstrează cererea, starea și rezultatul în memorie la nivelul aplicației, într-un store/context care supraviețuiește navigării dintre pagini. Contact trebuie să se aboneze/dezaboneze de la acea stare, fără să elimine rezultatul operației. Păstrează blocarea până la soluționarea cererii inițiale și elimină draftul după acceptare chiar dacă pagina nu este montată. Nu introduce stocarea persistentă a datelor personale.

**Criteriu de închidere:** acoperă „trimitere lentă → Confidențialitate → Back”, acceptarea/rejecția în timpul absenței și revenirea după timeout. Numărul cererilor trebuie să rămână unu până când prima cerere s-a încheiat.

### 3. [P2] Verificatorul de publicare acceptă o versiune veche și conținut greșit pentru rută

**Locație:** `scripts/check-pages.mjs:22–28`, utilizat de pasul final de verificare din `.github/workflows/deploy-github-pages.yml`.

`checkLive` verifică statusul, prezența unui heading/main și existența unor fișiere JS/CSS compilate. Nu compară identitatea build-ului cu versiunea așteptată și nu verifică limba, canonical-ul sau identitatea paginii pentru fiecare rută. Prin urmare, un răspuns vechi ori un fallback de homepage returnat cu HTTP 200 la `/en/contact/` poate trece verificarea.

**Reproducere complet locală:** am furnizat funcției un transport fictiv care returnează aceeași pagină română „OLD RELEASE” pentru toate cele trei rute și fișiere compilate fictive. Verificatorul a raportat „Pages HTTP checks passed”. Nicio cerere HTTP reală nu a fost efectuată. Acest rezultat demonstrează limita verificatorului; nu afirmă că site-ul public servește în prezent o versiune veche.

**Remediere recomandată:** adaugă un identificator al build-ului/commitului în artefact și transmite identitatea așteptată verificatorului. Verifică și limba/canonical-ul rutei, folosind manifestul așteptat. Pasul de după publicare trebuie să aștepte versiunea nouă, nu doar orice versiune compilată disponibilă. Include probe pentru versiune veche și homepage returnat la o rută diferită.

**Criteriu de închidere:** transportul fictiv din `verifier-probe.mjs` trebuie respins, iar un artefact cu identitatea și paginile așteptate trebuie acceptat.

### 4. [P3] Eroarea 404 fără JavaScript este disponibilă numai în română

**Locație:** `scripts/postbuild-pages.mjs:32`.

Se generează un singur `404.html`, în română. Cu JavaScript activ, routerul poate afișa eroarea în limba din URL; fără JavaScript, o adresă inexistentă din zona engleză/italiană/spaniolă afișează mesajul și navigarea în română.

**Reproducere locală:** `/en/does-not-exist/`, cu JavaScript dezactivat, a returnat HTTP 404, `html lang="ro"` și heading-ul „Pagina nu a fost găsită”. Statusul HTTP este corect; limita privește recuperarea într-o altă limbă.

**Remediere recomandată:** pentru fallback-ul static unic al GitHub Pages, oferă mesaje și linkuri de recuperare clar etichetate în toate cele patru limbi, în HTML-ul disponibil fără JavaScript. Evită să promiți selectarea server-side a limbii într-un host care nu oferă această funcție.

## Verificări efectuate

| Verificare locală | Rezultat |
| --- | --- |
| ESLint | Trecut |
| TypeScript, `npx tsc -b` | Trecut |
| Teste unitare | 33/33 trecute |
| Build GitHub Pages | Trecut; 60 pagini localizate generate |
| SEO și artefact Pages | Trecute; 56 pagini indexabile, patru pagini privacy noindex |
| `npm test`, suita integrală | **Nu trece**; oprită după trei timeout-uri identice în testele de rute |
| Browser, excluzând doar `direct load and reload` | 67 trecute, 15 omise conform condițiilor existente de dispozitiv/matrice |
| Contact simulat, build separat | 16/16 trecute; cereri interceptate |
| Probe suplimentare | Confirmate: logo ascuns, trimitere duplicată, 404 static român; ancora inițială `#online` rămâne vizibilă |
| Audit separat al rutelor, fără derularea logo-ului ascuns | 60 rute × 320/1440px: încărcare și reload, limbă, heading, canonical, imagini și lipsa overflow-ului verificate |
| Arbore local de dependențe, `npm ls --depth=0` | Fără dependențe directe lipsă/invalide |

Auditul separat de rute folosește `.contact-test-dist`, construit din aceleași surse, cu identificatori EmailJS fictivi. El explică de ce paginile pot funcționa chiar dacă testul obligatoriu de derulare eșuează; nu înlocuiește cerința ca suita originală să treacă.

## Acoperire și limite

Revizuirea a urmărit componentele și paginile active, starea Contact, navigarea și restaurarea poziției, tema și limbile, datele editoriale și articolele, HTML-ul prerenderat, metadatele, configurarea Vite/TypeScript/ESLint, scripturile de verificare și workflow-urile. Componentele UI instalate și modulele vechi au fost incluse în verificările de sursă și inventariate în raport cu traseul activ al aplicației.

Modulele moștenite `src/components/local/*`, `CookieBanner`, `Logo`, `Index`, `LanguageContext` și vechile namespace-uri de traduceri nu sunt folosite de paginile active revizuite. Textele/fluxurile lor vechi nu au fost raportate ca erori vizibile pe site. Curățarea lor poate reduce confuzia și CSS-ul generat, dar este o recomandare de întreținere, nu o vulnerabilitate demonstrată.

HTML-ul articolelor introdus cu `dangerouslySetInnerHTML` provine din datele statice ale proiectului; nu am găsit o cale din inputul vizitatorului către acel HTML. Scriptul JSON-LD escapează caracterul `<`. Nu am identificat o vulnerabilitate exploatabilă în aceste trasee locale; aceasta nu este o certificare de securitate și nu include verificarea unor advisory-uri externe.

Configurarea locală a formularului real este în continuare absentă, iar informațiile pentru publicare rămân în condițiile documentate în `implementation-review.md`. Nu am verificat livrarea reală, configurarea conturilor, domeniul public ori execuția workflow-urilor pe GitHub. Faptele clinice și juridice nu au fost validate sau rescrise în această revizuire de cod.

## Probe și reluare

Fișierele reproductibile sunt în `docs/code-review-local/`:

- `probes.config.ts` și `probes.spec.ts`: browser local pe portul 4190; toate cererile HTTPS sunt blocate sau interceptate.
- `defect-probe-results.json`: rezultatele inițiale ale reproducerilor.
- `route-audit-results.json`: matricea celor 120 de verificări de rute.
- `verifier-probe.mjs` și `verifier-probe-results.json`: reproducerea verificatorului, cu transport fictiv și zero cereri externe.

Din rădăcina proiectului:

```powershell
npm run test:contact
npx playwright test --config docs/code-review-local/probes.config.ts
node docs/code-review-local/verifier-probe.mjs
```

La revizuirea inițială, primele două probe erau intenționat verzi când reproduceau comportamentul greșit. După remediere, scripturile verifică comportamentul corect, iar regresiile sunt incluse și în suita principală. Rezultatele istorice `defect-probe-results.json` și `verifier-probe-results.json` nu sunt dovezi ale remedierii; rezultatele curente sunt `fix-probe-results.json` și `verifier-fix-results.json`, explicate în raportul remedierilor.
