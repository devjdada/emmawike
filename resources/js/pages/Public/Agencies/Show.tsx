import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

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
                <article className="rounded-lg bg-white p-6 shadow-md">
                    <img src={agency.logo_url} alt={agency.name} className="mb-6 h-64 w-full rounded-md object-cover" />
                    <h1 className="mb-4 text-3xl font-bold">{agency.name}</h1>
                    <p className="mb-4 text-gray-600">{agency.description}</p>
                    {/* Add more agency details as needed */}
                </article>
            </div>
        </PublicLayout>
    );
}
