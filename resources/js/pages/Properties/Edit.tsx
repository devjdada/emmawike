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
import { ArrowLeft, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Media {
    id: number;
    path: string;
    type: 'image' | 'video';
    label: string;
}

interface Property {
    id: string;
    owner_id: number;
    title: string;
    description: string;
    type: string;
    price: number;
    currency: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string;
    country: string;
    zip_code: string | null;
    latitude: number | null;
    longitude: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area_sq_ft: number | null;
    status: string;
    is_featured: boolean;
    media: Media[];
}

interface EditPropertyProps extends PageProps {
    property: Property;
}

export default function EditProperty({ auth, property }: EditPropertyProps) {
    const { toast } = useToast();
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        owner_id: property.owner_id,
        title: property.title,
        description: property.description,
        type: property.type,
        price: property.price,
        currency: property.currency,
        address_line1: property.address_line1,
        address_line2: property.address_line2 || '',
        city: property.city,
        state: property.state,
        country: property.country,
        zip_code: property.zip_code || '',
        latitude: property.latitude || '',
        longitude: property.longitude || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        area_sq_ft: property.area_sq_ft || '',
        status: property.status,
        is_featured: property.is_featured,
        media: [] as any[], // For new uploads
        deleted_media_ids: [] as number[], // For existing media to delete
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setMediaFiles(Array.from(e.target.files));
        }
    };

    const handleDeleteMedia = (id: number) => {
        if (confirm("Are you sure you want to delete this media item?")) {
            setDeletedMediaIds([...deletedMediaIds, id]);
            // Optionally, update the displayed media immediately
            property.media = property.media.filter(item => item.id !== id);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        // Append all form data
        Object.keys(data).forEach(key => {
            if (key !== 'media' && key !== 'deleted_media_ids') {
                formData.append(key, data[key as keyof typeof data] as string);
            }
        });

        // Append new media files
        mediaFiles.forEach((file, index) => {
            formData.append(`media[${index}]`, file);
        });

        // Append deleted media IDs
        deletedMediaIds.forEach((id, index) => {
            formData.append(`deleted_media_ids[${index}]`, id.toString());
        });

        // Manually append _method for PUT request with FormData
        formData.append('_method', 'PUT');

        post(route('properties.update', property.id), {
            data: formData as any,
            forceFormData: true, // Important for Inertia to send FormData correctly
            onSuccess: () => {
                toast({ title: "Property Updated", description: "The property has been successfully updated." });
            },
            onError: (e) => {
                console.error(e);
                toast({ title: "Error", description: "Failed to update property.", variant: "destructive" });
            },
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Property" />

            <div className="pt-24 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href={route('properties.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Properties
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Edit Property</h1>
                            <p className="text-muted-foreground">Update the details of your property listing</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Property Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="title">Property Title</Label>
                                        <Input id="title" placeholder="Luxury Penthouse..." value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <Input id="price" type="number" placeholder="1500000" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                        <InputError message={errors.price} />
                                    </div>
                                    <div>
                                        <Label>Location</Label>
                                        <Input placeholder="New York, NY" value={`${data.city}, ${data.state}`} onChange={() => {}} />
                                    </div>
                                    <div>
                                        <Label>Property Type</Label>
                                        <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="House">House</SelectItem>
                                                <SelectItem value="Apartment">Apartment</SelectItem>
                                                <SelectItem value="Penthouse">Penthouse</SelectItem>
                                                <SelectItem value="Villa">Villa</SelectItem>
                                                <SelectItem value="Estate">Estate</SelectItem>
                                                <SelectItem value="Loft">Loft</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.type} />
                                    </div>
                                    <div>
                                        <Label htmlFor="bedrooms">Bedrooms</Label>
                                        <Input id="bedrooms" type="number" placeholder="4" value={data.bedrooms} onChange={(e) => setData('bedrooms', e.target.value)} />
                                        <InputError message={errors.bedrooms} />
                                    </div>
                                    <div>
                                        <Label htmlFor="bathrooms">Bathrooms</Label>
                                        <Input id="bathrooms" type="number" placeholder="3" value={data.bathrooms} onChange={(e) => setData('bathrooms', e.target.value)} />
                                        <InputError message={errors.bathrooms} />
                                    </div>
                                    <div>
                                        <Label htmlFor="area_sq_ft">Square Footage</Label>
                                        <Input id="area_sq_ft" type="number" placeholder="3200" value={data.area_sq_ft} onChange={(e) => setData('area_sq_ft', e.target.value)} />
                                        <InputError message={errors.area_sq_ft} />
                                    </div>
                                    <div>
                                        <Label>Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="image_url">Image URL</Label>
                                    <Input id="image_url" placeholder="https://..." value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} />
                                    <InputError message={errors.image_url} />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Enter a detailed description of the property..." className="min-h-[100px]" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="flex flex-row items-start space-x-3 space-y-0">
                                    <Checkbox id="is_featured" checked={data.is_featured} onCheckedChange={(checked) => setData('is_featured', checked as boolean)} />
                                    <div className="space-y-1 leading-none">
                                        <Label htmlFor="is_featured">Featured Property</Label>
                                        <p className="text-sm text-muted-foreground">Mark this property as featured to highlight it on the homepage</p>
                                    </div>
                                    <InputError message={errors.is_featured} />
                                </div>

                                {/* Existing Media Display */}
                                <div className="mt-6">
                                    <Label>Existing Media</Label>
                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {property.media.map((media_item) => (
                                            <div key={media_item.id} className="relative group">
                                                {media_item.type === 'image' ? (
                                                    <img src={`/storage/${media_item.path}`} alt={media_item.label} className="w-full h-auto rounded" />
                                                ) : (
                                                    <video src={`/storage/${media_item.path}`} controls className="w-full h-auto rounded" />
                                                )}
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDeleteMedia(media_item.id)}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* New Media Upload */}
                                <div>
                                    <Label htmlFor="new_media">Upload New Media</Label>
                                    <Input
                                        id="new_media"
                                        type="file"
                                        name="new_media"
                                        className="mt-1 block w-full"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <InputError message={errors.media} />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('properties.index')}>
                                        <Button variant="outline" type="button">Cancel</Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>Update Property</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
