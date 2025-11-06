import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image: File | null;
    image_url: string;
    featured: boolean;
    status: string;
    features: string;
}

interface EditServiceProps extends PageProps {
    service: Service;
}

export default function EditService({ auth, service }: EditServiceProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Service>({
        ...service,
        image: null,
        _method: 'PUT',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.services.update', service.id));
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
        if (service.image_url) {
            setImagePreview(service.image_url);
        }
    }, []);

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Service" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.services.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Button>
                    </Link>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Edit Service</CardTitle>
                            <CardDescription>Update the service details below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">Service Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Property Management..."
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <FormMessage>{errors.name}</FormMessage>}
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select onValueChange={(value) => setData('category', value)} value={data.category}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Management">Management</SelectItem>
                                                <SelectItem value="Consultation">Consultation</SelectItem>
                                                <SelectItem value="Staging">Staging</SelectItem>
                                                <SelectItem value="Valuation">Valuation</SelectItem>
                                                <SelectItem value="Analysis">Analysis</SelectItem>
                                                <SelectItem value="Marketing">Marketing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <FormMessage>{errors.category}</FormMessage>}
                                    </div>
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            placeholder="299"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', Number(e.target.value))}
                                        />
                                        {errors.price && <FormMessage>{errors.price}</FormMessage>}
                                    </div>
                                    <div>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            placeholder="Monthly"
                                            value={data.duration}
                                            onChange={(e) => setData('duration', e.target.value)}
                                        />
                                        {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
                                    </div>
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <FormMessage>{errors.status}</FormMessage>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="image">Service Image</Label>
                                    <Input id="image" type="file" onChange={handleFileChange} />
                                    {errors.image && <FormMessage>{errors.image}</FormMessage>}
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium">Image Preview:</p>
                                            <img src={imagePreview} alt="Image preview" className="mt-2 h-20 w-auto rounded" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Tiptap
                                        description={data.description}
                                        onChange={(newContent: string) => {
                                            setData('description', newContent);
                                        }}
                                    />

                                    {errors.description && <FormMessage>{errors.description}</FormMessage>}
                                </div>

                                <div>
                                    <Label htmlFor="features">Features (comma-separated)</Label>
                                    <Textarea
                                        id="features"
                                        placeholder="Feature 1, Feature 2, Feature 3..."
                                        className="min-h-[80px]"
                                        value={data.features}
                                        onChange={(e) => setData('features', e.target.value)}
                                    />
                                    {errors.features && <FormMessage>{errors.features}</FormMessage>}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        className="h-4 w-4 rounded border border-input"
                                    />
                                    <Label htmlFor="featured">Mark as Featured Service</Label>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        Update Service
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
