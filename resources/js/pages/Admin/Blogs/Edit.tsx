import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Blog {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category: string;
    status: string;
    featured_image: File | null;
    image_url: string;
    tags: string;
    read_time: number;
}

interface EditBlogProps extends PageProps {
    blog: Blog;
    categories: { id: number; name: string }[];
}

export default function EditBlogPage({ auth, blog, categories }: EditBlogProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Blog>({
        ...blog,
        featured_image: null,
        _method: 'PUT',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.blogs.update', blog.id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('featured_image', file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    useEffect(() => {
        if (blog.image_url) {
            setImagePreview(blog.image_url);
        }
    }, []);

    return (
        <AppLayout user={auth.user}>
            <Head title="Edit Blog Post" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.blogs.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Button>
                    </Link>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Edit Blog Post</CardTitle>
                            <CardDescription>Update the blog post details below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Blog post title..."
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select onValueChange={(value) => setData('category', value)} value={data.category}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={`category-${category.id}`} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="author">Author</Label>
                                        <Input id="author" value={data.author} disabled />
                                    </div>
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                                        <Input
                                            id="tags"
                                            placeholder="e.g. investing, market trends"
                                            value={data.tags}
                                            onChange={(e) => setData('tags', e.target.value)}
                                        />
                                        {errors.tags && <p className="mt-1 text-xs text-red-500">{errors.tags}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="read_time">Read Time (minutes)</Label>
                                        <Input
                                            id="read_time"
                                            type="number"
                                            placeholder="5"
                                            value={data.read_time}
                                            onChange={(e) => setData('read_time', Number(e.target.value))}
                                        />
                                        {errors.read_time && <p className="mt-1 text-xs text-red-500">{errors.read_time}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="featured_image">Featured Image</Label>
                                    <Input id="featured_image" type="file" onChange={handleFileChange} />
                                    {errors.featured_image && <p className="mt-1 text-xs text-red-500">{errors.featured_image}</p>}
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium">Image Preview:</p>
                                            <img src={imagePreview} alt="Image preview" className="mt-2 h-20 w-auto rounded" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        placeholder="A short summary of the blog post..."
                                        className="min-h-[100px]"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                    />
                                    {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Tiptap description={data.content} onChange={(newContent) => setData('content', newContent)} />
                                    {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        Update Post
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
