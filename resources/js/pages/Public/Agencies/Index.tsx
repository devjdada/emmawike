import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Agency {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    // Add other properties as needed
}

interface AgenciesIndexProps extends PageProps {
    agencies: Agency[];
}

export default function AgenciesIndex({ agencies }: AgenciesIndexProps) {
    return (
        <PublicLayout>
            <Head title="Agencies" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Public Agencies</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agencies.map(agency => (
                        <div key={agency.id} className="bg-white rounded-lg shadow-md p-6">
                            <img src={agency.logo_url} alt={agency.name} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{agency.name}</h2>
                            <p className="text-gray-600 mb-4">{agency.description.substring(0, 100)}...</p>
                            {/* Add more agency details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
