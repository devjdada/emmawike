import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function CreateOwner({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.owners.store'));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Create Owner" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Create New Owner</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="user_id">User ID</Label>
                        <Input
                            id="user_id"
                            type="number"
                            name="user_id"
                            value={data.user_id}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('user_id', parseInt(e.target.value))}
                            required
                        />
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Owner
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
