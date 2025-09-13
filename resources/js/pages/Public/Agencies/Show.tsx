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

interface AgencyShowProps extends PageProps {
    agency: Agency;
}

export default function AgencyShow({ agency }: AgencyShowProps) {
    return (
        <PublicLayout>
            <Head title={agency.name} />
            <div className="container mx-auto py-8">
                <article className="bg-white rounded-lg shadow-md p-6">
                    <img src={agency.logo_url} alt={agency.name} className="w-full h-64 object-cover rounded-md mb-6" />
                    <h1 className="text-3xl font-bold mb-4">{agency.name}</h1>
                    <p className="text-gray-600 mb-4">{agency.description}</p>
                    {/* Add more agency details as needed */}
                </article>
            </div>
        </PublicLayout>
    );
}
