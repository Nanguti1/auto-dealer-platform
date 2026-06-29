import * as React from 'react';
import { GripVertical, ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface MediaUploadItem {
    id: string;
    url: string;
    file?: File;
    alt?: string;
}

interface ImageDropzoneProps {
    onFilesSelected: (files: File[]) => void;
    className?: string;
    multiple?: boolean;
    accept?: string;
}

function ImageDropzone({ onFilesSelected, className, multiple = true, accept = 'image/*' }: ImageDropzoneProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = React.useState(false);

    const handleFiles = (fileList: FileList | null) => {
        const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith('image/'));
        if (files.length > 0) onFilesSelected(files);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
            }}
            onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                handleFiles(event.dataTransfer.files);
            }}
            className={cn(
                'group flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/30 p-8 text-center transition-all',
                'hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                dragging && 'border-primary bg-primary/10',
                className,
            )}
            aria-label="Upload images"
        >
            <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(event) => handleFiles(event.target.files)} />
            <div className="mb-4 rounded-full bg-background p-4 shadow-sm transition-transform group-hover:scale-105">
                <UploadCloud className="size-7 text-primary" />
            </div>
            <p className="font-medium">Drop images here or click to browse</p>
            <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, WEBP up to your configured upload limit.</p>
        </div>
    );
}

interface ImageSortableGridProps {
    items: MediaUploadItem[];
    onChange: (items: MediaUploadItem[]) => void;
    className?: string;
}

function ImageSortableGrid({ items, onChange, className }: ImageSortableGridProps) {
    const move = (index: number, direction: -1 | 1) => {
        const next = [...items];
        const target = index + direction;
        if (target < 0 || target >= next.length) return;
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    };

    return (
        <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
            {items.map((item, index) => (
                <figure key={item.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <img src={item.url} alt={item.alt ?? `Uploaded image ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="flex items-center justify-between gap-2 p-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><GripVertical className="size-4" /> Image {index + 1}</div>
                        <div className="flex gap-1">
                            <Button type="button" variant="ghost" size="sm" disabled={index === 0} onClick={() => move(index, -1)}>Up</Button>
                            <Button type="button" variant="ghost" size="sm" disabled={index === items.length - 1} onClick={() => move(index, 1)}>Down</Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => onChange(items.filter((candidate) => candidate.id !== item.id))} aria-label="Remove image">
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}

interface MediaUploadProps {
    value?: MediaUploadItem[];
    onChange?: (items: MediaUploadItem[]) => void;
    className?: string;
}

function MediaUpload({ value = [], onChange, className }: MediaUploadProps) {
    const [items, setItems] = React.useState(value);

    const update = (next: MediaUploadItem[]) => {
        setItems(next);
        onChange?.(next);
    };

    const addFiles = (files: File[]) => {
        update([
            ...items,
            ...files.map((file) => ({ id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, file, url: URL.createObjectURL(file), alt: file.name })),
        ]);
    };

    return (
        <div className={cn('space-y-4', className)}>
            <ImageDropzone onFilesSelected={addFiles} />
            {items.length > 0 ? <ImageSortableGrid items={items} onChange={update} /> : (
                <div className="flex items-center justify-center gap-2 rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
                    <ImagePlus className="size-4" /> No media selected yet.
                </div>
            )}
        </div>
    );
}

export { ImageDropzone, ImageSortableGrid, MediaUpload };
