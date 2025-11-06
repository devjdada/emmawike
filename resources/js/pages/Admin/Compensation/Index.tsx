import CreateEditCompensationModal from '@/components/CreateEditCompensationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ViewValuationsModal from '@/components/ViewValuationsModal'; // Import ViewValuationsModal
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'; // Added Eye icon
import { useEffect, useState } from 'react';

interface Valuation {
    // Define Valuation interface here or import from types/index.d.ts
    id: string;
    compensation_id: string;
    description: string;
    evaluation_type: string;
    value: number;
    created_at: string;
    updated_at: string;
    // ... other fields as needed for display
}

interface Compensation {
    id: string;
    notes: string;
    total_value: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    name: string;
    phone: string;
    email: string;
    code: string;
    created_at: string;
    updated_at: string;
    valuations?: Valuation[]; // Add optional valuations array
}

interface CompensationsIndexProps {
    auth: { user: { id: string; name: string; email: string } };
    compensations: Compensation[];
}

export default function CompensationsIndex({ auth, compensations: initialCompensations }: CompensationsIndexProps) {
    const [compensations, setCompensations] = useState<Compensation[]>(initialCompensations);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();

    const { delete: inertiaDelete, patch } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCompensation, setEditingCompensation] = useState<Compensation | null>(null);

    const [isViewValuationsModalOpen, setIsViewValuationsModalOpen] = useState(false); // State for ViewValuationsModal
    const [selectedCompensationForView, setSelectedCompensationForView] = useState<Compensation | null>(null); // Data for ViewValuationsModal

    useEffect(() => {
        setCompensations(initialCompensations);
    }, [initialCompensations]);

    const handleStatusChange = (compensationId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'completed') => {
        patch(
            route('admin.compensations.update', compensationId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'Compensation status updated successfully.',
                    });
                    setCompensations((prevCompensations) =>
                        prevCompensations.map((compensation) =>
                            compensation.id === compensationId ? { ...compensation, status: newStatus } : compensation,
                        ),
                    );
                },
                onError: (errors) => {
                    console.error('Failed to update compensation status:', errors);
                    toast({
                        title: 'Error',
                        description: 'Failed to update compensation status. Check console for details.',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    const filteredCompensations = compensations.filter((compensation) => {
        const matchesSearch =
            compensation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            compensation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            compensation.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || compensation.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleEdit = (compensation: Compensation) => {
        setEditingCompensation(compensation);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this compensation record?')) {
            inertiaDelete(route('admin.compensations.destroy', id), {
                onSuccess: () => {
                    toast({ title: 'Success', description: 'Compensation record deleted successfully' });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to delete compensation record',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const handleViewValuations = (compensation: Compensation) => {
        window.location.href = route('admin.compensations.show', compensation.id);
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Compensation Management" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Compensation Management</h1>
                        <p className="text-muted-foreground">Manage all compensation records</p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setEditingCompensation(null)}>
                                {' '}
                                {/* Clear editing data for new creation */}
                                <Plus className="mr-2 h-4 w-4" />
                                Add Compensation
                            </Button>
                        </DialogTrigger>
                        <CreateEditCompensationModal open={isModalOpen} onOpenChange={setIsModalOpen} editingCompensation={editingCompensation} />
                    </Dialog>
                </div>

                {/* Stats Overview - Adapted from Blogs */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredCompensations.length}</div>
                            <p className="text-xs text-muted-foreground">Total compensation records</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredCompensations.filter((c) => c.status === 'pending').length}</div>
                            <p className="text-xs text-muted-foreground">Records awaiting review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Approved</CardTitle>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredCompensations.filter((c) => c.status === 'approved').length}</div>
                            <p className="text-xs text-muted-foreground">Approved records</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredCompensations.filter((c) => c.status === 'completed').length}</div>
                            <p className="text-xs text-muted-foreground">Completed records</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search compensations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <Plus className="mr-2 h-4 w-4" /> {/* Using Plus as a placeholder icon */}
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Total Value</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCompensations.map((compensation) => (
                                <TableRow key={compensation.id}>
                                    <TableCell>{compensation.code}</TableCell>
                                    <TableCell>{compensation.name}</TableCell>
                                    <TableCell>{compensation.email}</TableCell>
                                    <TableCell>{compensation.phone}</TableCell>
                                    <TableCell>
                                        $
                                        {(() => {
                                            const val =
                                                typeof compensation.total_value === 'number' || typeof compensation.total_value === 'string'
                                                    ? parseFloat(String(compensation.total_value))
                                                    : 0;
                                            return isNaN(val) ? '0.00' : val.toFixed(2);
                                        })()}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={compensation.status}
                                            onValueChange={(newStatus: 'pending' | 'approved' | 'rejected' | 'completed') =>
                                                handleStatusChange(compensation.id, newStatus)
                                            }
                                        >
                                            <SelectTrigger className="w-36">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>{format(new Date(compensation.created_at), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(compensation)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete(compensation.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleViewValuations(compensation)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredCompensations.length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">No compensation records found matching your criteria.</div>
                    )}
                </div>
            </div>

            {/* View Valuations Modal */}
            <ViewValuationsModal
                open={isViewValuationsModalOpen}
                onOpenChange={setIsViewValuationsModalOpen}
                compensation={selectedCompensationForView}
            />
        </AppLayout>
    );
}
