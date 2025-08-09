import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface ServicesIndexProps extends PageProps {
    services: Service[];
}

export default function ServicesIndex({ auth, services }: ServicesIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleDeleteClick = (service: Service) => {
        setSelectedService(service);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedService) {
            // Implement actual delete logic here
            console.log('Deleting service:', selectedService.id);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Services" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Services</h1>
                <Button asChild><Link href={route('services.create')}>Add New Service</Link></Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>{service.description}</TableCell>
                            <TableCell>${service.price.toLocaleString()}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(service)}>Delete</Button>
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
                            This action cannot be undone. This will permanently delete the service "{selectedService?.name}".
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
