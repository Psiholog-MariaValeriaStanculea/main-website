# Remedierea celor patru constatări — 3 octombrie 2026

Toate cele patru constatări din [revizuirea locală](code-review-local-2026-10-03.md) sunt remediate și verificate în proiect. Modificările și verificările au fost efectuate local; nu a fost publicată o versiune, nu a fost contactat contul EmailJS și nu a fost trimis email real. Conținutul clinic și traducerile aprobate au fost păstrate.

| Constatare | Remediere | Dovadă de închidere |
| --- | --- | --- |
| P1: logo-ul ascuns blochează testele | Testele derulează numai imaginile vizibile, verificând încărcarea tuturor imaginilor. Testul de temă verifică varianta vizibilă, varianta ascunsă și încărcarea logo-ului pentru System/Dark/Light, inclusiv Light explicit cu sistem Dark și după reload. | Toate cele 60 de rute trec încărcarea și reload-ul la 320 și 1440px. Suportul pentru cele două imagini ale logo-ului rămâne funcțional. |
| P2: Contact permite cereri concurente după navigare | `InquiryProvider` păstrează draftul, controller-ul și rezultatul la nivelul aplicației. Contact se poate demonta fără să piardă cererea. Acceptarea șterge datele personale inclusiv în absența paginii; respingerea păstrează draftul pentru retry explicit. Transportul existent este separat în `inquiryTransport.ts`. | Teste cu trimitere reținută → Privacy → Back → timeout → schimbare de limbă: o singură cerere, câmpuri/buton blocate și feedback corect. Acceptarea și respingerea în absența Contact sunt reținute pe desktop și mobil. Nicio persistență a datelor formularului în localStorage/sessionStorage. |
| P2: verificatorul acceptă un build vechi sau ruta greșită | Postbuild calculează o identitate SHA-256 a artefactului compilat/prerenderat și o inserează în toate paginile HTML și în `build-info.json`. Verificatorul compară identitatea așteptată, limba și canonical-ul. Workflow-ul transmite identitatea din jobul de build către verificarea de după deploy. | Teste negative pentru identitate veche/lipsă, fallback român la Contact englez, homepage englez în loc de Contact, canonical pe alt host și amestecarea build-urilor în artefact. Proba fictivă inițială este respinsă. Preview-ul local cu identitatea corectă trece. Workflow-ul a fost verificat local prin parsare/test, fără execuție pe GitHub. |
| P3: 404 fără JavaScript este numai în română | `404.html` include un heading universal 404 și patru carduri cu mesaje/linkuri existente în RO/EN/IT/ES, fiecare cu atributul `lang`. Header-ul fără JavaScript ascunde controalele inactive și navigarea duplicată, oferind spațiu numelui și linkurilor de limbă. Cu JavaScript rămâne pagina de eroare localizată. | Cereri pentru pagini inexistente în toate cele patru prefixe păstrează HTTP 404/noindex; toate cardurile și destinațiile sunt verificate. Linkul de recuperare în engleză funcționează fără JavaScript. Capturi desktop/mobil inspectate, fără overflow orizontal. |

## Verificare finală

| Verificare | Rezultat |
| --- | --- |
| `npm run lint` | Trecut |
| `npx tsc -b` | Trecut |
| `npm test`, lanț integral | Trecut, cod de ieșire 0 |
| Teste unitare | 40 trecute |
| Build GitHub Pages | Trecut; 60 de pagini localizate |
| SEO / artefact Pages | Trecute; 56 de pagini indexabile și patru pagini privacy noindex |
| Browser pe artefactul de producție | 189 trecute, 15 omise conform condițiilor existente; nicio excludere nouă |
| Contact, artefact separat cu identificatori fictivi | 22 trecute, toate cererile interceptate |
| Probe locale inițiale transformate în regresii | 4 trecute; auditul suplimentar de 120 de rute nu a fost repetat deoarece suita principală acoperă această matrice |
| `node docs/code-review-local/verifier-probe.mjs` | Trecut: artefactul fictiv vechi este respins; zero cereri externe |
| Verificator HTTP pe preview-ul existent, port 4181 | Trecut: build așteptat, trei pagini și cinci active JS/CSS |

Identitatea artefactului de producție verificat: `6f5956d4c7438523f385d16432f4d6ea7764eef9354eee27f0957732fc506c0f`. Build-ul separat `.contact-test-dist` nu înlocuiește `dist` și nu trebuie publicat.

Probe curente: [fix-probe-results.json](code-review-local/fix-probe-results.json), [verifier-fix-results.json](code-review-local/verifier-fix-results.json). Rezultatele inițiale ale defectelor sunt păstrate separat ca evidență istorică. Capturi inspectate: [404 desktop fără JavaScript](qa/404-no-js-desktop.png), [404 mobil fără JavaScript](qa/404-no-js-mobile.png).

Draftul și cererea sunt păstrate pe durata aceleiași sesiuni de aplicație, inclusiv navigarea SPA și Back. Un reload complet începe o sesiune nouă. Lipsa configurării reale EmailJS rămâne `contactConfigured:false`; livrarea în inbox, comportamentul domeniului public și execuția efectivă a workflow-ului nu au fost verificate în această intervenție locală. Condițiile existente de publicare rămân documentate în [implementation-review.md](implementation-review.md).
