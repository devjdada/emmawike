import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import type { PageProps } from "@/types";

interface Agency {
	id: number;
	name: string;
	description: string;
	logo_url: string;
}

interface AgenciesIndexProps extends PageProps {
	agencies: Agency[];
}

export default function AgenciesIndex({ auth, agencies }: AgenciesIndexProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

	const handleDeleteClick = (agency: Agency) => {
		setSelectedAgency(agency);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (selectedAgency) {
			// Implement actual delete logic here
			console.log("Deleting agency:", selectedAgency.id);
			setIsDeleteDialogOpen(false);
		}
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Agencies" />

			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Agencies</h1>
				<Button asChild>
					<Link href={route("admin.agencies.create")}>Add New Agency</Link>
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{agencies.map((agency) => (
						<TableRow key={agency.id}>
							<TableCell>{agency.name}</TableCell>
							<TableCell>{agency.description}</TableCell>
							<TableCell>
								<Button variant="outline" size="sm" className="mr-2">
									Edit
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => handleDeleteClick(agency)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete the
							agency "{selectedAgency?.name}".
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
