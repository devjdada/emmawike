import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateEditValuationModal from './CreateEditValuationModal'; // Import the valuation modal

interface Valuation {
    id: string;
    compensation_id: string;
    description: string;
    evaluation_type: string;
    value: number;
    created_at: string;
    updated_at: string;
    // ... other fields as needed for display
}

interface CompensationWithValuations {
    id: string;
    name: string;
    valuations: Valuation[];
}

interface ViewValuationsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    compensation: CompensationWithValuations | null;
}

export default function ViewValuationsModal({ open, onOpenChange, compensation }: ViewValuationsModalProps) {
    const { toast } = useToast();
    const { delete: inertiaDelete } = useForm();

    const [isCreateEditValuationModalOpen, setIsCreateEditValuationModalOpen] = useState(false);
    const [editingValuation, setEditingValuation] = useState<Valuation | null>(null);

    const handleDeleteValuation = (valuationId: string) => {
        if (confirm('Are you sure you want to delete this valuation record?')) {
            inertiaDelete(route('admin.compensations.valuations.destroy', { compensation: compensation?.id, valuation: valuationId }), {
                onSuccess: () => {
                    toast({ title: 'Success', description: 'Valuation deleted successfully.' });
                    // This will require a refresh of the parent compensation data to show updated valuations
                    // For now, rely on Inertia's default behavior or manual refresh if needed.
                },
                onError: (err) => {
                    console.error(err);
                    toast({ title: 'Error', description: 'Failed to delete valuation.', variant: 'destructive' });
                },
            });
        }
    };

    const handleEditValuation = (valuation: Valuation) => {
        setEditingValuation(valuation);
        setIsCreateEditValuationModalOpen(true);
    };

    const handleAddValuation = () => {
        setEditingValuation(null); // Clear for new creation
        setIsCreateEditValuationModalOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Valuations for {compensation?.name || 'Compensation'}</DialogTitle>
                    <DialogDescription>Manage individual valuation records associated with this compensation.</DialogDescription>
                </DialogHeader>

                <div className="mb-4 flex justify-end">
                    <Button onClick={handleAddValuation}>
                        <Plus className="mr-2 h-4 w-4" /> Add New Valuation
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {compensation?.valuations && compensation.valuations.length > 0 ? (
                            compensation.valuations.map((valuation) => {
                                return (
                                    <TableRow key={valuation.id}>
                                        <TableCell>{valuation.description}</TableCell>
                                        <TableCell>{valuation.evaluation_type}</TableCell>
                                        <TableCell>${valuation.value ? valuation.value.toFixed(2) : '0.00'}</TableCell>
                                        <TableCell>{format(new Date(valuation.created_at), 'MMM dd, yyyy')}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEditValuation(valuation)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDeleteValuation(valuation.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No valuations found for this compensation.
                                </TableCell>
                            </TableRow>
                        )}{' '}
                    </TableBody>
                </Table>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>

            {/* Create/Edit Valuation Modal */}
            {compensation && ( // Ensure compensation is not null when opening this modal
                <CreateEditValuationModal
                    open={isCreateEditValuationModalOpen}
                    onOpenChange={setIsCreateEditValuationModalOpen}
                    editingValuation={editingValuation}
                    compensationId={compensation.id}
                />
            )}
        </Dialog>
    );
}
