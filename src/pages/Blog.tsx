import { useState } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";
import { getBlogPosts, getBlogCategories, localeMap } from "@/data/blogPosts";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";

const Blog = () => {
  const { t } = useTranslation('blog');
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;
  const dateLocale = localeMap[currentLang] || 'ro-RO';
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getBlogCategories(currentLang);
  const posts = getBlogPosts(currentLang);

  const isFiltering = !!searchTerm || !!selectedCategory;

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = isFiltering ? filteredPosts : filteredPosts.filter(post => !post.featured);

  return (
    <>
      <SEOHead />
      <div className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light/25 px-4 py-2 text-sm font-medium text-primary shadow-soft">
              {t('page.eyebrow')}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('page.intro')}
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={t('page.searchPlaceholder')}
                  aria-label={t('page.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                aria-pressed={selectedCategory === null}
              >
                {t('page.allCategories')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {featuredPost && !isFiltering && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">{t('page.featured')}</h2>
              <Card className="overflow-hidden hover:shadow-sanctuary transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto">
                    <img loading="lazy" decoding="async" src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col justify-center bg-card/80 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge variant="secondary">{categories.find(c => c.id === featuredPost.category)?.name}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString(dateLocale)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{featuredPost.excerpt}</p>
                    <Button asChild className="w-fit">
                      <Link to={`/${currentLang}/blog/${featuredPost.id}`}>
                        {t('page.featuredCta')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-sanctuary transition-all duration-300 overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img loading="lazy" decoding="async" src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <Badge variant="outline">{categories.find(c => c.id === post.category)?.name}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString(dateLocale)}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/${currentLang}/blog/${post.id}`}>
                        {t('page.readMore')}
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-foreground mb-2">{t('page.emptyTitle')}</h3>
              <p className="text-muted-foreground">
                {t('page.emptyDescription')}
              </p>
            </div>
          )}

          <div className="mt-20 rounded-[2rem] border border-border/70 bg-card/80 p-6 sm:p-12 text-center shadow-sanctuary backdrop-blur-md">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">{t('page.newsletterTitle')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('page.newsletterDescription')}
            </p>
            <Button size="lg" variant="cta" asChild>
              <Link to={`/${currentLang}/contact`}>{t('page.newsletterCta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
