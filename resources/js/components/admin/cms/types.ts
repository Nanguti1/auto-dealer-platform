import type { Paginated } from '@/components/admin/inventory/types';

export interface CmsUser { id?: number; name?: string; email?: string; avatar_url?: string; [key: string]: unknown }
export interface BlogCategory { id?: number; name?: string; slug?: string; description?: string; is_active?: boolean; sort_order?: number; posts_count?: number; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface BlogTag { id?: number; name?: string; slug?: string; color?: string; usage_count?: number; posts_count?: number; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface BlogPost { id: number; blog_category_id?: number; author_id?: number; title?: string; slug?: string; excerpt?: string; body?: string; featured_image_path?: string; status?: string; published_at?: string; is_featured?: boolean; category?: BlogCategory; author?: CmsUser; tags?: BlogTag[]; comments_count?: number; views_count?: number; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface CmsPage { id: number; title?: string; slug?: string; content?: string; body?: string; meta_title?: string; meta_description?: string; status?: string; is_visible?: boolean; published_at?: string; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface Faq { id: number; category?: string; question?: string; answer?: string; order?: number; is_visible?: boolean; is_published?: boolean; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface HeroSlider { id: number; title?: string; subtitle?: string; image_path?: string; image_url?: string; cta_label?: string; cta_url?: string; sort_order?: number; is_active?: boolean; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface HomePageSection { id: number; name?: string; slug?: string; type?: string; content?: Record<string, unknown>; sort_order?: number; is_active?: boolean; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface MediaFile { id: number; file_name?: string; file_path?: string; file_size?: number; mime_type?: string; alt_text?: string; caption?: string; category?: string; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface SeoSettings { id?: number; seoable_type?: string; seoable_id?: number; meta_title?: string; meta_description?: string; canonical_url?: string; open_graph?: Record<string, unknown>; schema_markup?: Record<string, unknown>; [key: string]: unknown }
export interface HomepageSettings { hero_section?: Record<string, unknown>; featured_vehicles?: number[]; featured_brands?: number[]; featured_categories?: number[]; featured_testimonials?: number[]; featured_blog_posts?: number[]; cta_sections?: Array<Record<string, unknown>>; promotional_banners?: Array<Record<string, unknown>>; statistics?: Record<string, unknown>; [key: string]: unknown }
export type BlogPostPagination = Paginated<BlogPost>;
export type CmsPagePagination = Paginated<CmsPage>;
export type BlogCategoryPagination = Paginated<BlogCategory>;
export type BlogTagPagination = Paginated<BlogTag>;
export type FaqPagination = Paginated<Faq>;
export type HeroSliderPagination = Paginated<HeroSlider>;
export type HomePageSectionPagination = Paginated<HomePageSection>;
export type MediaFilePagination = Paginated<MediaFile>;
export type CmsFilters = Record<string, string | number | boolean | undefined>;
