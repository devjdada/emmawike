import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Property, User } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import NewTenantDialog from './NewTenantDialog';

interface Tenant {
    id: number;
    user_id: number;
    property_id: number;
    start_date: string;
    end_date: string | null;
    user: User;
    property: Property;
}

interface TenantsIndexProps extends PageProps {
    tenants: Tenant[];
    users: User[];
    properties: Property[];
}

export default function TenantsIndex({ auth, tenants, users, properties }: TenantsIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isNewTenantDialogOpen, setIsNewTenantDialogOpen] = useState(false);
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
                <Button onClick={() => setIsNewTenantDialogOpen(true)}>Add New Tenant</Button>
            </div>

            <NewTenantDialog
                isOpen={isNewTenantDialogOpen}
                onClose={() => setIsNewTenantDialogOpen(false)}
                users={users}
                properties={properties}
            />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell>{tenant.user.name}</TableCell>
                            <TableCell>{tenant.property.name}</TableCell>
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
                            This action cannot be undone. This will permanently delete the tenant record for "{selectedTenant?.user.name}".
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
