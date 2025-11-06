import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Clock, DollarSign, Download, Edit, Eye, Plus, Search, Star, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image_url: string;
    featured: boolean;
    status: string;
    features: string;
}

interface ServicesIndexProps extends PageProps {
    services: Service[];
}

export default function ServicesIndex({ auth, services }: ServicesIndexProps) {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const { delete: inertiaDelete } = useForm();

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || service.status === statusFilter;
        const matchesCategory = !categoryFilter || service.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleDeleteClick = (service: Service) => {
        setSelectedService(service);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedService) {
            inertiaDelete(route('admin.services.destroy', selectedService.id), {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                },
            });
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'draft':
                return 'secondary';
            case 'inactive':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const categories = [...new Set(services.map((service) => service.category))];

    return (
        <AppLayout user={auth.user}>
            <Head title="Services" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Service Management</h1>
                                <p className="text-muted-foreground">Manage all your services and offerings</p>
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
                            <Link href={route('admin.services.create')}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Service
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? '' : value)}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={categoryFilter || 'all'} onValueChange={(value) => setCategoryFilter(value === 'all' ? '' : value)}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Services Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Services ({filteredServices.length})</CardTitle>
                            <CardDescription>Manage your services, track performance, and update details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price & Duration</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredServices.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img src={service.image_url} alt={service.name} className="h-12 w-12 rounded-lg object-cover" />
                                                    <div>
                                                        <div className="font-medium">{service.name}</div>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            {service.description.length > 50
                                                                ? `${service.description.substring(0, 50)}...`
                                                                : service.description}
                                                            {service.featured && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    <Star className="mr-1 h-3 w-3" />
                                                                    Featured
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{service.category}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">${service.price}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {service.duration}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(service.status)}>{service.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Link href={route('admin.services.show', service.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.services.edit', service.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(service)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the service "{selectedService?.name}".
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
