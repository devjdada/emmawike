import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/Layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';

interface ManagedProperty {
    id: number;
    property: {
        name: string;
    };
    owner: {
        name: string;
    };
    tenant: {
        name: string;
    };
    rent_agreement: {
        id: number;
    };
    start_date: string;
    end_date: string | null;
    rent_due_date: string;
}

interface PageProps {
    managedProperties: {
        data: ManagedProperty[];
    };
}

const ManagedPropertiesIndex: React.FC<PageProps> = ({ managedProperties }) => {
    return (
        <AppSidebarLayout>
            <Head title="Property Tenancy Management" />
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold leading-tight">Property Tenancy Records</h2>
                        <Link href={route('admin.managed-properties.create')}>
                            <Button>Create New Record</Button>
                        </Link>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tenant</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tenure</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rent Due</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {managedProperties.data.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{record.property.name}</p></td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{record.tenant.name}</p></td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{record.owner.name}</p></td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{record.start_date} to {record.end_date ?? 'Present'}</p></td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{record.rent_due_date}</p></td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <Link href={route('admin.managed-properties.edit', record.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <Link href={route('admin.managed-properties.destroy', record.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default ManagedPropertiesIndex;