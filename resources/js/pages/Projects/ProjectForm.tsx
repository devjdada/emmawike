import InputError from '@/Components/input-error';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

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
}

interface ProjectFormProps extends PageProps {
    project?: Project; // Optional project prop for edit mode
}

export default function ProjectForm({ auth, project }: ProjectFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        posted_by_staff_id: project?.posted_by_staff_id || auth.user.id, // Use existing or current user
        title: project?.title || '',
        description: project?.description || '',
        type: project?.type || '',
        status: project?.status || 'planning',
        start_date: project?.start_date || '',
        end_date: project?.end_date || '',
        image_url: project?.image_url || '',
        budget: project?.budget || 0,
        location: project?.location || '',
        is_featured: project?.is_featured || false,
        progress: project?.progress || 0,
        date_added: project?.date_added || '',
        team_size: project?.team_size || 0,
    });

    const isEditMode = !!project; // Check if project prop exists

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('projects.update', project.id));
        } else {
            post(route('projects.store'));
        }
    };

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
                                                <SelectItem value="Residential">Residential</SelectItem>
                                                <SelectItem value="Commercial">Commercial</SelectItem>
                                                <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                                                <SelectItem value="Resort">Resort</SelectItem>
                                                <SelectItem value="Renovation">Renovation</SelectItem>
                                                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
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
                                    <Label htmlFor="image_url">Image URL</Label>
                                    <Input
                                        id="image_url"
                                        placeholder="https://..."
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                    />
                                    <InputError message={errors.image_url} />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter a detailed description of the project..."
                                        className="min-h-[100px]"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
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
                                    <Link href={route('projects.index')}>
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
