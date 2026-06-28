import * as React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const typographyVariants = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight',
  h5: 'text-lg md:text-xl lg:text-2xl font-semibold tracking-tight',
  h6: 'text-base md:text-lg lg:text-xl font-semibold tracking-tight',
  p: 'text-base leading-relaxed',
  lead: 'text-lg md:text-xl leading-relaxed text-muted-foreground',
  small: 'text-sm leading-relaxed',
  muted: 'text-sm text-muted-foreground',
  label: 'text-sm font-medium leading-none',
};

function H1({ className, ...props }: TypographyProps) {
  return (
    <h1 className={cn(typographyVariants.h1, className)} {...props} />
  );
}

function H2({ className, ...props }: TypographyProps) {
  return (
    <h2 className={cn(typographyVariants.h2, className)} {...props} />
  );
}

function H3({ className, ...props }: TypographyProps) {
  return (
    <h3 className={cn(typographyVariants.h3, className)} {...props} />
  );
}

function H4({ className, ...props }: TypographyProps) {
  return (
    <h4 className={cn(typographyVariants.h4, className)} {...props} />
  );
}

function H5({ className, ...props }: TypographyProps) {
  return (
    <h5 className={cn(typographyVariants.h5, className)} {...props} />
  );
}

function H6({ className, ...props }: TypographyProps) {
  return (
    <h6 className={cn(typographyVariants.h6, className)} {...props} />
  );
}

function P({ className, ...props }: TypographyProps) {
  return (
    <p className={cn(typographyVariants.p, className)} {...props} />
  );
}

function Lead({ className, ...props }: TypographyProps) {
  return (
    <p className={cn(typographyVariants.lead, className)} {...props} />
  );
}

function Small({ className, ...props }: TypographyProps) {
  return (
    <small className={cn(typographyVariants.small, className)} {...props} />
  );
}

function Muted({ className, ...props }: TypographyProps) {
  return (
    <p className={cn(typographyVariants.muted, className)} {...props} />
  );
}

function Label({ className, ...props }: TypographyProps) {
  return (
    <label className={cn(typographyVariants.label, className)} {...props} />
  );
}

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Lead,
  Small,
  Muted,
  Label,
};
