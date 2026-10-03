import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { createSubmissionController, type SubmissionState } from '@/lib/inquiry';
import { contactConfigured, sendInquiry } from '@/lib/inquiryTransport';

type Draft={data:{name:string;email:string;category:string;message:string};context:string;sourceService:string|null};
const emptyDraft=(sourceService:string|null=null):Draft=>({data:{name:'',email:'',category:'unsure',message:''},context:'',sourceService});
const InquiryContext=createContext<{
 draft:Draft;setDraft:Dispatch<SetStateAction<Draft>>;state:SubmissionState;
 submit:(payload:Record<string,string>)=>void;reset:(sourceService:string|null)=>void;
}|undefined>(undefined);

/** In-memory session: navigation unmounts Contact, not its outstanding request. */
export function InquiryProvider({children}:{children:ReactNode}) {
 const [draft,setDraft]=useState(()=>emptyDraft());
 const [state,setState]=useState<SubmissionState>({status:contactConfigured?'ready':'unavailable',pending:false});
 const controller=useRef<ReturnType<typeof createSubmissionController>>();
 useEffect(()=>{
  const session=createSubmissionController(sendInquiry,next=>{
   setState(next);
   if(next.status==='accepted')setDraft(current=>emptyDraft(current.sourceService));
  },contactConfigured);
  controller.current=session;
  return()=>{session.dispose();controller.current=undefined;};
 },[]);
 return <InquiryContext.Provider value={{draft,setDraft,state,
  submit:payload=>{void controller.current?.submit(payload);},
  reset:sourceService=>{if(!state.pending){setDraft(emptyDraft(sourceService));controller.current?.reset();}},
 }}>{children}</InquiryContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInquiry(){
 const session=useContext(InquiryContext);
 if(!session)throw new Error('useInquiry must be used within an InquiryProvider');
 return session;
}
