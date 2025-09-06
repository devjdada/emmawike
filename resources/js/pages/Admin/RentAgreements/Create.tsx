import { Head, useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";
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

export default function CreateRentAgreement({ auth }: PageProps) {
	const { toast } = useToast();
	const { data, setData, post, processing, errors, reset } = useForm({
		tenant_id: "",
		property_id: "",
		start_date: "",
		end_date: "",
		monthly_rent: "",
		deposit: "",
		agreement_pdf_url: "",
		status: "active",
		is_renewed: false,
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("admin.rent-agreements.store"), {
			onSuccess: () => {
				toast({
					title: "Agreement Added",
					description: "The rent agreement has been successfully added.",
				});
				reset();
			},
			onError: () => {
				toast({
					title: "Error",
					description: "Failed to add agreement.",
					variant: "destructive",
				});
			},
		});
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Create Rent Agreement" />

			<div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
				<h1 className="mb-6 text-2xl font-semibold">
					Create New Rent Agreement
				</h1>

				<form onSubmit={submit} className="space-y-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<Label htmlFor="tenant_id">Tenant ID</Label>
							<Input
								id="tenant_id"
								type="number"
								name="tenant_id"
								value={data.tenant_id}
								className="mt-1 block w-full"
								onChange={(e) => setData("tenant_id", parseInt(e.target.value))}
								required
							/>
							<InputError message={errors.tenant_id} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="property_id">Property ID</Label>
							<Input
								id="property_id"
								type="number"
								name="property_id"
								value={data.property_id}
								className="mt-1 block w-full"
								onChange={(e) =>
									setData("property_id", parseInt(e.target.value))
								}
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
								required
							/>
							<InputError message={errors.end_date} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="monthly_rent">Monthly Rent</Label>
							<Input
								id="monthly_rent"
								type="number"
								name="monthly_rent"
								value={data.monthly_rent}
								className="mt-1 block w-full"
								onChange={(e) =>
									setData("monthly_rent", parseFloat(e.target.value))
								}
								required
							/>
							<InputError message={errors.monthly_rent} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="deposit">Deposit</Label>
							<Input
								id="deposit"
								type="number"
								name="deposit"
								value={data.deposit}
								className="mt-1 block w-full"
								onChange={(e) => setData("deposit", parseFloat(e.target.value))}
								required
							/>
							<InputError message={errors.deposit} className="mt-2" />
						</div>

						<div>
							<Label htmlFor="agreement_pdf_url">
								Agreement PDF URL (Optional)
							</Label>
							<Input
								id="agreement_pdf_url"
								type="url"
								name="agreement_pdf_url"
								value={data.agreement_pdf_url}
								className="mt-1 block w-full"
								onChange={(e) => setData("agreement_pdf_url", e.target.value)}
							/>
							<InputError message={errors.agreement_pdf_url} className="mt-2" />
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
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
									<SelectItem value="expired">Expired</SelectItem>
								</SelectContent>
							</Select>
							<InputError message={errors.status} className="mt-2" />
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="is_renewed"
								checked={data.is_renewed}
								onChange={(e) => setData("is_renewed", e.target.checked)}
								className="h-4 w-4 rounded border border-input"
							/>
							<Label htmlFor="is_renewed">Is Renewed?</Label>
							<InputError message={errors.is_renewed} className="mt-2" />
						</div>
					</div>

					<Button type="submit" disabled={processing}>
						Create Agreement
					</Button>
				</form>
			</div>
		</AppLayout>
	);
}
