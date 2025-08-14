import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Download, Edit, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

interface RentAgreement {
    id: number;
    tenant_id: number;
    property_id: number;
    start_date: string;
    end_date: string;
    monthly_rent: number;
    deposit: number;
    agreement_pdf_url: string | null;
    status: string;
    is_renewed: boolean;
}

interface RentAgreementsIndexProps extends PageProps {
    rentAgreements: RentAgreement[];
}

export default function RentAgreementsIndex({ auth, rentAgreements: initialRentAgreements }: RentAgreementsIndexProps) {
    const { toast } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedAgreement, setSelectedAgreement] = useState<RentAgreement | null>(null);

    const { delete: inertiaDelete } = useForm();

    const handleDeleteClick = (agreement: RentAgreement) => {
        setSelectedAgreement(agreement);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedAgreement) {
            inertiaDelete(route('rent-agreements.destroy', selectedAgreement.id), {
                onSuccess: () => {
                    toast({ title: 'Agreement Deleted', description: 'The rent agreement has been removed.' });
                    setIsDeleteDialogOpen(false);
                },
                onError: () => {
                    toast({ title: 'Error', description: 'Failed to delete agreement.', variant: 'destructive' });
                },
            });
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'inactive':
                return 'secondary';
            case 'expired':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Rent Agreements" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Rent Agreements</h1>
                                <p className="text-muted-foreground">Manage all rent agreements</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button variant="outline">
                                <Upload className="mr-2 h-4 w-4" />
                                Import
                            </Button>
                            <Button asChild>
                                <Link href={route('rent-agreements.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Agreement
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Agreements Table */}
                    <div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Agreements ({initialRentAgreements.length})</h2>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Tenant ID</TableHead>
                                        <TableHead>Property ID</TableHead>
                                        <TableHead>Monthly Rent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {initialRentAgreements.map((agreement) => (
                                        <TableRow key={agreement.id}>
                                            <TableCell>{agreement.id}</TableCell>
                                            <TableCell>{agreement.tenant_id}</TableCell>
                                            <TableCell>{agreement.property_id}</TableCell>
                                            <TableCell>${agreement.monthly_rent.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(agreement.status)}>{agreement.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('rent-agreements.edit', agreement.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(agreement)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the rent agreement for ID "{selectedAgreement?.id}".
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
