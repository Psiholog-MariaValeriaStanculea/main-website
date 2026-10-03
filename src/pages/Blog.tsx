import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { getBlogPosts, getBlogCategories } from '@/data/blogPosts';
import { Articles } from '@/components/editorial/Articles';
import { SEOHead } from '@/components/SEOHead';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Action } from '@/components/editorial/Action';
const remembered=new Map<string,{query:string;category:string}>();
export default function Blog() {
 const {copy,language}=useEditorial();const c=copy.resources;const location=useLocation();
 const route=location.pathname.replace(/^\/(ro|en|it|es)/,'').replace(/\/$/,'');
 const [query,setQuery]=useState(()=>remembered.get(route)?.query || '');
 const [category,setCategory]=useState(()=>remembered.get(route)?.category || 'all');
 const [announced,setAnnounced]=useState('');
 const searchInput=useRef<HTMLInputElement>(null);
 const posts=getBlogPosts(language);const categories=getBlogCategories(language);
 const normal=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(language);
 const filtered=posts.filter(post=>(category==='all'||post.category===category) && normal(post.title+' '+post.excerpt).includes(normal(query.trim())));
 const count=filtered.length===1?c.countOne:c.count.replace('{count}',String(filtered.length));
 useEffect(()=>{remembered.set(route,{query,category});},[route,query,category]);
 useEffect(()=>{const timeout=setTimeout(()=>setAnnounced(count),400);return()=>clearTimeout(timeout);},[count]);
 return <><SEOHead /><div className="site-container pb-12">
  <header className="page-intro"><p className="eyebrow">{copy.nav.resources}</p><h1>{route==='/blog'||route==='/blog/'?c.articles:c.title}</h1><p>{c.intro}</p></header>
  <div className="mb-8"><Label htmlFor="article-search" className="field-label">{c.search}</Label><div className="flex flex-col sm:flex-row gap-3 max-w-2xl"><Input ref={searchInput} id="article-search" type="search" className="field-control" value={query} onChange={e=>setQuery(e.target.value)} placeholder={c.placeholder} />{query && <Action variant="outline" onClick={()=>{setQuery('');searchInput.current?.focus();}}>{c.clear}</Action>}</div>
   <div className="flex flex-wrap gap-2 mt-5"><Action variant={category==='all'?'default':'outline'} aria-pressed={category==='all'} onClick={()=>setCategory('all')} className="text-sm px-3">{c.all}</Action>{categories.map(item=><Action key={item.id} variant={category===item.id?'default':'outline'} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)} className="text-sm px-3">{item.name}</Action>)}</div>
   <p className="helper-text mt-4" role="status" aria-live="polite">{announced || count}</p>
  </div>
  {filtered.length?<Articles posts={filtered} />:<div className="py-8 copy-stack"><h2>{c.empty}</h2><p>{c.emptyText}</p><Action variant="outline" onClick={()=>{setQuery('');setCategory('all');searchInput.current?.focus();}}>{c.reset}</Action></div>}
 </div></>;
}
