import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Tenant {
    id: number;
    user_id: number;
    property_id: number;
    start_date: string;
    end_date: string | null;
}

interface TenantsIndexProps extends PageProps {
    tenants: Tenant[];
}

export default function TenantsIndex({ auth, tenants }: TenantsIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

    const handleDeleteClick = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedTenant) {
            // Implement actual delete logic here
            console.log('Deleting tenant:', selectedTenant.id);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Tenants" />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Tenants</h1>
                <Button asChild>
                    <Link href={route('admin.tenants.create')}>Add New Tenant</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Property ID</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell>{tenant.user_id}</TableCell>
                            <TableCell>{tenant.property_id}</TableCell>
                            <TableCell>{tenant.start_date}</TableCell>
                            <TableCell>{tenant.end_date || 'N/A'}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">
                                    Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(tenant)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the tenant record for User ID "{selectedTenant?.user_id}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
