import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Agency {
    id: number;
    name: string;
    description: string;
    logo_url: string;
    user_id: number;
}

interface EditAgencyProps extends PageProps {
    agency: Agency;
}

export default function EditAgency({ auth, agency }: EditAgencyProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: agency.name,
        description: agency.description,
        logo_url: agency.logo_url,
        user_id: agency.user_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('agencies.update', agency.id));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Agency" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Edit Agency</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Agency Name</Label>
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
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="logo_url">Logo URL</Label>
                        <Input
                            id="logo_url"
                            type="url"
                            name="logo_url"
                            value={data.logo_url}
                            className="mt-1 block w-full"
                            autoComplete="logo_url"
                            onChange={(e) => setData('logo_url', e.target.value)}
                        />
                        <InputError message={errors.logo_url} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Agency
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
