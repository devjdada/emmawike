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

interface AgentsIndexProps extends PageProps {
    agents: Agent[];
}

export default function AgentsIndex({ agents }: AgentsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Agents" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Public Agents</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => (
                        <div key={agent.id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
                            <p className="text-gray-600 mb-4">{agent.email}</p>
                            {/* Add more agent details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
