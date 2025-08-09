import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function CreateBlog({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        image_url: '',
        user_id: auth.user.id, // Automatically set user_id
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blogs.store'));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Create Blog" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Create New Blog</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
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
                        <Label htmlFor="content">Content</Label>
                        <Input
                            id="content"
                            type="text"
                            name="content"
                            value={data.content}
                            className="mt-1 block w-full"
                            autoComplete="content"
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        />
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input
                            id="image_url"
                            type="url"
                            name="image_url"
                            value={data.image_url}
                            className="mt-1 block w-full"
                            autoComplete="image_url"
                            onChange={(e) => setData('image_url', e.target.value)}
                            required
                        />
                        <InputError message={errors.image_url} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>Create Blog</Button>
                </form>
            </div>
        </AppLayout>
    );
}
