import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEditorial } from '@/lib/editorial';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Action } from './editorial/Action';
import { useMenuFocusReturn } from '@/hooks/useMenuFocusReturn';
export function ThemeToggle({showLabel = false}:{showLabel?:boolean}) {
 const {theme,setTheme} = useTheme();
 const {copy} = useEditorial();
 const focus=useMenuFocusReturn();
 const Icon = theme === 'system' ? Monitor : theme === 'dark' ? Moon : Sun;
 return <DropdownMenu modal={false}><DropdownMenuTrigger asChild><Action ref={focus.triggerRef} variant="ghost" className="utility-button px-2" aria-label={copy.ui.theme}><Icon className="h-4 w-4" />{showLabel && <span className="text-sm">{copy.ui.theme}</span>}</Action></DropdownMenuTrigger>
  <DropdownMenuContent {...focus.contentProps} align="end" className="z-[120]"><DropdownMenuRadioGroup value={theme} onValueChange={value=>setTheme(value as 'system'|'light'|'dark')}>
   {(['system','light','dark'] as const).map(value=><DropdownMenuRadioItem key={value} value={value} className="min-h-11 text-base">{copy.ui[value]}</DropdownMenuRadioItem>)}
  </DropdownMenuRadioGroup></DropdownMenuContent>
 </DropdownMenu>;
}
