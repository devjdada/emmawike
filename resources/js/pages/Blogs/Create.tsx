import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category: string;
    status: "draft" | "published" | "archived";
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    featuredImage?: string;
    tags: string[];
    readTime: number;
}

export default function CreateBlog({ auth }: PageProps) {
    const { toast } = useToast();
    const categories = ["Market Analysis", "Buying Guide", "Investment", "Property Management", "Legal"];

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        status: 'draft' as Blog["status"],
        featured_image: '', // Renamed from image_url
        tags: '',
        user_id: auth.user.id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blogs.store'), {
            onSuccess: () => {
                toast({ title: "Success", description: "Blog created successfully" });
                reset();
            },
            onError: () => {
                toast({ title: "Error", description: "Failed to create blog", variant: "destructive" });
            }
        });
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Create Blog" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Create New Blog</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                type="text"
                                name="author"
                                value={data.author}
                                className="mt-1 block w-full"
                                autoComplete="author"
                                onChange={(e) => setData('author', e.target.value)}
                                required
                            />
                            <InputError message={errors.author} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            name="excerpt"
                            value={data.excerpt}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={2}
                            required
                        />
                        <InputError message={errors.excerpt} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={data.content}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('content', e.target.value)}
                            rows={8}
                            required
                        />
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) => setData('category', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value: Blog["status"]) => setData('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="featured_image">Featured Image URL</Label>
                        <Input
                            id="featured_image"
                            type="url"
                            name="featured_image"
                            value={data.featured_image}
                            className="mt-1 block w-full"
                            autoComplete="featured_image"
                            onChange={(e) => setData('featured_image', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                        <InputError message={errors.featured_image} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                            id="tags"
                            type="text"
                            name="tags"
                            value={data.tags}
                            className="mt-1 block w-full"
                            autoComplete="tags"
                            onChange={(e) => setData('tags', e.target.value)}
                            placeholder="real estate, tips, guide"
                        />
                        <InputError message={errors.tags} className="mt-2" />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Blog
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}