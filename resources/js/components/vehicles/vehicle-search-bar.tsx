import * as React from 'react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface VehicleSearchBarProps {
    defaultValue?: string;
    onSearch?: (query: string) => void;
    className?: string;
    placeholder?: string;
}

export default function VehicleSearchBar({
    defaultValue = '',
    onSearch,
    className,
    placeholder = 'Search by make, model, or keyword...',
}: VehicleSearchBarProps) {
    const [query, setQuery] = React.useState(defaultValue);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
            return;
        }
        router.get('/inventory', { search: query || undefined }, { preserveState: true });
    };

    return (
        <form onSubmit={submit} className={cn('flex gap-2', className)}>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="pl-10"
                />
            </div>
            <Button type="submit">Search</Button>
        </form>
    );
}
