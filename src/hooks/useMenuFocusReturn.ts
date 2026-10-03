import { useRef } from 'react';

/** Return focus without scrolling a sticky trigger back to its document position. */
export function useMenuFocusReturn(){
 const triggerRef=useRef<HTMLButtonElement>(null);
 const interactedOutside=useRef(false);
 return {triggerRef,contentProps:{
  onInteractOutside:()=>{interactedOutside.current=true;},
  onCloseAutoFocus:(event:Event)=>{
   event.preventDefault();
   if(!interactedOutside.current)triggerRef.current?.focus({preventScroll:true});
   interactedOutside.current=false;
  },
 }};
}
