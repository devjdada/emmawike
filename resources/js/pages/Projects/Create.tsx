import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import SimpleEditor from "@/components/SimpleEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/layouts/app-layout";
import type { PageProps } from "@/types";

export default function CreateProject({ auth }: PageProps) {
	const { toast } = useToast();
	const { data, setData, post, processing, errors, reset } = useForm({
		posted_by_staff_id: auth.user.id,
		title: "",
		description: "<p></p>",
		type: "",
		status: "planning",
		start_date: "",
		end_date: "",
		image_url: "",
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("projects.store"), {
			onSuccess: () => {
				toast({
					title: "Project Added",
					description: "The project has been successfully added.",
				});
				reset();
			},
			onError: () => {
				toast({
					title: "Error",
					description: "Failed to add project.",
					variant: "destructive",
				});
			},
		});
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Create Project" />

			<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
				<h1 className="text-2xl font-semibold mb-6">Create New Project</h1>

				<form onSubmit={submit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="title">Project Title</Label>
							<Input
								id="title"
								type="text"
								name="title"
								value={data.title}
								className="mt-1 block w-full"
								autoComplete="title"
								onChange={(e) => setData("title", e.target.value)}
								required
							/>
							<InputError message={errors.title} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="type">Project Type</Label>
							<Input
								id="type"
								type="text"
								name="type"
								value={data.type}
								className="mt-1 block w-full"
								onChange={(e) => setData("type", e.target.value)}
							/>
							<InputError message={errors.type} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="status">Status</Label>
							<Select
								onValueChange={(value) => setData("status", value)}
								value={data.status}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="planning">Planning</SelectItem>
									<SelectItem value="in_progress">In Progress</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="cancelled">Cancelled</SelectItem>
								</SelectContent>
							</Select>
							<InputError message={errors.status} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="start_date">Start Date</Label>
							<Input
								id="start_date"
								type="date"
								name="start_date"
								value={data.start_date}
								className="mt-1 block w-full"
								onChange={(e) => setData("start_date", e.target.value)}
							/>
							<InputError message={errors.start_date} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="end_date">End Date</Label>
							<Input
								id="end_date"
								type="date"
								name="end_date"
								value={data.end_date}
								className="mt-1 block w-full"
								onChange={(e) => setData("end_date", e.target.value)}
							/>
							<InputError message={errors.end_date} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="image_url">Image URL</Label>
							<Input
								id="image_url"
								type="url"
								name="image_url"
								value={data.image_url}
								className="mt-1 block w-full"
								autoComplete="image_url"
								onChange={(e) => setData("image_url", e.target.value)}
							/>
							<InputError message={errors.image_url} className="mt-2" />
						</div>
					</div>

					<div>
						<Label htmlFor="description">Description</Label>
						<SimpleEditor
							content={data.description}
							onChange={(newContent) => setData("description", newContent)}
						/>
						<InputError message={errors.description} className="mt-2" />
					</div>

					<Button type="submit" disabled={processing}>
						Create Project
					</Button>
				</form>
			</div>
		</AppLayout>
	);
}
