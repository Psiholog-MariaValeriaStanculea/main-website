import { useTranslation } from 'react-i18next';
import { MapPin, Monitor } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionEyebrow from './SectionEyebrow';

const ServicesLocation = () => {
  const { t } = useTranslation('local');

  return (
    <section className="section-padding relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(44,166,161,0.10),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(249,174,56,0.10),_transparent_35%),linear-gradient(180deg,#fbfbfa_0%,#f7f5f0_100%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(44,166,161,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(249,174,56,0.12),_transparent_35%),linear-gradient(180deg,#0b1120_0%,#111827_100%)]">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-[0.06] dark:[background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]" />
      <div className="container-max">
        <div className="relative z-10 text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow icon={MapPin} label={t('servicesLocation.eyebrow')} />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5 leading-tight">
            {t('servicesLocation.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('servicesLocation.subtitle')}
          </p>
        </div>
        
        <div className="relative z-10 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[34px] border border-border/40 bg-white/90 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/75">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                <MapPin className="h-4 w-4" />
                {t('servicesLocation.onsiteEyebrow')}
              </div>
              <h3 className="mt-5 text-2xl font-heading font-bold text-foreground">{t('servicesLocation.onsite.title')}</h3>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('servicesLocation.onsite.description')}</p>
              <div className="mt-8 rounded-[28px] border border-border/20 bg-gradient-to-br from-primary-light/20 to-white p-6 dark:border-white/10 dark:from-primary/10 dark:to-slate-900/90">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">{t('servicesLocation.onsite.noteLabel')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('servicesLocation.onsite.note')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[34px] border border-border/40 bg-white/90 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/75">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                <Monitor className="h-4 w-4" />
                {t('servicesLocation.onlineEyebrow')}
              </div>
              <h3 className="mt-5 text-2xl font-heading font-bold text-foreground">{t('servicesLocation.online.title')}</h3>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('servicesLocation.online.description')}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[t('servicesLocation.online.point1'), t('servicesLocation.online.point2')].map((point) => (
                  <div key={point} className="rounded-[20px] border border-border/20 bg-gradient-to-br from-white to-primary-light/10 px-4 py-3 text-sm text-muted-foreground dark:border-white/10 dark:from-slate-950/70 dark:to-primary/10">
                    {point}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesLocation;
