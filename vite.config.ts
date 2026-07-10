import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        // Bundle analyzer plugin (only in analyze mode)
        ...(process.env.ANALYZE === 'true' ? [
            visualizer({
                filename: 'bundle-analysis.html',
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
        ] : []),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Vendor chunks
                    if (id.includes('node_modules')) {
                        // React and related
                        if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                            return 'vendor-react';
                        }
                        // Inertia
                        if (id.includes('@inertiajs')) {
                            return 'vendor-inertia';
                        }
                        // Recharts (charts library)
                        if (id.includes('recharts')) {
                            return 'vendor-charts';
                        }
                        // UI components (shadcn)
                        if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
                            return 'vendor-ui';
                        }
                        // Icons
                        if (id.includes('lucide-react')) {
                            return 'vendor-icons';
                        }
                        // Framer Motion
                        if (id.includes('framer-motion')) {
                            return 'vendor-motion';
                        }
                        // Other vendors
                        return 'vendor';
                    }

                    // Note: Admin pages are handled by Inertia plugin code splitting
                    // Do not manually chunk pages as it conflicts with Inertia's resolution

                    // Component chunks
                    if (id.includes('resources/js/components')) {
                        if (id.includes('design-system')) {
                            return 'components-design-system';
                        }
                        if (id.includes('admin')) {
                            return 'components-admin';
                        }
                        return 'components';
                    }
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
        chunkSizeWarningLimit: 1000,
        // Enable tree shaking
        cssCodeSplit: true,
        // Minify CSS
        cssMinify: true,
        // Source maps for production debugging
        sourcemap: false,
    },
});
