import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarDays, ShieldCheck, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SectionEyebrow from "./SectionEyebrow";
import { siteConfig } from "@/lib/siteConfig";

const HomeConsultationForm = () => {
  const { t } = useTranslation("home");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    therapy: "",
  });

  const therapyOptions = t("consultationForm.therapyOptions", { returnObjects: true }) as string[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = t("consultationForm.emailSubject");
    const body = [
      `${t("consultationForm.fields.name")}: ${formData.name}`,
      `${t("consultationForm.fields.phone")}: ${formData.phone}`,
      `${t("consultationForm.fields.therapy")}: ${formData.therapy}`,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast({
      title: t("consultationForm.successTitle"),
      description: t("consultationForm.successDescription"),
    });

    setIsSubmitting(false);
  };

  const trustPoints = [
    {
      icon: ShieldCheck,
      title: t("consultationForm.trust.safeSpaceTitle"),
      description: t("consultationForm.trust.safeSpaceDescription"),
    },
    {
      icon: CalendarDays,
      title: t("consultationForm.trust.flexibleTitle"),
      description: t("consultationForm.trust.flexibleDescription"),
    },
    {
      icon: Sparkles,
      title: t("consultationForm.trust.responseTitle"),
      description: t("consultationForm.trust.responseDescription"),
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-[linear-gradient(135deg,#fbfaf7_0%,#f4fbf7_100%)] dark:bg-[linear-gradient(135deg,#0b1120_0%,#0f172a_100%)]">
      <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="min-w-0 space-y-6">
            <SectionEyebrow icon={Send} label={t("consultationForm.eyebrow")} />
            <h2 className="max-w-2xl text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
              {t("consultationForm.title")}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("consultationForm.description")}
            </p>

            <div className="space-y-3 pt-2">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="flex gap-4 rounded-[24px] border border-border/30 bg-white/80 p-4 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/70"
                  >
                    <div className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-primary-light/25 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-semibold text-foreground">{point.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="min-w-0 space-y-5 rounded-[34px] border border-border/40 bg-white/95 p-6 shadow-soft sm:p-8 md:p-10 dark:border-white/10 dark:bg-slate-950/75"
          >
            <div className="rounded-[24px] bg-primary-light/10 px-5 py-4 text-sm text-muted-foreground dark:bg-primary/10 dark:text-slate-200">
              {t("consultationForm.formNote")}
            </div>

            <div className="space-y-2">
              <Label htmlFor="home-name">{t("consultationForm.fields.name")}</Label>
              <Input
                id="home-name"
                name="name"
                required
                placeholder={t("consultationForm.placeholders.name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="home-phone">{t("consultationForm.fields.phone")}</Label>
              <Input
                id="home-phone"
                name="phone"
                type="tel"
                placeholder={t("consultationForm.placeholders.phone")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="home-therapy">{t("consultationForm.fields.therapy")}</Label>
              <Select
                value={formData.therapy}
                onValueChange={(value) => setFormData({ ...formData, therapy: value })}
              >
                <SelectTrigger id="home-therapy">
                  <SelectValue placeholder={t("consultationForm.placeholders.therapy")} />
                </SelectTrigger>
                <SelectContent>
                  {therapyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="cta"
              className="w-full rounded-full py-6 text-base font-semibold shadow-sm"
              disabled={isSubmitting}
            >
              {t("consultationForm.submit")}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeConsultationForm;
