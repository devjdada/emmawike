import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SimpleEditor from '@/components/SimpleEditor';
import { useToast } from '@/hooks/use-toast';

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
    const { data, setData, post, processing, errors, reset } = useForm({
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
        media: [] as File[],
        existing_media: property.media.map(m => m.id),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('media', Array.from(e.target.files));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('properties.update', property.id), {
            onSuccess: () => {
                toast({ title: "Property Updated", description: "The property has been successfully updated." });
            },
            onError: (e) => {
                console.log(e);
                toast({ title: "Error", description: "Failed to update property.", variant: "destructive" });
            },
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Property" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Edit Property</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ... other form fields ... */}
                    </div>

                    <div>
                        <Label>Existing Media</Label>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {property.media.map((media_item) => (
                                <div key={media_item.id} className="relative">
                                    {media_item.type === 'image' ? (
                                        <img src={`/storage/${media_item.path}`} alt={media_item.label} className="w-full h-auto rounded" />
                                    ) : (
                                        <video src={`/storage/${media_item.path}`} controls className="w-full h-auto rounded" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="media">Upload New Media (Images/Videos)</Label>
                        <Input
                            id="media"
                            type="file"
                            name="media"
                            className="mt-1 block w-full"
                            onChange={handleFileChange}
                            multiple
                        />
                        <InputError message={errors.media} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <SimpleEditor
                            content={data.description}
                            onChange={(newContent) => setData('description', newContent)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_featured"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="h-4 w-4 rounded border border-input"
                        />
                        <Label htmlFor="is_featured">Mark as Featured Property</Label>
                        <InputError message={errors.is_featured} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>Update Property</Button>
                </form>
            </div>
        </AppLayout>
    );
}