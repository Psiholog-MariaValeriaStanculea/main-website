import { type ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { useEditorial } from '@/lib/editorial';
import { withoutLanguage } from '@/lib/routes';
const positions = new Map<string, {x:number;y:number}>();
const useBrowserLayoutEffect=typeof window==='undefined'?useEffect:useLayoutEffect;
export default function Layout({children}:{children?:ReactNode}) {
 const location = useLocation(); const type = useNavigationType();
 const {copy} = useEditorial();
 const previous = useRef<{key:string;path:string} | null>(null);
 useEffect(()=>{
  const restoration=window.history.scrollRestoration;window.history.scrollRestoration='manual';
  return()=>{window.history.scrollRestoration=restoration;};
 },[]);
 useBrowserLayoutEffect(() => {
  document.documentElement.dataset.appReady = 'true';
  const old = previous.current; const suffix = withoutLanguage(location.pathname);
  previous.current = {key:location.key,path:suffix};
  let restoring=true;
  const frame = requestAnimationFrame(() => {
   try {
   if (type === 'POP' && positions.has(location.key)) {
    const position = positions.get(location.key)!; window.scrollTo(position.x,position.y); return;
   }
   if (old && old.path === suffix && old.key !== location.key && !location.hash) {
    // Translated text can trigger native scroll anchoring; keep the saved reading position.
    const position=positions.get(old.key);
    if(position)window.scrollTo(position.x,position.y);
    return;
   }
   if (location.hash) {
    let anchor = location.hash.slice(1);
    try { anchor = decodeURIComponent(anchor); } catch { /* Keep malformed bookmarks readable. */ }
    const target = document.getElementById(anchor);
    target?.scrollIntoView({behavior:'instant'});
    if(target && old && (old.path!==suffix || type==='PUSH')){
     const heading=target.matches('h1,h2,h3')?target:target.querySelector<HTMLElement>('h2,h3') || target;
     heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
    }
   } else if (old) {
    window.scrollTo(0,0);
    const heading = document.querySelector<HTMLElement>('main h1');
    heading?.setAttribute('tabindex','-1'); heading?.focus({preventScroll:true});
   }
   } finally { restoring=false; }
  });
  const record = () => {if(!restoring)positions.set(location.key,{x:window.scrollX,y:window.scrollY});};
  window.addEventListener('scroll',record,{passive:true});
  document.addEventListener('click',record,true);
  return () => {cancelAnimationFrame(frame);window.removeEventListener('scroll',record);document.removeEventListener('click',record,true);};
 },[location.key,location.pathname,location.hash,type]);
 return <div className="min-h-screen flex flex-col">
  <a href="#main-content" className="skip-link">{copy.ui.skip}</a>
  <Navigation /><main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children || <Outlet />}</main><Footer />
 </div>;
}
