# Conținut, discoverability și validare — 4 octombrie 2026

Au fost implementate numai etapele 4 și 5 autorizate. Etapa 4 este implementată și verificată tehnic. Etapa 5 are verificările locale și pregătirea artifact-ului încheiate; publicarea este blocată de condițiile documentate mai jos. Nu au fost adăugate pagini de tarife, o pagină nouă pentru prima ședință, servicii noi, un redesign al homepage-ului sau Analytics.

## Conținut și proveniență

Cele șase articole există în RO/EN/IT/ES. Afirmațiile despre stabilitatea progresului, prevenirea cronicizării, „dublarea” intensității conflictului și rezultatul unei intervenții au fost reformulate prudent în toate limbile. Titlul și introducerea articolului despre familie descriu un sprijin posibil, fără promisiunea unui ritm sau a unei calități garantate a progresului. Biografia aprobată din `master-about.json` nu a fost modificată.

Autorul și durata estimată a lecturii rămân vizibile. Fiecare articol afișează data reală a acestei revizuiri editoriale și a surselor: 4 octombrie 2026. Aceasta nu reprezintă o dată a publicării sau o aprobare clinică independentă. Cele șase date istorice, fără proveniență confirmată, au fost eliminate; schema nu emite `datePublished`. Un clinician trebuie să aprobe materialul înainte de publicare, iar traducerile necesită aprobare umană.

Referințele vizibile sunt selectate după subiect; nu pretind să valideze fiecare propoziție sau metoda particulară a cabinetului. Titlurile surselor rămân în engleză, cu această explicație tradusă și atribut `lang="en"` pe linkuri.

| Articol | Referință și scop |
| --- | --- |
| Terapia prin joc | [Association for Play Therapy](https://www.a4pt.org/page/WhyPlayTherapy): rolul jocului, exprimarea și implicarea familiei. Conținutul primar a fost consultat prin rezultatul indexat; accesul direct automat a răspuns 403. Nu este declarat un test HTTP 200 pentru această sursă. |
| Comunicarea cu adolescentul | [UNICEF](https://www.unicef.org/parenting/child-care/11-tips-communicating-your-teen): ascultare, validarea sentimentelor și respectarea perspectivei adolescentului. |
| Anxietatea la copii | [NHS](https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/anxiety-in-children/): anxietate, sprijin și solicitarea ajutorului când afectează viața cotidiană. |
| Limite sănătoase | [UNICEF](https://www.unicef.org/parenting/child-care/how-discipline-your-child-smart-and-healthy-way): așteptări realiste, limite și consecințe calme, fără umilire. |
| Furia la copii | [NHS — furie](https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/help-your-child-with-anger-issues/) și [NHS — sentimente](https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/talk-to-children-about-feelings/): înțelegerea emoțiilor, modalități de sprijin și ajutor suplimentar. |
| Familia în terapie | NHS — sentimente și Association for Play Therapy: adulți de încredere, context și implicare adaptată. Nu justifică promisiuni universale despre rezultate. |

## Adrese și indexare

`src/data/articleMetadata.ts` este sursa unică pentru cele 24 de slug-uri, referințe și data revizuirii. ID-urile stabile 1–6 sunt păstrate. Exemplu: `/ro/blog/1` conduce la `/ro/blog/terapia-prin-joc-dezvoltarea-copilului`, iar schimbarea limbii duce la slug-ul tradus pentru același articol. Linkurile din colecții și articolele asociate folosesc direct adresele canonice. Schimbarea limbii păstrează query-ul, fragmentul și contextul colecției.

Inventarul include 88 de pagini: 52 indexabile, 12 pagini juridice noindex și 24 de aliasuri numerice excluse din sitemap. Sitemap-ul și HTML-ul folosesc aceleași canonical/hreflang, iar articolele au `lastmod`, imagine socială proprie și `BlogPosting` cu `dateModified` și referințele vizibile. Nu există revendicări SEO inventate despre adresă, tarife, program sau acreditări.

GitHub Pages nu oferă reguli configurabile de redirect HTTP 301. Aliasurile sunt HTML prerandat cu canonical și meta refresh imediat, plus înlocuirea rutei la navigare React. Funcționează și fără JavaScript; răspunsul inițial al aliasului este HTTP 200, nu 301. [Documentația Google](https://developers.google.com/search/docs/crawling-indexing/301-redirects) distinge aceste mecanisme. Meta refresh folosește pathname-ul pentru a păstra hostul preview/restaurat. Query-urile arbitrare nu sunt propagate de redirectul HTML static; adresele canonice și schimbarea limbii le păstrează în aplicație.

## Verificări executate

Candidat: `24dd7f13a580d4d716217c0a8ea475ad6a1a77356737aec0fd9592567d89033a`.

| Verificare | Rezultat |
| --- | --- |
| ESLint, TypeScript, fișiere/importuri/asset-uri și conținut în patru limbi | PASS |
| Teste unitare | 52 PASS |
| Build de producție, SEO și structură GitHub Pages | PASS; 88 rute, 52 URL-uri indexabile |
| Browser desktop și 320 px | Prima rulare: 247 PASS, 17 SKIP și 10 teste noi nereușite din cauza interacțiunii testului și a așteptării greșite a slash-ului final. Testele noi au fost corectate și rerulate separat: 10/10 PASS. Nicio defecțiune rămasă; 257 verificări trecute în total. |
| Responsive | 90/90 PASS; 28 profiluri de 280–3840 px, ambele teme, plus scenarii de dispozitiv, focus și text mărit |
| Contact/reCAPTCHA izolat | 60/60 PASS; cereri interceptate și tokenuri fictive, fără email real sau challenge Google |
| Restaurare locală | Snapshot salvat, inventar/hash-uri verificate, restaurat într-un director nou; verificare HTTP cu build ID independent: 3 pagini și 5 asset-uri PASS; suplimentar, toate cele 88 de rute restaurate au build ID și canonical corecte, iar o rută absentă răspunde 404 |
| Release | BLOCKED; opt condiții pending și fapte juridice necompletate |

Rulările Node/Vite/Chromium au necesitat acces la subprocess-uri; prima încercare sandbox pentru unit/files a fost blocată cu EPERM și a fost reluată pe calea permisă. Capturile articolelor sunt în `docs/qa/article-discovery-{desktop,mobile}-2026-10-04.png`. Verificările de reflow/focus nu reprezintă o certificare completă WCAG. Nu au fost măsurate Core Web Vitals de teren sau garantate rezultate în motoarele de căutare.

## Publicare și condiții rămase

[Auditul live separat](qa/content-discovery-live-2026-10-04.json) a verificat 91 de cereri de pagini/inventar: 49 răspunsuri 200, 42 răspunsuri 404; șase asset-uri compilate. Certificatul GitHub Pages este valid, iar HTTP redirecționează 301 la HTTPS. Nicio pagină verificată nu are build ID-ul candidatului. Cele 24 de slug-uri noi sunt încă nepublicate; versiunii live îi lipsesc și unele pagini pregătite anterior. `valeriastanculea.ro` răspunde DNS ENOTFOUND; proprietatea și schimbarea domeniului nu sunt confirmate.

Publicarea nu a fost declanșată. `docs/release-readiness.json` și workflow-ul mențin cele opt condiții existente: aprobarea clinică, actualitatea informațiilor profesionale, traducerile, confidențialitatea, furnizorii/antiabuz, emailul real, domeniul și rollback-ul. Lipsesc CIF-ul, adresa profesională și înregistrarea/codul, confirmările operaționale privind retenția și acordurile, challenge-ul real și primirea Inbox/Spam cu Reply-To. Restaurarea locală nu dovedește un rollback de producție.

După completarea acestor dovezi, se rulează `npm run check:ci` și `npm run check:release`, se păstrează artifact-ul aprobat și se publică prin workflow-ul existent. Verificarea imediată live trebuie să compare build ID-ul independent, toate rutele canonice și aliasurile, HTTPS, asset-urile, 404 și livrarea reală. Procedura rămâne în [rollback.md](rollback.md). Nu se publică `.contact-test-dist`, care conține configurare fictivă.
