import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added Card imports
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { truncateText } from '@/lib/utils'; // Import truncateText utility
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns'; // Import date-fns for date formatting
import { BookOpen, Edit, Eye, Filter, Plus, Search, Tag, Trash2, Users } from 'lucide-react'; // Added BookOpen, Eye, Users, Tag
import { useEffect, useState } from 'react'; // Import useEffect

interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    published_at: string;
    created_at: string;
    updated_at: string;
    featured_image?: string;
    tags: string[];
    read_time: number;
    user_id: string;
}

interface BlogsIndexProps {
    auth: { user: { id: string; name: string; email: string } };
    blogs: Blog[];
}

export default function BlogsIndex({ auth, blogs: initialBlogs }: BlogsIndexProps) {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const { toast } = useToast();

    const { delete: inertiaDelete, patch } = useForm();

    useEffect(() => {
        setBlogs(initialBlogs);
    }, [initialBlogs]);

    const handleStatusChange = (blogId: string, newStatus: 'draft' | 'published' | 'archived') => {
        console.log(`Attempting to update blog ${blogId} to status: ${newStatus}`);
        patch(
            route('admin.blogs.update', blogId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log(`Blog ${blogId} status updated successfully (frontend callback).`);
                    toast({
                        title: 'Success',
                        description: 'Blog status updated successfully.',
                    });
                    // The setBlogs here is technically redundant if useEffect handles it,
                    // but it provides immediate visual feedback before the full page re-render.
                    setBlogs((prevBlogs) => prevBlogs.map((blog) => (blog.id === blogId ? { ...blog, status: newStatus } : blog)));
                },
                onError: (errors) => {
                    console.error('Failed to update blog status (frontend callback):', errors);
                    toast({
                        title: 'Error',
                        description: 'Failed to update blog status. Check console for details.',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    const categories = ['Market Analysis', 'Buying Guide', 'Investment', 'Property Management', 'Legal'];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch =
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleEdit = (blog: Blog) => {
        window.location.href = route('admin.blogs.edit', blog.id);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            inertiaDelete(route('admin.blogs.destroy', id), {
                onSuccess: () => {
                    toast({ title: 'Success', description: 'Blog deleted successfully' });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to delete blog',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Blog Management" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
                        <p className="text-muted-foreground">Manage and publish your blog posts</p>
                    </div>
                    <Link href={route('admin.blogs.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Blog Post
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredBlogs.length}</div>
                            <p className="text-xs text-muted-foreground">Total blog posts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredBlogs.filter((blog) => blog.status === 'published').length}</div>
                            <p className="text-xs text-muted-foreground">Live on the site</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Read Time</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" /> {/* Using Users as a placeholder for a "time" icon */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredBlogs.reduce((sum, blog) => sum + (blog.read_time || 0), 0)} min</div>
                            <p className="text-xs text-muted-foreground">Combined reading time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{new Set(filteredBlogs.map((blog) => blog.category)).size}</div>
                            <p className="text-xs text-muted-foreground">Unique categories</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search blogs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead>Read Time</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBlogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{truncateText(blog.title, 25)}</div>
                                            <div className="max-w-xs truncate text-sm text-muted-foreground">{truncateText(blog.excerpt, 30)}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{blog.author}</TableCell>
                                    <TableCell>{blog.category}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={blog.status}
                                            onValueChange={(newStatus: 'draft' | 'published' | 'archived') => handleStatusChange(blog.id, newStatus)}
                                        >
                                            <SelectTrigger className="w-36">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>{blog.published_at ? format(new Date(blog.published_at), 'MMM dd, yyyy') : 'Not published'}</TableCell>
                                    <TableCell>{blog.read_time} min</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredBlogs.length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">No blogs found matching your criteria.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
