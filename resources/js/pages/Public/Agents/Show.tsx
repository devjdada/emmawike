import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

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
                <article className="rounded-lg bg-white p-6 shadow-md">
                    <h1 className="mb-4 text-3xl font-bold">{agent.name}</h1>
                    <p className="mb-4 text-gray-600">{agent.email}</p>
                    {/* Add more agent details as needed */}
                </article>
            </div>
        </PublicLayout>
    );
}
