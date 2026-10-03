import { useParams, useLocation, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { getBlogPosts, getBlogCategories } from '@/data/blogPosts';
import { useEditorial } from '@/lib/editorial';
import { Articles } from '@/components/editorial/Articles';
export default function BlogPost() {
 const {id}=useParams();const {copy,language,path}=useEditorial();
 const location=useLocation(); const from=location.state?.fromCollection;
 const collection=typeof from==='string' && /^\/(ro|en|it|es)\/(blog|resurse)\/?$/.test(from) ? from.replace(/^\/(ro|en|it|es)/,'/'+language) : path('/blog');
 const posts=getBlogPosts(language);const post=posts.find(item=>item.id===id);
 if(!post)return <><SEOHead title={copy.ui.notFound+' | Valeria Stănculea'} description={copy.ui.notFoundText} noindex /><div className="site-container section-space"><h1>{copy.ui.notFound}</h1><Link to={path('/blog')} className="text-link inline-block mt-6">{copy.ui.backArticles}</Link></div></>;
 const category=getBlogCategories(language).find(item=>item.id===post.category);
 const related=posts.filter(item=>item.id!==post.id && item.category===post.category);
 return <><SEOHead title={post.title+' | Valeria Stănculea'} description={post.excerpt} ogType="article" article={post} />
  <div className="site-container section-space"><div className="reading-column mx-auto">
   <Link to={collection} className="text-link text-base inline-block min-h-11">{copy.ui.backArticles}</Link>
   <article className="mt-5"><header className="mb-8"><p className="eyebrow">{category?.name}</p><h1 className="mt-4">{post.title}</h1><p className="text-base text-muted-foreground mt-5">Valeria Stănculea · {post.readTime}</p></header>
    <div className="article-body" dangerouslySetInnerHTML={{__html:post.content}} />
    <aside className="mt-8 border-t pt-6"><p className="helper-text">{copy.resources.notice}</p><Link to={path('/despre')} className="text-link inline-block mt-4 min-h-11">{copy.about.title}</Link></aside>
   </article>
  </div>{related.length>0 && <section className="mt-12"><h2 className="mb-6">{copy.ui.related}</h2><Articles posts={related.slice(0,3)} /></section>}</div>
 </>;
}
