import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';

interface Blog {
    id: string;
    title: string;
    content: string;
    image_url: string;
    // Add other properties as needed
}

interface BlogsIndexProps extends PageProps {
    blogs: Blog[];
}

export default function BlogsIndex({ blogs }: BlogsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Blogs" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Public Blog Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md p-6">
                            <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
                            {/* Add more blog details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
