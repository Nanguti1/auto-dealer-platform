import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import SupplierShell, { SupplierBackButton } from '@/components/admin/suppliers/supplier-shell';
import type { SupplierRecord } from '@/components/admin/suppliers/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';

interface ShowProps {
  supplier: SupplierRecord;
}

export default function Show({ supplier }: ShowProps) {
  const supplierTypeLabels: Record<string, string> = {
    vehicle_dealer: 'Vehicle Dealer',
    vehicle_manufacturer: 'Vehicle Manufacturer',
    spare_parts_supplier: 'Spare Parts Supplier',
    accessories_supplier: 'Accessories Supplier',
    auction_house: 'Auction House',
    individual: 'Individual',
    other: 'Other',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    blacklisted: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <SupplierShell 
      title={supplier.company_name} 
      description={`Supplier ${supplier.supplier_code} · ${supplierTypeLabels[supplier.supplier_type]}`} 
      actions={
        <>
          <SupplierBackButton />
          <Button asChild>
            <Link href={admin.suppliers.edit(supplier.id).url}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Company Name</p>
              <p className="font-medium">{supplier.company_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Supplier Code</p>
              <p className="font-mono">{supplier.supplier_code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p>{supplier.contact_person ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Supplier Type</p>
              <p>{supplierTypeLabels[supplier.supplier_type]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={statusColors[supplier.status]}>{supplier.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Branch</p>
              <p>{supplier.branch?.name ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild>
              <Link href={admin.suppliers.edit(supplier.id).url}>Edit Supplier</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={admin.suppliers.index().url}>View All Suppliers</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{supplier.email ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{supplier.phone ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alternative Phone</p>
              <p>{supplier.alternative_phone ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Website</p>
              {supplier.website ? (
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {supplier.website}
                </a>
              ) : (
                <p>—</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader><CardTitle>Address</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Physical Address</p>
              <p className="whitespace-pre-line">{supplier.physical_address ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p>{supplier.city ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">County / State</p>
              <p>{supplier.county ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p>{supplier.country ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Postal Code</p>
              <p>{supplier.postal_code ?? '—'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader><CardTitle>Business Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Tax PIN / VAT Number</p>
              <p>{supplier.tax_pin ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration Number</p>
              <p>{supplier.registration_number ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Terms</p>
              <p>{supplier.payment_terms ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Currency</p>
              <p>{supplier.currency}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Limit</p>
              <p className="font-semibold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: supplier.currency }).format(supplier.credit_limit)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Internal Notes</CardTitle></CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{supplier.notes ?? 'No notes provided.'}</p>
          </CardContent>
        </Card>

        {/* Meta Information */}
        <Card>
          <CardHeader><CardTitle>Meta Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Created By</p>
              <p>{supplier.createdBy?.name ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated By</p>
              <p>{supplier.updatedBy?.name ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created Date</p>
              <p>{new Date(supplier.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p>{new Date(supplier.updated_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SupplierShell>
  );
}
