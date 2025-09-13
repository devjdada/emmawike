import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PublicLayout from "@/layouts/PublicLayout";
import type { PageProps } from "@/types";

interface Media {
	id: string;
	path: string;
	type: "image" | "video";
	label: string;
}

interface Property {
	id: string;
	title: string;
	description: string;
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
	media: Media[]; // Assuming media is an array of objects
	views: number | null;
	inquiries: number | null;
}

interface PropertiesIndexProps extends PageProps {
	properties: Property[];
}

export default function PropertiesIndex({ properties }: PropertiesIndexProps) {
	return (
		<PublicLayout>
			<Head title="Properties" />

			{/* Hero Section */}
			<section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
							Find Your <span className="text-primary">Dream Property</span>
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Discover exceptional properties that match your lifestyle and
							investment goals
						</p>
					</div>

					{/* Search Filters - Removed from here as handled by backend */}
				</div>
			</section>

			{/* Properties Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h2 className="text-2xl font-bold text-foreground">
								Available Properties
							</h2>
							<p className="text-muted-foreground">
								{properties.length} properties found
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{properties.map((property, index) => (
							<motion.div
								key={property.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
									<div className="relative">
										<img
											src={
												property.media[0]
													? `/storage/${property.media[0].path}`
													: "https://via.placeholder.com/600x400"
											}
											alt={property.title}
											className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										{property.is_featured && (
											<Badge className="absolute top-4 left-4 bg-accent text-white">
												Featured
											</Badge>
										)}
										<Button
											variant="ghost"
											size="sm"
											className="absolute top-4 right-4 bg-white/80 hover:bg-white"
										>
											<Heart className="h-4 w-4" />
										</Button>
									</div>

									<CardContent className="p-6">
										<div className="mb-4">
											<h3 className="text-xl font-semibold text-foreground mb-2">
												{property.title}
											</h3>
											<div className="flex items-center text-muted-foreground mb-2">
												<MapPin className="h-4 w-4 mr-1" />
												<span className="text-sm">
													{property.address_line1}, {property.city}
												</span>
											</div>
										</div>

										<div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
											{property.bedrooms && (
												<div className="flex items-center">
													<Bed className="h-4 w-4 mr-1" />
													<span>{property.bedrooms} beds</span>
												</div>
											)}
											{property.bathrooms && (
												<div className="flex items-center">
													<Bath className="h-4 w-4 mr-1" />
													<span>{property.bathrooms} baths</span>
												</div>
											)}
											{property.area_sq_ft && (
												<div className="flex items-center">
													<Square className="h-4 w-4 mr-1" />
													<span>{property.area_sq_ft} sqft</span>
												</div>
											)}
										</div>

										<div className="flex items-center justify-between">
											<span className="text-2xl font-bold text-primary">
												{property.currency} {property.price.toLocaleString()}
											</span>
											<Link href={route("properties.show", property.id)}>
												<Button className="bg-primary hover:bg-primary/90">
													View Details
												</Button>
											</Link>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
