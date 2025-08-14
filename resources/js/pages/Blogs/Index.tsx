import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Blog {
    id: number;
    title: string;
    content: string;
    image_url: string;
}

interface BlogsIndexProps extends PageProps {
    blogs: Blog[];
}

export default function BlogsIndex({ auth, blogs }: BlogsIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const handleDeleteClick = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedBlog) {
            // Implement actual delete logic here
            console.log('Deleting blog:', selectedBlog.id);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Blogs" />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Blogs</h1>
                <Button asChild>
                    <Link href={route('blogs.create')}>Add New Blog</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.content.substring(0, 50)}...</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">
                                    Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(blog)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the blog "{selectedBlog?.title}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
