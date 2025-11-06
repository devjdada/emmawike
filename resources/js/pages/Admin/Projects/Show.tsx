import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Project {
    id: string;
    posted_by_staff_id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    start_date: string;
    end_date: string;
    image_url: string | null;
    budget: number | null;
    location: string | null;
    team_size: number | null;
    progress: number | null;
    date_added: string | null;
    is_featured: boolean;
}

interface ProjectShowProps extends PageProps {
    project: Project;
}

export default function ProjectShow({ auth, project }: ProjectShowProps) {
    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'planning':
                return 'secondary';
            case 'in progress':
                return 'default';
            case 'completed':
                return 'success';
            case 'on hold':
                return 'warning';
            default:
                return 'outline';
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title={project.title} />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href={route('admin.projects.index')}>
                            <span className="text-sm text-gray-500 hover:underline">&larr; Back to Projects</span>
                        </Link>
                        <h1 className="mt-2 text-3xl font-bold text-foreground">{project.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.image_url && (
                                        <img src={project.image_url} alt={project.title} className="mb-4 h-64 w-full rounded-md object-cover" />
                                    )}
                                    <div className="prose tiptap max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-medium">Status</h3>
                                        <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Location</h3>
                                        <p>{project.location || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Budget</h3>
                                        <p>${(project.budget || 0).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Team Size</h3>
                                        <p>{project.team_size || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Timeline</h3>
                                        <p>
                                            {project.start_date || 'N/A'} to {project.end_date || 'N/A'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
