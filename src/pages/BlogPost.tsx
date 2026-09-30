import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { getBlogPosts, getBlogCategories, localeMap } from "@/data/blogPosts";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";

const BlogPost = () => {
  const { t } = useTranslation('blog');
  const { id, lang } = useParams<{ id: string; lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;
  const dateLocale = localeMap[currentLang] || 'ro-RO';

  const posts = getBlogPosts(currentLang);
  const categories = getBlogCategories(currentLang);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="bg-background py-20">
        <SEOHead title={t('post.notFoundTitle')} description={t('post.notFoundDescription')} noindex />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-3xl font-serif font-bold text-foreground">{t('post.notFoundTitle')}</h1>
          <p className="text-muted-foreground">{t('post.notFoundDescription')}</p>
          <Button asChild>
            <Link to={`/${currentLang}/blog`}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t('post.backToBlog')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryName = categories.find((c) => c.id === post.category)?.name;

  return (
    <>
      <SEOHead title={`${post.title} | Blog`} description={post.excerpt} ogType="article" />
      <div className="bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link to={`/${currentLang}/blog`}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t('post.backToBlog')}
              </Link>
            </Button>
          </div>

          <article className="space-y-8">
            <header className="space-y-6">
              <div className="flex items-center gap-4 flex-wrap">
                {categoryName && <Badge variant="secondary">{categoryName}</Badge>}
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString(dateLocale)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} {t('post.readLabel')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-ul:space-y-2
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="border-t border-border pt-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{t('post.shareTitle')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('post.shareDescription')}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}>
                  <Share2 className="mr-2 w-4 h-4" />
                  {t('post.shareButton')}
                  </a>
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden shadow-sanctuary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 flex-wrap">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={`${import.meta.env.BASE_URL}lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png`}
                      alt="Valeria Stănculea"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-[250px]">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">Valeria Stănculea</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('post.authorRole')}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                      <Link to={`/${currentLang}/despre`}>{t('post.profileButton')}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-[2rem] border border-border/70 bg-card/80 p-8 text-center shadow-sanctuary backdrop-blur-md">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{t('post.ctaTitle')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('post.ctaDescription')}
              </p>
              <Button size="lg" variant="cta" asChild>
                <Link to={`/${currentLang}/contact`}>{t('post.ctaButton')}</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
