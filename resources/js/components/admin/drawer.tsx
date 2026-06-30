import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export default function Drawer({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-[min(100vw,480px)] bg-background">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="mt-4 space-y-4">{children}</div>
        <div className="mt-6 flex justify-end">
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
