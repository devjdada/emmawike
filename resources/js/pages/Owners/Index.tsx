import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface Owner {
    id: number;
    user_id: number;
}

interface OwnersIndexProps extends PageProps {
    owners: Owner[];
}

export default function OwnersIndex({ auth, owners }: OwnersIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

    const handleDeleteClick = (owner: Owner) => {
        setSelectedOwner(owner);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedOwner) {
            // Implement actual delete logic here
            console.log('Deleting owner:', selectedOwner.id);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Owners" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Owners</h1>
                <Button asChild><Link href={route('owners.create')}>Add New Owner</Link></Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {owners.map((owner) => (
                        <TableRow key={owner.id}>
                            <TableCell>{owner.user_id}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(owner)}>Delete</Button>
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
                            This action cannot be undone. This will permanently delete the owner record for User ID "{selectedOwner?.user_id}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
