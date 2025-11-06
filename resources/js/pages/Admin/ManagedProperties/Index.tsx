import AppSidebarLayout from '@/Layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

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
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl leading-tight font-semibold">Property Tenancy Records</h2>
                        <Link href={route('admin.managed-properties.create')}>
                            <Button>Create New Record</Button>
                        </Link>
                    </div>
                    <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                            Property
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                            Tenant
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                            Owner
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                            Tenure
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                            Rent Due
                                        </th>
                                        <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {managedProperties.data.map((record) => (
                                        <tr key={record.id}>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap text-gray-900">{record.property.name}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap text-gray-900">{record.tenant.name}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap text-gray-900">{record.owner.name}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap text-gray-900">
                                                    {record.start_date} to {record.end_date ?? 'Present'}
                                                </p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap text-gray-900">{record.rent_due_date}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-right text-sm">
                                                <Link
                                                    href={route('admin.managed-properties.edit', record.id)}
                                                    className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('admin.managed-properties.destroy', record.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </Link>
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
