import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

const iconOptions = ['Shield', 'Clock', 'Star', 'Handshake', 'Eye', 'Users'];

const WcuFeaturesPage = () => {
    const { features } = usePage<PageProps<{ features: any[] }>>().props;
    const { toast } = useToast();

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        id: null as number | null,
        title: '',
        description: '',
        icon: '',
    });

    const [isEditing, setIsEditing] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && data.id) {
            put(route('admin.wcu-features.update', data.id), {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    toast({
                        title: 'Feature Updated',
                        description: 'The feature has been successfully updated.',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to update feature.',
                        variant: 'destructive',
                    });
                },
            });
        } else {
            post(route('admin.wcu-features.store'), {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    toast({
                        title: 'Feature Created',
                        description: 'The feature has been successfully created.',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to create feature.',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const handleEdit = (feature: any) => {
        setData({
            id: feature.id,
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this feature?')) {
            destroy(route('admin.wcu-features.destroy', id));
        }
    };

    const openCreateModal = () => {
        reset();
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <AppLayout>
            <Head title="Manage Why Choose Us" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Manage 'Why Choose Us' Features</h1>

                <div className="mb-4">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Create New Feature</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{isEditing ? 'Edit Feature' : 'Create New Feature'}</DialogTitle>
                                <DialogDescription>
                                    {isEditing ? 'Edit the feature details.' : "Add a new feature to the 'Why Choose Us' section."}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="icon">Icon</Label>
                                    <Select onValueChange={(value) => setData('icon', value)} value={data.icon}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map((icon) => (
                                                <SelectItem key={icon} value={icon}>
                                                    {icon}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.icon && <p className="mt-1 text-sm text-red-500">{errors.icon}</p>}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'Update Feature' : 'Create Feature'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {features.map((feature) => (
                                    <TableRow key={feature.id}>
                                        <TableCell>{feature.title}</TableCell>
                                        <TableCell>{feature.description}</TableCell>
                                        <TableCell>{feature.icon}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEdit(feature)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(feature.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default WcuFeaturesPage;
