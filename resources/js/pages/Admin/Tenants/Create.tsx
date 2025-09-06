import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import type { PageProps } from "@/types";

export default function CreateTenant({ auth }: PageProps) {
	const { data, setData, post, processing, errors, reset } = useForm({
		user_id: "",
		property_id: "",
		start_date: "",
		end_date: "",
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("admin.tenants.store"));
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Create Tenant" />

			<div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
				<h1 className="mb-6 text-2xl font-semibold">Create New Tenant</h1>

				<form onSubmit={submit} className="space-y-6">
					<div>
						<Label htmlFor="user_id">User ID</Label>
						<Input
							id="user_id"
							type="number"
							name="user_id"
							value={data.user_id}
							className="mt-1 block w-full"
							onChange={(e) => setData("user_id", parseInt(e.target.value))}
							required
						/>
						<InputError message={errors.user_id} className="mt-2" />
					</div>

					<div>
						<Label htmlFor="property_id">Property ID</Label>
						<Input
							id="property_id"
							type="number"
							name="property_id"
							value={data.property_id}
							className="mt-1 block w-full"
							onChange={(e) => setData("property_id", parseInt(e.target.value))}
							required
						/>
						<InputError message={errors.property_id} className="mt-2" />
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
							required
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

					<Button type="submit" disabled={processing}>
						Create Tenant
					</Button>
				</form>
			</div>
		</AppLayout>
	);
}
