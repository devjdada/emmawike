import InputError from '@/components/input-error';
import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function CreateProperty({ auth }: PageProps) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        owner_id: auth.user.id,
        title: '',
        description: '<p></p>',
        type: 'House',
        price: '',
        currency: 'NGN',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        country: 'Nigeria',
        zip_code: '',
        latitude: '',
        longitude: '',
        bedrooms: '',
        bathrooms: '',
        area_sq_ft: '',
        status: 'available',
        is_featured: false,
        media: [],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('media', Array.from(e.target.files));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.properties.store'), {
            onSuccess: () => {
                toast({
                    title: 'Property Added',
                    description: 'The property has been successfully added to the listings.',
                });
                reset();
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to add property.',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Create Property" />

            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Create New Property</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="title">Property Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                name="price"
                                value={data.price}
                                className="mt-1 block w-full"
                                autoComplete="price"
                                onChange={(e) => setData('price', parseFloat(e.target.value))}
                                required
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="currency">Currency</Label>
                            <Select onValueChange={(value) => setData('currency', value)} value={data.currency}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NGN">NGN</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.currency} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="type">Property Type</Label>
                            <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                                <SelectTrigger className="w-full">
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
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="address_line1">Address Line 1</Label>
                            <Input
                                id="address_line1"
                                type="text"
                                name="address_line1"
                                value={data.address_line1}
                                className="mt-1 block w-full"
                                autoComplete="address-line1"
                                onChange={(e) => setData('address_line1', e.target.value)}
                                required
                            />
                            <InputError message={errors.address_line1} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
                            <Input
                                id="address_line2"
                                type="text"
                                name="address_line2"
                                value={data.address_line2}
                                className="mt-1 block w-full"
                                autoComplete="address-line2"
                                onChange={(e) => setData('address_line2', e.target.value)}
                            />
                            <InputError message={errors.address_line2} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                name="city"
                                value={data.city}
                                className="mt-1 block w-full"
                                autoComplete="address-level2"
                                onChange={(e) => setData('city', e.target.value)}
                                required
                            />
                            <InputError message={errors.city} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                type="text"
                                name="state"
                                value={data.state}
                                className="mt-1 block w-full"
                                autoComplete="address-level1"
                                onChange={(e) => setData('state', e.target.value)}
                                required
                            />
                            <InputError message={errors.state} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                type="text"
                                name="country"
                                value={data.country}
                                className="mt-1 block w-full"
                                autoComplete="country"
                                onChange={(e) => setData('country', e.target.value)}
                                required
                            />
                            <InputError message={errors.country} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="zip_code">Zip Code (Optional)</Label>
                            <Input
                                id="zip_code"
                                type="text"
                                name="zip_code"
                                value={data.zip_code}
                                className="mt-1 block w-full"
                                autoComplete="postal-code"
                                onChange={(e) => setData('zip_code', e.target.value)}
                            />
                            <InputError message={errors.zip_code} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="latitude">Latitude (Optional)</Label>
                            <Input
                                id="latitude"
                                type="number"
                                name="latitude"
                                value={data.latitude}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.latitude} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="longitude">Longitude (Optional)</Label>
                            <Input
                                id="longitude"
                                type="number"
                                name="longitude"
                                value={data.longitude}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('longitude', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.longitude} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input
                                id="bedrooms"
                                type="number"
                                name="bedrooms"
                                value={data.bedrooms}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('bedrooms', parseInt(e.target.value))}
                                required
                            />
                            <InputError message={errors.bedrooms} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Input
                                id="bathrooms"
                                type="number"
                                name="bathrooms"
                                value={data.bathrooms}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('bathrooms', parseInt(e.target.value))}
                                required
                            />
                            <InputError message={errors.bathrooms} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="area_sq_ft">Area (Sq. Ft.)</Label>
                            <Input
                                id="area_sq_ft"
                                type="number"
                                name="area_sq_ft"
                                value={data.area_sq_ft}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('area_sq_ft', parseInt(e.target.value))}
                                required
                            />
                            <InputError message={errors.area_sq_ft} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="media">Property Media (Images/Videos)</Label>
                        <Input id="media" type="file" name="media" className="mt-1 block w-full" onChange={handleFileChange} multiple required />
                        <InputError message={errors.media} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Tiptap description={data.description} onChange={(newContent) => setData('description', newContent)} />
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

                    <Button type="submit" disabled={processing}>
                        Create Property
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
