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

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Understanding Real Estate Market Trends",
      content: "Full blog content here...",
      excerpt: "A comprehensive guide to understanding current real estate market trends and predictions.",
      author: "John Smith",
      category: "Market Analysis",
      status: "published",
      publishedAt: "2024-01-15",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15",
      featuredImage: "/images/blog1.jpg",
      tags: ["real estate", "market", "trends"],
      readTime: 5,
    },
    {
      id: "2",
      title: "Top 10 Tips for First-Time Home Buyers",
      content: "Full blog content here...",
      excerpt: "Essential tips and advice for first-time home buyers to make informed decisions.",
      author: "Sarah Johnson",
      category: "Buying Guide",
      status: "draft",
      publishedAt: "",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      featuredImage: "/images/blog2.jpg",
      tags: ["home buying", "tips", "guide"],
      readTime: 7,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    status: "draft" as Blog["status"],
    featuredImage: "",
    tags: "",
  });

  const { toast } = useToast();

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
    
    const blogData: Blog = {
      id: editingBlog ? editingBlog.id : Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      author: formData.author,
      category: formData.category,
      status: formData.status,
      featuredImage: formData.featuredImage,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      readTime: Math.ceil(formData.content.split(" ").length / 200),
      publishedAt: formData.status === "published" ? new Date().toISOString().split("T")[0] : "",
      createdAt: editingBlog ? editingBlog.createdAt : new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (editingBlog) {
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? blogData : blog));
      toast({
        title: "Success",
        description: "Blog updated successfully",
      });
    } else {
      setBlogs([...blogs, blogData]);
      toast({
        title: "Success",
        description: "Blog created successfully",
      });
    }

    resetForm();
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
      featuredImage: blog.featuredImage || "",
      tags: blog.tags.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast({
      title: "Success",
      description: "Blog deleted successfully",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      status: "draft",
      featuredImage: "",
      tags: "",
    });
    setEditingBlog(null);
    setIsDialogOpen(false);
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground">Manage and publish your blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
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
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Blog["status"]) => setFormData({ ...formData, status: value })}
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
                </div>
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="real estate, tips, guide"
                />
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
                  {blog.publishedAt || "Not published"}
                </TableCell>
                <TableCell>{blog.readTime} min</TableCell>
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
  );
};

export default BlogManagement;