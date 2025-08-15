import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/layouts/app-layout"; // Added AppLayout import
import { Head, Link, useForm } from "@inertiajs/react"; // Added Inertia imports

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  status: "draft" | "published" | "archived";
  published_at: string; // Changed from publishedAt
  created_at: string; // Changed from createdAt
  updated_at: string; // Changed from updatedAt
  featured_image?: string; // Changed from featuredImage
  tags: string[];
  read_time: number; // Changed from readTime
  user_id: string; // Added user_id
}

interface BlogsIndexProps { // Simplified props for Index page
    auth: { user: { id: string; name: string; email: string } }; // Minimal user data
    blogs: Blog[];
}

export default function BlogsIndex({ auth, blogs: initialBlogs }: BlogsIndexProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs); // Use initialBlogs from props
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();

  const { data, setData, post, put, delete: inertiaDelete, processing, errors, reset } = useForm({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    status: "draft" as Blog["status"],
    featured_image: "", // Renamed from featuredImage
    tags: "",
    user_id: auth.user.id, // Set user_id from auth props
  });

  const categories = ["Market Analysis", "Buying Guide", "Investment", "Property Management", "Legal"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...data,
      tags: data.tags.split(",").map(tag => tag.trim()),
      read_time: Math.ceil(data.content.split(" ").length / 200),
      published_at: data.status === "published" ? new Date().toISOString().split("T")[0] : null, // Use null for nullable timestamp
    };

    if (editingBlog) {
      put(route('blogs.update', editingBlog.id), blogData, {
        onSuccess: () => {
          toast({ title: "Success", description: "Blog updated successfully" });
          setIsDialogOpen(false);
          setEditingBlog(null);
          reset();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to update blog", variant: "destructive" });
        }
      });
    } else {
      post(route('blogs.store'), blogData, {
        onSuccess: () => {
          toast({ title: "Success", description: "Blog created successfully" });
          setIsDialogOpen(false);
          reset();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to create blog", variant: "destructive" });
        }
      });
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      category: blog.category,
      status: blog.status,
      featuredImage: blog.featured_image || "",
      tags: blog.tags.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      inertiaDelete(route('blogs.destroy', id), {
        onSuccess: () => {
          toast({ title: "Success", description: "Blog deleted successfully" });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
        }
      });
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setIsDialogOpen(false);
    reset(); // Reset form data using Inertia's reset
  };

  const getStatusBadge = (status: Blog["status"]) => {
    const variants = {
      draft: "secondary",
      published: "default",
      archived: "destructive",
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout user={auth.user}> {/* Wrap with AppLayout */}
      <Head title="Blog Management" />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground">Manage and publish your blog posts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingBlog(null); setIsDialogOpen(true); }}> {/* Clear editingBlog on Add */}
                <Plus className="mr-2 h-4 w-4" />
                Add Blog Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                      required
                    />
                    <InputError message={errors.title} />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={data.author}
                      onChange={(e) => setData("author", e.target.value)}
                      required
                    />
                    <InputError message={errors.author} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={data.excerpt}
                    onChange={(e) => setData("excerpt", e.target.value)}
                    rows={2}
                    required
                  />
                  <InputError message={errors.excerpt} />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    rows={8}
                    required
                  />
                  <InputError message={errors.content} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={data.category}
                      onValueChange={(value) => setData("category", value)}
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
                    <InputError message={errors.category} />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={data.status}
                      onValueChange={(value: Blog["status"]) => setData("status", value)}
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
                    <InputError message={errors.status} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={data.featured_image}
                    onChange={(e) => setData("featured_image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <InputError message={errors.featured_image} />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={data.tags}
                    onChange={(e) => setData("tags", e.target.value)}
                    placeholder="real estate, tips, guide"
                  />
                  <InputError message={errors.tags} />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {blog.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{getStatusBadge(blog.status)}</TableCell>
                  <TableCell>
                    {blog.published_at || "Not published"}
                  </TableCell>
                  <TableCell>{blog.read_time} min</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No blogs found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}