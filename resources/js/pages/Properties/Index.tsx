import { type CheckedState } from "@radix-ui/react-checkbox";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
	ArrowLeft,
	Bath,
	Bed,
	DollarSign,
	Download,
	Edit,
	MapPin,
	Plus,
	Search,
	Square,
	Star,
	Trash2,
	Upload,
    View,
    ImagePlus,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { PageProps } from "@/types";
import jsPDF from "jspdf";
import "jspdf-autotable";
import MediaUploadModal from "@/components/media-upload-modal";

interface Media {
    id: number;
    path: string;
    type: 'image' | 'video';
    label: string;
}

interface Property {
	id: string;
	owner_id: number;
	title: string;
	description: string;
	type: string;
	price: number;
	currency: string;
	address_line1: string;
	address_line2: string | null;
	city: string;
	state: string;
	country: string;
	zip_code: string | null;
	latitude: number | null;
	longitude: number | null;
	bedrooms: number | null;
	bathrooms: number | null;
	area_sq_ft: number | null;
	status: string;
	is_featured: boolean;
    media: Media[];
}

interface PropertiesIndexProps extends PageProps {
	properties: Property[];
}

export default function PropertiesIndex({
	auth,
	properties: initialProperties,
}: PropertiesIndexProps) {
	const { toast } = useToast();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);

	const { delete: inertiaDelete } = useForm();

	const truncateAddress = (address: string, maxLength = 30) => {
		if (address.length <= maxLength) {
			return address;
		}
		return address.substring(0, maxLength) + "...";
	};

	const filteredProperties = initialProperties.filter((property) => {
		const matchesSearch =
			property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address_line1.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.country.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" ||
			property.status.toLowerCase() === statusFilter.toLowerCase();
		return matchesSearch && matchesStatus;
	});

	const handleSelectAll = (checked: CheckedState) => {
		if (checked === true) {
			setSelectedProperties(filteredProperties.map((p) => p.id));
		} else {
			setSelectedProperties([]);
		}
	};

	const handleSelect = (id: string, checked: boolean) => {
		if (checked) {
			setSelectedProperties([...selectedProperties, id]);
		} else {
			setSelectedProperties(selectedProperties.filter((pId) => pId !== id));
		}
	};

	const handleExport = () => {
		const doc = new jsPDF();
		const tableData = selectedProperties.map(id => {
            const property = initialProperties.find(p => p.id === id);
            return [
                property?.title,
                `${property?.address_line1}, ${property?.city}`,
                `${property?.currency} ${property?.price.toLocaleString()}`,
                property?.status,
            ];
        });

        (doc as any).autoTable({
            head: [['Title', 'Address', 'Price', 'Status']],
            body: tableData,
        });

		doc.save("properties.pdf");
	};

    const handleAddMediaClick = (propertyId: string) => {
        setCurrentPropertyId(propertyId);
        setIsMediaModalOpen(true);
    };

    const handleMediaUpload = (files: File[], label: string) => {
        if (!currentPropertyId) return;

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`media[${index}][file]`, file);
            formData.append(`media[${index}][label]`, label);
        });

        router.post(route('properties.addMedia', currentPropertyId), formData, {
            onSuccess: () => {
                toast({ title: "Media Uploaded", description: "Media files have been successfully uploaded." });
                setIsMediaModalOpen(false);
                setCurrentPropertyId(null);
            },
            onError: (e) => {
                console.error(e);
                toast({ title: "Error", description: "Failed to upload media.", variant: "destructive" });
            },
        });
    };

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this property?")) {
			inertiaDelete(route("properties.destroy", id), {
				onSuccess: () => {
					toast({
						title: "Property Deleted",
						description: "The property has been removed from the listings.",
					});
				},
				onError: () => {
					toast({
						title: "Error",
						description: "Failed to delete property.",
						variant: "destructive",
					});
				},
			});
		}
	};

	const handleStatusChange = (id: string, newStatus: string) => {
		router.put(
			route("properties.updateStatus", id),
			{ status: newStatus },
			{
				preserveState: true,
				preserveScroll: true,
				onSuccess: () => {
					toast({
						title: "Status Updated",
						description: `Property status changed to ${newStatus}.`,
					});
				},
				onError: () => {
					toast({
						title: "Error",
						description: "Failed to update status.",
						variant: "destructive",
					});
				},
			},
		);
	};

	const getStatusVariant = (status: string) => {
		switch (status) {
			case "published":
				return "default";
			case "available":
				return "default";
			case "draft":
				return "secondary";
			case "archived":
				return "destructive";
			default:
				return "secondary";
		}
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Properties" />

			<div className="pt-24 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<div>
								<h1 className="text-3xl font-bold text-foreground">
									Property Management
								</h1>
								<p className="text-muted-foreground">
									Manage all your property listings in one place
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" onClick={handleExport} disabled={selectedProperties.length === 0}>
								<Download className="h-4 w-4 mr-2" />
								Export
							</Button>
							<Button variant="outline">
								<Upload className="h-4 w-4 mr-2" />
								Import
							</Button>
							<Button asChild>
								<Link href={route("properties.create")}>
									<Plus className="h-4 w-4 mr-2" />
									Add Property
								</Link>
							</Button>
						</div>
					</div>

					{/* Filters */}
					<div className="mb-6">
						<div className="p-4">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search properties..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger className="w-full sm:w-[180px]">
										<SelectValue placeholder="Filter by status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Status</SelectItem>
										<SelectItem value="published">Published</SelectItem>
										<SelectItem value="available">Available</SelectItem>
										<SelectItem value="draft">Draft</SelectItem>
										<SelectItem value="archived">Archived</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					{/* Properties Table */}
					<div>
						<div className="p-4">
							<h2 className="text-xl font-semibold">
								Properties ({filteredProperties.length})
							</h2>
							<p className="text-muted-foreground">
								Manage your property listings, track performance, and update
								details
							</p>
						</div>
						<div>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[40px]">
											<Checkbox
												checked={
													selectedProperties.length === filteredProperties.length && filteredProperties.length > 0
														? true
														: selectedProperties.length > 0
														? 'indeterminate'
														: false
												}
												onCheckedChange={handleSelectAll}
											/>
										</TableHead>
										<TableHead>Property</TableHead>
										<TableHead>Address</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Details</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredProperties.map((property) => (
										<TableRow key={property.id}>
											<TableCell>
												<Checkbox
													checked={selectedProperties.includes(property.id)}
													onCheckedChange={(checked) => handleSelect(property.id, checked as boolean)}
												/>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-3">
													<div>
														<div className="font-medium">{property.title}</div>
														<div className="text-sm text-muted-foreground flex items-center gap-2">
															{property.type}
															{property.is_featured && (
																<Badge variant="secondary" className="text-xs">
																	<Star className="h-3 w-3 mr-1" />
																	Featured
																</Badge>
															)}
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground" />
													{truncateAddress(`${property.address_line1}, ${property.city}`)}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-1">
													<DollarSign className="h-4 w-4 text-muted-foreground" />
													{property.currency} {property.price.toLocaleString()}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<div className="flex items-center gap-1">
														<Bed className="h-4 w-4" />
														{property.bedrooms}
													</div>
													<div className="flex items-center gap-1">
														<Bath className="h-4 w-4" />
														{property.bathrooms}
													</div>
													<div className="flex items-center gap-1">
														<Square className="h-4 w-4" />
														{property.area_sq_ft}
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Select
													value={property.status}
													onValueChange={(value) =>
														handleStatusChange(property.id, value)
													}
												>
													<SelectTrigger className="w-[120px]">
														<SelectValue>
															<Badge
																variant={getStatusVariant(property.status)}
															>
																{property.status}
															</Badge>
														</SelectValue>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="published">Published</SelectItem>
														<SelectItem value="available">Available</SelectItem>
														<SelectItem value="draft">Draft</SelectItem>
														<SelectItem value="archived">Archived</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button variant="outline" size="sm" asChild>
														<Link href={route("properties.show", property.id)}>
															<View className="h-4 w-4" />
														</Link>
													</Button>
													<Button variant="outline" size="sm" onClick={() => handleAddMediaClick(property.id)}>
														<ImagePlus className="h-4 w-4" />
													</Button>
													<Button variant="outline" size="sm" asChild>
														<Link href={route("properties.edit", property.id)}>
															<Edit className="h-4 w-4" />
														</Link>
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleDelete(property.id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>
            <MediaUploadModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onUpload={handleMediaUpload}
            />
		</AppLayout>
	);
}
}

