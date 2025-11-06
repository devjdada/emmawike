import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Download, Edit, Eye, Plus, Printer, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CompensationEvaluation {
    id: number;
    user_id: number;
    evaluation_type: string;
    evaluatable_id: number;
    evaluatable_type: string;
    status: string;
    notes: string | null;
    total_value: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    evaluatable: any; // This will be the specific evaluation object (CropEvaluation, etc.)
}

interface CompensationEvaluationsIndexProps extends PageProps {
    evaluations: CompensationEvaluation[];
}

export default function CompensationEvaluationsIndex({ auth, evaluations: initialEvaluations }: CompensationEvaluationsIndexProps) {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const { delete: inertiaDelete } = useForm();

    const filteredEvaluations = initialEvaluations.filter((evaluation) => {
        const matchesSearch =
            evaluation.evaluation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (evaluation.notes && evaluation.notes.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || evaluation.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesType = typeFilter === 'all' || evaluation.evaluation_type.toLowerCase() === typeFilter.toLowerCase();
        return matchesSearch && matchesStatus && matchesType;
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this compensation evaluation?')) {
            inertiaDelete(route('admin.compensation-evaluations.destroy', id), {
                onSuccess: () => {
                    toast({
                        title: 'Evaluation Deleted',
                        description: 'The compensation evaluation has been removed.',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to delete evaluation.',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'approved':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'rejected':
                return 'destructive';
            case 'draft':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Compensation Evaluations" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Compensation Valuations</h1>
                                <p className="text-muted-foreground">Manage all compensation evaluation records</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button asChild>
                                <Link href={route('admin.compensation-evaluations.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Evaluation
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6">
                        <div className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search evaluations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="crop">Crop</SelectItem>
                                        <SelectItem value="machine">Machine</SelectItem>
                                        <SelectItem value="land">Land</SelectItem>
                                        <SelectItem value="property">Property</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Evaluations Table */}
                    <div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Evaluations ({filteredEvaluations.length})</h2>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total Value</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEvaluations.map((evaluation) => (
                                        <TableRow key={evaluation.id}>
                                            <TableCell>{evaluation.id}</TableCell>
                                            <TableCell>{evaluation.evaluation_type}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(evaluation.status)}>{evaluation.status}</Badge>
                                            </TableCell>
                                            <TableCell>${evaluation.total_value?.toLocaleString() || 'N/A'}</TableCell>
                                            <TableCell>{new Date(evaluation.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a
                                                            href={`${route('admin.compensation-evaluations.show', evaluation.id)}?print=true`}
                                                            target="_blank"
                                                        >
                                                            <Printer className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.compensation-evaluations.show', evaluation.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.compensation-evaluations.edit', evaluation.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleDelete(evaluation.id)}>
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
        </AppLayout>
    );
}
