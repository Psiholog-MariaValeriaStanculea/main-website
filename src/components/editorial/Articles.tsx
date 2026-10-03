import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, HeartHandshake, MessageCircle, Puzzle, Sprout, Users } from 'lucide-react';
import { getBlogCategories, type BlogPost } from '@/data/blogPosts';
import { useEditorial } from '@/lib/editorial';
export function Articles({posts}:{posts:BlogPost[]}) {
 const {copy,language,path} = useEditorial(); const categories=getBlogCategories(language); const location=useLocation();
 const state={fromCollection:location.pathname};
 const icons={'play-therapy':Puzzle,'adolescent-therapy':MessageCircle,'child-development':Sprout,'parental-counseling':HeartHandshake,'family-dynamics':Users};
 return <div className="article-grid">{posts.map(post=>{const Icon=icons[post.category];return <article key={post.id} className="article-preview">
  <div className="article-art" data-category={post.category} aria-hidden="true"><Icon size={52} strokeWidth={1.15} /></div>
  <div className="article-preview-copy"><span className="eyebrow">{categories.find(category=>category.id===post.category)?.name}</span>
  <h3><Link to={path('/blog/'+post.id)} state={state} className="hover:underline">{post.title}</Link></h3>
  <p>{post.excerpt}</p><Link className="text-link text-base" to={path('/blog/'+post.id)} state={state} aria-label={copy.ui.read+': '+post.title}>{copy.ui.read}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
 </article>;})}</div>;
}
