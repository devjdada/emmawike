import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompensationData {
	id?: string;
	notes: string;
	total_value: number;
	status: "pending" | "approved" | "rejected" | "completed";
	name: string;
	phone: string;
	email: string;
	code: string;
}

interface CreateEditCompensationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	editingCompensation?: CompensationData | null;
}

export default function CreateEditCompensationModal({
	open,
	onOpenChange,
	editingCompensation,
}: CreateEditCompensationModalProps) {
	const { data, setData, post, put, processing, errors, reset } = useForm<CompensationData>({
		notes: "",
		total_value: 0,
		status: "pending",
		name: "",
		phone: "",
		email: "",
		code: "",
	});

	const { toast } = useToast();

	useEffect(() => {
		if (editingCompensation) {
			setData(editingCompensation);
		} else {
			reset();
		}
	}, [editingCompensation, open]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (editingCompensation) {
			put(route("admin.compensations.update", editingCompensation.id), {
				onSuccess: () => {
					toast({ title: "Success", description: "Compensation updated successfully." });
					onOpenChange(false);
					reset();
				},
				onError: (err) => {
					console.error(err);
					toast({ title: "Error", description: "Failed to update compensation.", variant: "destructive" });
				},
			});
		} else {
			post(route("admin.compensations.store"), {
				onSuccess: () => {
					toast({ title: "Success", description: "Compensation created successfully." });
					onOpenChange(false);
					reset();
				},
				onError: (err) => {
					console.error(err);
					toast({ title: "Error", description: "Failed to create compensation.", variant: "destructive" });
				},
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{editingCompensation ? "Edit Compensation" : "Add New Compensation"}</DialogTitle>
					<DialogDescription>
						{editingCompensation
							? "Make changes to the compensation record here." 
							: "Fill in the details to create a new compensation record."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={data.name}
							onChange={(e) => setData("name", e.target.value)}
							className="col-span-3"
						/>
						{errors.name && <p className="col-span-4 text-right text-red-500 text-xs">{errors.name}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							value={data.email}
							onChange={(e) => setData("email", e.target.value)}
							className="col-span-3"
						/>
						{errors.email && <p className="col-span-4 text-right text-red-500 text-xs">{errors.email}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="phone" className="text-right">
							Phone
						</Label>
						<Input
							id="phone"
							value={data.phone}
							onChange={(e) => setData("phone", e.target.value)}
							className="col-span-3"
						/>
						{errors.phone && <p className="col-span-4 text-right text-red-500 text-xs">{errors.phone}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="code" className="text-right">
							Code
						</Label>
						<Input
							id="code"
							value={data.code}
							onChange={(e) => setData("code", e.target.value)}
							className="col-span-3"
						/>
						{errors.code && <p className="col-span-4 text-right text-red-500 text-xs">{errors.code}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="total_value" className="text-right">
							Total Value
						</Label>
						<Input
							id="total_value"
							type="number"
							value={data.total_value}
							onChange={(e) => setData("total_value", parseFloat(e.target.value))}
							className="col-span-3"
						/>
						{errors.total_value && <p className="col-span-4 text-right text-red-500 text-xs">{errors.total_value}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="status" className="text-right">
							Status
						</Label>
						<Select
							onValueChange={(value) => setData("status", value as "pending" | "approved" | "rejected" | "completed")}
							value={data.status}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
							</SelectContent>
						</Select>
						{errors.status && <p className="col-span-4 text-right text-red-500 text-xs">{errors.status}</p>}
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="notes" className="text-right">
							Notes
						</Label>
						<Textarea
							id="notes"
							value={data.notes}
							onChange={(e) => setData("notes", e.target.value)}
							className="col-span-3"
						/>
						{errors.notes && <p className="col-span-4 text-right text-red-500 text-xs">{errors.notes}</p>}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={processing}>
							{editingCompensation ? "Save Changes" : "Create Compensation"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}