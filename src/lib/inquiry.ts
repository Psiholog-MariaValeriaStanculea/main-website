export type SubmissionStatus = 'ready' | 'sending' | 'accepted' | 'rejected' | 'uncertain' | 'unavailable';
export type SubmissionState = { status: SubmissionStatus; pending: boolean };
export function createSubmissionController(
 send: (payload: Record<string,string>) => Promise<unknown>,
 publish: (state: SubmissionState) => void,
 available: boolean,
 timeoutMs = 30000,
) {
 let pending = false; let disposed = false; let timer: ReturnType<typeof setTimeout> | undefined;
 const emit = (status: SubmissionStatus) => { if (!disposed) publish({status,pending}); };
 return {
  async submit(payload: Record<string,string>) {
   if (pending || disposed) return;
   if (!available) { emit('unavailable'); return; }
   pending = true; emit('sending');
   timer = setTimeout(()=>emit('uncertain'),timeoutMs);
   try { await send(payload); if(timer) clearTimeout(timer); pending=false; emit('accepted'); }
   catch(error) {
    if(timer) clearTimeout(timer); pending=false;
    const status = typeof error === 'object' && error !== null && 'status' in error ? Number(error.status) : 0;
    emit(status >= 400 && status < 500 ? 'rejected' : 'uncertain');
   }
  },
  reset() { if(!pending) emit(available ? 'ready' : 'unavailable'); },
  dispose() {disposed=true;if(timer) clearTimeout(timer);},
 };
}
export function validateInquiry(data:{name:string;email:string;message:string}) {
 return {
  name: !data.name.trim(),
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()),
  message: data.message.length > 1000,
 };
}