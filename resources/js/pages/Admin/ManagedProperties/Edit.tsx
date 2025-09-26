import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/Layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SelectOption {
    id: string;
    title?: string;
    name?: string;
}

interface ManagedProperty {
    id: number;
    property_id: string;
    owner_id: string;
    tenant_id: string;
    start_date: string;
    end_date: string | null;
    rent_due_date: string;
}

interface PageProps {
    managedProperty: ManagedProperty;
    properties: SelectOption[];
    owners: SelectOption[];
    tenants: SelectOption[];
}

const EditManagedProperty: React.FC<PageProps> = ({ managedProperty, properties, owners, tenants }) => {
    const { data, setData, put, processing, errors } = useForm({
        ...managedProperty,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.managed-properties.update', managedProperty.id));
    }

    return (
        <AppSidebarLayout>
            <Head title="Edit Managed Property Record" />
            <div className="container mx-auto px-4 sm:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Tenancy Record</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="property_id">Property</Label>
                                <select
                                    id="property_id"
                                    value={data.property_id}
                                    onChange={(e) => setData('property_id', e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    {properties.map((prop) => (
                                        <option key={prop.id} value={prop.id}>{prop.title}</option>
                                    ))}
                                </select>
                                {errors.property_id && <p className="text-xs text-red-600 mt-2">{errors.property_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="owner_id">Owner</Label>
                                <select
                                    id="owner_id"
                                    value={data.owner_id}
                                    onChange={(e) => setData('owner_id', e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">Select an owner</option>
                                    {owners.map((owner) => (
                                        <option key={owner.id} value={owner.id}>{owner.name}</option>
                                    ))}
                                </select>
                                {errors.owner_id && <p className="text-xs text-red-600 mt-2">{errors.owner_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="tenant_id">Tenant</Label>
                                <select
                                    id="tenant_id"
                                    value={data.tenant_id}
                                    onChange={(e) => setData('tenant_id', e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">Select a tenant</option>
                                    {tenants.map((tenant) => (
                                        <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                                    ))}
                                </select>
                                {errors.tenant_id && <p className="text-xs text-red-600 mt-2">{errors.tenant_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <p className="text-xs text-red-600 mt-2">{errors.start_date}</p>}
                            </div>

                            <div>
                                <Label htmlFor="end_date">End Date (optional)</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date || ''}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                {errors.end_date && <p className="text-xs text-red-600 mt-2">{errors.end_date}</p>}
                            </div>

                            <div>
                                <Label htmlFor="rent_due_date">Rent Due Date</Label>
                                <Input
                                    id="rent_due_date"
                                    type="date"
                                    value={data.rent_due_date}
                                    onChange={(e) => setData('rent_due_date', e.target.value)}
                                />
                                {errors.rent_due_date && <p className="text-xs text-red-600 mt-2">{errors.rent_due_date}</p>}
                            </div>

                            <div className="flex items-center justify-end">
                                <Button type="submit" disabled={processing}>
                                    Update Record
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
};

export default EditManagedProperty;
