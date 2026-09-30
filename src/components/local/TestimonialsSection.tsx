import { useTranslation } from "react-i18next";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionEyebrow from "./SectionEyebrow";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

interface TestimonialsSectionProps {
  variant?: "full" | "compact";
}

const TestimonialsSection = ({ variant = "full" }: TestimonialsSectionProps) => {
  const { t } = useTranslation("home");
  const testimonials = t("testimonials.items", { returnObjects: true }) as Testimonial[];

  const isCompact = variant === "compact";

  return (
    <section
      className={
        isCompact
          ? "py-12 bg-primary-light/10 border-t border-border/30 dark:bg-slate-950/70 dark:border-white/10"
          : "section-padding relative overflow-hidden bg-[linear-gradient(180deg,#f8fbfa_0%,#eef7f4_100%)] dark:bg-[linear-gradient(180deg,#0b1120_0%,#0f172a_100%)]"
      }
    >
      {!isCompact && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      )}
      <div className="container-max relative z-10">
        {!isCompact && (
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <SectionEyebrow icon={Quote} label={t("testimonials.eyebrow")} />
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
          </div>
        )}

        {isCompact && (
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
            {t("testimonials.title")}
          </h2>
        )}

        <Carousel
          opts={{ align: "start", loop: true }}
          aria-label={t("testimonials.title")}
          className="w-full max-w-5xl mx-auto pb-16 md:pb-0"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="relative h-full overflow-hidden rounded-[30px] border border-border/40 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-warm mx-2 dark:border-white/10 dark:bg-slate-950/75">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary-light/10 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-4 mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/25" />
                  </div>
                  <p className="relative text-[1.02rem] leading-relaxed text-muted-foreground mb-8 italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <div className="relative border-t border-border/20 pt-4">
                    <p className="font-heading font-bold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-auto bottom-0 translate-y-0 md:left-0 xl:-left-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2 h-11 w-11 border-border/30 bg-white shadow-soft dark:border-white/10 dark:bg-slate-950/80" />
          <CarouselNext className="right-3 top-auto bottom-0 translate-y-0 md:right-0 xl:-right-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2 h-11 w-11 border-border/30 bg-white shadow-soft dark:border-white/10 dark:bg-slate-950/80" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
