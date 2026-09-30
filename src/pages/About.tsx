import { GraduationCap, Award, Users, Calendar, Heart, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";

const normalizeTranslatedList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    return [value];
  }

  if (value && typeof value === "object") {
    return Object.values(value).filter((item): item is string => typeof item === "string");
  }

  return [];
};

const About = () => {
  const { t } = useTranslation('about');
  const courseItemsValue = t('ui.courseItems', { returnObjects: true });
  const activityItemsValue = t('ui.activityItems', { returnObjects: true });
  const courseItems = normalizeTranslatedList(courseItemsValue);
  const activityItems = normalizeTranslatedList(activityItemsValue);
  
  const education = [
    {
      title: t('education.bachelor'),
      institution: "Universitatea Alexandru Ioan Cuza",
      year: "2018",
      details: t('education.additional')
    },
    {
      title: t('education.master'),
      institution: "Universitatea din București",
      year: "2023",
      details: ""
    },
    {
      title: t('education.psychotherapy'),
      institution: "Asociația Română de Psihoterapie Integrativă (A.R.P.I.)",
      year: "2018-2021",
      details: ""
    }
  ];

  const experience = [
    {
      role: t('experience.private'),
      period: t('experience.privatePeriod'),
      description: t('experience.privateDesc')
    },
    {
      role: t('experience.fdp'),
      period: t('experience.fdpPeriod'),
      description: t('experience.fdpDesc')
    },
    {
      role: t('experience.aba'),
      period: t('experience.abaPeriod'),
      description: t('experience.abaDesc')
    }
  ];

  const specializations = [
    t('specializations.behavioral'),
    t('specializations.emotional'),
    t('specializations.neurodevelopmental'),
    t('specializations.trauma'),
    t('specializations.relational')
  ];

  return (
    <>
      <SEOHead />
      <div className="bg-background">
      
      {/* Hero Section */}
      <section className="hero-container section-padding min-h-[80vh] flex items-center">
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20 shadow-soft">
                  <Star className="w-4 h-4 mr-2" />
                  {t('ui.heroBadge')}
                </div>
                
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                  {t('title')}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('introduction')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sanctuary-card flex items-center space-x-3 p-5">
                  <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t('ui.educationCard.title')}</div>
                    <div className="text-xs text-muted-foreground">{t('ui.educationCard.subtitle')}</div>
                  </div>
                </div>
                <div className="sanctuary-card flex items-center space-x-3 p-5">
                  <Award className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t('ui.experienceCard.title')}</div>
                    <div className="text-xs text-muted-foreground">{t('ui.experienceCard.subtitle')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8 fade-in-up fade-in-delay-300">
              <div className="relative">
                <div className="professional-image aspect-square shadow-sanctuary rounded-[2rem] ring-1 ring-white/30">
                  <img 
                    src={`${import.meta.env.BASE_URL}lovable-uploads/83e7a272-918c-44bb-8772-c1de1e40660d.png`}
                    alt="Psiholog Valeria Stănculea - Profesionalism și echilibru în terapie"
                    className="w-full h-full object-cover object-center rounded-2xl"
                    loading="lazy"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Approach Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-max">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20">
              <Heart className="w-4 h-4 mr-2" />
              {t('ui.approachBadge')}
            </div>
            <h2 className="text-4xl font-serif font-bold text-foreground">
              {t('approach.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 rounded-[2rem] border border-border/70 bg-card/76 p-8 shadow-soft backdrop-blur-sm">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t('approach.description')}</p>
                <p>{t('approach.playTherapy')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-6 rounded-2xl border border-border/70 bg-gradient-sanctuary shadow-soft">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">{t('ui.playTherapyTitle')}</div>
                    <div className="text-sm text-muted-foreground">{t('ui.playTherapyDescription')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-6 rounded-2xl border border-border/70 bg-gradient-sanctuary shadow-soft">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">{t('ui.parentalSupportTitle')}</div>
                    <div className="text-sm text-muted-foreground">{t('ui.parentalSupportDescription')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative fade-in-up fade-in-delay-400 w-3/4 mx-auto">
              <div className="professional-image aspect-[4/5] shadow-sanctuary rounded-[2rem] ring-1 ring-white/30">
                <img 
                  src={`${import.meta.env.BASE_URL}lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png`}
                  alt="Valeria Maria Stănculea - Abordare Terapeutică Profesională"
                  className="w-full h-full object-cover object-center rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-max section-padding">{/* Content container */}

        {/* Education */}
        <section className="mb-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20">
              <GraduationCap className="w-4 h-4 mr-2" />
              {t('ui.educationBadge')}
            </div>
            <h2 className="text-4xl font-serif font-bold text-foreground">
              {t('education.title')}
            </h2>
          </div>
          
          <div className="space-y-6">
            {education.map((item, index) => (
              <Card key={index} className="animated-card bg-card group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gradient-primary rounded-xl">
                      <GraduationCap className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">
                        {item.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{item.institution} • <span className="font-medium">{item.year}</span></p>
                    </div>
                  </div>
                </CardHeader>
                {item.details && (
                  <CardContent className="pt-0 pl-20">
                    <p className="text-muted-foreground leading-relaxed text-lg">{item.details}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20">
              <Calendar className="w-4 h-4 mr-2" />
              {t('ui.experienceBadge')}
            </div>
            <h2 className="text-4xl font-serif font-bold text-foreground">
              {t('experience.title')}
            </h2>
          </div>
          
          <div className="space-y-6">
            {experience.map((item, index) => (
              <Card key={index} className="animated-card bg-card group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gradient-primary rounded-xl">
                      <Calendar className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">{item.role}</CardTitle>
                      <p className="text-muted-foreground mt-2 font-medium">{item.period}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-20">
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Specializations */}
        <section className="mb-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20">
              <Award className="w-4 h-4 mr-2" />
              {t('ui.expertiseBadge')}
            </div>
            <h2 className="text-4xl font-serif font-bold text-foreground">
              {t('specializations.title')}
            </h2>
          </div>
          
          <Card className="animated-card bg-card overflow-hidden">
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="p-2 bg-gradient-warm rounded-xl shadow-warm">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">{spec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Training */}
        <section className="mb-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/20 rounded-full text-sm font-medium text-primary border border-primary/20">
              <Users className="w-4 h-4 mr-2" />
              {t('ui.developmentBadge')}
            </div>
            <h3 className="text-3xl font-serif font-bold text-foreground">
              {t('ui.developmentTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="animated-card bg-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  {t('ui.coursesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {courseItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card bg-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  {t('ui.activitiesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {activityItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      </div>
    </>
  );
};

export default About;