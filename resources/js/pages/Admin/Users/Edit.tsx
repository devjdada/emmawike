import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface EditUserProps extends PageProps {
    user: User;
}

export default function EditUser({ auth, user }: EditUserProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit User" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Edit User</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="agency_owner">Agency Owner</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                                <SelectItem value="tenant">Tenant</SelectItem>
                                <SelectItem value="owner">Owner</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update User
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
