import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Blog {
    id: string;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
    // Add other properties as needed
}

interface BlogShowProps extends PageProps {
    blog: Blog;
}

export default function BlogShow({ blog }: BlogShowProps) {
    return (
        <PublicLayout>
            <Head title={blog.title} />
            <div className="container mx-auto py-8">
                <article className="bg-white rounded-lg shadow-md p-6">
                    <img src={blog.image_url} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-6" />
                    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-gray-500 text-sm mb-6">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>
            </div>
        </PublicLayout>
    );
}
