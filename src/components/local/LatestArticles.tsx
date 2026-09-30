import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPosts, getBlogCategories, localeMap } from "@/data/blogPosts";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import SectionEyebrow from "./SectionEyebrow";

const LatestArticles = () => {
  const { t } = useTranslation("home");
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;
  const dateLocale = localeMap[currentLang] || "ro-RO";
  const posts = getBlogPosts(currentLang).slice(0, 3);
  const categories = getBlogCategories(currentLang);
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  return (
    <section className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)] dark:bg-[linear-gradient(180deg,#0b1120_0%,#111827_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      <div className="container-max relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow icon={Newspaper} label={t("latestArticles.eyebrow")} />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            {t("latestArticles.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("latestArticles.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="group overflow-hidden rounded-[30px] border border-border/50 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
              <CardContent className="p-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary-light/25 px-3 py-1 text-primary font-semibold dark:bg-primary/15 dark:text-primary-foreground">
                    {categoryName(post.category)}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-border/30 px-3 py-1 dark:border-white/10">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="pt-2">
                  <Link
                    to={`/${currentLang}/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    {t("latestArticles.readMore")}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="warm-outline" size="lg" className="px-8 py-6 rounded-full" asChild>
            <Link to={`/${currentLang}/blog`}>
              {t("latestArticles.viewAll")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
