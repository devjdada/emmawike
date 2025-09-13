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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  Plus, 
  Building, 
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
  TrendingUp,
  Clock,
  Users,
  Hammer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Project type is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  featured: z.boolean().default(false),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  teamSize: z.string().min(1, "Team size is required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

const ProjectManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Oceanview Luxury Resort",
      budget: "$15,000,000",
      location: "Malibu, CA",
      type: "Resort",
      status: "In Progress",
      featured: true,
      startDate: "2024-01-15",
      endDate: "2025-06-30",
      teamSize: 25,
      progress: 45,
      dateAdded: "2024-01-01"
    },
    {
      id: 2,
      title: "Downtown Business Center",
      budget: "$8,500,000",
      location: "New York, NY",
      type: "Commercial",
      status: "Planning",
      featured: false,
      startDate: "2024-03-01",
      endDate: "2025-12-15",
      teamSize: 18,
      progress: 15,
      dateAdded: "2024-01-05"
    },
    {
      id: 3,
      title: "Green Valley Residences",
      budget: "$12,000,000",
      location: "Austin, TX",
      type: "Residential",
      status: "Completed",
      featured: true,
      startDate: "2023-06-01",
      endDate: "2024-01-30",
      teamSize: 22,
      progress: 100,
      dateAdded: "2023-05-15"
    },
    {
      id: 4,
      title: "Tech Campus Expansion",
      budget: "$25,000,000",
      location: "San Francisco, CA",
      type: "Mixed Use",
      status: "In Progress",
      featured: false,
      startDate: "2024-02-01",
      endDate: "2025-11-30",
      teamSize: 35,
      progress: 30,
      dateAdded: "2024-01-20"
    },
    {
      id: 5,
      title: "Heritage Hotel Restoration",
      budget: "$6,200,000",
      location: "Charleston, SC",
      type: "Renovation",
      status: "On Hold",
      featured: false,
      startDate: "2024-04-01",
      endDate: "2024-12-31",
      teamSize: 12,
      progress: 25,
      dateAdded: "2024-01-25"
    }
  ]);

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      budget: "",
      location: "",
      type: "",
      status: "planning",
      description: "",
      imageUrl: "",
      featured: false,
      startDate: "",
      endDate: "",
      teamSize: "",
    },
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: ProjectForm) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { 
              ...p, 
              title: data.title,
              budget: data.budget,
              location: data.location,
              type: data.type,
              status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
              featured: data.featured,
              startDate: data.startDate,
              endDate: data.endDate,
              teamSize: parseInt(data.teamSize)
            }
          : p
      ));
      toast({
        title: "Project Updated",
        description: "The project has been successfully updated.",
      });
    } else {
      const newProject = {
        id: projects.length + 1,
        title: data.title,
        budget: data.budget,
        location: data.location,
        type: data.type,
        status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        featured: data.featured,
        startDate: data.startDate,
        endDate: data.endDate,
        teamSize: parseInt(data.teamSize),
        progress: 0,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Project Added",
        description: "The project has been successfully added.",
      });
    }
    
    form.reset();
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      budget: project.budget,
      location: project.location,
      type: project.type,
      status: project.status.toLowerCase(),
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      featured: project.featured,
      startDate: project.startDate,
      endDate: project.endDate,
      teamSize: project.teamSize.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "The project has been removed.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
    toast({
      title: "Status Updated",
      description: `Project status changed to ${newStatus}.`,
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Planning": return "outline";
      case "On Hold": return "destructive";
      default: return "secondary";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-gray-300";
  };

  console.log("ProjectManagement component rendering", { projects: projects.length });
  
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
                <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
                <p className="text-muted-foreground">Manage all your construction projects in one place</p>
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
                  <Button onClick={() => setEditingProject(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProject 
                        ? "Update the project details below"
                        : "Fill in the details to add a new project"
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
                              <FormLabel>Project Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Luxury Resort Development..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget</FormLabel>
                              <FormControl>
                                <Input placeholder="$15,000,000" {...field} />
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
                                <Input placeholder="Malibu, CA" {...field} />
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
                              <FormLabel>Project Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select project type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Residential">Residential</SelectItem>
                                  <SelectItem value="Commercial">Commercial</SelectItem>
                                  <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                                  <SelectItem value="Resort">Resort</SelectItem>
                                  <SelectItem value="Renovation">Renovation</SelectItem>
                                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                </SelectContent>
                              </Select>
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
                                  <SelectItem value="planning">Planning</SelectItem>
                                  <SelectItem value="in progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="on hold">On Hold</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teamSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Team Size</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="25" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
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
                                placeholder="Enter a detailed description of the project..."
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
                                className="h-4 w-4"
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Featured Project
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingProject ? "Update Project" : "Add Project"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">Active portfolio</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Hammer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.filter(p => p.status === "In Progress").length}
                </div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$66.7M</div>
                <p className="text-xs text-muted-foreground">Combined value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {projects.reduce((total, project) => total + project.teamSize, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Total workforce</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Projects Overview</CardTitle>
              <CardDescription>
                Manage and track all your construction projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {project.featured && <Star className="h-4 w-4 text-yellow-500" />}
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.budget}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.teamSize}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{project.startDate}</div>
                          <div className="text-muted-foreground">to {project.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
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

export default ProjectManagement;