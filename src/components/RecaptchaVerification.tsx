import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { loadRecaptcha } from '@/lib/recaptcha';
import type { EditorialCopy } from '@/lib/editorial';
import { Link } from 'react-router-dom';

type Props = {
 siteKey: string; language: string; copy: EditorialCopy['contact']; privacyUrl: string;
 onToken: (token: string) => void; reset: number; locked: boolean; invalid: boolean;
};
type VerificationState = 'loading' | 'ready' | 'verified' | 'expired' | 'failed';

export function RecaptchaVerification({ siteKey, language, copy, privacyUrl, onToken, reset, locked, invalid }: Props) {
 const container = useRef<HTMLDivElement>(null);
 const widget = useRef<{ id: number; api: Awaited<ReturnType<typeof loadRecaptcha>> }>();
 const [size, setSize] = useState<'normal' | 'compact' | null>(null);
 const [status, setStatus] = useState<VerificationState>('loading');
 const [attempt, setAttempt] = useState(0);

 useEffect(() => {
  const element = container.current;
  if (!element) return;
  const measure = () => setSize(element.clientWidth >= 304 ? 'normal' : 'compact');
  measure();
  const observer = new ResizeObserver(measure);
  observer.observe(element);
  return () => observer.disconnect();
 }, []);

 useEffect(() => {
  if (!siteKey || !size) return;
  const element = container.current;
  const mount = document.createElement('div');
  let active = true;
  onToken('');
  setStatus('loading');
  void loadRecaptcha(language).then(api => {
   if (!active || !element) return;
   element.append(mount);
   const id = api.render(mount, {
    sitekey: siteKey, size,
    callback: token => { if (active) { onToken(token); setStatus('verified'); } },
    'expired-callback': () => { if (active) { onToken(''); setStatus('expired'); } },
    'error-callback': () => { if (active) { onToken(''); setStatus('failed'); } },
   });
   widget.current = { id, api };
   setStatus(current => current === 'loading' ? 'ready' : current);
  }).catch(() => { if (active) { onToken(''); setStatus('failed'); } });
  return () => {
   active = false;
   if (widget.current) { widget.current.api.reset(widget.current.id); widget.current = undefined; }
   mount.remove();
  };
 }, [siteKey, size, language, onToken, attempt]);

 useEffect(() => {
  onToken('');
  if (widget.current) {
   setStatus('ready');
   widget.current.api.reset(widget.current.id);
  }
 }, [reset, onToken]);

 const failed = status === 'failed';
 const error = failed || (invalid && status !== 'verified' && status !== 'loading');
 const Icon = status === 'verified' ? CheckCircle2 : failed ? AlertCircle : ShieldCheck;
 const message = failed ? copy.captchaFailed : status === 'loading' ? copy.captchaLoading :
  status === 'verified' ? copy.captchaVerified : status === 'expired' ? copy.captchaExpired : copy.captchaRequired;

 return <section id="captcha-verification" tabIndex={-1} aria-labelledby="captcha-heading"
  aria-describedby="captcha-feedback" className="captcha-card" data-state={status} data-invalid={error || undefined}>
  <div className="captcha-heading"><Icon size={21} aria-hidden="true" /><h3 id="captcha-heading">{copy.captchaLabel}</h3></div>
  <div className="captcha-widget" ref={container} aria-label={copy.captchaLabel} data-size={size || 'compact'} aria-busy={status === 'loading'} />
  <div id="captcha-feedback" className={'captcha-feedback' + (error ? ' captcha-error' : '')}
   aria-live="polite" aria-atomic="true" role={error ? 'alert' : undefined}>
   {status === 'loading' && <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />}<p>{message}</p>
  </div>
  {failed && <button data-testid="captcha-retry" type="button" disabled={locked} className="captcha-retry"
   onClick={() => setAttempt(current => current + 1)}><RotateCcw size={16} aria-hidden="true" />{copy.captchaRetry}</button>}
  <p className="captcha-disclosure">{copy.captchaHelp} <Link to={privacyUrl}>{copy.captchaDetails}</Link></p>
 </section>;
}
