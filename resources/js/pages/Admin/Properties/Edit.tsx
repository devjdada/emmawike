import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, XCircle } from "lucide-react";
import { useState } from "react";
import InputError from "@/components/input-error";
import TiptapEditor from "@/components/TiptapEditor";
import Tiptap from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

interface Media {
	id: number;
	path: string;
	type: "image" | "video";
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

interface EditPropertyProps extends PageProps {
	property: Property;
}

export default function EditProperty({ auth, property }: EditPropertyProps) {
	const { toast } = useToast();
	const [mediaFiles, setMediaFiles] = useState<File[]>([]);
	const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);

	const { data, setData, post, processing, errors } = useForm({
		_method: "PUT",
		owner_id: property.owner_id,
		title: property.title,
		description: property.description,
		type: property.type,
		price: property.price,
		currency: property.currency,
		address_line1: property.address_line1,
		address_line2: property.address_line2 || "",
		city: property.city,
		state: property.state,
		country: property.country,
		zip_code: property.zip_code || "",
		latitude: property.latitude || "",
		longitude: property.longitude || "",
		bedrooms: property.bedrooms || "",
		bathrooms: property.bathrooms || "",
		area_sq_ft: property.area_sq_ft || "",
		status: property.status,
		is_featured: property.is_featured,
		media: [] as any[], // For new uploads
		deleted_media_ids: [] as number[], // For existing media to delete
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setMediaFiles(Array.from(e.target.files));
		}
	};

	const handleDeleteMedia = (id: number) => {
		if (confirm("Are you sure you want to delete this media item?")) {
			setDeletedMediaIds([...deletedMediaIds, id]);
			// Optionally, update the displayed media immediately
			property.media = property.media.filter((item) => item.id !== id);
		}
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();

		// Append all form data
		Object.keys(data).forEach((key) => {
			if (key !== "media" && key !== "deleted_media_ids") {
				formData.append(key, data[key as keyof typeof data] as string);
			}
		});

		// Append new media files
		mediaFiles.forEach((file, index) => {
			formData.append(`media[${index}]`, file);
		});

		// Append deleted media IDs
		deletedMediaIds.forEach((id, index) => {
			formData.append(`deleted_media_ids[${index}]`, id.toString());
		});

		// Manually append _method for PUT request with FormData
		formData.append("_method", "PUT");

		post(route("admin.properties.update", property.id), {
			data: formData as any,
			forceFormData: true, // Important for Inertia to send FormData correctly
			onSuccess: () => {
				toast({
					title: "Property Updated",
					description: "The property has been successfully updated.",
				});
			},
			onError: (e) => {
				console.error(e);
				toast({
					title: "Error",
					description: "Failed to update property.",
					variant: "destructive",
				});
			},
		});
	};

	return (
		<AppLayout user={auth.user}>
			<Head title="Edit Property" />

			<div className="pt-24 pb-8">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8 flex items-center gap-4">
						<Link href={route("admin.properties.index")}>
							<Button variant="ghost" size="sm">
								<ArrowLeft className="mr-2 h-4 w-4" />
							</Button>
						</Link>
						<div>
							<h1 className="text-3xl font-bold text-foreground">
								Edit Property
							</h1>
							<p className="text-muted-foreground">
								Update the details of your property listing
							</p>
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Property Details</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={submit} className="space-y-6">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<Label htmlFor="title">Property Title</Label>
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
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											type="number"
											name="price"
											value={data.price}
											className="mt-1 block w-full"
											autoComplete="price"
											onChange={(e) => setData("price", e.target.value)}
											required
										/>
										<InputError message={errors.price} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="currency">Currency</Label>
										<Select
											onValueChange={(value) => setData("currency", value)}
											value={data.currency}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select currency" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="NGN">NGN</SelectItem>
												<SelectItem value="USD">USD</SelectItem>
												<SelectItem value="EUR">EUR</SelectItem>
											</SelectContent>
										</Select>
										<InputError message={errors.currency} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="type">Property Type</Label>
										<Select
											onValueChange={(value) => setData("type", value)}
											value={data.type}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select property type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="House">House</SelectItem>
												<SelectItem value="Apartment">Apartment</SelectItem>
												<SelectItem value="Penthouse">Penthouse</SelectItem>
												<SelectItem value="Villa">Villa</SelectItem>
												<SelectItem value="Estate">Estate</SelectItem>
												<SelectItem value="Loft">Loft</SelectItem>
											</SelectContent>
										</Select>
										<InputError message={errors.type} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="address_line1">Address Line 1</Label>
										<Input
											id="address_line1"
											type="text"
											name="address_line1"
											value={data.address_line1}
											className="mt-1 block w-full"
											autoComplete="address-line1"
											onChange={(e) => setData("address_line1", e.target.value)}
											required
										/>
										<InputError
											message={errors.address_line1}
											className="mt-2"
										/>
									</div>

									<div>
										<Label htmlFor="address_line2">
											Address Line 2 (Optional)
										</Label>
										<Input
											id="address_line2"
											type="text"
											name="address_line2"
											value={data.address_line2}
											className="mt-1 block w-full"
											autoComplete="address-line2"
											onChange={(e) => setData("address_line2", e.target.value)}
										/>
										<InputError
											message={errors.address_line2}
											className="mt-2"
										/>
									</div>

									<div>
										<Label htmlFor="city">City</Label>
										<Input
											id="city"
											type="text"
											name="city"
											value={data.city}
											className="mt-1 block w-full"
											autoComplete="address-level2"
											onChange={(e) => setData("city", e.target.value)}
											required
										/>
										<InputError message={errors.city} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="state">State</Label>
										<Input
											id="state"
											type="text"
											name="state"
											value={data.state}
											className="mt-1 block w-full"
											autoComplete="address-level1"
											onChange={(e) => setData("state", e.target.value)}
											required
										/>
										<InputError message={errors.state} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="country">Country</Label>
										<Input
											id="country"
											type="text"
											name="country"
											value={data.country}
											className="mt-1 block w-full"
											autoComplete="country"
											onChange={(e) => setData("country", e.target.value)}
											required
										/>
										<InputError message={errors.country} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="zip_code">Zip Code (Optional)</Label>
										<Input
											id="zip_code"
											type="text"
											name="zip_code"
											value={data.zip_code}
											className="mt-1 block w-full"
											autoComplete="postal-code"
											onChange={(e) => setData("zip_code", e.target.value)}
										/>
										<InputError message={errors.zip_code} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="latitude">Latitude (Optional)</Label>
										<Input
											id="latitude"
											type="number"
											name="latitude"
											value={data.latitude}
											className="mt-1 block w-full"
											onChange={(e) => setData("latitude", e.target.value)}
										/>
										<InputError message={errors.latitude} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="longitude">Longitude (Optional)</Label>
										<Input
											id="longitude"
											type="number"
											name="longitude"
											value={data.longitude}
											className="mt-1 block w-full"
											onChange={(e) => setData("longitude", e.target.value)}
										/>
										<InputError message={errors.longitude} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="bedrooms">Bedrooms</Label>
										<Input
											id="bedrooms"
											type="number"
											name="bedrooms"
											value={data.bedrooms}
											className="mt-1 block w-full"
											onChange={(e) => setData("bedrooms", e.target.value)}
											required
										/>
										<InputError message={errors.bedrooms} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="bathrooms">Bathrooms</Label>
										<Input
											id="bathrooms"
											type="number"
											name="bathrooms"
											value={data.bathrooms}
											className="mt-1 block w-full"
											onChange={(e) => setData("bathrooms", e.target.value)}
											required
										/>
										<InputError message={errors.bathrooms} className="mt-2" />
									</div>

									<div>
										<Label htmlFor="area_sq_ft">Area (Sq. Ft.)</Label>
										<Input
											id="area_sq_ft"
											type="number"
											name="area_sq_ft"
											value={data.area_sq_ft}
											className="mt-1 block w-full"
											onChange={(e) => setData("area_sq_ft", e.target.value)}
											required
										/>
										<InputError message={errors.area_sq_ft} className="mt-2" />
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
												<SelectItem value="available">Available</SelectItem>
												<SelectItem value="published">Published</SelectItem>
												<SelectItem value="draft">Draft</SelectItem>
												<SelectItem value="archived">Archived</SelectItem>
											</SelectContent>
										</Select>
										<InputError message={errors.status} className="mt-2" />
									</div>
								</div>

								<div>
									<Label htmlFor="description">Description</Label>

									<Tiptap
										onChange={(newContent) =>
											setData("description", newContent)
										}
										description={data.description}
									/>
									<InputError message={errors.description} className="mt-2" />
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_featured"
										checked={data.is_featured}
										onCheckedChange={(checked) =>
											setData("is_featured", checked as boolean)
										}
									/>
									<Label htmlFor="is_featured">Mark as Featured Property</Label>
									<InputError message={errors.is_featured} className="mt-2" />
								</div>

								{/* Existing Media Display */}
								<div className="mt-6">
									<Label>Existing Media</Label>
									<div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
										{property.media.map((media_item) => (
											<div key={media_item.id} className="group relative">
												{media_item.type === "image" ? (
													<img
														src={`/storage/${media_item.path}`}
														alt={media_item.label}
														className="h-auto w-full rounded"
													/>
												) : (
													<video
														src={`/storage/${media_item.path}`}
														controls
														className="h-auto w-full rounded"
													>
														<track
															kind="captions"
															src=""
															label="English captions"
															srcLang="en"
															default
														/>
													</video>
												)}
												<Button
													type="button"
													variant="destructive"
													size="icon"
													className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
													onClick={() => handleDeleteMedia(media_item.id)}
												>
													<XCircle className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
								</div>

								{/* New Media Upload */}
								<div>
									<Label htmlFor="new_media">Upload New Media</Label>
									<Input
										id="new_media"
										type="file"
										name="new_media"
										className="mt-1 block w-full"
										onChange={handleFileChange}
										multiple
									/>
									<InputError message={errors.media} />
								</div>

								<div className="flex justify-end gap-4">
									<Link href={route("admin.properties.index")}>
										<Button variant="outline" type="button">
											Cancel
										</Button>
									</Link>
									<Button type="submit" disabled={processing}>
										Update Property
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</AppLayout>
	);
}
