import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Blog {
    id: number;
    title: string;
    content: string;
    image_url: string;
    user_id: number;
}

interface EditBlogProps extends PageProps {
    blog: Blog;
}

export default function EditBlog({ auth, blog }: EditBlogProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: blog.title,
        content: blog.content,
        image_url: blog.image_url,
        user_id: blog.user_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('blogs.update', blog.id));
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Blog" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>

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

                    <Button type="submit" disabled={processing}>Update Blog</Button>
                </form>
            </div>
        </AppLayout>
    );
}
