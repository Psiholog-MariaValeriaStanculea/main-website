import { useMemo, useState } from "react";
import { Mail, MapPin, Clock, Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import { SEOHead } from "@/components/SEOHead";
import emailjs from '@emailjs/browser';
import { siteConfig } from "@/lib/siteConfig";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
type UrgencyOption = "normal" | "urgent";

const contactCopy: Record<SupportedLanguage, {
  formTitle: string;
  formDescription: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    childAge: string;
    subject: string;
    urgency: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    childAge: string;
    subject: string;
    message: string;
  };
  urgencyOptions: Record<UrgencyOption, string>;
  responseTime: string;
  fallbackTitle: string;
  fallbackDescription: string;
  contactInfoTitle: string;
  contactCards: {
    email: { title: string; description: string };
    location: { title: string; description: string };
    schedule: { title: string; value: string; description: string };
  };
  faq: {
    title: string;
    description: string;
    button: string;
  };
  booking: {
    title: string;
    description: string;
    button: string;
  };
}> = {
  ro: {
    formTitle: "Trimite un Mesaj",
    formDescription: "Completează formularul de mai jos și îți voi răspunde cât mai curând posibil.",
    labels: {
      name: "Nume complet *",
      email: "Email *",
      phone: "Telefon",
      childAge: "Vârsta copilului",
      subject: "Subiect *",
      urgency: "Urgența",
      message: "Mesaj *",
    },
    placeholders: {
      name: "Numele tău complet",
      email: "adresa@email.ro",
      phone: "+40 XXX XXX XXX",
      childAge: "ex: 8 ani",
      subject: "Motivul contactului",
      message: "Descrie pe scurt situația și cum te pot ajuta...",
    },
    urgencyOptions: {
      normal: "Normal (răspuns în 24h)",
      urgent: "Urgent (răspuns în 4h)",
    },
    responseTime: "Vă voi răspunde în maxim 24 de ore.",
    fallbackTitle: "Deschid aplicația de email",
    fallbackDescription: "Formularul online nu este disponibil momentan. Îți pregătesc un email către {{email}}.",
    contactInfoTitle: "Informații de Contact",
    contactCards: {
      email: { title: "Email", description: "Răspund în maxim 24 de ore" },
      location: { title: "Locație", description: "Cabinet privat în zona centrală" },
      schedule: { title: "Program", value: "Luni - Vineri: 9:00 - 18:00", description: "Programări flexibile disponibile" },
    },
    faq: {
      title: "Întrebări Frecvente",
      description: "Găsește răspunsuri la întrebările cele mai comune despre serviciile de psihologie pentru expați.",
      button: "Vezi toate întrebările",
    },
    booking: {
      title: "Programare Online",
      description: "Dacă preferi să stabilim direct o primă discuție, trimite-mi un email și îți propun rapid variante potrivite de programare.",
      button: "Solicită o programare pe email",
    },
  },
  en: {
    formTitle: "Send a Message",
    formDescription: "Fill in the form below and I will get back to you as soon as possible.",
    labels: {
      name: "Full name *",
      email: "Email *",
      phone: "Phone",
      childAge: "Child's age",
      subject: "Subject *",
      urgency: "Urgency",
      message: "Message *",
    },
    placeholders: {
      name: "Your full name",
      email: "address@email.com",
      phone: "+40 XXX XXX XXX",
      childAge: "e.g. 8 years old",
      subject: "Reason for contact",
      message: "Briefly describe the situation and how I can help...",
    },
    urgencyOptions: {
      normal: "Standard (reply within 24h)",
      urgent: "Urgent (reply within 4h)",
    },
    responseTime: "I will reply within 24 hours.",
    fallbackTitle: "Opening your email app",
    fallbackDescription: "The online form is unavailable right now. I am preparing an email to {{email}} for you.",
    contactInfoTitle: "Contact Information",
    contactCards: {
      email: { title: "Email", description: "I reply within 24 hours" },
      location: { title: "Location", description: "Private practice in central Bucharest" },
      schedule: { title: "Schedule", value: "Monday - Friday: 9:00 AM - 6:00 PM", description: "Flexible appointments available" },
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Find answers to the most common questions about psychological services for expats.",
      button: "See all questions",
    },
    booking: {
      title: "Online Booking",
      description: "If you prefer to arrange an initial conversation directly, send me an email and I will quickly suggest suitable appointment options.",
      button: "Request an appointment by email",
    },
  },
  es: {
    formTitle: "Enviar un Mensaje",
    formDescription: "Completa el formulario de abajo y te responderé lo antes posible.",
    labels: {
      name: "Nombre completo *",
      email: "Correo electrónico *",
      phone: "Teléfono",
      childAge: "Edad del niño",
      subject: "Asunto *",
      urgency: "Urgencia",
      message: "Mensaje *",
    },
    placeholders: {
      name: "Tu nombre completo",
      email: "correo@ejemplo.com",
      phone: "+40 XXX XXX XXX",
      childAge: "p. ej. 8 años",
      subject: "Motivo del contacto",
      message: "Describe brevemente la situación y cómo puedo ayudarte...",
    },
    urgencyOptions: {
      normal: "Normal (respuesta en 24h)",
      urgent: "Urgente (respuesta en 4h)",
    },
    responseTime: "Te responderé en un máximo de 24 horas.",
    fallbackTitle: "Abriendo tu aplicación de correo",
    fallbackDescription: "El formulario online no está disponible en este momento. Estoy preparando un correo para {{email}}.",
    contactInfoTitle: "Información de Contacto",
    contactCards: {
      email: { title: "Correo electrónico", description: "Respondo en un máximo de 24 horas" },
      location: { title: "Ubicación", description: "Consulta privada en el centro de Bucarest" },
      schedule: { title: "Horario", value: "Lunes - Viernes: 9:00 - 18:00", description: "Citas flexibles disponibles" },
    },
    faq: {
      title: "Preguntas Frecuentes",
      description: "Encuentra respuestas a las preguntas más comunes sobre los servicios de psicología para expatriados.",
      button: "Ver todas las preguntas",
    },
    booking: {
      title: "Reserva Online",
      description: "Si prefieres organizar directamente una primera conversación, envíame un correo y te propondré rápidamente horarios adecuados.",
      button: "Solicitar una cita por correo",
    },
  },
  it: {
    formTitle: "Invia un Messaggio",
    formDescription: "Compila il modulo qui sotto e ti risponderò il prima possibile.",
    labels: {
      name: "Nome completo *",
      email: "Email *",
      phone: "Telefono",
      childAge: "Età del bambino",
      subject: "Oggetto *",
      urgency: "Urgenza",
      message: "Messaggio *",
    },
    placeholders: {
      name: "Il tuo nome completo",
      email: "email@esempio.com",
      phone: "+40 XXX XXX XXX",
      childAge: "es: 8 anni",
      subject: "Motivo del contatto",
      message: "Descrivi brevemente la situazione e come posso aiutarti...",
    },
    urgencyOptions: {
      normal: "Normale (risposta entro 24h)",
      urgent: "Urgente (risposta entro 4h)",
    },
    responseTime: "Ti risponderò entro 24 ore.",
    fallbackTitle: "Apro la tua app email",
    fallbackDescription: "Il modulo online non è disponibile in questo momento. Sto preparando un'email per {{email}}.",
    contactInfoTitle: "Informazioni di Contatto",
    contactCards: {
      email: { title: "Email", description: "Rispondo entro 24 ore" },
      location: { title: "Sede", description: "Studio privato nel centro di Bucarest" },
      schedule: { title: "Orari", value: "Lunedì - Venerdì: 9:00 - 18:00", description: "Appuntamenti flessibili disponibili" },
    },
    faq: {
      title: "Domande Frequenti",
      description: "Trova risposte alle domande più comuni sui servizi di psicologia per espatriati.",
      button: "Vedi tutte le domande",
    },
    booking: {
      title: "Prenotazione Online",
      description: "Se preferisci organizzare direttamente un primo colloquio, inviami un'email e ti proporrò rapidamente alcune opzioni di appuntamento.",
      button: "Richiedi un appuntamento via email",
    },
  },
};

const Contact = () => {
  const { t } = useTranslation('contact');
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;
  const copy = contactCopy[currentLang];
  const introCards = t('ui.introCards', { returnObjects: true }) as Array<{ title: string; description: string; accent: string }>;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    childAge: "",
    urgency: "normal" as UrgencyOption
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const mailtoHref = useMemo(() => {
    const subject = formData.subject || copy.formTitle;
    const bodyLines = [
      `${copy.labels.name}: ${formData.name}`,
      `${copy.labels.email}: ${formData.email}`,
      `${copy.labels.phone}: ${formData.phone || "-"}`,
      `${copy.labels.childAge}: ${formData.childAge || "-"}`,
      `${copy.labels.urgency}: ${copy.urgencyOptions[formData.urgency] || formData.urgency}`,
      "",
      formData.message,
    ];

    return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  }, [copy, formData]);

  const fallbackToEmailClient = () => {
    toast({
      title: copy.fallbackTitle,
      description: copy.fallbackDescription.replace("{{email}}", siteConfig.contactEmail),
    });
    window.location.href = mailtoHref;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      fallbackToEmailClient();
      setIsSubmitting(false);
      return;
    }
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        child_age: formData.childAge,
        subject: formData.subject,
        urgency: formData.urgency,
        message: formData.message,
        to_email: siteConfig.contactEmail,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: t('form.success'),
        description: copy.responseTime,
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        childAge: "",
        urgency: "normal"
      });
    } catch (error) {
      toast({
        title: t('form.error'),
        description: copy.fallbackDescription.replace("{{email}}", siteConfig.contactEmail),
        variant: "destructive"
      });
      window.location.href = mailtoHref;
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: copy.contactCards.email.title,
      value: siteConfig.contactEmail,
      description: copy.contactCards.email.description
    },
    {
      icon: MapPin,
      title: copy.contactCards.location.title,
      value: siteConfig.practiceAddress,
      description: copy.contactCards.location.description
    },
    {
      icon: Clock,
      title: copy.contactCards.schedule.title,
      value: copy.contactCards.schedule.value,
      description: copy.contactCards.schedule.description
    }
  ];

  return (
    <>
      <SEOHead />
      <div className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light/25 px-4 py-2 text-sm font-medium text-primary shadow-soft">
            <Mail className="mr-2 h-4 w-4" />
            {t('ui.heroLabel')}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {introCards.map((card) => (
            <div
              key={card.title}
              className={card.accent === "sanctuary"
                ? "rounded-[1.6rem] border border-border/70 bg-gradient-sanctuary p-5 shadow-soft"
                : "rounded-[1.6rem] border border-border/70 bg-card/80 p-5 shadow-soft backdrop-blur-sm"}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">{card.title}</p>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-sanctuary overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-foreground">
                  {copy.formTitle}
                </CardTitle>
                <p className="text-muted-foreground">
                  {copy.formDescription}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{copy.labels.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={copy.placeholders.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{copy.labels.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={copy.placeholders.email}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{copy.labels.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={copy.placeholders.phone}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childAge">{copy.labels.childAge}</Label>
                      <Input
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        placeholder={copy.placeholders.childAge}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{copy.labels.subject}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={copy.placeholders.subject}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">{copy.labels.urgency}</Label>
                    <select
                      id="urgency"
                      name="urgency"
                      title={copy.labels.urgency}
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="normal">{copy.urgencyOptions.normal}</option>
                      <option value="urgent">{copy.urgencyOptions.urgent}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{copy.labels.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={copy.placeholders.message}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:bg-primary-dark"
                  >
                    {isSubmitting ? (
                      t('form.sending')
                    ) : (
                      <>
                        {t('form.send')}
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & FAQs */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                {copy.contactInfoTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-sanctuary transition-all duration-300">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto shadow-warm">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{info.title}</h3>
                        <p className="text-sm font-medium leading-snug text-primary break-words">{info.value}</p>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>


            {/* FAQ Link */}
            <Card className="hover:shadow-sanctuary transition-all duration-300 overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {copy.faq.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {copy.faq.description}
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <Link to={`/${currentLang}/intrebari-frecvente`}>
                    {copy.faq.button}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Online Booking CTA */}
        <div className="mt-20 rounded-[2rem] border border-border/70 bg-card/80 p-12 text-center shadow-sanctuary backdrop-blur-md">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            {copy.booking.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {copy.booking.description}
          </p>
          <Button size="lg" variant="sanctuary" asChild>
            <a href={mailtoHref}>{copy.booking.button}</a>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
