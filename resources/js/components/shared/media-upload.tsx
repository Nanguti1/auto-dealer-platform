import { GripVertical, ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import * as React from 'react';
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
    previewUrl?: string;
    maxSize?: number; // Max file size in bytes
    error?: string;
    disabled?: boolean;
}

function ImageDropzone({ onFilesSelected, className, multiple = true, accept = 'image/*', previewUrl, maxSize = 10 * 1024 * 1024, error, disabled = false }: ImageDropzoneProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = React.useState(false);
    const [preview, setPreview] = React.useState<string | null>(previewUrl ?? null);
    const [validationError, setValidationError] = React.useState<string | null>(null);

    const handleFiles = (fileList: FileList | null) => {
        setValidationError(null);
        const files = Array.from(fileList ?? []);

        // Filter by file type
        const validFiles = files.filter((file) => {
            if (accept.startsWith('image/') && !file.type.startsWith('image/')) {
                setValidationError(`File "${file.name}" is not an image`);
                return false;
            }
            if (accept.includes('application/pdf') && file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
                setValidationError(`File "${file.name}" is not a valid file type`);
                return false;
            }
            return true;
        });

        // Filter by file size
        const sizeValidFiles = validFiles.filter((file) => {
            if (file.size > maxSize) {
                setValidationError(`File "${file.name}" exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
                return false;
            }
            return true;
        });

        if (sizeValidFiles.length > 0) {
            // Show preview for single file
            if (!multiple && sizeValidFiles[0]) {
                setPreview(URL.createObjectURL(sizeValidFiles[0]));
            }
            onFilesSelected(sizeValidFiles);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        setValidationError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    // Update preview when previewUrl prop changes
    React.useEffect(() => {
        if (previewUrl) {
            setPreview(previewUrl);
        }
    }, [previewUrl]);

    // Update validation error when error prop changes
    React.useEffect(() => {
        if (error) {
            setValidationError(error);
        }
    }, [error]);

    // If preview exists, show it with option to remove
    if (preview && !multiple) {
        return (
            <div className={cn('relative overflow-hidden rounded-3xl border bg-card', className)}>
                <img src={preview} alt="Preview" className="h-64 w-full object-cover" />
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={clearPreview}
                    aria-label="Remove image"
                >
                    <Trash2 className="size-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div
                role={disabled ? undefined : 'button'}
                tabIndex={disabled ? undefined : 0}
                onClick={() => !disabled && inputRef.current?.click()}
                onKeyDown={(event) => {
                    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
inputRef.current?.click();
}
                }}
                onDragOver={(event) => {
                    if (!disabled) {
                        event.preventDefault();
                        setDragging(true);
                    }
                }}
                onDragLeave={() => !disabled && setDragging(false)}
                onDrop={(event) => {
                    if (!disabled) {
                        event.preventDefault();
                        setDragging(false);
                        handleFiles(event.dataTransfer.files);
                    }
                }}
                className={cn(
                    'group flex flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/30 p-8 text-center transition-all',
                    !disabled && 'cursor-pointer hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    dragging && 'border-primary bg-primary/10',
                    validationError && 'border-destructive bg-destructive/10',
                    disabled && 'cursor-not-allowed opacity-50',
                    className,
                )}
                aria-label={disabled ? undefined : 'Upload images'}
                aria-disabled={disabled}
            >
                <input ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled} className="hidden" onChange={(event) => handleFiles(event.target.files)} />
                <div className={cn('mb-4 rounded-full bg-background p-4 shadow-sm transition-transform', !disabled && 'group-hover:scale-105')}>
                    <UploadCloud className="size-7 text-primary" />
                </div>
                <p className="font-medium">{disabled ? 'Upload disabled' : 'Drop images here or click to browse'}</p>
                <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, WEBP up to {maxSize / 1024 / 1024}MB</p>
            </div>
            {validationError && (
                <p className="text-sm text-destructive" role="alert">
                    {validationError}
                </p>
            )}
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

        if (target < 0 || target >= next.length) {
return;
}

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
    name?: string;
    value?: MediaUploadItem[];
    onChange?: (items: MediaUploadItem[]) => void;
    existingMedia?: any[];
    className?: string;
}

function MediaUpload({ name = 'media', value = [], onChange, existingMedia = [], className }: MediaUploadProps) {
    const [items, setItems] = React.useState<MediaUploadItem[]>(value);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const update = (next: MediaUploadItem[]) => {
        setItems(next);
        onChange?.(next);
    };

    const addFiles = (files: File[]) => {
        const newItems = files.map((file) => ({ 
            id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, 
            file, 
            url: URL.createObjectURL(file), 
            alt: file.name 
        }));
        update([...items, ...newItems]);
    };

    const handleFormSubmit = () => {
        // Create a hidden file input to append files to the form
        if (items.length > 0 && inputRef.current) {
            const dataTransfer = new DataTransfer();
            items.forEach((item) => {
                if (item.file) {
                    dataTransfer.items.add(item.file);
                }
            });
            inputRef.current.files = dataTransfer.files;
        }
    };

    // Handle form submission by attaching to parent form
    React.useEffect(() => {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
            return () => form.removeEventListener('submit', handleFormSubmit);
        }
    }, [items]);

    return (
        <div className={cn('space-y-4', className)}>
            <input 
                ref={inputRef} 
                type="file" 
                name={name} 
                multiple 
                className="hidden" 
            />
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
