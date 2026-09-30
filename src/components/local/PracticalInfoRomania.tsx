import { useTranslation } from 'react-i18next';
import { CreditCard, Monitor, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionEyebrow from './SectionEyebrow';

const PracticalInfoRomania = () => {
  const { t } = useTranslation('local');

  const practicalItems = [
    {
      icon: CreditCard,
      key: 'insurance',
      bgColor: 'bg-gradient-warm'
    },
    {
      icon: Monitor,
      key: 'technology',
      bgColor: 'bg-gradient-primary'
    },
    {
      icon: Phone,
      key: 'support',
      bgColor: 'bg-gradient-warm'
    }
  ];

  return (
    <section className="section-padding bg-background relative z-10">
      <div className="container-max">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionEyebrow icon={CreditCard} label={t('practicalRomania.eyebrow')} />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            {t('practicalRomania.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {practicalItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} className="bg-white border-0 shadow-soft hover:shadow-warm transition-all duration-300 rounded-[24px] group dark:border dark:border-white/10 dark:bg-slate-950/75">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-light/30 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-foreground">
                    {t(`practicalRomania.${item.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`practicalRomania.${item.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticalInfoRomania;
