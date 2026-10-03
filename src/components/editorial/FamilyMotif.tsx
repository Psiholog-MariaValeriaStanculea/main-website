/** Decorative line drawing; page headings carry all meaningful information. */
export function FamilyMotif({className = ''}:{className?:string}) {
 return <svg className={className} viewBox="0 0 180 130" fill="none" aria-hidden="true" focusable="false">
  <path d="M17 116C17 78 29 54 52 54C70 54 80 69 85 87M163 116C163 78 151 54 128 54C110 54 100 69 95 87" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  <circle cx="52" cy="30" r="15" stroke="currentColor" strokeWidth="2.5" /><circle cx="128" cy="30" r="15" stroke="currentColor" strokeWidth="2.5" />
  <path d="M63 117C64 92 74 79 90 79C106 79 116 92 117 117M42 84C51 107 67 119 90 119C113 119 129 107 138 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  <circle cx="90" cy="62" r="11" stroke="currentColor" strokeWidth="2.5" />
  <path d="M90 24C79 13 67 28 90 41C113 28 101 13 90 24Z" fill="currentColor" opacity=".3" />
 </svg>;
}
