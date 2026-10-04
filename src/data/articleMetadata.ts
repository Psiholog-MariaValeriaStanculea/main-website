import type { SupportedLanguage } from '@/lib/i18n';

// Stable IDs preserve existing bookmarks. Review dates change only after an actual
// editorial/source review; they do not represent publication or clinical approval.
export const articleReviewedOn = '2026-10-04';
export const articleSlugs: Record<string, Record<SupportedLanguage, string>> = {
  '1': { ro: 'terapia-prin-joc-dezvoltarea-copilului', en: 'play-therapy-child-development', it: 'terapia-del-gioco-sviluppo-bambino', es: 'terapia-de-juego-desarrollo-infantil' },
  '2': { ro: 'comunicarea-cu-adolescentul', en: 'communicating-with-your-teenager', it: 'comunicare-con-adolescente', es: 'comunicacion-con-adolescentes' },
  '3': { ro: 'anxietatea-la-copii', en: 'anxiety-in-children', it: 'ansia-nei-bambini', es: 'ansiedad-en-ninos' },
  '4': { ro: 'limite-sanatoase-pentru-copii', en: 'healthy-boundaries-for-children', it: 'limiti-sani-per-bambini', es: 'limites-saludables-para-ninos' },
  '5': { ro: 'furia-la-copii', en: 'understanding-childrens-anger', it: 'comprendere-rabbia-bambini', es: 'comprender-ira-infantil' },
  '6': { ro: 'familia-in-procesul-terapeutic', en: 'family-support-in-child-therapy', it: 'famiglia-nel-percorso-terapeutico', es: 'familia-en-terapia-infantil' },
};

export const articleSources = {
  play: { publisher: 'Association for Play Therapy', title: 'Why Play Therapy?', url: 'https://www.a4pt.org/page/WhyPlayTherapy' },
  teens: { publisher: 'UNICEF', title: '11 tips for communicating with your teen', url: 'https://www.unicef.org/parenting/child-care/11-tips-communicating-your-teen' },
  anxiety: { publisher: 'NHS', title: 'Anxiety in children', url: 'https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/anxiety-in-children/' },
  boundaries: { publisher: 'UNICEF', title: 'How to discipline your child the smart and healthy way', url: 'https://www.unicef.org/parenting/child-care/how-discipline-your-child-smart-and-healthy-way' },
  anger: { publisher: 'NHS', title: 'Helping your child with anger issues', url: 'https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/help-your-child-with-anger-issues/' },
  feelings: { publisher: 'NHS', title: 'Talking to your child about feelings', url: 'https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/talk-to-children-about-feelings/' },
};

export const articleSourceIds: Record<string, (keyof typeof articleSources)[]> = {
  '1': ['play'], '2': ['teens'], '3': ['anxiety'],
  '4': ['boundaries'], '5': ['anger', 'feelings'], '6': ['feelings', 'play'],
};

export const getArticlePath = (id: string, language: SupportedLanguage) =>
  '/blog/' + articleSlugs[id][language];

export function resolveArticleId(segment: string | undefined): string | undefined {
  if (!segment) return undefined;
  if (Object.keys(articleSlugs).includes(segment)) return segment;
  return Object.keys(articleSlugs).find(id => Object.values(articleSlugs[id]).includes(segment));
}

export const getArticleSources = (id: string) =>
  (articleSourceIds[id] || []).map(key => articleSources[key]);

export function localizedArticlePath(pathname: string, target: SupportedLanguage): string {
  const match = pathname.match(/^\/(ro|en|it|es)\/blog\/([^/]+)\/?$/);
  const id = match && resolveArticleId(match[2]);
  return id ? '/' + target + getArticlePath(id, target)
    : pathname.replace(/^\/(ro|en|it|es)(?=\/|$)/, '/' + target);
}
