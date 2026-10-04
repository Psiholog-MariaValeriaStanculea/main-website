# Revizuirea juridică a site-ului — 4 octombrie 2026

Textele au fost reconstruite pentru **Cabinet Individual Psihologie - Stănculea Maria Valeria**, în română, engleză, italiană și spaniolă. Sunt versiuni pregătite pentru completare și validare, nu o certificare juridică a cabinetului. Verificarea este limitată la actele și sursele disponibile la **4 octombrie 2026**; nu poate acoperi modificări ulterioare din această lună.

Titularul a confirmat consultațiile online, contractul transmis/încheiat prin email și plata separată prin transfer bancar. Site-ul nu are checkout, semnare sau procesator de carduri. Titularul a amânat comunicarea CIF-ului, adresei și identificatorilor profesionali; nu au fost inventate. NETOPIA, partenerii și diplomele nu sunt afișate în footer. Rămâne doar bannerul SAL, fără ancora ANPC duplicată.

## Conținutul pregătit

Sursa activă este `src/locales/{ro,en,it,es}/editorial.json`, secțiunea `legal`: 14 secțiuni GDPR, opt secțiuni cookies și 12 secțiuni termeni, cu aceeași ordine și ancore în fiecare limbă. Pagina are cuprins, data revizuirii, avertizare privind faptele lipsă, politici asociate și surse. Toate cele 12 pagini juridice sunt `noindex,follow` și excluse din sitemap cât timp `VITE_PRIVACY_REVIEWED` nu este `true`. Activarea acelui flag nu validează juridic textele.

Formularul folosește **„Am citit politica de confidențialitate”**, cu traduceri echivalente. Este confirmarea citirii unei informări, nu temei GDPR universal, acord pentru marketing, consimțământ clinic sau acord pentru înregistrări. Confirmarea este în memoria aplicației și nu constituie o arhivă probatorie a consimțământului.

## Legislație și consecințe pentru implementare

| Sursă primară | Aspect verificat | Tratament în texte / limită |
| --- | --- | --- |
| [GDPR, Regulamentul (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=ro), art. 5, 6, 9, 12–22, 28, 30, 32–35, 37, 44–49 | Scopuri, minimizare, informare, drepturi, date sensibile, furnizori și transferuri | Art. 6(1)(b) pentru demersuri precontractuale cerute/contract; art. 6(1)(f) pentru întrebări generale/securitate, condiționat de evaluarea interesului legitim; art. 6(1)(c) pentru obligații. Pentru date clinice este necesară suplimentar o condiție art. 9; art. 9(2)(h)/9(3) este condiționat de încadrarea legală și secretul profesional. Nu este presupus un temei comun tuturor activităților. |
| [Legea 190/2018](https://legislatie.just.ro/Public/DetaliiDocumentAfis/203151) | Aplicarea națională GDPR | Inclusă în cadrul surselor; nu înlocuiește analiza activităților reale. |
| [Legea 506/2004](https://legislatie.just.ro/Public/DetaliiDocument/257056), art. 4(5)–(6) | Stocare/acces în terminal; excepții strict limitate | Lipsa Analytics nu dovedește automat scutirea reCAPTCHA de consimțământ. Necesitatea trebuie documentată; tehnologiile neesențiale se blochează înainte de acord. Simpla navigare și alegerea titularului site-ului nu sunt consimțământul vizitatorului. |
| [Legea 213/2004](https://legislatie.just.ro/Public/DetaliiDocument/52375), [HG 788/2005](https://legislatie.just.ro/Public/DetaliiDocumentAfis/64016) | Profesie reglementată, competențe, confidențialitate | Titlul și specialitățile trebuie corelate cu atestatele actuale; secretul profesional nu dispare la încetarea relației. Publicarea nu validează autorizațiile. |
| [Codul deontologic, forma consolidată 11.05.2023](https://legislatie.just.ro/Public/DetaliiDocument/267043), pct. 22–27, 39, 42, 44 | Consimțământ informat, minori, înregistrări, păstrare | Informare înainte de servicii inclusiv online; pentru consiliere/psihoterapie cu autoritate părintească comună, acordul ambilor părinți, sub rezerva excepțiilor aplicabile. Înregistrarea necesită acord prealabil. Probele, rezultatele, însemnările și înregistrările profesionale: minimum zece ani după relația profesională, sau mai mult dacă legea impune. Nu se aplică automat oricărui mesaj de contact. |
| [Legea 365/2002, art. 5](https://legislatie.just.ro/Public/DetaliiDocument/279868) | Identificarea accesibilă a furnizorului, inclusiv profesii reglementate | CIF/adresă/înregistrare/cod profesional sunt încă lipsă. Nu este suficient un nume de brand pentru o pagină juridică finală. |
| [OUG 34/2014, forma consolidată din 2026](https://legislatie.just.ro/Public/DetaliiDocument/307805), art. 3(3)(b), 6–16 | Contracte la distanță și excluderea unor servicii de sănătate | Încadrarea trebuie stabilită pentru fiecare serviciu; nu sunt excluse automat toate serviciile psihologice. Dacă se aplică, contractul prin email necesită informare precontractuală completă, procedură/model de retragere și analiza solicitării de începere anticipată. Plata nu este renunțare automată la drepturi. |
| [OUG 18/2026](https://legislatie.just.ro/Public/FormaPrintabila/00000G0HZ56D1BQ7EXI160ZCPYYD5LHD), art. II pct. 13, art. IV | Modificări OUG 34: funcția de retragere pentru interfețe online, aplicabilă din 19.06.2026; alte modificări din 27.09.2026 | Actualizarea din 2026 a fost verificată. Nu există o interfață proprie de încheiere de contract pe acest site. Aplicabilitatea exactă la fluxul real prin email și orice platformă terță trebuie revizuită împreună cu contractul; nu este declarată o scutire generală pe baza lipsei checkout-ului. |
| [OG 38/2015](https://legislatie.just.ro/Public/DetaliiDocument/170960), art. 2(2)(g), [Ordinul 449/2022 consolidat](https://legislatie.just.ro/Public/DetaliiDocument/257649?fs=e&s=cl), [Ordinul 270/2026](https://legislatie.just.ro/Public/DetaliiDocument/310590) | SAL, servicii de sănătate, model și link banner | Lipsa unui magazin nu demonstrează singură exceptarea unui site care promovează servicii. Pentru sănătate există excluderi ce necesită încadrare. Bannerul a fost păstrat la solicitarea titularului, fără a promite admisibilitatea universală a reclamațiilor. Modelul oficial actual este local, afișat 250 × 50, link `https://reclamatiisal.anpc.ro/`. |
| [Regulamentul (UE) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj/eng) | Închiderea platformei europene SOL/ODR la 20.07.2025 | Bannerul și linkul vechi nu sunt publicate. SAL nu este prezentat ca redenumire a platformei ODR. |
| [ANSPDCP — plângeri](https://www.dataprotection.ro/?page=Plangeri_pagina_principala) | Autoritate competentă pentru date | Contact explicit și drept la plângere/instanță; răspuns GDPR de regulă gratuit în o lună, cu extensia justificată de două luni și informare în prima lună. Nu cerem automat copie CI. |

## Furnizori: declarație publică versus verificarea contului

- [Google FAQ, actualizat 30.09.2026](https://docs.cloud.google.com/recaptcha/docs/faq), [Cloud DPA](https://cloud.google.com/terms/data-processing-addendum), [Service Terms](https://cloud.google.com/terms/service-terms): Google declară trecerea la rol de împuternicit din 02.04.2026. Interfața proprie nu mai trimite la Privacy/Terms generale Google; trimite la secțiunea securitate a informării cabinetului. Integrarea v2 legacy rămâne suportată. Condițiile acceptate și entitatea contului trebuie verificate; declarația Google nu certifică întregul site.
- [EmailJS privacy, 08.09.2026](https://www.emailjs.com/legal/privacy-policy/), [DPA](https://www.emailjs.com/legal/data-protection-agreement/): declarație publică de 30 zile pentru datele conturilor active, procesare SUA și clauze standard. Nu a fost verificată ștergerea automată a istoricului acestui cont, backup-urile sau copiile anterioare. Istoricul personal este activ conform opțiunii titularului; Analytics este dezactivat.
- [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement): găzduire și date tehnice, cu entitatea/mecanismul transferului de stabilit pentru contul real.
- Gmail este confirmat ca serviciu conectat; nu se presupune Google Workspace sau un DPA Workspace pentru un cont consumer. Tipul contului, contractul și adecvarea pentru datele ce ajung efectiv acolo necesită verificare.

Nu am modificat conturile sau acceptat acorduri juridice în numele titularului în această etapă.

## Regula de păstrare propusă și pașii operaționali

| Date | Regula pregătită | Ce trebuie pus în practică |
| --- | --- | --- |
| Gmail, solicitări care nu duc la contract | Șase luni de la ultima interacțiune; regulă de minimizare propusă, nu termen legal universal | Titularul adoptă regula, verifică lunar mesajele eligibile și gestionează separat Trash, arhive, exporturi și backup-uri. Nu se aplică dosarelor clinice sau mesajelor necesare unor obligații/litigii documentate. Nu a fost instalată o automatizare de ștergere și nu s-au șters mesaje. |
| Istoric EmailJS | 30 zile potrivit declarației furnizorului | Verificarea duratei efective, planului/contului, exporturilor și ștergerii. Nu promitem o capacitate de configurare încă nedovedită. |
| Probe, rezultate, însemnări și înregistrări profesionale | Minimum zece ani după încheierea relației, conform pct. 42; termene mai lungi când legea impune | Procedură distinctă, acces limitat, locații/copii și distrugere sigură la expirarea termenului. Nu înseamnă că trebuie create înregistrări audio/video. |
| Contracte, facturi și dovezi de plată | Termenele legale specifice și necesitatea apărării drepturilor | Stabilite împreună cu evidența fiscală și contractul real; nu confundate cu termenul mesajelor inițiale. |

## Ce împiedică validarea finală

1. Completarea CIF/adresei/înregistrării/codului profesional și confirmarea competențelor autorizate.
2. Revizuirea contractului real: tarife/regim fiscal, programare, anulare/reprogramare, încetare/retragere pentru fiecare serviciu, minori și informare clinică; platforma online și regulile înregistrărilor.
3. Documentarea destinatarilor cu acces, acordurilor art. 28 și transferurilor art. 44–49, inclusiv Gmail/EmailJS/Google/GitHub/platforma online. Nu se presupune că fiecare furnizor are același rol pentru toate prelucrările.
4. Inventarul efectiv cookies pe domeniul final: nume, host, durată, date și scop; evaluarea necesității reCAPTCHA automat. Dacă excepția art. 4(6) nu se justifică, este necesară integrarea unei opțiuni valide înaintea încărcării. Alegerea titularului pentru încărcare automată nu rezolvă această analiză.
5. Implementarea retenției/deletion, evidența activităților de prelucrare, analiza interesului legitim și măsurile concrete de securitate/incident. Se evaluează necesitatea DPIA și DPO pentru scara și riscurile reale; nu sunt declarate automat obligatorii sau automat inutile pentru un cabinet individual. Excepția de la registru pentru sub 250 angajați nu se presupune când prelucrarea datelor speciale este regulată.
6. Validarea umană a textelor și traducerilor și numai apoi schimbarea flag-ului de review. Formularul include categorii ce pot dezvălui sănătatea chiar fără mesaj clinic: evaluarea nu se limitează la textul liber.

## Limitele QA

Build, paritatea limbilor, rutarea, CSS și testele formularului sunt verificări software. Testele reCAPTCHA folosesc tokenuri fictive și cereri interceptate, fără expediere externă. Nu demonstrează un challenge real, livrarea/Reply-To sau conformitatea operațională GDPR.

Dovezile tehnice ale candidatului final sunt în `docs/qa/contact-legal-review-2026-10-04.json`. Publicarea și rollback-ul real de producție nu au fost efectuate. Condiția Google pentru domeniul local și primirea reală a emailului rămân nevalidate până la dovada respectivă.
