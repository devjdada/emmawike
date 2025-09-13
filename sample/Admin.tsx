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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
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
  Users,
  TrendingUp,
  Building
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
});

type PropertyForm = z.infer<typeof propertySchema>;

const Admin = () => {
  const { toast } = useToast();
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
      status: "Published"
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
      status: "Published"
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
      status: "Draft"
    }
  ]);

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
    },
  });

  const onSubmit = (data: PropertyForm) => {
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
      status: "Published"
    };
    
    setProperties([...properties, newProperty]);
    form.reset();
    toast({
      title: "Property Added",
      description: "The property has been successfully added to the listings.",
    });
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "The property has been removed from the listings.",
    });
  };

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: Home,
      color: "text-blue-600"
    },
    {
      title: "Published",
      value: properties.filter(p => p.status === "Published").length,
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Featured",
      value: properties.filter(p => p.featured).length,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Draft",
      value: properties.filter(p => p.status === "Draft").length,
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Property Management Dashboard</h1>
            <p className="text-muted-foreground">Manage your property listings and track performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your real estate business efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/admin/properties" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Manage Properties
                  </Button>
                </Link>
                <Link to="/admin/projects" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Building className="h-4 w-4 mr-2" />
                    Manage Projects
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Client Management
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics & Reports
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New property added</p>
                      <p className="text-xs text-muted-foreground">Luxury Penthouse - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Property inquiry received</p>
                      <p className="text-xs text-muted-foreground">Modern Family Home - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Property marked as featured</p>
                      <p className="text-xs text-muted-foreground">Waterfront Villa - 6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="add-property" className="space-y-6 mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-property">Add Property</TabsTrigger>
              <TabsTrigger value="manage-properties">Manage Properties</TabsTrigger>
            </TabsList>

            {/* Add Property Tab */}
            <TabsContent value="add-property">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Property
                  </CardTitle>
                  <CardDescription>
                    Fill in the details below to add a new property to your listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter a detailed description of the property..."
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
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

                        <Button type="submit" className="bg-primary hover:bg-primary/90">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Manage Properties Tab */}
            <TabsContent value="manage-properties">
              <Card>
                <CardHeader>
                  <CardTitle>Property Listings</CardTitle>
                  <CardDescription>
                    View and manage all your property listings
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
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">{property.title}</div>
                                <div className="text-sm text-muted-foreground">{property.type}</div>
                              </div>
                              {property.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
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
                                {property.sqft} sqft
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={property.status === "Published" ? "default" : "secondary"}>
                              {property.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;