import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Project {
    id: number;
    name: string;
    description: string;
    location: string;
    image_url: string;
}

interface EditProjectProps extends PageProps {
    project: Project;
}

export default function EditProject({ auth, project }: EditProjectProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: project.name,
        description: project.description,
        location: project.location,
        image_url: project.image_url,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Project" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Edit Project</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            autoComplete="description"
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            type="text"
                            name="location"
                            value={data.location}
                            className="mt-1 block w-full"
                            autoComplete="location"
                            onChange={(e) => setData('location', e.target.value)}
                            required
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input
                            id="image_url"
                            type="url"
                            name="image_url"
                            value={data.image_url}
                            className="mt-1 block w-full"
                            autoComplete="image_url"
                            onChange={(e) => setData('image_url', e.target.value)}
                            required
                        />
                        <InputError message={errors.image_url} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>Update Project</Button>
                </form>
            </div>
        </AppLayout>
    );
}
