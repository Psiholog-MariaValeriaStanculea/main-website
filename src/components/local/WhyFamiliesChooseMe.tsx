import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';

const WhyFamiliesChooseMe = () => {
  const { t } = useTranslation('local');

  const features = [
    { key: 'professional' },
    { key: 'integrative' },
    { key: 'confidential' },
    { key: 'parents' },
  ];

  return (
    <section className="section-padding bg-background relative z-10">
      <div className="container-max">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <SectionEyebrow icon={CheckCircle2} label={t('whyFamiliesChoose.eyebrow')} />
            <h2 className="max-w-2xl text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
              {t('whyFamiliesChoose.title')}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t('whyFamiliesChoose.subtitle')}
            </p>
          </div>

          <div className="rounded-[32px] border border-border/40 bg-gradient-to-br from-white to-primary-light/10 p-6 md:p-8 shadow-soft dark:border-white/10 dark:from-slate-950/80 dark:to-primary/10">
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.key} className="flex items-start gap-4 rounded-[24px] border border-border/20 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-950/70">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">{t(`whyFamiliesChoose.${feature.key}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(`whyFamiliesChoose.${feature.key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFamiliesChooseMe;
