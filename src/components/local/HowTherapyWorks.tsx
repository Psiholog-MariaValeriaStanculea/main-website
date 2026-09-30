import { useTranslation } from 'react-i18next';
import { Gamepad2, Sprout, HeartHandshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionEyebrow from './SectionEyebrow';

const HowTherapyWorks = () => {
  const { t } = useTranslation('local');

  const cards = [
    { icon: Gamepad2, key: 'playTherapy' },
    { icon: Sprout, key: 'teens' },
    { icon: HeartHandshake, key: 'family' },
  ];

  return (
    <section className="section-padding bg-primary-light/10 relative overflow-hidden dark:bg-slate-950/70">
      <div className="container-max">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow icon={Gamepad2} label={t('howTherapyWorks.eyebrow')} />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            {t('howTherapyWorks.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('howTherapyWorks.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.key} className="rounded-[28px] border border-border/50 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75">
                <CardContent className="p-8 md:p-10 space-y-5">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light/35 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    {t(`howTherapyWorks.${card.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`howTherapyWorks.${card.key}.description`)}
                  </p>
                  <div className="space-y-2 pt-2">
                    {(t(`howTherapyWorks.${card.key}.points`, { returnObjects: true }) as string[]).map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary/70" />
                        <span className="leading-6 text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowTherapyWorks;
