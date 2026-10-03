# Verificare responsive și compatibilitate — 3 octombrie 2026

## Rezultat și domeniu

Site-ul păstrează tema, identitatea vizuală și textele aprobate. Ajustările vizează rearanjarea conținutului, accesul la controale și stabilitatea la schimbarea dimensiunii ferestrei. Lucrul și verificările s-au făcut local. Nu s-a publicat site-ul, nu s-au accesat conturi externe și nu s-au trimis mesaje prin EmailJS.

Au fost verificate Acasă, Despre mine, Servicii, Resurse, articolul reprezentativ, Întrebări frecvente, Contact și cele două pagini legale. Matricea responsive parcurge toate aceste pagini în română, în ambele teme; în engleză, italiană și spaniolă verifică Acasă, Servicii, FAQ și Contact în ambele teme. Suita funcțională separată acoperă încărcarea/reîncărcarea tuturor celor 60 de rute localizate și păstrarea textelor și ordinii din Despre/Servicii.

## Probleme găsite și ajustări

| Observație | Ajustare | Verificare |
| --- | --- | --- |
| La 280 px, numele și indicatorul limbii se fragmentau în header. | Nume și simbol proporționate pentru sub 360 px; controalele nu se comprimă; header-ul poate trece pe două rânduri la text mărit. | Numele rămâne un cuvânt la dimensiunea normală; limba nu se rupe pe rânduri. |
| În landscape foarte scurt, header-ul fix ocupa permanent o parte importantă din zona de citire. | Header normal, care se derulează cu pagina, până la 1279 px când înălțimea este cel mult 500 px; spațiere verticală mai compactă. | Profiluri 653×280 și 844×390; navigare și controale accesibile. |
| Într-un meniu lung, butonul de închidere putea ieși din zona vizibilă. | Antet fix în interiorul dialogului și corp de meniu care se derulează separat; `100dvh` cu alternativă `100%`; limitarea propagării derulării. | Închiderea rămâne în viewport după derularea până la email; redimensionare la numai 240 px înălțime. |
| Lipsea protecția pentru decupaje și indicatorul de jos al telefonului. | `viewport-fit=cover`; spațiu bazat pe `env(safe-area-inset-*)` pentru containere, header, footer și dialog. | Simulare Chromium cu 44 px lateral și 21 px jos. |
| Cardurile de sprijin, secțiunea finală și FAQ-ul de pe Acasă puteau depăși sau tăia textul la mărire. | Coloane `minmax(0,1fr)`, copii cu `min-width:0`, întrebări care permit rearanjarea cuvintelor și spațiere compactă sub 360 px. | Text 200%, spațiere între litere/cuvinte și verificarea limitelor textului, inclusiv în panouri care ascund decorațiuni. |
| Câmpurile Contact ajungeau la 14 px de la lățimea de tabletă, printr-o regulă a componentelor UI. | Câmpurile au 1 rem/16 px la dimensiunea standard, inclusiv pe tabletă și desktop. | Măsurarea fontului calculat în fiecare profil. Aceasta reduce riscul de zoom automat pe iOS; iOS real nu a fost testat. |
| Panoul de email era sticky și pe ferestre prea scurte. | Panoul Contact este static sub 700 px înălțime. | Profiluri de tabletă landscape și ferestre scurte. |
| Textul mobil se putea redimensiona automat la rotire. | `text-size-adjust:100%`, inclusiv prefixul WebKit. | Textul se rearanjează fără a dezactiva zoom-ul utilizatorului. |

Lățimea de lectură rămâne limitată la 76 rem pentru containere și aproximativ 66 de caractere pentru articole. Pe ultrawide nu se întind paragrafele pe întreaga lățime a monitorului. Curbura fizică a unui ecran nu schimbă viewport-ul CSS; au fost verificate proporțiile și spațiul de lectură, nu un monitor curbat fizic.

## Matricea de ecrane

Toate dimensiunile sunt în **pixeli CSS**, nu în pixeli fizici. DPR modelează densitatea rasterului; nu echivalează cu verificarea nativă a sistemului de operare sau cu toate comportamentele zoom-ului browserului.

| Profil | Dimensiune | DPR | Interacțiune |
| --- | --- | --- | --- |
| Foldable îngust, pliat | 280×653 | 2 | Touch |
| Telefon mic | 320×568 | 2 | Touch |
| Telefon de dimensiune Android | 360×800 | 3 | Touch |
| Telefon Retina | 390×844 | 3 | Touch |
| Telefon mare | 430×932 | 3 | Touch |
| Landscape foarte scurt | 653×280 | 2 | Touch |
| Landscape telefon | 844×390 | 3 | Touch |
| Foldable, fereastră intermediară | 540×720 | 2 | Touch |
| Foldable deschis | 717×512 | 2 | Touch |
| Tabletă portrait, 4:3 rotit | 768×1024 | 2 | Touch |
| Tabletă mare portrait | 820×1180 | 2 | Touch |
| Tabletă landscape | 1024×768 | 2 | Touch |
| Tabletă/fereastră scurtă | 1024×600 | 2 | Touch |
| Tabletă lată | 1180×820 | 2 | Touch |
| Înainte de breakpoint sm | 639×900 | 1 | Mouse/tastatură |
| La breakpoint sm | 640×900 | 1 | Mouse/tastatură |
| Înainte de breakpoint md | 767×900 | 1 | Mouse/tastatură |
| Înainte de breakpoint lg | 1023×900 | 1 | Mouse/tastatură |
| Înainte de navigarea desktop | 1279×900 | 1 | Mouse/tastatură |
| Navigare desktop | 1280×900 | 1 | Mouse/tastatură |
| Laptop | 1366×768 | 1 | Mouse/tastatură |
| Desktop Retina, 16:10 | 1440×900 | 2 | Mouse/tastatură |
| Desktop cu densitate fracționară | 1536×864 | 1,25 | Mouse/tastatură |
| Full HD, 16:9 | 1920×1080 | 1 | Mouse/tastatură |
| QHD, 16:9 | 2560×1440 | 1 | Mouse/tastatură |
| Ultrawide, clasa 21:9 | 3440×1440 | 1 | Mouse/tastatură |
| Super ultrawide, 32:9 | 3840×1080 | 1 | Mouse/tastatură |
| 4K, 16:9 | 3840×2160 | 1 | Mouse/tastatură |

Chrome și Edge parcurg suplimentar profilurile 280×653, 844×390, 1280×900 și 3440×1440. Scenariile suplimentare verifică zonele sigure, redimensionarea dialogului, păstrarea draftului Contact la pliere/rotire și închiderea meniului când apare navigarea desktop. Mărirea textului la 200% plus spațiere suplimentară este verificată pentru toate limbile pe Acasă, Despre, Servicii și Resurse la 320 și 1280 px; Contact și FAQ sunt acoperite și de suita existentă.

## Sisteme de operare și limite

Mediul efectiv este Windows, build `10.0.26200.0`. Versiunile browserelor citite local sunt Chromium `153.0.8010.12`, Chrome `154.0.8037.93` și Edge `154.0.4258.53`. Inventarul este în [responsive-browser-environment.json](responsive-browser-environment.json).

| Platformă cerută | Luată în considerare prin | Ce nu a fost confirmat nativ |
| --- | --- | --- |
| Windows 10 și 11 | Scrollbar clasic, Chrome/Edge reale pe gazda Windows, densitate fracționară și tastatură. | Instalare Windows 10 separată și toate setările de scalare/contrast ale OS. |
| macOS | Fonturi locale incluse, profil Retina și 16:10, navigare prin tastatură. | Safari/macOS și randarea fonturilor pe un Mac real. |
| iOS/iPadOS | Touch, viewport corect, câmpuri de 16 px, zone sigure, portrait/landscape și dialog cu înălțime dinamică. | Safari mobil, tastatura reală, VoiceOver și barele browserului pe hardware Apple. |
| Android | Touch, telefoane cu DPR 2/3, foldable îngust/deschis, rotire și păstrarea draftului. | Chrome Android real, tastaturi OEM, TalkBack și schimbări de postură care reîncarcă pagina. |
| Linux — Ubuntu/Debian/Fedora/Arch etc. | Fonturi web incluse și layout bazat pe capabilitățile browserului, fără detectarea distribuției. Workflow-urile sunt pregătite pentru Ubuntu 24.04. | Rulări native pe aceste distribuții sau o rulare CI nouă. |

Firefox și WebKit nu sunt instalate în mediul local; nu s-au descărcat browsere și nu s-au declarat aceste motoare testate. Schimbarea User-Agent-ului nu a fost folosită ca dovadă de compatibilitate OS. Testarea unui viewport scurt simulează spațiul disponibil, nu certifică tastatura nativă. Foldable-urile au fost simulate ca suprafețe continue de afișare; dispozitivele cu două ecrane și o balama opacă care acoperă conținutul necesită verificare fizică separată.

## Fișiere și `.gitignore`

[project-file-inventory.json](project-file-inventory.json) inventariază fișierele proiectului, inclusiv fișierele temporare istorice, cu dimensiuni, categorie, stare Git și hash pentru fișierele care nu sunt medii de configurare. Valorile `.env` nu sunt publicate în inventar. Sunt excluse explicit dependențele instalate, metadatele Git, build-urile, rapoartele automate și cache-urile. Inventarul și validările structurale nu sunt un audit de securitate al fiecărei linii.

Verificările includ JSON/JSONC, ambele workflow-uri YAML, importurile locale, semnăturile imaginilor și fonturilor, referințele statice spre imagini publice, text UTF-8, lint și TypeScript pentru întregul arbore de surse/teste. Helper-ul Python de import PDF a fost verificat sintactic prin `ast.parse`, fără a reimporta sau modifica textele aprobate.

Fișierul vechi `src/assets/logo.png` conținea doar o instrucțiune textuală de copiere, nu o imagine, și nu avea importuri. A fost eliminat. Logo-urile reale din `public/images` rămân păstrate. Trei imagini vechi din `public/lovable-uploads` sunt JPEG valide cu extensie PNG; URL-urile publice existente au fost păstrate și diferența este înregistrată ca observație. Favicon-ul vechi este un PNG valid.

În `.gitignore` au fost adăugate rapoartele responsive, rapoartele Playwright agregate, coverage, cache-uri Vite, `*.tsbuildinfo`, capturile temporare `/.tmp-*`, mediile locale `.env*` cu excepții explicite pentru `.env.example` și `.env.production`, cache Python și metadate Windows/macOS. Datele incrementale TypeScript sunt acum scrise în `node_modules/.cache`, evitând actualizarea cache-ului din rădăcină.

**22 de artefacte temporare sunt deja urmărite de Git**: 20 de capturi `.tmp-*` și două fișiere `.tsbuildinfo`. Adăugarea regulilor nu le scoate automat din index. Nu s-a modificat indexul Git și nu s-au șters copiile locale; acestea sunt identificate separat în inventar pentru o eventuală operație `git rm --cached`. Imaginile, fonturile, lockfile-urile, textele aprobate și documentele de lucru nu au fost ascunse prin reguli generale. Capturile selectate din `docs/qa` rămân dovezi de review; directorul include și capturi istorice mari, care pot fi arhivate separat înainte de un commit.

## Verificare și reproducere

Rezultatele finale: lint și TypeScript au trecut; helper-ul Python este sintactic valid; 40/40 teste unitare, 193 teste funcționale de browser (15 cazuri omise intenționat pentru acoperire specifică dispozitivului), 111/111 teste responsive și 22/22 teste Contact au trecut. Total: **366 teste trecute**, fără teste eșuate. Cele 111 cazuri responsive includ 87 în Chromium și câte 12 în Chrome și Edge. Fiecare caz de lectură parcurge mai multe pagini, limbi și teme, deci numărul de navigări verificate este mai mare decât numărul de cazuri.

Build-ul GitHub Pages, verificările SEO pentru 56 de pagini indexabile și verificările celor 60 de rute au trecut. Întregul lanț `npm test`, cu ambele canale locale suplimentare, s-a încheiat cu exit code 0. La final au trecut verificările a **349 de fișiere**, 63 JSON/JSONC, două YAML, 241 de importuri locale, 118 semnături de imagini/fonturi și 13 referințe statice spre imagini publice. Preview-ul local servește build-ul verificat `12c8b3819311f84bb0ec544872ac6838fea5cf3cd79a0b1c76878bdd89ed798d`; identitatea a fost comparată cu artefactul local, împreună cu trei rute reprezentative și cinci resurse de producție.

```powershell
npm run lint
npx tsc -b
$env:RESPONSIVE_CHANNELS='chrome,msedge'
npm test
Remove-Item Env:RESPONSIVE_CHANNELS
npm run check:files -- --report
npm run check:pages -- --url http://127.0.0.1:4181/main-website
```

`npm test` include acum auditul fișierelor și matricea responsive. Workflow-urile locale au primit aceleași verificări înainte de orice publicare; nu au fost rulate pe GitHub. Testele de Contact folosesc o copie de build și identificatori fictivi, cu cererile furnizorului interceptate. Livrarea EmailJS reală rămâne neconfirmată.

Capturi selectate: [header 280 px](qa/responsive-narrow-280.png), [meniu landscape](qa/responsive-landscape-menu.png), [Despre pe foldable, dark](qa/responsive-fold-717-dark.png), [Contact pe fereastră scurtă](qa/responsive-contact-1024-short.png), [FAQ mobil, dark](qa/responsive-faq-390-dark.png), [FAQ Acasă cu text mărit](qa/responsive-home-text-200-faq.png), [ultrawide](qa/responsive-ultrawide-3440.png) și [zona de lectură ultrawide](qa/responsive-ultrawide-reading-area.png).

Preview local: http://127.0.0.1:4181/main-website/ro/. Reîncărcarea paginii afișează build-ul actual; nu reprezintă publicarea în producție.
