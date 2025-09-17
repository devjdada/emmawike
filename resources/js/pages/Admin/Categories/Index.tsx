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
import type { PageProps } from "@/types";

interface Category {
	id: number;
	name: string;
	description: string;
}

interface CategoriesIndexProps extends PageProps {
	categories: Category[];
}

export default function CategoriesIndex({
	auth,
	categories,
}: CategoriesIndexProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
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
	} = useForm<Category>({
		id: 0,
		name: "",
		description: "",
	});

	const filteredCategories = categories.filter((category) => {
		return category.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingCategory) {
			put(route("admin.categories.update", editingCategory.id), {
				onSuccess: () => {
					reset();
					setIsDialogOpen(false);
					setEditingCategory(null);
					setData({ id: 0, name: "", description: "" });
				},
			});
		} else {
			post(route("admin.categories.store"), {
				onSuccess: () => {
					reset();
					setData({ id: 0, name: "", description: "" });
					setEditingCategory(null);
					setIsDialogOpen(false);
				},
			});
		}
	};

	const handleEdit = (category: Category) => {
		setEditingCategory(category);
		setData(category);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		inertiaDelete(route("admin.categories.destroy", id));
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Categories" />

			<div className="pt-24 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								Category Management
							</h1>
							<p className="text-muted-foreground">
								Manage all your categories
							</p>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setEditingCategory(null);
										reset();
										setIsDialogOpen(true);
									}}
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Category
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{editingCategory ? "Edit Category" : "Add New Category"}
									</DialogTitle>
									<DialogDescription>
										{editingCategory
											? "Update the category details below"
											: "Fill in the details to add a new category"}
									</DialogDescription>
								</DialogHeader>

								<form onSubmit={onSubmit} className="space-y-6">
									<div>
										<Label htmlFor="name">Category Name</Label>
										<Input
											id="name"
											placeholder="e.g. Real Estate"
											value={data.name}
											onChange={(e) => setData("name", e.target.value)}
										/>
										{errors.name && (
											<p className="text-red-500 text-xs mt-1">{errors.name}</p>
										)}
									</div>
									<div>
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											placeholder="A short description..."
											value={data.description}
											onChange={(e) => setData("description", e.target.value)}
										/>
										{errors.description && (
											<p className="text-red-500 text-xs mt-1">
												{errors.description}
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
											{editingCategory ? "Update Category" : "Add Category"}
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
									placeholder="Search categories..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Categories ({filteredCategories.length})</CardTitle>
							<CardDescription>Manage your categories</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Description</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredCategories.map((category) => (
										<TableRow key={category.id}>
											<TableCell>{category.name}</TableCell>
											<TableCell>
												{category.description.length > 100
													? category.description.slice(0, 100) + "..."
													: category.description}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEdit(category)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => handleDelete(category.id)}
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
