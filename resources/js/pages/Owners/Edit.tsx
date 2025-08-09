import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Owner {
    id: number;
    user_id: number;
}

interface EditOwnerProps extends PageProps {
    owner: Owner;
}

export default function EditOwner({ auth, owner }: EditOwnerProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        user_id: owner.user_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('owners.update', owner.id));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Owner" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Edit Owner</h1>

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

                    <Button type="submit" disabled={processing}>Update Owner</Button>
                </form>
            </div>
        </AppLayout>
    );
}
