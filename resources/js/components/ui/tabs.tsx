import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
    value: string;
    setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps extends Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> {
    value?: string;
    defaultValue: string;
    onValueChange?: (value: string) => void;
}

function Tabs({ className, value, defaultValue, onValueChange, ...props }: TabsProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const setValue = (next: string) => {
        if (value === undefined) setInternalValue(next);
        onValueChange?.(next);
    };

    return <TabsContext.Provider value={{ value: currentValue, setValue }}><div data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} /></TabsContext.Provider>;
}

function TabsList({ className, ...props }: React.ComponentProps<'div'>) {
    return <div role="tablist" data-slot="tabs-list" className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className)} {...props} />;
}

interface TabsTriggerProps extends React.ComponentProps<'button'> {
    value: string;
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
    const context = React.useContext(TabsContext);
    const selected = context?.value === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={selected}
            data-state={selected ? 'active' : 'inactive'}
            data-slot="tabs-trigger"
            onClick={() => context?.setValue(value)}
            className={cn(
                'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
                selected && 'bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30',
                className,
            )}
            {...props}
        />
    );
}

interface TabsContentProps extends React.ComponentProps<'div'> {
    value: string;
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
    const context = React.useContext(TabsContext);
    const selected = context?.value === value;

    if (!selected) return null;

    return <div role="tabpanel" data-slot="tabs-content" className={cn('animate-in fade-in-50 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
