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
import type { PageProps, Testimonial } from "@/types";

interface TestimonialsIndexProps extends PageProps {
	testimonials: Testimonial[];
}

export default function TestimonialsIndex({
	auth,
	testimonials,
}: TestimonialsIndexProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	const { data, setData, post, put, delete: inertiaDelete, processing, errors, reset } = useForm<{
		id: number;
		author_name: string;
		author_title: string;
		content: string;
		photo_url: string | File | null;
	}>({ // Updated type for photo_url
		id: 0,
		author_name: "",
		author_title: "",
		content: "",
		photo_url: "",
	});

	const filteredTestimonials = testimonials.filter((testimonial) => {
		return testimonial.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		       testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSelectedFile(file);
			setImagePreviewUrl(URL.createObjectURL(file));
			setData("photo_url", ""); // Explicitly clear photo_url when file is selected
		} else {
			setSelectedFile(null);
			setImagePreviewUrl(null);
			setData("photo_url", editingTestimonial?.photo_url || ""); // Revert to existing URL or empty
		}
	};

	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData("photo_url", e.target.value);
		setImagePreviewUrl(e.target.value); // Update preview with URL
		setSelectedFile(null); // Clear selected file if URL is typed
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("author_name", data.author_name);
		formData.append("author_title", data.author_title);
		formData.append("content", data.content);

		if (selectedFile) {
			formData.append("photo_file", selectedFile); // Append the file
		} else if (typeof data.photo_url === "string" && data.photo_url) {
			formData.append("photo_url", data.photo_url); // Append the URL
		}

		if (editingTestimonial) {
			// For PUT requests with FormData, you might need to manually set _method
			formData.append("_method", "PUT");
			post(route("admin.testimonials.update", editingTestimonial.id), formData, {
				onSuccess: () => {
					reset();
					setIsDialogOpen(false);
					setEditingTestimonial(null);
					setSelectedFile(null);
					setImagePreviewUrl(null);
					setData({ id: 0, author_name: "", author_title: "", content: "", photo_url: "" });
				},
			});
		} else {
			post(route("admin.testimonials.store"), formData, {
				onSuccess: () => {
					reset();
					setData({ id: 0, author_name: "", author_title: "", content: "", photo_url: "" });
					setEditingTestimonial(null);
					setSelectedFile(null);
					setImagePreviewUrl(null);
					setIsDialogOpen(false);
				},
			});
		}
	};

	const handleEdit = (testimonial: Testimonial) => {
		setEditingTestimonial(testimonial);
		setData({ ...testimonial, photo_url: testimonial.photo_url || "" }); // Ensure photo_url is string
		setImagePreviewUrl(testimonial.photo_url || null); // Set preview for existing image
		setSelectedFile(null); // Clear any previously selected file
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		inertiaDelete(route("admin.testimonials.destroy", id));
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Testimonials" />

			<div className="pt-24 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								Testimonial Management
							</h1>
							<p className="text-muted-foreground">
								Manage your testimonials
							</p>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setEditingTestimonial(null);
										reset();
										setIsDialogOpen(true);
									}}
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Testimonial
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
									</DialogTitle>
									<DialogDescription>
										{editingTestimonial
											? "Update the testimonial details below"
											: "Fill in the details to add a new testimonial"}
									</DialogDescription>
								</DialogHeader>

								<form onSubmit={onSubmit} className="space-y-6">
									<div>
										<Label htmlFor="author_name">Author Name</Label>
										<Input
											id="author_name"
											placeholder="John Doe"
											value={data.author_name}
											onChange={(e) => setData("author_name", e.target.value)}
										/>
										{errors.author_name && (
											<p className="text-red-500 text-xs mt-1">{errors.author_name}</p>
										)}
									</div>
									<div>
										<Label htmlFor="author_title">Author Title</Label>
										<Input
											id="author_title"
											placeholder="CEO & Founder"
											value={data.author_title}
											onChange={(e) => setData("author_title", e.target.value)}
										/>
										{errors.author_title && (
											<p className="text-red-500 text-xs mt-1">{errors.author_title}</p>
										)}
									</div>
									<div>
										<Label htmlFor="photo_url">Photo URL</Label>
										<Input
											id="photo_url"
											type="text"
											placeholder="https://example.com/photo.jpg"
											value={typeof data.photo_url === 'string' ? data.photo_url : ''}
											onChange={handleUrlChange}
										/>
										{errors.photo_url && (
											<p className="text-red-500 text-xs mt-1">{errors.photo_url}</p>
										)}
										<Label htmlFor="photo_file" className="mt-4 block">Or Upload Photo</Label>
										<Input
											id="photo_file"
											type="file"
											onChange={handleFileChange}
										/>
										{imagePreviewUrl && (
											<div className="mt-4">
												<img src={imagePreviewUrl} alt="Photo Preview" className="max-w-full h-auto max-h-32 object-cover" />
											</div>
										)}
									</div>
									<div>
										<Label htmlFor="content">Content</Label>
										<Textarea
											id="content"
											placeholder="Testimonial content..."
											value={data.content}
											onChange={(e) => setData("content", e.target.value)}
										/>
										{errors.content && (
											<p className="text-red-500 text-xs mt-1">
												{errors.content}
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
											{editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
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
									placeholder="Search testimonials..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Testimonials ({filteredTestimonials.length})</CardTitle>
							<CardDescription>Manage your testimonials</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Photo</TableHead>
										<TableHead>Author</TableHead>
										<TableHead>Title</TableHead>
										<TableHead>Content</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredTestimonials.map((testimonial) => (
										<TableRow key={testimonial.id}>
											<TableCell>
												{testimonial.photo_url && (
													<img src={testimonial.photo_url} alt={testimonial.author_name} className="h-10 w-10 rounded-full object-cover" />
												)}
											</TableCell>
											<TableCell>{testimonial.author_name}</TableCell>
											<TableCell>{testimonial.author_title}</TableCell>
											<TableCell>
												{testimonial.content.length > 100
													? testimonial.content.slice(0, 100) + "..."
													: testimonial.content}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(testimonial)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => handleDelete(testimonial.id)}
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