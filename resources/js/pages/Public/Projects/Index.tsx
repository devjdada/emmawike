import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    image_url: string;
    // Add other properties as needed
}

interface ProjectsIndexProps extends PageProps {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Projects" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Public Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                            <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-600 mb-4">{project.description.substring(0, 100)}...</p>
                            <p className="text-sm text-gray-500">{project.location}</p>
                            {/* Add more project details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
