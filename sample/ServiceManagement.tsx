
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  Plus, 
  Settings, 
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  Upload,
  Star,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  featured: z.boolean().default(false),
  status: z.string().default("active"),
  features: z.string().optional(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

const ServiceManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Property Management",
      description: "Complete property management services for residential and commercial properties",
      category: "Management",
      price: "$299/month",
      duration: "Monthly",
      featured: true,
      status: "Active",
      dateAdded: "2024-01-15",
      clients: 45,
      bookings: 123,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Real Estate Consultation",
      description: "Expert consultation for buying, selling, and investing in real estate",
      category: "Consultation",
      price: "$150/hour",
      duration: "1-2 hours",
      featured: false,
      status: "Active",
      dateAdded: "2024-01-10",
      clients: 78,
      bookings: 234,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Home Staging",
      description: "Professional home staging services to maximize property appeal",
      category: "Staging",
      price: "$800/project",
      duration: "2-3 days",
      featured: true,
      status: "Active",
      dateAdded: "2024-01-20",
      clients: 32,
      bookings: 67,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      name: "Property Valuation",
      description: "Accurate property valuation services for various purposes",
      category: "Valuation",
      price: "$200/property",
      duration: "1 day",
      featured: false,
      status: "Draft",
      dateAdded: "2024-01-08",
      clients: 0,
      bookings: 0,
      rating: 0,
      imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      name: "Investment Analysis",
      description: "Comprehensive investment analysis for real estate opportunities",
      category: "Analysis",
      price: "$500/report",
      duration: "3-5 days",
      featured: false,
      status: "Inactive",
      dateAdded: "2023-12-15",
      clients: 12,
      bookings: 28,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ]);

  const form = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      duration: "",
      imageUrl: "",
      featured: false,
      status: "active",
      features: "",
    },
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || service.status === statusFilter;
    const matchesCategory = !categoryFilter || service.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const onSubmit = (data: ServiceForm) => {
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { 
              ...s, 
              name: data.name,
              description: data.description,
              category: data.category,
              price: data.price,
              duration: data.duration,
              featured: data.featured,
              status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
              imageUrl: data.imageUrl
            }
          : s
      ));
      toast({
        title: "Service Updated",
        description: "The service has been successfully updated.",
      });
    } else {
      const newService = {
        id: services.length + 1,
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        duration: data.duration,
        featured: data.featured,
        status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        dateAdded: new Date().toISOString().split('T')[0],
        clients: 0,
        bookings: 0,
        rating: 0,
        imageUrl: data.imageUrl
      };
      setServices([...services, newService]);
      toast({
        title: "Service Added",
        description: "The service has been successfully added.",
      });
    }
    
    form.reset();
    setEditingService(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    form.reset({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      imageUrl: service.imageUrl,
      featured: service.featured,
      status: service.status.toLowerCase(),
      features: "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been removed.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
    toast({
      title: "Status Updated",
      description: `Service status changed to ${newStatus}.`,
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Draft": return "secondary";
      case "Inactive": return "destructive";
      default: return "secondary";
    }
  };

  const categories = [...new Set(services.map(service => service.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Service Management</h1>
                <p className="text-muted-foreground">Manage all your services and offerings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? "Edit Service" : "Add New Service"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingService 
                        ? "Update the service details below"
                        : "Fill in the details to add a new service"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Property Management..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Management">Management</SelectItem>
                                  <SelectItem value="Consultation">Consultation</SelectItem>
                                  <SelectItem value="Staging">Staging</SelectItem>
                                  <SelectItem value="Valuation">Valuation</SelectItem>
                                  <SelectItem value="Analysis">Analysis</SelectItem>
                                  <SelectItem value="Marketing">Marketing</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input placeholder="$299/month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                <Input placeholder="Monthly" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter a detailed description of the service..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features (comma-separated)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Feature 1, Feature 2, Feature 3..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 rounded border border-input"
                              />
                            </FormControl>
                            <FormLabel>Mark as Featured Service</FormLabel>
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingService ? "Update Service" : "Add Service"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? "" : value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
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
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>Services ({filteredServices.length})</CardTitle>
              <CardDescription>
                Manage your services, track performance, and update details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price & Duration</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              {service.description.length > 50 
                                ? `${service.description.substring(0, 50)}...` 
                                : service.description
                              }
                              {service.featured && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{service.price}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-3 w-3" />
                            {service.clients} clients
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {service.bookings} bookings
                          </div>
                          {service.rating > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {service.rating}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={service.status} 
                          onValueChange={(value) => handleStatusChange(service.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue>
                              <Badge variant={getStatusVariant(service.status)}>
                                {service.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
