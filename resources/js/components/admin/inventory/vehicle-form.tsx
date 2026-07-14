import { useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Save, Loader2 } from 'lucide-react';
import * as React from 'react';
import InputError from '@/components/input-error';
import { MediaUpload, MediaUploadItem } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { generateSlug } from '@/lib/slug-utils';
import type { AdminVehicle, AdminFeature } from './types';

const tabs = ['Basic Information', 'Specifications', 'Features', 'Pricing', 'Media', 'SEO', 'Publication'];

function Field({ name, label, type = 'text', value, error, setData }: { name: string; label: string; type?: string; value?: string | number | boolean; error?: string; setData?: (name: string, value: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input 
        id={name} 
        name={name} 
        type={type} 
        defaultValue={String(value ?? '')} 
        onChange={(e) => setData?.(name, e.target.value)} 
      />
      <InputError message={error} />
    </div>
  );
}

function SelectField({ name, label, value, error, options, placeholder = 'Select...', setData }: { name: string; label: string; value?: string | number; error?: string; options: { value: string | number; label: string }[]; placeholder?: string; setData?: (name: string, value: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue={String(value ?? '')}
        onChange={(e) => setData?.(name, e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      <InputError message={error} />
    </div>
  );
}

export default function VehicleForm({
  vehicle,
  action,
  method = 'post',
  branches = [],
  makes = [],
  models = [],
  vehicleCategories = [],
  trimLevels = [],
  bodyTypes = [],
  fuelTypes = [],
  transmissionTypes = [],
  driveTypes = [],
  engineTypes = [],
  colors = [],
  interiorColors = [],
  vehicleConditions = [],
  vehicleStatuses = [],
  inventoryStatuses = [],
  features = [],
}: {
  vehicle?: AdminVehicle;
  action: string;
  method?: 'post' | 'put' | 'patch';
  branches?: Array<{ value: number; label: string }>;
  makes?: Array<{ value: number; label: string }>;
  models?: Array<{ value: number; label: string; make_id: number }>;
  vehicleCategories?: Array<{ value: number; label: string }>;
  trimLevels?: Array<{ value: number; label: string }>;
  bodyTypes?: Array<{ value: number; label: string }>;
  fuelTypes?: Array<{ value: number; label: string }>;
  transmissionTypes?: Array<{ value: number; label: string }>;
  driveTypes?: Array<{ value: number; label: string }>;
  engineTypes?: Array<{ value: number; label: string }>;
  colors?: Array<{ value: number; label: string }>;
  interiorColors?: Array<{ value: number; label: string }>;
  vehicleConditions?: Array<{ value: number; label: string }>;
  vehicleStatuses?: Array<{ value: number; label: string }>;
  inventoryStatuses?: Array<{ value: number; label: string }>;
  features?: AdminFeature[];
}) {
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(!!vehicle?.slug);

  const { data, setData, processing, errors, post, put } = useForm({
    _method: method === 'post' ? 'post' : 'put',
    title: vehicle?.title ?? '',
    slug: vehicle?.slug ?? '',
    stock_number: vehicle?.stock_number ?? '',
    vin: vehicle?.vin ?? '',
    year: vehicle?.year ?? '',
    branch_id: vehicle?.branch_id ?? '',
    make_id: vehicle?.make_id ?? '',
    model_id: vehicle?.model_id ?? '',
    description: vehicle?.description ?? '',
    mileage: vehicle?.mileage ?? '',
    vehicle_category_id: vehicle?.vehicle_category_id ?? '',
    trim_level_id: vehicle?.trim_level_id ?? '',
    body_type_id: vehicle?.body_type_id ?? '',
    fuel_type_id: vehicle?.fuel_type_id ?? '',
    transmission_type_id: vehicle?.transmission_type_id ?? '',
    drive_type_id: vehicle?.drive_type_id ?? '',
    engine_type_id: vehicle?.engine_type_id ?? '',
    color_id: vehicle?.color_id ?? '',
    interior_color_id: vehicle?.interior_color_id ?? '',
    vehicle_condition_id: vehicle?.vehicle_condition_id ?? '',
    vehicle_status_id: vehicle?.vehicle_status_id ?? '',
    inventory_status_id: vehicle?.inventory_status_id ?? '',
    features: vehicle?.features ?? [],
    cost_price: vehicle?.cost_price ?? '',
    sale_price: vehicle?.sale_price ?? '',
    msrp: vehicle?.msrp ?? '',
    media: [] as File[],
    meta_title: vehicle?.meta_title ?? '',
    meta_description: vehicle?.meta_description ?? '',
    is_featured: vehicle?.is_featured ?? false,
    is_certified: vehicle?.is_certified ?? false,
    acquired_at: vehicle?.acquired_at?.split('T')[0] ?? '',
    listed_at: vehicle?.listed_at?.split('T')[0] ?? '',
    sold_at: vehicle?.sold_at?.split('T')[0] ?? '',
    specifications: vehicle?.specifications ?? [],
    metadata: vehicle?.metadata ?? [],
    save_as_draft: false,
  });

  const filteredModels = React.useMemo(() => {
    if (!data.make_id) return models;
    return models.filter((model) => model.make_id === parseInt(data.make_id));
  }, [data.make_id, models]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('title', value);
    // Only auto-generate slug if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      setData('slug', generateSlug(value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('slug', e.target.value);
    setIsSlugManuallyEdited(true);
  };

  const handleMediaChange = (items: MediaUploadItem[]) => {
    const files = items.map(item => item.file).filter((file): file is File => file !== undefined);
    setData('media', files);
  };

  const handleFeatureToggle = (featureId: number) => {
    const currentFeatures = data.features as number[];
    if (currentFeatures.includes(featureId)) {
      setData('features', currentFeatures.filter(id => id !== featureId));
    } else {
      setData('features', [...currentFeatures, featureId]);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };

  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  const handleSaveDraft = () => {
    setData('save_as_draft', true);
    
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  const isLastTab = currentTab === tabs[tabs.length - 1];
  const isFirstTab = currentTab === tabs[0];

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="_method" value={method === 'post' ? 'post' : 'put'} />

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Basic Information" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" value={data.title} onChange={handleTitleChange} />
            <InputError message={errors.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" type="text" value={data.slug} onChange={handleSlugChange} />
            <InputError message={errors.slug} />
          </div>

          <Field name="stock_number" label="Stock number" value={data.stock_number} error={errors.stock_number} setData={setData} />
          <Field name="vin" label="VIN" value={data.vin} error={errors.vin} setData={setData} />
          <Field name="year" label="Year" type="number" value={data.year} error={errors.year} setData={setData} />
          <SelectField name="branch_id" label="Branch" value={data.branch_id} error={errors.branch_id} options={branches} placeholder="Select branch" setData={setData} />
          <SelectField name="make_id" label="Make" value={data.make_id} error={errors.make_id} options={makes} placeholder="Select make" setData={setData} />
          <SelectField name="model_id" label="Model" value={data.model_id} error={errors.model_id} options={filteredModels} placeholder="Select model" setData={setData} />

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              id="description"
              name="description"
              value={data.description}
              onChange={(value) => setData('description', value)}
            />
            <InputError message={errors.description} />
          </div>

          <div className="md:col-span-2 flex justify-between">
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
              {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Draft
            </Button>
            <Button type="button" variant="outline" onClick={handleNextTab}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="Specifications" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
          <Field name="mileage" label="Mileage" type="number" value={data.mileage} error={errors.mileage} setData={setData} />
          <SelectField name="vehicle_category_id" label="Vehicle Category" value={data.vehicle_category_id} error={errors.vehicle_category_id} options={vehicleCategories} placeholder="Select category" setData={setData} />
          <SelectField name="trim_level_id" label="Trim Level" value={data.trim_level_id} error={errors.trim_level_id} options={trimLevels} placeholder="Select trim level" setData={setData} />
          <SelectField name="body_type_id" label="Body Type" value={data.body_type_id} error={errors.body_type_id} options={bodyTypes} placeholder="Select body type" setData={setData} />
          <SelectField name="fuel_type_id" label="Fuel Type" value={data.fuel_type_id} error={errors.fuel_type_id} options={fuelTypes} placeholder="Select fuel type" setData={setData} />
          <SelectField name="transmission_type_id" label="Transmission Type" value={data.transmission_type_id} error={errors.transmission_type_id} options={transmissionTypes} placeholder="Select transmission" setData={setData} />
          <SelectField name="drive_type_id" label="Drive Type" value={data.drive_type_id} error={errors.drive_type_id} options={driveTypes} placeholder="Select drive type" setData={setData} />
          <SelectField name="engine_type_id" label="Engine Type" value={data.engine_type_id} error={errors.engine_type_id} options={engineTypes} placeholder="Select engine type" setData={setData} />
          <SelectField name="color_id" label="Color" value={data.color_id} error={errors.color_id} options={colors} placeholder="Select color" setData={setData} />
          <SelectField name="interior_color_id" label="Interior Color" value={data.interior_color_id} error={errors.interior_color_id} options={interiorColors} placeholder="Select interior color" setData={setData} />
          <SelectField name="vehicle_condition_id" label="Vehicle Condition" value={data.vehicle_condition_id} error={errors.vehicle_condition_id} options={vehicleConditions} placeholder="Select condition" setData={setData} />
          <SelectField name="vehicle_status_id" label="Vehicle Status" value={data.vehicle_status_id} error={errors.vehicle_status_id} options={vehicleStatuses} placeholder="Select status" setData={setData} />
          <SelectField name="inventory_status_id" label="Inventory Status" value={data.inventory_status_id} error={errors.inventory_status_id} options={inventoryStatuses} placeholder="Select inventory status" setData={setData} />

          <div className="md:col-span-3 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="button" variant="outline" onClick={handleNextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Features" className="grid gap-4 rounded-xl border bg-card p-4">
          <div className="space-y-4">
            <Label htmlFor="features">Features</Label>
            {features.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No features available. Please seed the features table first.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`feature-${feature.id}`}
                      name="features[]"
                      value={feature.id}
                      checked={(data.features as number[]).includes(feature.id)}
                      onChange={() => handleFeatureToggle(feature.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`feature-${feature.id}`} className="cursor-pointer">
                      {feature.name || feature.title}
                    </Label>
                  </div>
                ))}
              </div>
            )}
            <InputError message={errors.features} />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="button" variant="outline" onClick={handleNextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Pricing" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <Field name="cost_price" label="Cost Price" type="number" step="0.01" value={data.cost_price} error={errors.cost_price} setData={setData} />
          <Field name="sale_price" label="Sale Price" type="number" step="0.01" value={data.sale_price} error={errors.sale_price} setData={setData} />
          <Field name="msrp" label="MSRP" type="number" step="0.01" value={data.msrp} error={errors.msrp} setData={setData} />

          <div className="md:col-span-2 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="button" variant="outline" onClick={handleNextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Media" className="grid gap-4 rounded-xl border bg-card p-4">
          <div className="space-y-2">
            <Label htmlFor="media">Media</Label>
            <MediaUpload
              name="media"
              existingMedia={vehicle?.media ?? []}
              onChange={handleMediaChange}
            />
            <InputError message={errors.media} />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="button" variant="outline" onClick={handleNextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="SEO" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input 
              id="meta_title" 
              name="meta_title" 
              type="text" 
              value={data.meta_title} 
              onChange={(e) => setData('meta_title', e.target.value)} 
            />
            <InputError message={errors.meta_title} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea 
              id="meta_description" 
              name="meta_description" 
              value={data.meta_description} 
              onChange={(e) => setData('meta_description', e.target.value)} 
            />
            <InputError message={errors.meta_description} />
          </div>

          <div className="md:col-span-2 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="button" variant="outline" onClick={handleNextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Publication" className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="is_featured" 
              name="is_featured" 
              defaultChecked={data.is_featured} 
              onCheckedChange={(checked) => setData('is_featured', checked)} 
            />
            <Label htmlFor="is_featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="is_certified" 
              name="is_certified" 
              defaultChecked={data.is_certified} 
              onCheckedChange={(checked) => setData('is_certified', checked)} 
            />
            <Label htmlFor="is_certified">Certified</Label>
          </div>
          <Field name="acquired_at" label="Acquired At" type="date" value={data.acquired_at} error={errors.acquired_at} setData={setData} />
          <Field name="listed_at" label="Listed At" type="date" value={data.listed_at} error={errors.listed_at} setData={setData} />
          <Field name="sold_at" label="Sold At" type="date" value={data.sold_at} error={errors.sold_at} setData={setData} />

          <div className="md:col-span-2 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Draft
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {processing ? 'Publishing...' : 'Publish Vehicle'}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
