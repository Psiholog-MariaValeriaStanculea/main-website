import { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { getBlogPosts, getBlogCategories, localeMap } from '@/data/blogPosts';
import { getArticlePath, resolveArticleId } from '@/data/articleMetadata';
import { useEditorial } from '@/lib/editorial';
import { Articles } from '@/components/editorial/Articles';
export default function BlogPost() {
 const {id}=useParams();const {copy,language,path}=useEditorial();
 const location=useLocation(); const from=location.state?.fromCollection;
 const collection=typeof from==='string' && /^\/(ro|en|it|es)\/(blog|resurse)\/?$/.test(from) ? from.replace(/^\/(ro|en|it|es)/,'/'+language) : path('/blog');
 const navigate=useNavigate();
 const posts=getBlogPosts(language);const post=posts.find(item=>item.id===resolveArticleId(id));
 const canonicalPath=post?path(getArticlePath(post.id,language)):undefined;
 useEffect(()=>{
  if(canonicalPath && location.pathname.replace(/\/$/,'')!==canonicalPath){
   navigate(canonicalPath+location.search+location.hash,{replace:true,state:location.state});
  }
 },[canonicalPath,location.pathname,location.search,location.hash,location.state,navigate]);
 if(!post)return <><SEOHead title={copy.ui.notFound+' | Valeria Stănculea'} description={copy.ui.notFoundText} noindex /><div className="site-container section-space"><h1>{copy.ui.notFound}</h1><Link to={path('/blog')} className="text-link inline-block mt-6">{copy.ui.backArticles}</Link></div></>;
 const category=getBlogCategories(language).find(item=>item.id===post.category);
 const related=posts.filter(item=>item.id!==post.id && item.category===post.category);
 return <><SEOHead title={post.title+' | Valeria Stănculea'} description={post.excerpt} ogType="article" article={post} />
  <div className="site-container section-space"><div className="reading-column mx-auto">
   <Link to={collection} className="text-link text-base inline-block min-h-11">{copy.ui.backArticles}</Link>
   <article className="mt-5"><header className="mb-8"><p className="eyebrow">{category?.name}</p><h1 className="mt-4">{post.title}</h1><p className="text-base text-muted-foreground mt-5">{post.author} · {post.readTime}</p>
    <p className="helper-text mt-3">{copy.resources.reviewedLabel} <time dateTime={post.reviewedOn}>{new Intl.DateTimeFormat(localeMap[language],{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(post.reviewedOn+'T12:00:00Z'))}</time></p>
   </header>
    <div className="article-body" dangerouslySetInnerHTML={{__html:post.content}} />
    <section className="mt-8 border-t pt-6" aria-labelledby="article-sources"><h2 id="article-sources">{copy.resources.sourcesTitle}</h2>
     <p className="helper-text mt-3">{copy.resources.sourcesNote}</p>
     <ul className="mt-4 space-y-3">{post.sources.map(source=><li key={source.url}><span className="helper-text">{source.publisher} · </span><a className="text-link break-words" href={source.url} lang="en" rel="noreferrer">{source.title}</a></li>)}</ul>
    </section>
    <aside className="mt-8 border-t pt-6"><p className="helper-text">{copy.resources.notice}</p><Link to={path('/despre')} className="text-link inline-block mt-4 min-h-11">{copy.about.title}</Link></aside>
   </article>
  </div>{related.length>0 && <section className="mt-12"><h2 className="mb-6">{copy.ui.related}</h2><Articles posts={related.slice(0,3)} /></section>}</div>
 </>;
}
