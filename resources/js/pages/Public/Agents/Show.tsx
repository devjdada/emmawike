import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Agent {
    id: string;
    name: string;
    email: string;
    // Add other properties as needed
}

interface AgentShowProps extends PageProps {
    agent: Agent;
}

export default function AgentShow({ agent }: AgentShowProps) {
    return (
        <PublicLayout>
            <Head title={agent.name} />
            <div className="container mx-auto py-8">
                <article className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold mb-4">{agent.name}</h1>
                    <p className="text-gray-600 mb-4">{agent.email}</p>
                    {/* Add more agent details as needed */}
                </article>
            </div>
        </PublicLayout>
    );
}
