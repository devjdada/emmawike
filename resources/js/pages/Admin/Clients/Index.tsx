import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { Client, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface ClientsIndexProps extends PageProps {
    clients: Client[];
}

export default function ClientsIndex({ auth, clients }: ClientsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: inertiaDelete,
        processing,
        errors,
        reset,
    } = useForm<{
        id: number;
        name: string;
        logo_file: File | null;
        website_url: string;
    }>({
        id: 0,
        name: '',
        logo_file: null,
        website_url: '',
    });

    const filteredClients = clients.filter((client) => {
        return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('logo_file', file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setData('logo_file', null);
            setImagePreviewUrl(null);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('website_url', data.website_url);

        if (data.logo_file) {
            formData.append('logo_file', data.logo_file);
        }

        if (editingClient) {
            formData.append('_method', 'PUT');
            post(route('admin.clients.update', editingClient.id), {
                data: formData,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    setEditingClient(null);
                    setImagePreviewUrl(null);
                },
            });
        } else {
            post(route('admin.clients.store'), {
                data: formData,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    setEditingClient(null);
                    setImagePreviewUrl(null);
                },
            });
        }
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setData({
            id: client.id,
            name: client.name,
            logo_file: null, // We don't have the file, so we can't pre-fill it
            website_url: client.website_url,
        });
        setImagePreviewUrl(client.logo_url ? `/storage/${client.logo_url}` : null);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            inertiaDelete(route('admin.clients.destroy', id));
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Clients" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
                            <p className="text-muted-foreground">Manage your clients</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setEditingClient(null);
                                        reset();
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Client
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
                                    <DialogDescription>
                                        {editingClient ? 'Update the client details below' : 'Fill in the details to add a new client'}
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Client Name</Label>
                                        <Input id="name" placeholder="ABC Corp" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="logo_file">Logo</Label>
                                        <Input id="logo_file" type="file" onChange={handleFileChange} required />
                                        {errors.logo_file && <p className="mt-1 text-xs text-red-500">{errors.logo_file}</p>}
                                        {imagePreviewUrl && (
                                            <div className="mt-4">
                                                <img src={imagePreviewUrl} alt="Logo Preview" className="h-auto max-h-32 max-w-full object-contain" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="website_url">Website URL</Label>
                                        <Input
                                            id="website_url"
                                            placeholder="https://example.com"
                                            value={data.website_url}
                                            onChange={(e) => setData('website_url', e.target.value)}
                                        />
                                        {errors.website_url && <p className="mt-1 text-xs text-red-500">{errors.website_url}</p>}
                                    </div>

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            {editingClient ? 'Update Client' : 'Add Client'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="relative flex-1">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search clients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Clients ({filteredClients.length})</CardTitle>
                            <CardDescription>Manage your clients</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {filteredClients.map((client, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                            <div className="p-1">
                                                <Card>
                                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                        <CardTitle className="text-sm font-medium">{client.name}</CardTitle>
                                                        <a
                                                            href={client.website_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            <img
                                                                src={`/storage/${client.logo_url}`}
                                                                alt={client.name}
                                                                className="h-10 w-10 object-contain"
                                                            />
                                                        </a>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
