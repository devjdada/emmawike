import InputError from '@/components/input-error';
import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthenticatedLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEventHandler, useEffect, useState } from 'react';

interface Project {
    id: string;
    posted_by_staff_id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    start_date: string;
    end_date: string;
    image_url: string;
    budget: number;
    location: string;
    is_featured: boolean;
    progress: number;
    date_added: string;
    team_size: number;
    image: File | null;
}

interface ProjectFormProps extends PageProps {
    project?: Project; // Optional project prop for edit mode
}

export default function ProjectForm({ auth, project }: ProjectFormProps) {
    const isEditMode = !!project;
    const { data, setData, post, processing, errors, reset } = useForm({
        posted_by_staff_id: project?.posted_by_staff_id || auth.user.id,
        title: project?.title || '',
        description: project?.description || '',
        type: project?.type || '',
        status: project?.status || 'planning',
        start_date: project?.start_date || '',
        end_date: project?.end_date || '',
        image: null as File | null,
        budget: project?.budget || 0,
        location: project?.location || '',
        is_featured: project?.is_featured || false,
        progress: project?.progress || 0,
        date_added: project?.date_added || '',
        team_size: project?.team_size || 0,
        ...(isEditMode && { _method: 'PUT' }),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditMode) {
            post(route('admin.projects.update', project.id));
        } else {
            post(route('admin.projects.store'));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>}
        >
            <Head title={isEditMode ? 'Edit Project' : 'Create Project'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="title">Project Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Luxury Resort Development..."
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div>
                                        <Label htmlFor="budget">Budget</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            placeholder="15000000"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                        />
                                        <InputError message={errors.budget} />
                                    </div>
                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            placeholder="Malibu, CA"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                        />
                                        <InputError message={errors.location} />
                                    </div>
                                    <div>
                                        <Label>Project Type</Label>
                                        <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select project type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="residential">Residential</SelectItem>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                                <SelectItem value="mixed_use">Mixed Use</SelectItem>
                                                <SelectItem value="Resort">resort</SelectItem>
                                                <SelectItem value="renovation">Renovation</SelectItem>
                                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.type} />
                                    </div>
                                    <div>
                                        <Label>Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="planning">Planning</SelectItem>
                                                <SelectItem value="in_progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="on_hold">On Hold</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                    <div>
                                        <Label htmlFor="team_size">Team Size</Label>
                                        <Input
                                            id="team_size"
                                            type="number"
                                            placeholder="25"
                                            value={data.team_size}
                                            onChange={(e) => setData('team_size', e.target.value)}
                                        />
                                        <InputError message={errors.team_size} />
                                    </div>
                                    <div>
                                        <Label htmlFor="progress">Progress</Label>
                                        <Input
                                            id="progress"
                                            type="number"
                                            placeholder="45"
                                            value={data.progress}
                                            onChange={(e) => setData('progress', e.target.value)}
                                        />
                                        <InputError message={errors.progress} />
                                    </div>
                                    <div>
                                        <Label htmlFor="date_added">Date Added</Label>
                                        <Input
                                            id="date_added"
                                            type="date"
                                            value={data.date_added}
                                            onChange={(e) => setData('date_added', e.target.value)}
                                        />
                                        <InputError message={errors.date_added} />
                                    </div>
                                    <div>
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                        />
                                        <InputError message={errors.start_date} />
                                    </div>
                                    <div>
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                        <InputError message={errors.end_date} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="image">Project Image</Label>
                                    <Input id="image" type="file" onChange={handleFileChange} />
                                    <InputError message={errors.image} />
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium">Image Preview:</p>
                                            <img src={imagePreview} alt="Image preview" className="mt-2 h-20 w-auto rounded" />
                                        </div>
                                    )}
                                    {project?.image_url && !imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium">Current Image:</p>
                                            <img src={project.image_url} alt="Current project image" className="mt-2 h-20 w-auto rounded" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>

                                    <Tiptap description={data.description} onChange={(newContent) => setData('description', newContent)} />

                                    <InputError message={errors.description} />
                                </div>

                                <div className="flex flex-row items-start space-y-0 space-x-3">
                                    <Checkbox
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                                    />
                                    <div className="space-y-1 leading-none">
                                        <Label htmlFor="is_featured">Featured Project</Label>
                                        <p className="text-sm text-muted-foreground">Mark this project as featured to highlight it on the homepage</p>
                                    </div>
                                    <InputError message={errors.is_featured} />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('admin.projects.index')}>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {isEditMode ? 'Update Project' : 'Add Project'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
