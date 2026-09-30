import { defaultLanguage, type SupportedLanguage } from "@/lib/i18n";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategoryId;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

type BlogCategoryId =
  | "play-therapy"
  | "child-development"
  | "parental-counseling"
  | "adolescent-therapy"
  | "family-dynamics";

type BlogPostTranslation = Pick<BlogPost, "title" | "excerpt" | "content" | "readTime">;

type BlogPostBase = Omit<BlogPost, "title" | "excerpt" | "content" | "readTime">;

const closeupPortrait = `${import.meta.env.BASE_URL}lovable-uploads/3001f3a4-f5d4-4ee9-8512-a8602b56875e.png`;
const standingPortrait = `${import.meta.env.BASE_URL}lovable-uploads/83e7a272-918c-44bb-8772-c1de1e40660d.png`;
const seatedPortrait = `${import.meta.env.BASE_URL}lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png`;

const categoryOrder: BlogCategoryId[] = [
  "play-therapy",
  "child-development",
  "parental-counseling",
  "adolescent-therapy",
  "family-dynamics",
];

const categoryLabels: Record<BlogCategoryId, Record<SupportedLanguage, string>> = {
  "play-therapy": {
    ro: "Terapie prin joc",
    en: "Play therapy",
    es: "Terapia de juego",
    it: "Terapia del gioco",
  },
  "child-development": {
    ro: "Dezvoltarea copilului",
    en: "Child development",
    es: "Desarrollo infantil",
    it: "Sviluppo del bambino",
  },
  "parental-counseling": {
    ro: "Consiliere parentală",
    en: "Parent guidance",
    es: "Orientación parental",
    it: "Consulenza genitoriale",
  },
  "adolescent-therapy": {
    ro: "Terapie pentru adolescenți",
    en: "Adolescent therapy",
    es: "Terapia para adolescentes",
    it: "Terapia per adolescenti",
  },
  "family-dynamics": {
    ro: "Dinamica familiei",
    en: "Family dynamics",
    es: "Dinámicas familiares",
    it: "Dinamiche familiari",
  },
};

const baseBlogPosts: BlogPostBase[] = [
  {
    id: "1",
    category: "play-therapy",
    author: "Valeria Stănculea",
    date: "2024-01-15",
    image: seatedPortrait,
    featured: true,
  },
  {
    id: "2",
    category: "adolescent-therapy",
    author: "Valeria Stănculea",
    date: "2024-01-10",
    image: closeupPortrait,
  },
  {
    id: "3",
    category: "child-development",
    author: "Valeria Stănculea",
    date: "2024-01-05",
    image: standingPortrait,
  },
  {
    id: "4",
    category: "parental-counseling",
    author: "Valeria Stănculea",
    date: "2024-01-01",
    image: seatedPortrait,
  },
  {
    id: "5",
    category: "child-development",
    author: "Valeria Stănculea",
    date: "2023-12-28",
    image: closeupPortrait,
  },
  {
    id: "6",
    category: "family-dynamics",
    author: "Valeria Stănculea",
    date: "2023-12-20",
    image: standingPortrait,
  },
];

const localizedPostContent: Record<SupportedLanguage, Record<string, BlogPostTranslation>> = {
  ro: {
    "1": {
      title: "Terapia prin joc: ce susține cu adevărat în dezvoltarea copilului",
      excerpt:
        "Terapia prin joc nu înseamnă doar activități plăcute, ci un cadru clinic în care copilul poate exprima emoții, experiențe și nevoi pe care încă nu le poate formula în cuvinte.",
      readTime: "6 min",
      content: `
        <h2>De ce jocul este limbajul firesc al copilului</h2>
        <p>Pentru mulți copii, jocul este forma cea mai naturală de a arăta ce simt, ce îi sperie, ce îi încurcă sau ce își doresc. Un copil mic nu are întotdeauna vocabularul necesar pentru a spune direct „mi-e teamă”, „mă simt singur” sau „nu știu cum să mă opresc când mă enervez”. În schimb, aceste teme apar spontan în joc, în felul în care construiește, repetă o scenă, evită anumite obiecte sau caută control asupra unui scenariu.</p>
        <p>În terapie, jocul nu este folosit la întâmplare. El devine un instrument clinic prin care copilul este observat, înțeles și însoțit. Ritmul, temele recurente, felul în care intră în relație și modul în care tolerează frustrarea oferă informații valoroase despre lumea lui internă.</p>
        <h2>Ce poate susține terapia prin joc</h2>
        <p>Terapia prin joc este utilă atunci când copilul trece prin anxietate, dificultăți de separare, reacții intense de furie, schimbări familiale, experiențe stresante sau dificultăți de reglare emoțională. De multe ori, scopul nu este „să îl facem să se poarte mai bine” cât mai repede, ci să înțelegem ce stă sub comportament și să construim treptat mai multă siguranță, flexibilitate și capacitate de autoreglare.</p>
        <ul>
          <li>creșterea capacității de a recunoaște și exprima emoțiile;</li>
          <li>procesarea experiențelor dificile într-un cadru sigur;</li>
          <li>dezvoltarea toleranței la frustrare și a flexibilității;</li>
          <li>consolidarea relației cu adulții de referință.</li>
        </ul>
        <h2>Rolul părinților în proces</h2>
        <p>În lucrul cu copiii, progresul este mult mai stabil atunci când părinții sunt parte a procesului. Asta poate însemna întâlniri de ghidaj parental, ajustări de rutină acasă, o mai bună înțelegere a factorilor declanșatori și un mod mai coerent de răspuns în momentele tensionate. Copilul are nevoie să fie susținut nu doar în cabinet, ci și în mediile în care trăiește zilnic.</p>
        <p>Terapia prin joc nu promite soluții rapide, dar oferă un cadru profund și potrivit dezvoltării copilului. Când este bine indicată și bine susținută, ea ajută copilul să se simtă mai în siguranță cu propriile emoții și mai disponibil pentru relație și învățare.</p>
      `,
    },
    "2": {
      title: "Cum construiești o comunicare mai bună cu adolescentul tău",
      excerpt:
        "Adolescența aduce mai multă autonomie, dar și mai multă sensibilitate la control, critică și neînțelegere. Comunicarea devine mai bună când relația rămâne fermă, dar nu invazivă.",
      readTime: "7 min",
      content: `
        <h2>De ce apar blocaje în comunicare</h2>
        <p>Mulți părinți descriu adolescența ca pe o perioadă în care „nu mai pot ajunge” la copilul lor. De fapt, adolescentul nu renunță la nevoie de relație, ci își schimbă felul în care o negociază. Are nevoie de mai mult spațiu, de mai mult control asupra propriei vieți și de mai puțină intruziune. Când adultul insistă prea mult, corectează rapid sau intră direct în rezolvarea problemei, adolescentul se retrage sau răspunde defensiv.</p>
        <h2>Ce ajută concret</h2>
        <p>Comunicarea eficientă începe cu capacitatea adultului de a regla tensiunea din conversație. Tonul, momentul ales și disponibilitatea de a asculta fără a contrazice imediat contează mai mult decât „argumentele bune”. Adolescenții reacționează mai bine când se simt respectați și luați în serios, chiar și atunci când adultul are o limită clară.</p>
        <ul>
          <li>începe conversațiile dificile în momente neutre, nu în plin conflict;</li>
          <li>reflectă ce ai auzit înainte să corectezi sau să dai sfaturi;</li>
          <li>formulează limite clare și scurte, fără predici lungi;</li>
          <li>diferențiază între comportamentul pe care îl corectezi și valoarea adolescentului ca persoană.</li>
        </ul>
        <h2>Ce merită evitat</h2>
        <p>Întrebările în rafală, sarcasmul, comparațiile cu alți copii și interpretările grăbite deteriorează rapid relația. La fel, monitorizarea excesivă poate produce obediență aparentă, dar nu dezvoltă asumarea responsabilității. Obiectivul nu este controlul total, ci dezvoltarea unei relații în care adolescentul poate cere ajutor fără să se teamă că va fi rușinat sau invalidat.</p>
        <p>Când conflictele se repetă și conversațiile se închid constant, poate fi util un spațiu terapeutic în care atât adolescentul, cât și părinții să înțeleagă mai clar ce se activează în relație și cum pot schimba dinamica într-un mod sustenabil.</p>
      `,
    },
    "3": {
      title: "Semnele anxietății la copii și felul în care poți interveni util",
      excerpt:
        "Anxietatea la copii nu arată întotdeauna ca teamă declarată. Uneori apare prin evitări, plâns, iritabilitate, somatizări sau nevoie crescută de reasigurare.",
      readTime: "7 min",
      content: `
        <h2>Cum se vede anxietatea în viața de zi cu zi</h2>
        <p>La copii, anxietatea poate fi mai puțin verbală și mai mult comportamentală. Unii copii spun că îi doare burta înainte de școală, alții refuză separarea, devin rigizi când se schimbă rutina sau au nevoie constantă de confirmări. De multe ori, adulții interpretează aceste semnale ca răsfăț, opoziție sau lipsă de autonomie, deși copilul încearcă de fapt să gestioneze un nivel de tensiune pe care nu îl poate regla singur.</p>
        <h2>Semnale care merită urmărite</h2>
        <ul>
          <li>evitarea unor situații obișnuite, precum școala, somnul singur sau activitățile sociale;</li>
          <li>plângeri fizice repetate fără cauză medicală clară;</li>
          <li>iritabilitate, izbucniri sau blocaje în contexte percepute ca solicitante;</li>
          <li>nevoie intensă de control, de anticipare sau de reasigurare din partea adulților.</li>
        </ul>
        <h2>Ce ajută din partea părinților</h2>
        <p>Primul pas este validarea. Nu înseamnă să confirmi că pericolul este real, ci să arăți că emoția copilului este văzută și înțeleasă. Un copil anxios are nevoie de un adult calm, previzibil și ferm, nu de explicații lungi sau de presiune de tipul „nu ai de ce să te temi”.</p>
        <p>Ajută să menții rutinele, să pregătești din timp tranzițiile și să fragmentezi provocările în pași mici. Dacă adultul intră într-o spirală de reasigurare fără limită, anxietatea se poate menține. Dacă, în schimb, forțează prea abrupt confruntarea, copilul se poate bloca și mai mult. Echilibrul este în susținere + încurajare graduală.</p>
        <p>Când anxietatea începe să afecteze somnul, școala, relațiile sau funcționarea familiei, evaluarea psihologică și intervenția timpurie pot preveni cronicizarea. Cu sprijin potrivit, copilul învață treptat să tolereze mai bine incertitudinea și să își recâștige sentimentul de siguranță.</p>
      `,
    },
    "4": {
      title: "Cum construiești limite sănătoase fără să pierzi relația cu copilul",
      excerpt:
        "Limitele clare nu înseamnă severitate, ci predictibilitate. Copilul are nevoie să știe ce este permis, ce nu și cum rămâne relația stabilă chiar și când apare frustrarea.",
      readTime: "6 min",
      content: `
        <h2>De ce sunt limitele atât de importante</h2>
        <p>Limitele îi oferă copilului structură și siguranță. Ele îl ajută să înțeleagă ce se așteaptă de la el, ce se întâmplă când apare o dificultate și cum poate gestiona frustrarea fără să simtă că relația cu adultul este în pericol. În lipsa lor, copilul poate deveni mai dezorganizat, mai nesigur sau mai conflictual.</p>
        <h2>Ce face o limită să fie sănătoasă</h2>
        <p>O limită utilă este clară, realistă, repetabilă și proporțională cu vârsta copilului. Ea nu se schimbă în funcție de dispoziția adultului și nu este comunicată prin umilire, amenințare sau rușinare. Copilul poate protesta, poate fi frustrat sau supărat, dar are nevoie să întâlnească un adult care rămâne ferm și reglat.</p>
        <ul>
          <li>spune regula în propoziții scurte și ușor de înțeles;</li>
          <li>leagă limita de context, nu de etichete despre copil;</li>
          <li>folosește consecințe logice, nu pedepse disproporționate;</li>
          <li>menține relația: „nu te las să lovești, sunt aici să te ajut să te oprești”.</li>
        </ul>
        <h2>Unde apar frecvent dificultățile</h2>
        <p>Multe familii oscilează între permisivitate și explozie. Când adultul tolerează prea mult, copilul acumulează și testează tot mai intens. Când apoi limita vine doar în vârf de tensiune, ea este trăită ca arbitrară sau amenințătoare. Coerența zilnică este mai eficientă decât reacțiile dure, dar rare.</p>
        <p>Limitele sănătoase nu se opun relației; ele o fac mai sigură. Când copilul știe că adultul îl poate conține fără a-l respinge, apare mai multă încredere, mai multă cooperare și mai puțină luptă pentru control.</p>
      `,
    },
    "5": {
      title: "Furia la copii: cum o înțelegi și cum o gestionezi fără escaladare",
      excerpt:
        "Furia nu este problema în sine. Dificultatea apare atunci când copilul nu are încă resursele necesare pentru a tolera frustrarea, a cere ajutor și a se opri la timp.",
      readTime: "8 min",
      content: `
        <h2>Ce ascunde de multe ori furia</h2>
        <p>În spatele episoadelor de furie putem găsi oboseală, supraîncărcare senzorială, rușine, anxietate, neputință sau dificultăți de tranziție. Când adultul vede doar comportamentul și răspunde exclusiv la intensitatea lui, pierde informația esențială: copilul este depășit de propriul sistem emoțional.</p>
        <h2>Ce face diferența în momentul critic</h2>
        <p>În plin episod, explicațiile lungi nu ajută. Copilul are nevoie mai întâi de contenție, nu de argumente. Asta înseamnă voce mai joasă, propoziții scurte, puțini stimuli și un adult care nu intră într-o luptă de putere. Dacă adultul răspunde cu furie la furia copilului, intensitatea se dublează.</p>
        <ul>
          <li>redu stimulii și păstrează cât mai puține cerințe în momentul crizei;</li>
          <li>numește simplu ceea ce vezi: „ești foarte furios, te ajut să te oprești”;</li>
          <li>amână explicațiile și consecințele pentru după reglare;</li>
          <li>observă tiparele: ce precedă episoadele și ce le menține.</li>
        </ul>
        <h2>Ce construim după episod</h2>
        <p>Munca importantă se face după ce copilul s-a liniștit. Acolo putem învăța împreună ce s-a întâmplat, ce a declanșat reacția, ce semnale timpurii au existat și ce alternative putem exersa. Furia se gestionează mai bine când copilul are un vocabular emoțional mai bogat și o experiență repetată de reglare împreună cu un adult.</p>
        <p>Dacă episoadele sunt foarte frecvente, foarte intense sau afectează semnificativ familia și școala, merită investigat dacă există și alte vulnerabilități: anxietate, ADHD, dificultăți senzoriale, rigiditate sau stres familial acumulat. Intervenția potrivită reduce simptomul tocmai pentru că tratează contextul din care el apare.</p>
      `,
    },
    "6": {
      title: "De ce implicarea familiei schimbă ritmul și calitatea progresului în terapie",
      excerpt:
        "În terapia copilului, schimbarea devine mai stabilă când adulții din jurul lui înțeleg ce susține dificultatea și ce poate susține dezvoltarea.",
      readTime: "8 min",
      content: `
        <h2>Copilul nu se dezvoltă izolat</h2>
        <p>Orice simptom al copilului apare și se menține într-un context relațional. Asta nu înseamnă că familia este „de vină”, ci că mediul emoțional, stilul de răspuns al adulților, presiunile zilnice și istoricul relațional influențează felul în care copilul funcționează. Din acest motiv, terapia centrată exclusiv pe copil are limite atunci când nu există și o înțelegere a sistemului din care face parte.</p>
        <h2>Ce înseamnă implicare utilă</h2>
        <p>Implicarea familiei nu înseamnă că părinții trebuie să fie prezenți în fiecare ședință sau că totul se mută pe umerii lor. Înseamnă, mai degrabă, să existe spații regulate de reflecție în care adulții pot înțelege mai clar nevoile copilului, factorii declanșatori, sensul unui comportament și felul în care pot răspunde mai coerent acasă.</p>
        <ul>
          <li>alinierea adulților importanți în jurul unor obiective comune;</li>
          <li>ajustarea rutinelor și a modului de răspuns în situații-cheie;</li>
          <li>susținerea generalizării progresului din cabinet în viața de zi cu zi;</li>
          <li>scăderea tensiunii și a confuziei din relațiile apropiate.</li>
        </ul>
        <h2>De ce accelerează progresul</h2>
        <p>Un copil poate învăța în cabinet o experiență nouă de reglare, de exprimare sau de relație. Dacă însă mediul cotidian rămâne neschimbat, acest progres se menține mai greu. Atunci când părinții înțeleg procesul și participă activ, copilul primește aceleași repere în mai multe contexte: acasă, la școală, în relațiile apropiate.</p>
        <p>În multe cazuri, cea mai importantă schimbare nu este dispariția imediată a unui comportament, ci faptul că familia începe să răspundă diferit la el. Acolo se schimbă climatul emoțional, iar copilul poate folosi mai bine resursele pe care le construiește în terapie.</p>
      `,
    },
  },
  en: {
    "1": {
      title: "Play therapy: what it really supports in a child's development",
      excerpt:
        "Play therapy is not simply a pleasant activity. It is a clinical setting where children can express emotions, experiences, and needs they cannot yet put into words.",
      readTime: "6 min",
      content: `
        <h2>Why play is a child's natural language</h2>
        <p>For many children, play is the most natural way to show what they feel, what frightens them, what confuses them, or what they long for. Young children do not always have the vocabulary to say directly, “I am scared,” “I feel alone,” or “I do not know how to stop when I get angry.” Those themes often appear instead in the way they build, repeat scenes, avoid certain objects, or try to control a story.</p>
        <p>In therapy, play is not used casually. It becomes a clinical tool through which the child can be observed, understood, and accompanied. Pace, recurring themes, the way the child enters relationship, and the way frustration is tolerated all offer meaningful information about the child's inner world.</p>
        <h2>What play therapy can support</h2>
        <p>Play therapy can be helpful when a child is dealing with anxiety, separation difficulties, intense anger, family changes, stressful experiences, or problems with emotional regulation. The goal is often not to make the child “behave better” as quickly as possible, but to understand what sits underneath the behaviour and build greater safety, flexibility, and self-regulation over time.</p>
        <ul>
          <li>strengthening the child's ability to recognize and express emotions;</li>
          <li>processing difficult experiences in a safe setting;</li>
          <li>developing frustration tolerance and flexibility;</li>
          <li>supporting the bond with key caregivers.</li>
        </ul>
        <h2>The role of parents in the process</h2>
        <p>When working with children, progress is more stable when parents are part of the process. That may include parent guidance sessions, adjustments to routines at home, a clearer understanding of triggers, and a more coherent way of responding in tense moments. Children need support not only in the therapy room, but also in the environments where they live every day.</p>
        <p>Play therapy does not promise quick fixes, but it offers a deep and developmentally appropriate framework. When it is well indicated and well supported, it helps children feel safer with their emotions and more available for connection and learning.</p>
      `,
    },
    "2": {
      title: "How to build better communication with your teenager",
      excerpt:
        "Adolescence brings more autonomy, but also greater sensitivity to control, criticism, and misunderstanding. Communication improves when the relationship stays firm without becoming intrusive.",
      readTime: "7 min",
      content: `
        <h2>Why communication often gets blocked</h2>
        <p>Many parents describe adolescence as the moment when they can no longer “reach” their child. In reality, teenagers do not lose their need for connection; they change how they negotiate it. They need more space, more ownership of their own lives, and less intrusion. When adults push too hard, correct too quickly, or jump straight into problem solving, teenagers often withdraw or become defensive.</p>
        <h2>What helps in practice</h2>
        <p>Effective communication starts with the adult's ability to regulate tension in the conversation. Tone, timing, and the willingness to listen without immediately contradicting or advising often matter more than having the perfect argument. Teenagers respond better when they feel respected and taken seriously, even when the adult is setting a clear limit.</p>
        <ul>
          <li>start difficult conversations in calm moments, not in the middle of a conflict;</li>
          <li>reflect back what you heard before correcting or advising;</li>
          <li>state limits clearly and briefly instead of giving long lectures;</li>
          <li>separate the behaviour you are addressing from the young person's value as a person.</li>
        </ul>
        <h2>What is worth avoiding</h2>
        <p>Rapid-fire questions, sarcasm, comparisons with other children, and rushed interpretations quickly damage trust. Excessive monitoring can also create apparent compliance without building real responsibility. The aim is not total control, but a relationship in which the teenager can ask for help without fearing shame or invalidation.</p>
        <p>When conflict becomes repetitive and conversations repeatedly collapse, therapy can offer a useful space for both teenager and parents to understand what gets activated in the relationship and how the pattern can change in a sustainable way.</p>
      `,
    },
    "3": {
      title: "Signs of anxiety in children and how to respond helpfully",
      excerpt:
        "Anxiety in children does not always look like obvious fear. It may show up as avoidance, tears, irritability, physical complaints, or a constant need for reassurance.",
      readTime: "7 min",
      content: `
        <h2>How anxiety shows up in daily life</h2>
        <p>In children, anxiety is often less verbal and more behavioural. Some complain of stomach aches before school, some resist separation, some become rigid when routines change, and others constantly seek reassurance. Adults can easily read these signs as stubbornness, overdependence, or defiance, when in fact the child is trying to manage a level of internal tension they cannot yet regulate alone.</p>
        <h2>Signs worth paying attention to</h2>
        <ul>
          <li>avoiding ordinary situations such as school, sleeping alone, or social activities;</li>
          <li>repeated physical complaints without a clear medical cause;</li>
          <li>irritability, shutdowns, or meltdowns in situations experienced as demanding;</li>
          <li>an intense need for control, anticipation, or reassurance from adults.</li>
        </ul>
        <h2>What helps from parents</h2>
        <p>Validation is the first step. That does not mean confirming that danger is real; it means showing the child that their emotional experience is seen and understood. An anxious child needs a calm, predictable, and steady adult more than long explanations or pressure in the form of “there is nothing to be afraid of”.</p>
        <p>It helps to keep routines stable, prepare transitions in advance, and break challenges into smaller steps. Endless reassurance can unintentionally maintain anxiety, while pushing too fast can intensify the child's fear. The balance lies in support combined with gradual encouragement.</p>
        <p>When anxiety starts affecting sleep, school, relationships, or the overall functioning of family life, early psychological support can prevent it from becoming more entrenched. With the right help, children gradually learn to tolerate uncertainty better and recover a stronger sense of safety.</p>
      `,
    },
    "4": {
      title: "How to build healthy limits without damaging the relationship",
      excerpt:
        "Clear limits are not about severity. They are about predictability. Children need to know what is allowed, what is not, and how the relationship stays safe even when frustration appears.",
      readTime: "6 min",
      content: `
        <h2>Why limits matter so much</h2>
        <p>Limits give children structure and safety. They help them understand what is expected, what happens when a difficulty appears, and how frustration can be managed without feeling that the relationship with the adult is at risk. Without them, children can become more disorganized, more insecure, or more conflictual.</p>
        <h2>What makes a limit healthy</h2>
        <p>A helpful limit is clear, realistic, repeatable, and appropriate for the child's age. It does not change according to the adult's mood and it is not communicated through humiliation, threats, or shame. Children may protest or feel frustrated, but they still need to meet an adult who remains firm and regulated.</p>
        <ul>
          <li>state the rule in short, understandable sentences;</li>
          <li>link the limit to the situation, not to negative labels about the child;</li>
          <li>use logical consequences rather than disproportionate punishments;</li>
          <li>keep the relationship present: “I will not let you hit, and I am here to help you stop.”</li>
        </ul>
        <h2>Where difficulties often appear</h2>
        <p>Many families oscillate between permissiveness and explosion. When adults tolerate too much, children accumulate tension and test harder. When the limit then appears only at the peak of tension, it is experienced as arbitrary or threatening. Daily consistency is usually more effective than rare but harsh reactions.</p>
        <p>Healthy limits do not work against the relationship; they make it safer. When children know the adult can contain them without rejecting them, trust increases, cooperation grows, and struggles for control tend to decrease.</p>
      `,
    },
    "5": {
      title: "Anger in children: how to understand it and manage it without escalation",
      excerpt:
        "Anger is not the problem in itself. The difficulty appears when a child does not yet have the resources to tolerate frustration, ask for help, and stop in time.",
      readTime: "8 min",
      content: `
        <h2>What anger often hides</h2>
        <p>Behind angry outbursts we often find exhaustion, sensory overload, shame, anxiety, helplessness, or difficulty with transitions. When adults focus only on the behaviour and respond only to its intensity, they miss the central point: the child is overwhelmed by their own emotional system.</p>
        <h2>What matters in the critical moment</h2>
        <p>In the middle of an outburst, long explanations rarely help. The child first needs containment, not arguments. That means a lower voice, short sentences, fewer stimuli, and an adult who does not enter a power struggle. If the adult answers anger with anger, intensity usually doubles.</p>
        <ul>
          <li>reduce stimulation and keep demands to a minimum during the crisis;</li>
          <li>name simply what you see: “You are very angry, and I will help you stop”;</li>
          <li>leave explanations and consequences for after regulation;</li>
          <li>observe patterns: what comes before the episodes and what keeps them going.</li>
        </ul>
        <h2>What gets built afterwards</h2>
        <p>The deeper work happens once the child is calm again. That is when you can reflect together on what happened, what triggered the reaction, what early signs were present, and what alternatives can be practised. Anger becomes easier to manage when children have a richer emotional vocabulary and repeated experiences of co-regulation with an adult.</p>
        <p>If episodes are very frequent, very intense, or significantly affect family life and school, it is worth exploring other vulnerabilities as well: anxiety, ADHD, sensory difficulties, rigidity, or accumulated family stress. The right intervention helps precisely because it addresses the context in which the symptom appears.</p>
      `,
    },
    "6": {
      title: "Why family involvement changes the pace and quality of progress in therapy",
      excerpt:
        "In child therapy, change becomes more stable when the adults around the child understand both what sustains the difficulty and what can support development.",
      readTime: "8 min",
      content: `
        <h2>Children do not develop in isolation</h2>
        <p>Any symptom a child shows appears and is maintained in a relational context. That does not mean the family is to blame. It means that the emotional climate, the adults' response patterns, daily pressures, and relationship history all influence how the child functions. For that reason, therapy focused only on the child has limits when there is no understanding of the wider system the child belongs to.</p>
        <h2>What useful involvement looks like</h2>
        <p>Family involvement does not mean parents need to be present in every session or that everything is placed on their shoulders. It means creating regular spaces for reflection where adults can better understand the child's needs, triggers, the meaning of a behaviour, and the ways they can respond more coherently at home.</p>
        <ul>
          <li>aligning the important adults around shared goals;</li>
          <li>adjusting routines and responses in key situations;</li>
          <li>supporting the transfer of progress from the therapy room into daily life;</li>
          <li>reducing tension and confusion in close relationships.</li>
        </ul>
        <h2>Why it speeds up progress</h2>
        <p>A child may learn a new experience of regulation, expression, or relationship in therapy. If daily life remains unchanged, that progress is harder to sustain. When parents understand the process and participate actively, the child receives the same reference points in several contexts: at home, at school, and in close relationships.</p>
        <p>In many cases, the most important change is not the immediate disappearance of a behaviour, but the fact that the family begins to respond differently to it. That is where the emotional climate changes, and where the child can make better use of the resources being built in therapy.</p>
      `,
    },
  },
  es: {
    "1": {
      title: "Terapia de juego: lo que realmente puede sostener en el desarrollo infantil",
      excerpt:
        "La terapia de juego no es solo una actividad agradable. Es un espacio clínico donde el niño puede expresar emociones, experiencias y necesidades que todavía no logra poner en palabras.",
      readTime: "6 min",
      content: `
        <h2>Por qué el juego es el lenguaje natural del niño</h2>
        <p>Para muchos niños, el juego es la forma más espontánea de mostrar lo que sienten, lo que les asusta, lo que les confunde o lo que necesitan. Los niños pequeños no siempre tienen el vocabulario para decir directamente “tengo miedo”, “me siento solo” o “no sé cómo parar cuando me enfado”. En cambio, estos temas suelen aparecer en la forma en que construyen, repiten escenas, evitan ciertos objetos o intentan controlar una historia.</p>
        <p>En terapia, el juego no se usa al azar. Se convierte en una herramienta clínica para observar, comprender y acompañar al niño. El ritmo, los temas que se repiten, la forma de entrar en relación y la tolerancia a la frustración ofrecen información valiosa sobre su mundo interno.</p>
        <h2>Qué puede apoyar la terapia de juego</h2>
        <p>La terapia de juego puede ser útil cuando el niño atraviesa ansiedad, dificultades de separación, reacciones intensas de enfado, cambios familiares, experiencias estresantes o dificultades de regulación emocional. Muchas veces el objetivo no es “que se porte mejor” lo antes posible, sino entender qué hay debajo del comportamiento y construir poco a poco más seguridad, flexibilidad y capacidad de autorregulación.</p>
        <ul>
          <li>fortalecer la capacidad de reconocer y expresar emociones;</li>
          <li>elaborar experiencias difíciles en un entorno seguro;</li>
          <li>desarrollar tolerancia a la frustración y mayor flexibilidad;</li>
          <li>reforzar el vínculo con los adultos de referencia.</li>
        </ul>
        <h2>El papel de los padres en el proceso</h2>
        <p>Cuando se trabaja con niños, el progreso es más estable si los padres forman parte del proceso. Eso puede incluir sesiones de orientación parental, ajustes en las rutinas de casa, una mejor comprensión de los desencadenantes y una respuesta más coherente en momentos de tensión. El niño necesita apoyo no solo en consulta, sino también en los contextos donde vive cada día.</p>
        <p>La terapia de juego no promete soluciones rápidas, pero ofrece un marco profundo y adecuado al desarrollo. Cuando está bien indicada y bien acompañada, ayuda al niño a sentirse más seguro con sus emociones y más disponible para el vínculo y el aprendizaje.</p>
      `,
    },
    "2": {
      title: "Cómo construir una mejor comunicación con tu hijo adolescente",
      excerpt:
        "La adolescencia trae más autonomía, pero también más sensibilidad al control, la crítica y la incomprensión. La comunicación mejora cuando la relación se mantiene firme sin volverse invasiva.",
      readTime: "7 min",
      content: `
        <h2>Por qué la comunicación se bloquea con facilidad</h2>
        <p>Muchos padres describen la adolescencia como una etapa en la que “ya no pueden llegar” a su hijo. En realidad, el adolescente no pierde la necesidad de vínculo; cambia la forma en que lo negocia. Necesita más espacio, más control sobre su propia vida y menos intrusión. Cuando el adulto insiste demasiado, corrige con rapidez o pasa enseguida a resolver el problema, el adolescente suele retirarse o responder a la defensiva.</p>
        <h2>Qué ayuda de verdad</h2>
        <p>La comunicación eficaz empieza por la capacidad del adulto para regular la tensión de la conversación. El tono, el momento elegido y la disposición a escuchar sin contradecir ni aconsejar de inmediato suelen pesar más que tener el “mejor argumento”. Los adolescentes responden mejor cuando se sienten respetados y tomados en serio, incluso cuando el adulto pone un límite claro.</p>
        <ul>
          <li>inicia las conversaciones difíciles en momentos tranquilos, no en pleno conflicto;</li>
          <li>devuelve primero lo que has entendido antes de corregir o aconsejar;</li>
          <li>formula los límites con claridad y brevedad, sin sermones largos;</li>
          <li>diferencia la conducta que corriges del valor del adolescente como persona.</li>
        </ul>
        <h2>Qué conviene evitar</h2>
        <p>Las preguntas en ráfaga, el sarcasmo, las comparaciones con otros niños y las interpretaciones precipitadas deterioran la confianza con rapidez. La supervisión excesiva también puede generar una obediencia aparente, pero no responsabilidad real. El objetivo no es el control total, sino una relación en la que el adolescente pueda pedir ayuda sin miedo a la vergüenza o la invalidación.</p>
        <p>Cuando los conflictos se repiten y las conversaciones se cierran una y otra vez, la terapia puede ofrecer un espacio útil para que tanto el adolescente como los padres entiendan qué se activa en la relación y cómo cambiar esa dinámica de forma más sostenible.</p>
      `,
    },
    "3": {
      title: "Señales de ansiedad en los niños y cómo responder de forma útil",
      excerpt:
        "La ansiedad en la infancia no siempre se presenta como un miedo evidente. A veces aparece como evitación, llanto, irritabilidad, molestias físicas o una necesidad constante de tranquilidad.",
      readTime: "7 min",
      content: `
        <h2>Cómo se manifiesta en la vida diaria</h2>
        <p>En los niños, la ansiedad suele ser menos verbal y más conductual. Algunos dicen que les duele el estómago antes del colegio, otros rechazan la separación, se vuelven rígidos cuando cambia la rutina o buscan confirmación de forma constante. Los adultos pueden interpretar estas señales como terquedad, dependencia o desafío, cuando en realidad el niño está intentando manejar una tensión interna que todavía no puede regular solo.</p>
        <h2>Señales a las que conviene prestar atención</h2>
        <ul>
          <li>evitar situaciones habituales como ir al colegio, dormir solo o participar en actividades sociales;</li>
          <li>quejas físicas repetidas sin una causa médica clara;</li>
          <li>irritabilidad, bloqueos o desbordamientos en situaciones vividas como exigentes;</li>
          <li>una necesidad intensa de control, anticipación o tranquilidad por parte de los adultos.</li>
        </ul>
        <h2>Qué ayuda desde el rol parental</h2>
        <p>La validación es el primer paso. No significa confirmar que el peligro es real, sino mostrar al niño que su experiencia emocional es vista y comprendida. Un niño ansioso necesita un adulto calmado, previsible y firme más que explicaciones largas o presión del tipo “no tienes por qué tener miedo”.</p>
        <p>Ayuda mantener rutinas estables, preparar las transiciones con tiempo y dividir los desafíos en pasos pequeños. La tranquilización infinita puede mantener la ansiedad, mientras que empujar demasiado rápido puede intensificarla. El equilibrio está en el apoyo unido a un acompañamiento gradual.</p>
        <p>Cuando la ansiedad empieza a afectar al sueño, al colegio, a las relaciones o al funcionamiento familiar, una intervención psicológica temprana puede prevenir que el problema se consolide. Con el apoyo adecuado, el niño aprende poco a poco a tolerar mejor la incertidumbre y a recuperar una sensación interna de seguridad.</p>
      `,
    },
    "4": {
      title: "Cómo construir límites sanos sin dañar la relación con tu hijo",
      excerpt:
        "Los límites claros no equivalen a dureza, sino a previsibilidad. El niño necesita saber qué está permitido, qué no, y cómo la relación sigue siendo segura incluso cuando aparece la frustración.",
      readTime: "6 min",
      content: `
        <h2>Por qué los límites importan tanto</h2>
        <p>Los límites ofrecen estructura y seguridad. Ayudan al niño a entender qué se espera de él, qué ocurre cuando aparece una dificultad y cómo se puede atravesar la frustración sin sentir que la relación con el adulto está en peligro. Sin ellos, el niño puede volverse más desorganizado, más inseguro o más conflictivo.</p>
        <h2>Qué hace que un límite sea saludable</h2>
        <p>Un límite útil es claro, realista, repetible y acorde a la edad del niño. No cambia según el estado de ánimo del adulto ni se comunica a través de humillación, amenazas o vergüenza. El niño puede protestar o frustrarse, pero sigue necesitando encontrarse con un adulto firme y regulado.</p>
        <ul>
          <li>expresa la regla con frases cortas y comprensibles;</li>
          <li>vincula el límite a la situación, no a etiquetas negativas sobre el niño;</li>
          <li>usa consecuencias lógicas en lugar de castigos desproporcionados;</li>
          <li>mantén la relación presente: “no voy a dejar que pegues, estoy aquí para ayudarte a parar”.</li>
        </ul>
        <h2>Dónde suelen aparecer las dificultades</h2>
        <p>Muchas familias oscilan entre permisividad y explosión. Cuando el adulto tolera demasiado, el niño acumula tensión y prueba con más intensidad. Si el límite aparece solo en el pico del conflicto, se vive como arbitrario o amenazante. La coherencia diaria suele ser más eficaz que reacciones duras, pero aisladas.</p>
        <p>Los límites saludables no se oponen al vínculo; lo hacen más seguro. Cuando el niño percibe que el adulto puede contenerle sin rechazarle, aumenta la confianza, crece la cooperación y disminuye la lucha por el control.</p>
      `,
    },
    "5": {
      title: "La ira en los niños: cómo comprenderla y gestionarla sin escalar el conflicto",
      excerpt:
        "La ira no es el problema en sí mismo. La dificultad aparece cuando el niño todavía no tiene los recursos para tolerar la frustración, pedir ayuda y detenerse a tiempo.",
      readTime: "8 min",
      content: `
        <h2>Lo que la ira suele esconder</h2>
        <p>Detrás de los estallidos de ira suelen aparecer cansancio, sobrecarga sensorial, vergüenza, ansiedad, impotencia o dificultad con las transiciones. Cuando el adulto se centra solo en la conducta y responde únicamente a su intensidad, pierde la información principal: el niño está desbordado por su propio sistema emocional.</p>
        <h2>Qué marca la diferencia en el momento crítico</h2>
        <p>En pleno estallido, las explicaciones largas rara vez ayudan. El niño necesita primero contención, no argumentos. Eso implica bajar la voz, usar frases breves, reducir estímulos y evitar entrar en una lucha de poder. Si el adulto responde con ira a la ira del niño, la intensidad suele duplicarse.</p>
        <ul>
          <li>reduce los estímulos y las exigencias al mínimo durante la crisis;</li>
          <li>nombra de forma simple lo que ves: “estás muy enfadado, voy a ayudarte a parar”;</li>
          <li>deja las explicaciones y las consecuencias para después de la regulación;</li>
          <li>observa los patrones: qué ocurre antes y qué mantiene los episodios.</li>
        </ul>
        <h2>Lo que se construye después</h2>
        <p>El trabajo más importante ocurre cuando el niño ya se ha calmado. Ese es el momento para entender juntos qué pasó, qué disparó la reacción, qué señales tempranas estaban presentes y qué alternativas se pueden practicar. La ira se maneja mejor cuando el niño tiene un vocabulario emocional más rico y experiencias repetidas de corregulación con un adulto.</p>
        <p>Si los episodios son muy frecuentes, muy intensos o afectan de forma importante a la vida familiar y escolar, conviene explorar otras vulnerabilidades: ansiedad, TDAH, dificultades sensoriales, rigidez o estrés familiar acumulado. La intervención adecuada ayuda porque aborda el contexto en el que el síntoma aparece.</p>
      `,
    },
    "6": {
      title: "Por qué la implicación de la familia cambia el ritmo y la calidad del progreso terapéutico",
      excerpt:
        "En la terapia infantil, el cambio se vuelve más estable cuando los adultos que rodean al niño comprenden tanto lo que sostiene la dificultad como lo que puede favorecer su desarrollo.",
      readTime: "8 min",
      content: `
        <h2>El niño no se desarrolla de forma aislada</h2>
        <p>Cualquier síntoma que muestra un niño aparece y se mantiene dentro de un contexto relacional. Eso no significa que la familia tenga la culpa. Significa que el clima emocional, la forma de responder de los adultos, las presiones diarias y la historia del vínculo influyen en cómo funciona el niño. Por eso, una terapia centrada solo en el niño tiene límites si no se comprende también el sistema al que pertenece.</p>
        <h2>Qué significa una implicación útil</h2>
        <p>Implicar a la familia no significa que los padres deban estar en cada sesión ni que todo el peso recaiga sobre ellos. Significa crear espacios regulares de reflexión donde los adultos puedan entender mejor las necesidades del niño, sus desencadenantes, el sentido de ciertos comportamientos y la forma de responder con más coherencia en casa.</p>
        <ul>
          <li>alinear a los adultos importantes alrededor de objetivos compartidos;</li>
          <li>ajustar rutinas y respuestas en situaciones clave;</li>
          <li>favorecer que los avances de la consulta pasen a la vida diaria;</li>
          <li>reducir la tensión y la confusión en las relaciones cercanas.</li>
        </ul>
        <h2>Por qué acelera el progreso</h2>
        <p>Un niño puede aprender en terapia una nueva experiencia de regulación, expresión o relación. Si la vida cotidiana no cambia, ese progreso es más difícil de sostener. Cuando los padres comprenden el proceso y participan activamente, el niño recibe los mismos referentes en varios contextos: en casa, en el colegio y en sus relaciones cercanas.</p>
        <p>En muchos casos, el cambio más importante no es la desaparición inmediata de una conducta, sino que la familia empieza a responder de otro modo. Ahí cambia el clima emocional y el niño puede aprovechar mejor los recursos que está construyendo en terapia.</p>
      `,
    },
  },
  it: {
    "1": {
      title: "Terapia del gioco: che cosa sostiene davvero nello sviluppo del bambino",
      excerpt:
        "La terapia del gioco non è soltanto un'attività piacevole. È uno spazio clinico in cui il bambino può esprimere emozioni, esperienze e bisogni che non riesce ancora a tradurre in parole.",
      readTime: "6 min",
      content: `
        <h2>Perché il gioco è il linguaggio naturale del bambino</h2>
        <p>Per molti bambini il gioco è il modo più spontaneo per mostrare ciò che sentono, ciò che li spaventa, ciò che li confonde o ciò di cui hanno bisogno. I bambini piccoli non hanno sempre il vocabolario per dire direttamente “ho paura”, “mi sento solo” o “non so come fermarmi quando mi arrabbio”. Questi temi emergono spesso invece nel modo in cui costruiscono, ripetono scene, evitano alcuni oggetti o cercano di controllare una storia.</p>
        <p>In terapia il gioco non viene usato in modo casuale. Diventa uno strumento clinico attraverso cui il bambino può essere osservato, compreso e accompagnato. Il ritmo, i temi ricorrenti, il modo di entrare in relazione e di tollerare la frustrazione offrono informazioni preziose sul suo mondo interno.</p>
        <h2>Cosa può sostenere la terapia del gioco</h2>
        <p>La terapia del gioco può essere utile quando il bambino sta attraversando ansia, difficoltà di separazione, reazioni intense di rabbia, cambiamenti familiari, esperienze stressanti o difficoltà di regolazione emotiva. Spesso l'obiettivo non è farlo “comportare meglio” il più in fretta possibile, ma capire che cosa c'è sotto il comportamento e costruire gradualmente più sicurezza, flessibilità e capacità di autoregolazione.</p>
        <ul>
          <li>rafforzare la capacità di riconoscere ed esprimere le emozioni;</li>
          <li>elaborare esperienze difficili in un contesto sicuro;</li>
          <li>sviluppare tolleranza alla frustrazione e flessibilità;</li>
          <li>sostenere il legame con gli adulti di riferimento.</li>
        </ul>
        <h2>Il ruolo dei genitori nel percorso</h2>
        <p>Quando si lavora con i bambini, i progressi sono più stabili se i genitori fanno parte del processo. Questo può includere incontri di consulenza genitoriale, aggiustamenti delle routine a casa, una comprensione più chiara dei fattori scatenanti e un modo più coerente di rispondere nei momenti di tensione. Il bambino ha bisogno di sostegno non solo in studio, ma anche negli ambienti in cui vive ogni giorno.</p>
        <p>La terapia del gioco non promette soluzioni rapide, ma offre una cornice profonda e adatta allo sviluppo. Quando è ben indicata e ben sostenuta, aiuta il bambino a sentirsi più al sicuro con le proprie emozioni e più disponibile alla relazione e all'apprendimento.</p>
      `,
    },
    "2": {
      title: "Come costruire una comunicazione migliore con tuo figlio adolescente",
      excerpt:
        "L'adolescenza porta più autonomia, ma anche maggiore sensibilità al controllo, alla critica e all'incomprensione. La comunicazione migliora quando la relazione resta ferma senza diventare invasiva.",
      readTime: "7 min",
      content: `
        <h2>Perché la comunicazione si blocca così facilmente</h2>
        <p>Molti genitori descrivono l'adolescenza come il periodo in cui “non riescono più a raggiungere” il proprio figlio. In realtà l'adolescente non perde il bisogno di legame; cambia il modo in cui lo negozia. Ha bisogno di più spazio, di maggiore controllo sulla propria vita e di meno intrusione. Quando l'adulto insiste troppo, corregge troppo in fretta o passa subito alla soluzione del problema, l'adolescente tende a ritirarsi o a rispondere in modo difensivo.</p>
        <h2>Che cosa aiuta davvero</h2>
        <p>Una comunicazione efficace inizia dalla capacità dell'adulto di regolare la tensione nella conversazione. Il tono, il momento scelto e la disponibilità ad ascoltare senza contraddire o consigliare subito contano spesso più dell'argomento perfetto. Gli adolescenti rispondono meglio quando si sentono rispettati e presi sul serio, anche quando l'adulto pone un limite chiaro.</p>
        <ul>
          <li>affronta le conversazioni difficili in momenti tranquilli, non nel pieno del conflitto;</li>
          <li>rimanda prima ciò che hai capito, poi correggi o consiglia;</li>
          <li>esprimi i limiti in modo chiaro e breve, evitando lunghi sermoni;</li>
          <li>distingui il comportamento che stai correggendo dal valore dell'adolescente come persona.</li>
        </ul>
        <h2>Che cosa è meglio evitare</h2>
        <p>Domande a raffica, sarcasmo, paragoni con altri ragazzi e interpretazioni affrettate minano rapidamente la fiducia. Anche un monitoraggio eccessivo può generare un'apparente obbedienza senza sviluppare vera responsabilità. L'obiettivo non è il controllo totale, ma una relazione in cui l'adolescente possa chiedere aiuto senza temere vergogna o invalidazione.</p>
        <p>Quando i conflitti diventano ripetitivi e le conversazioni si chiudono continuamente, la terapia può offrire uno spazio utile perché sia l'adolescente sia i genitori comprendano meglio ciò che si attiva nella relazione e come modificare quel pattern in modo più sostenibile.</p>
      `,
    },
    "3": {
      title: "Segnali di ansia nei bambini e come rispondere in modo utile",
      excerpt:
        "L'ansia nei bambini non si presenta sempre come una paura evidente. Può emergere attraverso evitamento, pianto, irritabilità, disturbi fisici o un bisogno costante di rassicurazione.",
      readTime: "7 min",
      content: `
        <h2>Come l'ansia appare nella vita quotidiana</h2>
        <p>Nei bambini l'ansia è spesso meno verbale e più comportamentale. Alcuni lamentano mal di pancia prima di andare a scuola, altri rifiutano la separazione, diventano rigidi quando la routine cambia o cercano continue conferme. Gli adulti possono interpretare questi segnali come ostinazione, dipendenza o sfida, mentre il bambino sta in realtà cercando di gestire una tensione interna che non sa ancora regolare da solo.</p>
        <h2>Segnali a cui vale la pena fare attenzione</h2>
        <ul>
          <li>evitare situazioni ordinarie come la scuola, dormire da soli o le attività sociali;</li>
          <li>disturbi fisici ripetuti senza una chiara causa medica;</li>
          <li>irritabilità, blocchi o crisi in situazioni vissute come molto impegnative;</li>
          <li>un bisogno intenso di controllo, previsione o rassicurazione da parte degli adulti.</li>
        </ul>
        <h2>Che cosa aiuta da parte dei genitori</h2>
        <p>La validazione è il primo passo. Non significa confermare che il pericolo sia reale, ma mostrare al bambino che la sua esperienza emotiva è vista e compresa. Un bambino ansioso ha bisogno soprattutto di un adulto calmo, prevedibile e saldo, più che di lunghe spiegazioni o frasi del tipo “non hai niente da temere”.</p>
        <p>Aiuta mantenere routine stabili, preparare le transizioni in anticipo e dividere le sfide in piccoli passaggi. Una rassicurazione senza limiti può mantenere l'ansia, mentre spingere troppo velocemente può intensificarla. L'equilibrio sta nel sostegno unito a un incoraggiamento graduale.</p>
        <p>Quando l'ansia comincia a influenzare il sonno, la scuola, le relazioni o il funzionamento familiare, un supporto psicologico precoce può evitare che il problema si cristallizzi. Con l'aiuto giusto, il bambino impara gradualmente a tollerare meglio l'incertezza e a recuperare un senso più stabile di sicurezza interna.</p>
      `,
    },
    "4": {
      title: "Come costruire limiti sani senza perdere la relazione con tuo figlio",
      excerpt:
        "Limiti chiari non significano durezza, ma prevedibilità. Il bambino ha bisogno di sapere che cosa è permesso, che cosa no, e come la relazione resti sicura anche quando compare la frustrazione.",
      readTime: "6 min",
      content: `
        <h2>Perché i limiti sono così importanti</h2>
        <p>I limiti offrono struttura e sicurezza. Aiutano il bambino a capire che cosa ci si aspetta da lui, che cosa succede quando emerge una difficoltà e come attraversare la frustrazione senza sentire che la relazione con l'adulto è a rischio. In loro assenza, il bambino può diventare più disorganizzato, più insicuro o più conflittuale.</p>
        <h2>Che cosa rende sano un limite</h2>
        <p>Un limite utile è chiaro, realistico, ripetibile e proporzionato all'età del bambino. Non cambia in base all'umore dell'adulto e non viene comunicato attraverso umiliazione, minacce o vergogna. Il bambino può protestare o sentirsi frustrato, ma ha comunque bisogno di incontrare un adulto fermo e regolato.</p>
        <ul>
          <li>esprimi la regola con frasi brevi e comprensibili;</li>
          <li>collega il limite alla situazione, non a etichette negative sul bambino;</li>
          <li>usa conseguenze logiche invece di punizioni sproporzionate;</li>
          <li>mantieni viva la relazione: “non ti lascio colpire, sono qui per aiutarti a fermarti”.</li>
        </ul>
        <h2>Dove emergono spesso le difficoltà</h2>
        <p>Molte famiglie oscillano tra permissività ed esplosione. Quando l'adulto tollera troppo, il bambino accumula tensione e mette maggiormente alla prova i confini. Se poi il limite compare solo al culmine del conflitto, viene vissuto come arbitrario o minaccioso. La coerenza quotidiana è in genere più efficace di reazioni dure ma sporadiche.</p>
        <p>I limiti sani non si oppongono alla relazione; la rendono più sicura. Quando il bambino percepisce che l'adulto può contenerlo senza respingerlo, aumentano fiducia e cooperazione e diminuisce la lotta per il controllo.</p>
      `,
    },
    "5": {
      title: "La rabbia nei bambini: come comprenderla e gestirla senza escalation",
      excerpt:
        "La rabbia non è il problema in sé. La difficoltà emerge quando il bambino non ha ancora le risorse per tollerare la frustrazione, chiedere aiuto e fermarsi in tempo.",
      readTime: "8 min",
      content: `
        <h2>Che cosa nasconde spesso la rabbia</h2>
        <p>Dietro gli scoppi di rabbia troviamo spesso stanchezza, sovraccarico sensoriale, vergogna, ansia, impotenza o difficoltà nelle transizioni. Quando l'adulto vede solo il comportamento e risponde soltanto alla sua intensità, perde il punto centrale: il bambino è sopraffatto dal proprio sistema emotivo.</p>
        <h2>Che cosa fa la differenza nel momento critico</h2>
        <p>Nel pieno di una crisi, le spiegazioni lunghe servono a poco. Il bambino ha bisogno prima di tutto di contenimento, non di argomenti. Questo significa abbassare la voce, usare frasi brevi, ridurre gli stimoli e non entrare in una lotta di potere. Se l'adulto risponde alla rabbia con altra rabbia, l'intensità tende a raddoppiare.</p>
        <ul>
          <li>riduci gli stimoli e mantieni al minimo le richieste durante la crisi;</li>
          <li>nomina con semplicità ciò che vedi: “sei molto arrabbiato, ti aiuto a fermarti”;</li>
          <li>rimanda spiegazioni e conseguenze a dopo la regolazione;</li>
          <li>osserva i pattern: che cosa precede gli episodi e che cosa li mantiene.</li>
        </ul>
        <h2>Che cosa si costruisce dopo</h2>
        <p>Il lavoro più importante avviene quando il bambino si è già calmato. È lì che si può capire insieme che cosa è successo, che cosa ha attivato la reazione, quali segnali precoci erano presenti e quali alternative si possono allenare. La rabbia si gestisce meglio quando il bambino possiede un vocabolario emotivo più ricco e ripetute esperienze di co-regolazione con un adulto.</p>
        <p>Se gli episodi sono molto frequenti, molto intensi o incidono in modo significativo sulla vita familiare e scolastica, vale la pena esplorare anche altre vulnerabilità: ansia, ADHD, difficoltà sensoriali, rigidità o stress familiare accumulato. L'intervento adeguato aiuta proprio perché lavora sul contesto in cui il sintomo prende forma.</p>
      `,
    },
    "6": {
      title: "Perché il coinvolgimento della famiglia cambia il ritmo e la qualità dei progressi in terapia",
      excerpt:
        "Nella terapia infantile il cambiamento diventa più stabile quando gli adulti intorno al bambino comprendono sia ciò che mantiene la difficoltà sia ciò che può sostenere lo sviluppo.",
      readTime: "8 min",
      content: `
        <h2>Il bambino non si sviluppa in isolamento</h2>
        <p>Ogni sintomo che il bambino manifesta compare e si mantiene all'interno di un contesto relazionale. Questo non significa che la famiglia sia “colpevole”. Significa che il clima emotivo, il modo in cui gli adulti rispondono, le pressioni quotidiane e la storia delle relazioni influenzano il funzionamento del bambino. Per questo motivo, una terapia centrata esclusivamente sul bambino ha dei limiti se non si comprende anche il sistema a cui appartiene.</p>
        <h2>Che cosa significa un coinvolgimento utile</h2>
        <p>Coinvolgere la famiglia non significa che i genitori debbano essere presenti a ogni seduta o che tutto il peso ricada su di loro. Significa creare spazi regolari di riflessione in cui gli adulti possano comprendere meglio i bisogni del bambino, i fattori scatenanti, il significato di certi comportamenti e il modo di rispondere con maggiore coerenza a casa.</p>
        <ul>
          <li>allineare gli adulti importanti intorno a obiettivi condivisi;</li>
          <li>adattare routine e risposte nelle situazioni chiave;</li>
          <li>favorire il trasferimento dei progressi dalla terapia alla vita quotidiana;</li>
          <li>ridurre tensione e confusione nelle relazioni più vicine.</li>
        </ul>
        <h2>Perché accelera i progressi</h2>
        <p>Un bambino può apprendere in terapia una nuova esperienza di regolazione, espressione o relazione. Se la vita quotidiana resta invariata, quei progressi sono più difficili da mantenere. Quando i genitori comprendono il processo e partecipano attivamente, il bambino riceve gli stessi punti di riferimento in più contesti: a casa, a scuola e nelle relazioni importanti.</p>
        <p>In molti casi il cambiamento più importante non è la scomparsa immediata di un comportamento, ma il fatto che la famiglia inizi a rispondere in modo diverso. È lì che cambia il clima emotivo e il bambino può utilizzare meglio le risorse che sta costruendo in terapia.</p>
      `,
    },
  },
};

const categoryCounts = baseBlogPosts.reduce<Record<BlogCategoryId, number>>(
  (accumulator, post) => {
    accumulator[post.category] += 1;
    return accumulator;
  },
  {
    "play-therapy": 0,
    "child-development": 0,
    "parental-counseling": 0,
    "adolescent-therapy": 0,
    "family-dynamics": 0,
  },
);

export const getBlogPosts = (language: SupportedLanguage = defaultLanguage): BlogPost[] => {
  const translations = localizedPostContent[language] ?? localizedPostContent[defaultLanguage];
  const fallbackTranslations = localizedPostContent[defaultLanguage];

  return baseBlogPosts.map((post) => ({
    ...post,
    ...(translations[post.id] ?? fallbackTranslations[post.id]),
  }));
};

export const getBlogCategories = (language: SupportedLanguage) =>
  categoryOrder.map((categoryId) => ({
    id: categoryId,
    name: categoryLabels[categoryId][language],
    count: categoryCounts[categoryId],
  }));

export const localeMap: Record<string, string> = {
  ro: "ro-RO",
  en: "en-GB",
  es: "es-ES",
  it: "it-IT",
};
