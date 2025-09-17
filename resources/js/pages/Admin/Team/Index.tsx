import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
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
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label }nimport { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { PageProps, TeamMember } from "@/types";

interface TeamIndexProps extends PageProps {
	teamMembers: TeamMember[];
}

export default function TeamIndex({
	auth,
	teamMembers,
}: TeamIndexProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		data,
		setData,
		post,
		put,
		delete: inertiaDelete,
		processing,
		errors,
		reset,
	} = useForm<TeamMember>({
		id: 0,
		name: "",
		title: "",
		photo_url: "",
		bio: "",
	});

	const filteredTeamMembers = teamMembers.filter((member) => {
		return member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		       member.title.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingTeamMember) {
			put(route("admin.teams.update", editingTeamMember.id), {
				onSuccess: () => {
					reset();
					setIsDialogOpen(false);
					setEditingTeamMember(null);
					setData({ id: 0, name: "", title: "", photo_url: "", bio: "" });
				},
			});
		} else {
			post(route("admin.teams.store"), {
				onSuccess: () => {
					reset();
					setData({ id: 0, name: "", title: "", photo_url: "", bio: "" });
					setEditingTeamMember(null);
					setIsDialogOpen(false);
				},
			});
		}
	};

	const handleEdit = (member: TeamMember) => {
		setEditingTeamMember(member);
		setData(member);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		inertiaDelete(route("admin.teams.destroy", id));
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Team Members" />

			<div className="pt-24 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								Team Member Management
							</h1>
							<p className="text-muted-foreground">
								Manage your team members
							</p>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setEditingTeamMember(null);
										reset();
										setIsDialogOpen(true);
									}}
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Team Member
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{editingTeamMember ? "Edit Team Member" : "Add New Team Member"}
									</DialogTitle>
									<DialogDescription>
										{editingTeamMember
											? "Update the team member details below"
											: "Fill in the details to add a new team member"}
									</DialogDescription>
								</DialogHeader>

								<form onSubmit={onSubmit} className="space-y-6">
									<div>
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											placeholder="John Doe"
											value={data.name}
											onChange={(e) => setData("name", e.target.value)}
										/>
										{errors.name && (
											<p className="text-red-500 text-xs mt-1">{errors.name}</p>
										)}
									</div>
									<div>
										<Label htmlFor="title">Title</Label>
										<Input
											id="title"
											placeholder="CEO & Founder"
											value={data.title}
											onChange={(e) => setData("title", e.target.value)}
										/>
										{errors.title && (
											<p className="text-red-500 text-xs mt-1">{errors.title}</p>
										)}
									</div>
									<div>
										<Label htmlFor="photo_url">Photo URL</Label>
										<Input
											id="photo_url"
											placeholder="https://example.com/photo.jpg"
											value={data.photo_url}
											onChange={(e) => setData("photo_url", e.target.value)}
										/>
										{errors.photo_url && (
											<p className="text-red-500 text-xs mt-1">{errors.photo_url}</p>
										)}
									</div>
									<div>
										<Label htmlFor="bio">Bio</Label>
										<Textarea
											id="bio"
											placeholder="A short biography..."
											value={data.bio}
											onChange={(e) => setData("bio", e.target.value)}
										/>
										{errors.bio && (
											<p className="text-red-500 text-xs mt-1">
												{errors.bio}
											</p>
										)}
									</div>

									<DialogFooter>
										<Button
											type="button"
											variant="outline"
											onClick={() => setIsDialogOpen(false)}
										>
											Cancel
										</Button>
										<Button type="submit" disabled={processing}>
											{editingTeamMember ? "Update Team Member" : "Add Team Member"}
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>

					<Card className="mb-6">
						<CardContent className="p-4">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search team members..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Team Members ({filteredTeamMembers.length})</CardTitle>
							<CardDescription>Manage your team members</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Photo</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>Bio</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredTeamMembers.map((member) => (
										<TableRow key={member.id}>
											<TableCell>
												{member.photo_url && (
													<img src={member.photo_url} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
												)}
											</TableCell>
											<TableCell>{member.name}</TableCell>
											<TableCell>{member.title}</TableCell>
											<TableCell>
												{member.bio.length > 100
													? member.bio.slice(0, 100) + "..."
													: member.bio}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(member)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => handleDelete(member.id)}
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
		</AppLayout>
	);
}
