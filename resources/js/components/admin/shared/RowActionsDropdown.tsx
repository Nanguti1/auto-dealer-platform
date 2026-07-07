import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface RowAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  destructive?: boolean;
  disabled?: boolean;
}

interface RowActionsDropdownProps {
  actions: RowAction[];
  ariaLabel?: string;
}

export function RowActionsDropdown({ actions, ariaLabel }: RowActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={ariaLabel || 'More options'}>
          <MoreHorizontal className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          if (action.href) {
            return (
              <DropdownMenuItem
                key={index}
                asChild
                disabled={action.disabled}
                className={action.destructive ? 'text-destructive' : undefined}
              >
                <Link href={action.href} aria-label={action.label}>
                  {action.icon && <span className="mr-2 size-4" aria-hidden="true">{action.icon}</span>}
                  {action.label}
                </Link>
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={action.destructive ? 'text-destructive' : undefined}
              aria-label={action.label}
            >
              {action.icon && <span className="mr-2 size-4" aria-hidden="true">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
