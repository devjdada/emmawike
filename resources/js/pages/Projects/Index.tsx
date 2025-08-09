import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface Project {
    id: number;
    posted_by_staff_id: number;
    title: string;
    description: string;
    type: string | null;
    status: string;
    start_date: string | null;
    end_date: string | null;
    image_url: string | null;
}

interface ProjectsIndexProps extends PageProps {
    projects: Project[];
}

export default function ProjectsIndex({ auth, projects: initialProjects }: ProjectsIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const { delete: inertiaDelete } = useForm();

    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedProject) {
            inertiaDelete(route('projects.destroy', selectedProject.id), {
                onSuccess: () => {
                    toast({ title: "Project Deleted", description: "The project has been removed from the listings." });
                    setIsDeleteDialogOpen(false);
                },
                onError: () => {
                    toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
                },
            });
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Projects" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <Button asChild><Link href={route('projects.create')}>Add New Project</Link></Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialProjects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.type || 'N/A'}</TableCell>
                            <TableCell>{project.status}</TableCell>
                            <TableCell>{project.start_date || 'N/A'}</TableCell>
                            <TableCell>{project.end_date || 'N/A'}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2" asChild>
                                    <Link href={route('projects.edit', project.id)}>Edit</Link>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(project)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the project "{selectedProject?.title}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
