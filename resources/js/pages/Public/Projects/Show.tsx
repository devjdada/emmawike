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
    status: string;
    start_date: string | null;
    end_date: string | null;
    budget: number | null;
    team_size: number | null;
    progress: number | null;
    // Add other properties as needed
}

interface ProjectShowProps extends PageProps {
    project: Project;
}

export default function ProjectShow({ project }: ProjectShowProps) {
    return (
        <PublicLayout>
            <Head title={project.title} />
            <div className="container mx-auto py-8">
                <article className="bg-white rounded-lg shadow-md p-6">
                    <img src={project.image_url} alt={project.title} className="w-full h-64 object-cover rounded-md mb-6" />
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <p><strong>Location:</strong> {project.location}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                        {project.start_date && <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>}
                        {project.end_date && <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>}
                        {project.budget && <p><strong>Budget:</strong> ${project.budget.toLocaleString()}</p>}
                        {project.team_size && <p><strong>Team Size:</strong> {project.team_size}</p>}
                        {project.progress && <p><strong>Progress:</strong> {project.progress}%</p>}
                    </div>
                </article>
            </div>
        </PublicLayout>
    );
}
