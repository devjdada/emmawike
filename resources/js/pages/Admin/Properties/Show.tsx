import { Head } from "@inertiajs/react";
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
	bedrooms: number | null;
	bathrooms: number | null;
	area_sq_ft: number | null;
	status: string;
	is_featured: boolean;
	media: Media[];
}

interface ShowPropertyProps extends PageProps {
	property: Property;
}

export default function ShowProperty({ auth, property }: ShowPropertyProps) {
	return (
		<AppLayout user={auth.user}>
			<Head title={property.title} />

			<div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
				<div className="shadow sm:rounded-lg ">
					<div className="p-6">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							{property.title}
						</h1>
						<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
							{property.address_line1}, {property.city}, {property.state}
						</p>

						<div className="mt-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
								Property Details
							</h2>
							<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<p>
										<span className="font-semibold">Price:</span>{" "}
										{property.currency} {property.price.toLocaleString()}
									</p>
									<p>
										<span className="font-semibold">Type:</span> {property.type}
									</p>
									<p>
										<span className="font-semibold">Status:</span>{" "}
										{property.status}
									</p>
								</div>
								<div>
									<p>
										<span className="font-semibold">Bedrooms:</span>{" "}
										{property.bedrooms}
									</p>
									<p>
										<span className="font-semibold">Bathrooms:</span>{" "}
										{property.bathrooms}
									</p>
									<p>
										<span className="font-semibold">Area:</span>{" "}
										{property.area_sq_ft} sq. ft.
									</p>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
								Description
							</h2>
							<div
								className="prose dark:prose-invert mt-4 tiptap"
								dangerouslySetInnerHTML={{ __html: property.description }}
							/>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
								Media Gallery
							</h2>
							<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								{property.media.map((media_item) => (
									<div
										key={media_item.id}
										className="overflow-hidden rounded-lg"
									>
										{media_item.type === "image" ? (
											<img
												src={`/storage/${media_item.path}`}
												alt={media_item.label || property.title}
												className="h-full w-full object-cover"
											/>
										) : (
											<video
												src={`/storage/${media_item.path}`}
												controls
												className="h-full w-full"
											/>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
