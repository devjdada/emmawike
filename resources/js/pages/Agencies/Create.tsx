import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function CreateAgency({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        logo_url: '',
        user_id: auth.user.id, // Automatically set user_id as owner
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('agencies.store'));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Create Agency" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Create New Agency</h1>

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
                        Create Agency
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
