import { forwardRef } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export const Action = forwardRef<HTMLButtonElement, ButtonProps>(function Action({ className, variant = 'default', ...props }, ref) {
  return <Button ref={ref} variant={variant} className={cn('editorial-button !min-h-12 !py-3 !text-base hover:!translate-y-0', variant === 'outline' && 'editorial-outline', className)} {...props} />;
});
