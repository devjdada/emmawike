import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  Plus, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  beds: z.string().min(1, "Number of beds is required"),
  baths: z.string().min(1, "Number of baths is required"),
  sqft: z.string().min(1, "Square footage is required"),
  type: z.string().min(1, "Property type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  featured: z.boolean().default(false),
  status: z.string().default("draft"),
});

type PropertyForm = z.infer<typeof propertySchema>;

const PropertyManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Penthouse in Downtown",
      price: "$2,500,000",
      location: "New York, NY",
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "Penthouse",
      featured: true,
      status: "Published",
      dateAdded: "2024-01-15",
      views: 1250,
      inquiries: 45
    },
    {
      id: 2,
      title: "Modern Family Home",
      price: "$850,000",
      location: "Los Angeles, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "House",
      featured: false,
      status: "Published",
      dateAdded: "2024-01-10",
      views: 892,
      inquiries: 23
    },
    {
      id: 3,
      title: "Waterfront Villa",
      price: "$3,200,000",
      location: "Miami, FL",
      beds: 6,
      baths: 5,
      sqft: 5800,
      type: "Villa",
      featured: true,
      status: "Draft",
      dateAdded: "2024-01-20",
      views: 0,
      inquiries: 0
    },
    {
      id: 4,
      title: "City Center Apartment",
      price: "$450,000",
      location: "Chicago, IL",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      featured: false,
      status: "Published",
      dateAdded: "2024-01-08",
      views: 634,
      inquiries: 18
    },
    {
      id: 5,
      title: "Mountain View Estate",
      price: "$1,800,000",
      location: "Denver, CO",
      beds: 7,
      baths: 6,
      sqft: 6200,
      type: "Estate",
      featured: false,
      status: "Archived",
      dateAdded: "2023-12-15",
      views: 456,
      inquiries: 12
    }
  ]);

  // Load properties from localStorage on component mount
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsedProperties = JSON.parse(savedProperties);
      if (parsedProperties.length > 0) {
        setProperties(parsedProperties);
      }
    }
  }, []);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      price: "",
      location: "",
      beds: "",
      baths: "",
      sqft: "",
      type: "",
      description: "",
      imageUrl: "",
      featured: false,
      status: "draft",
    },
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: PropertyForm) => {
    if (editingProperty) {
      setProperties(properties.map(p => 
        p.id === editingProperty.id 
          ? { 
              ...p, 
              title: data.title,
              price: data.price,
              location: data.location,
              beds: parseInt(data.beds), 
              baths: parseInt(data.baths), 
              sqft: parseInt(data.sqft),
              type: data.type,
              featured: data.featured,
              status: data.status.charAt(0).toUpperCase() + data.status.slice(1)
            }
          : p
      ));
      toast({
        title: "Property Updated",
        description: "The property has been successfully updated.",
      });
    } else {
      const newProperty = {
        id: properties.length + 1,
        title: data.title,
        price: data.price,
        location: data.location,
        beds: parseInt(data.beds),
        baths: parseInt(data.baths),
        sqft: parseInt(data.sqft),
        type: data.type,
        featured: data.featured,
        status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        dateAdded: new Date().toISOString().split('T')[0],
        views: 0,
        inquiries: 0
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Property Added",
        description: "The property has been successfully added to the listings.",
      });
    }
    
    form.reset();
    setEditingProperty(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    form.reset({
      title: property.title,
      price: property.price,
      location: property.location,
      beds: property.beds.toString(),
      baths: property.baths.toString(),
      sqft: property.sqft.toString(),
      type: property.type,
      description: property.description || "",
      imageUrl: property.imageUrl || "",
      featured: property.featured,
      status: property.status.toLowerCase(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "The property has been removed from the listings.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
    toast({
      title: "Status Updated",
      description: `Property status changed to ${newStatus}.`,
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Published": return "default";
      case "Draft": return "secondary";
      case "Archived": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                    <p className="text-3xl font-bold text-foreground">{properties.length}</p>
                  </div>
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">All property listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                    <p className="text-3xl font-bold text-foreground">
                      {properties.filter(p => p.status === "Published").length}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Live on the market</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-3xl font-bold text-foreground">
                      {properties.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Across all properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inquiries</p>
                    <p className="text-3xl font-bold text-foreground">
                      {properties.reduce((sum, p) => sum + (p.inquiries || 0), 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Total customer interest</p>
              </CardContent>
            </Card>
          </div>

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
                <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
                <p className="text-muted-foreground">Manage all your property listings in one place</p>
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
              <Link to="/admin/properties/map">
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </Link>
              <Link to="/admin/properties/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </Link>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProperty ? "Edit Property" : "Add New Property"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProperty 
                        ? "Update the property details below"
                        : "Fill in the details to add a new property listing"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Luxury Penthouse..." {...field} />
                              </FormControl>
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
                                <Input placeholder="$1,500,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="New York, NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select property type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="House">House</SelectItem>
                                  <SelectItem value="Apartment">Apartment</SelectItem>
                                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                                  <SelectItem value="Villa">Villa</SelectItem>
                                  <SelectItem value="Estate">Estate</SelectItem>
                                  <SelectItem value="Loft">Loft</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="beds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrooms</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="4" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="baths"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bathrooms</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sqft"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Square Footage</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3200" {...field} />
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
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="published">Published</SelectItem>
                                  <SelectItem value="archived">Archived</SelectItem>
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
                                placeholder="Enter a detailed description of the property..."
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
                            <FormLabel>Mark as Featured Property</FormLabel>
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingProperty ? "Update Property" : "Add Property"}
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
                    placeholder="Search properties..."
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
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Properties Table */}
          <Card>
            <CardHeader>
              <CardTitle>Properties ({filteredProperties.length})</CardTitle>
              <CardDescription>
                Manage your property listings, track performance, and update details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              {property.type}
                              {property.featured && (
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
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {property.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {property.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            {property.beds}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            {property.baths}
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            {property.sqft}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Eye className="h-3 w-3" />
                            {property.views} views
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="h-3 w-3" />
                            {property.inquiries} inquiries
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={property.status} 
                          onValueChange={(value) => handleStatusChange(property.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue>
                              <Badge variant={getStatusVariant(property.status)}>
                                {property.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
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

export default PropertyManagement;