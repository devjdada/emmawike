import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function CreateProject({ auth }: PageProps) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        posted_by_staff_id: auth.user.id,
        title: '',
        description: '',
        type: 'Residential',
        status: 'planning',
        start_date: '',
        end_date: '',
        image_url: '',
        // Note: 'budget', 'location', 'teamSize', and 'featured' fields from the design concept
        // are not present in the current Project model. They are omitted here.
        // If needed, the Project model and its migration should be updated.
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                toast({ title: "Project Added", description: "The project has been successfully added." });
                reset();
            },
            onError: (e) => {
                console.error(e);
                toast({ title: "Error", description: "Failed to add project.", variant: "destructive" });
            },
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Add New Project" />

            <div className="pt-24 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href={route('projects.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Projects
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Add New Project</h1>
                            <p className="text-muted-foreground">Fill in the details to create a new project listing</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="title">Project Title</Label>
                                        <Input id="title" placeholder="Luxury Resort Development..." value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                        <InputError message={errors.title} />
                                    </div>
                                    {/* Budget field - not in model */}
                                    {/* <div className="col-span-1">
                                        <Label htmlFor="budget">Budget</Label>
                                        <Input id="budget" type="number" placeholder="15000000" />
                                    </div> */}
                                    {/* Location field - not in model */}
                                    {/* <div className="col-span-1">
                                        <Label htmlFor="location">Location</Label>
                                        <Input id="location" placeholder="Malibu, CA" />
                                    </div> */}
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
                                    {/* Team Size field - not in model */}
                                    {/* <div className="col-span-1">
                                        <Label htmlFor="teamSize">Team Size</Label>
                                        <Input id="teamSize" type="number" placeholder="25" />
                                    </div> */}
                                    <div>
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input id="start_date" type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                                        <InputError message={errors.start_date} />
                                    </div>
                                    <div>
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input id="end_date" type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                                        <InputError message={errors.end_date} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="image_url">Image URL</Label>
                                    <Input id="image_url" placeholder="https://..." value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} />
                                    <InputError message={errors.image_url} />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Enter a detailed description of the project..." className="min-h-[100px]" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Featured checkbox - not in model */}
                                {/* <div className="flex flex-row items-center space-x-3 space-y-0">
                                    <Checkbox id="featured" />
                                    <Label htmlFor="featured" className="text-sm font-normal">Featured Project</Label>
                                </div> */}

                                <div className="flex justify-end gap-4">
                                    <Link href={route('projects.index')}>
                                        <Button variant="outline" type="button">Cancel</Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>Add Project</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}