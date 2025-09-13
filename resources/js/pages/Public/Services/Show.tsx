import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    // Add other properties as needed
}

interface ServiceShowProps extends PageProps {
    service: Service;
}

export default function ServiceShow({ service }: ServiceShowProps) {
    return (
        <PublicLayout>
            <Head title={service.name} />
            <div className="container mx-auto py-8">
                <article className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <p className="text-lg font-bold text-blue-600">${service.price.toLocaleString()}</p>
                    {/* Add more service details as needed */}
                </article>
            </div>
        </PublicLayout>
    );
}
