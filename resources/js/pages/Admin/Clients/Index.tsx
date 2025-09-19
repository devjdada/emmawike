import { Head, Link, useForm } from "@inertiajs/react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import type { Client, PageProps } from "@/types";

interface ClientsIndexProps extends PageProps {
	clients: Client[];
}

export default function ClientsIndex({ auth, clients }: ClientsIndexProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [editingClient, setEditingClient] = useState<Client | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	const { data, setData, post, put, delete: inertiaDelete, processing, errors, reset } = useForm<{
		id: number;
		name: string;
		logo_url: string | File | null;
		website_url: string;
	}>({ // Updated type for logo_url
		id: 0,
		name: "",
		logo_url: "",
		website_url: "",
	});

	const filteredClients = clients.filter((client) => {
		return client.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSelectedFile(file);
			setImagePreviewUrl(URL.createObjectURL(file));
			setData("logo_url", ""); // Explicitly clear logo_url when file is selected
		} else {
			setSelectedFile(null);
			setImagePreviewUrl(null);
			setData("logo_url", editingClient?.logo_url || ""); // Revert to existing URL or empty
		}
	};

	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData("logo_url", e.target.value);
		setImagePreviewUrl(e.target.value); // Update preview with URL
		setSelectedFile(null); // Clear selected file if URL is typed
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("website_url", data.website_url);

		if (selectedFile) {
			formData.append("logo_file", selectedFile); // Append the file
		} else if (typeof data.logo_url === "string" && data.logo_url) {
			formData.append("logo_url", data.logo_url); // Append the URL
		}

		if (editingClient) {
			// For PUT requests with FormData, you might need to manually set _method
			formData.append("_method", "PUT");
			post(route("admin.clients.update", editingClient.id), formData, {
				onSuccess: () => {
					reset();
					setIsDialogOpen(false);
					setEditingClient(null);
					setSelectedFile(null);
					setImagePreviewUrl(null);
					setData({ id: 0, name: "", logo_url: "", website_url: "" });
				},
			});
		} else {
			post(route("admin.clients.store"), formData, {
				onSuccess: () => {
					reset();
					setData({ id: 0, name: "", logo_url: "", website_url: "" });
					setEditingClient(null);
					setSelectedFile(null);
					setImagePreviewUrl(null);
					setIsDialogOpen(false);
				},
			});
		}
	};

	const handleEdit = (client: Client) => {
		setEditingClient(client);
		setData({ ...client, logo_url: client.logo_url || "" }); // Ensure logo_url is string
		setImagePreviewUrl(client.logo_url || null); // Set preview for existing image
		setSelectedFile(null); // Clear any previously selected file
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		inertiaDelete(route("admin.clients.destroy", id));
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Clients" />

			<div className="pt-24 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								Client Management
							</h1>
							<p className="text-muted-foreground">Manage your clients</p>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setEditingClient(null);
										reset();
										setSelectedFile(null);
										setImagePreviewUrl(null);
										setIsDialogOpen(true);
									}}
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Client
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{editingClient ? "Edit Client" : "Add New Client"}
									</DialogTitle>
									<DialogDescription>
										{editingClient
											? "Update the client details below"
											: "Fill in the details to add a new client"}
									</DialogDescription>
								</DialogHeader>

								<form onSubmit={onSubmit} className="space-y-6">
									<div>
										<Label htmlFor="name">Client Name</Label>
										<Input
											id="name"
											placeholder="ABC Corp"
											value={data.name}
											onChange={(e) => setData("name", e.target.value)}
										/>
										{errors.name && (
											<p className="text-red-500 text-xs mt-1">{errors.name}</p>
										)}
									</div>
									<div>
										<Label htmlFor="logo_url">Logo URL</Label>
										<Input
											id="logo_url"
											type="text"
											placeholder="https://example.com/logo.png"
											value={typeof data.logo_url === 'string' ? data.logo_url : ''}
											onChange={handleUrlChange}
										/>
										{errors.logo_url && (
											<p className="text-red-500 text-xs mt-1">
												{errors.logo_url}
											</p>
										)}
										<Label htmlFor="logo_file" className="mt-4 block">Or Upload Logo</Label>
										<Input
											id="logo_file"
											type="file"
											onChange={handleFileChange}
										/>
										{imagePreviewUrl && (
											<div className="mt-4">
												<img src={imagePreviewUrl} alt="Logo Preview" className="max-w-full h-auto max-h-32 object-contain" />
											</div>
										)}
									</div>
									<div>
										<Label htmlFor="website_url">Website URL</Label>
										<Input
											id="website_url"
											placeholder="https://example.com"
											value={data.website_url}
											onChange={(e) => setData("website_url", e.target.value)}
										/>
										{errors.website_url && (
											<p className="text-red-500 text-xs mt-1">
												{errors.website_url}
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
											{editingClient ? "Update Client" : "Add Client"}
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
									placeholder="Search clients..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Clients ({filteredClients.length})</CardTitle>
							<CardDescription>Manage your clients</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Logo</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Website</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredClients.map((client) => (
										<TableRow key={client.id}>
											<TableCell>
												{client.logo_url && (
													<img
														src={client.logo_url}
														alt={client.name}
														className="h-10 w-10 object-contain"
													/>
												)}
											</TableCell>
											<TableCell>{client.name}</TableCell>
											<TableCell>
												{client.website_url ? (
													<a
														href={client.website_url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-blue-500 hover:underline"
													>
														{client.website_url}
													</a>
												) : (
													"N/A"
												)}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(client)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => handleDelete(client.id)}
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