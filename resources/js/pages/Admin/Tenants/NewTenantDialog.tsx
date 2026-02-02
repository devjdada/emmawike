import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Combobox } from '@/components/ui/Combobox';
import type { Property, User } from '@/types';

interface NewTenantDialogProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    properties: Property[];
}

export default function NewTenantDialog({ isOpen, onClose, users, properties }: NewTenantDialogProps) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        property_id: '',
        start_date: '',
        end_date: '',
    });

    const userOptions = users.map((user) => ({ value: user.id.toString(), label: user.name }));
    const propertyOptions = properties.map((property) => ({ value: property.id.toString(), label: property.name }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tenants.store'), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Tenant</DialogTitle>
                    <DialogDescription>Create a new tenant record.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Combobox
                            options={userOptions}
                            value={data.user_id}
                            onChange={(value) => setData('user_id', value)}
                            placeholder="Select a user..."
                            searchPlaceholder="Search users..."
                            noResultsMessage="No users found."
                        />
                        {errors.user_id && <p className="mt-1 text-xs text-red-500">{errors.user_id}</p>}
                    </div>
                    <div>
                        <Combobox
                            options={propertyOptions}
                            value={data.property_id}
                            onChange={(value) => setData('property_id', value)}
                            placeholder="Select a property..."
                            searchPlaceholder="Search properties..."
                            noResultsMessage="No properties found."
                        />
                        {errors.property_id && <p className="mt-1 text-xs text-red-500">{errors.property_id}</p>}
                    </div>
                    <div>
                        <Input
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            placeholder="Start Date"
                        />
                        {errors.start_date && <p className="mt-1 text-xs text-red-500">{errors.start_date}</p>}
                    </div>
                    <div>
                        <Input
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            placeholder="End Date"
                        />
                        {errors.end_date && <p className="mt-1 text-xs text-red-500">{errors.end_date}</p>}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
