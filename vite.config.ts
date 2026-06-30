import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

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
                        // Other vendors
                        return 'vendor';
                    }

                    // Admin module chunks
                    if (id.includes('resources/js/pages/Admin')) {
                        // Split by module
                        if (id.includes('/Dashboard/')) {
                            return 'admin-dashboard';
                        }
                        if (id.includes('/Inventory/')) {
                            return 'admin-inventory';
                        }
                        if (id.includes('/Customers/')) {
                            return 'admin-customers';
                        }
                        if (id.includes('/CRM/')) {
                            return 'admin-crm';
                        }
                        if (id.includes('/Finance/')) {
                            return 'admin-finance';
                        }
                        if (id.includes('/Reservations/')) {
                            return 'admin-reservations';
                        }
                        if (id.includes('/Payments/')) {
                            return 'admin-payments';
                        }
                        if (id.includes('/Trade-Ins/')) {
                            return 'admin-tradeins';
                        }
                        if (id.includes('/Imports/')) {
                            return 'admin-imports';
                        }
                        if (id.includes('/CMS/')) {
                            return 'admin-cms';
                        }
                        if (id.includes('/Blog/')) {
                            return 'admin-blog';
                        }
                        if (id.includes('/Marketing/')) {
                            return 'admin-marketing';
                        }
                        if (id.includes('/Settings/')) {
                            return 'admin-settings';
                        }
                        if (id.includes('/Analytics/')) {
                            return 'admin-analytics';
                        }
                        if (id.includes('/Reviews/')) {
                            return 'admin-reviews';
                        }
                        return 'admin';
                    }

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
    },
});
