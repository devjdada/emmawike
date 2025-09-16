import { Head, Link, useForm } from "@inertiajs/react";
import {
	Building,
	DollarSign,
	Download,
	Edit,
    Eye,
	Hammer,
	MapPin,
	MoreHorizontal,
	Plus,
	Search,
	Star,
	Trash2,
	Upload,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/layouts/app-layout";
import { truncateText } from "@/lib/utils";
import type { PageProps } from "@/types";

interface Project {
	id: string;
	posted_by_staff_id: string;
	title: string;
	description: string;
	type: string;
	status: string;
	start_date: string;
	end_date: string;
	image_url: string | null;
	budget: number | null;
	location: string | null;
	team_size: number | null;
	progress: number | null;
	date_added: string | null;
	is_featured: boolean;
}

interface ProjectsIndexProps extends PageProps {
	projects: Project[];
}

export default function ProjectsIndex({
	auth,
	projects: initialProjects,
}: ProjectsIndexProps) {
	const { toast } = useToast();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string | null>(null);

	const { delete: inertiaDelete } = useForm();

	const filteredProjects = initialProjects.filter((project) => {
		const matchesSearch =
			searchTerm === "" ||
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(project.location &&
				project.location.toLowerCase().includes(searchTerm.toLowerCase()));

		const matchesStatus =
			statusFilter === null ||
			statusFilter === "all" ||
			project.status.toLowerCase() === statusFilter.toLowerCase();

		return matchesSearch && matchesStatus;
	});

	const getStatusVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case "planning":
				return "secondary";
			case "in progress":
				return "default";
			case "completed":
				return "success"; // Assuming a 'success' variant exists or can be added
			case "on hold":
				return "warning"; // Assuming a 'warning' variant exists or can be added
			default:
				return "outline";
		}
	};

	const getProgressColor = (progress: number | null) => {
		if (progress === null) return "bg-gray-400";
		if (progress < 25) return "bg-red-500";
		if (progress < 75) return "bg-yellow-500";
		return "bg-green-500";
	};

	const handleEdit = (project: Project) => {
		// Implement navigation to edit page
		console.log("Edit project:", project.id);
		window.location.href = route("admin.projects.edit", project.id);
	};

	const handleDelete = (id: string) => {
		setSelectedProject(initialProjects.find((p) => p.id === id) || null);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (selectedProject) {
			inertiaDelete(route("admin.projects.destroy", selectedProject.id), {
				onSuccess: () => {
					toast({
						title: "Project Deleted",
						description: "The project has been removed from the listings.",
					});
					setIsDeleteDialogOpen(false);
				},
				onError: (e) => {
					console.error(e);
					toast({
						title: "Error",
						description: "Failed to delete project.",
						variant: "destructive",
					});
				},
			});
		}
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Projects" />

			<div className="pt-24 pb-8">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-8 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div>
								<h1 className="text-3xl font-bold text-foreground">
									Project Management
								</h1>
								<p className="text-muted-foreground">
									Manage all your construction projects in one place
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline">
								<Download className="mr-2 h-4 w-4" />
								Export
							</Button>
							<Button variant="outline">
								<Upload className="mr-2 h-4 w-4" />
								Import
							</Button>
							<Button asChild>
								<Link href={route("admin.projects.create")}>
									<Plus className="mr-2 h-4 w-4" />
									Add Project
								</Link>
							</Button>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Projects
								</CardTitle>
								<Building className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{filteredProjects.length}
								</div>
								<p className="text-xs text-muted-foreground">
									Active portfolio
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									In Progress
								</CardTitle>
								<Hammer className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{
										filteredProjects.filter((p) => p.status === "in progress")
											.length
									}
								</div>
								<p className="text-xs text-muted-foreground">
									Currently active
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Budget
								</CardTitle>
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									$
									{filteredProjects
										.reduce(
											(total, project) => total + (project.budget || 0),
											0,
										)
										.toLocaleString()}
								</div>
								<p className="text-xs text-muted-foreground">Combined value</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Team Members
								</CardTitle>
								<Users className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{filteredProjects.reduce(
										(total, project) => total + (project.team_size || 0),
										0,
									)}
								</div>
								<p className="text-xs text-muted-foreground">Total workforce</p>
							</CardContent>
						</Card>
					</div>

					{/* Filters and Search */}
					<div className="mb-6 flex flex-col gap-4 sm:flex-row">
						<div className="relative flex-1">
							<Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search projects..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select
							value={statusFilter || "all"}
							onValueChange={(value) =>
								setStatusFilter(value === "all" ? null : value)
							}
						>
							<SelectTrigger className="w-full sm:w-[200px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Statuses</SelectItem>
								<SelectItem value="planning">Planning</SelectItem>
								<SelectItem value="in progress">In Progress</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="on hold">On Hold</SelectItem>
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
													{project.is_featured && (
														<Star className="h-4 w-4 text-yellow-500" />
													)}
													<div>
														<div className="font-medium">
															{truncateText(project.title, 30)}
														</div>
														<div className="flex items-center gap-1 text-sm text-muted-foreground">
															<MapPin className="h-3 w-3" />
															{truncateText(project.location || "N/A", 35)}
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
											<TableCell>
												${(project.budget || 0).toLocaleString()}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<div className="h-2 w-16 rounded-full bg-gray-200">
														<div
															className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
															style={{ width: `${project.progress || 0}%` }}
														/>
													</div>
													<span className="text-sm">
														{project.progress || 0}%
													</span>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-1">
													<Users className="h-3 w-3" />
													{project.team_size || "N/A"}
												</div>
											</TableCell>
											<TableCell>
												<div className="text-sm">
													<div>{project.start_date || "N/A"}</div>
													<div className="text-muted-foreground">
														to {project.end_date || "N/A"}
													</div>
												</div>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" className="h-8 w-8 p-0">
															<span className="sr-only">Open menu</span>
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem
															onClick={() => handleEdit(project)}
														>
															<Edit className="mr-2 h-4 w-4" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link href={route("admin.projects.show", project.id)}>
																<Eye className="mr-2 h-4 w-4" />
																View
															</Link>
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															onClick={() => handleDelete(project.id)}
															className="text-destructive focus:text-destructive"
														>
															<Trash2 className="mr-2 h-4 w-4" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete the
							project "{selectedProject?.title}".
						</DialogDescription>
					</DialogHeader>
					<div className="flex justify-end space-x-2">
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
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
