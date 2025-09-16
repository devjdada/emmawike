import { Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { ExternalLink, MapPin } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
	id: string;
	title: string;
	description: string;
	location: string;
	image_url: string;
	status: string;
	type: string;
	budget: number;
	team_size: number;
}

interface FeaturedProjectsCarouselProps {
	featuredProjects: Project[];
}

export function FeaturedProjectsCarousel({
	featuredProjects,
}: FeaturedProjectsCarouselProps) {
	const plugin = React.useRef(
		Autoplay({ delay: 5000, stopOnInteraction: true }),
	);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800";
			case "in_progress":
				return "bg-blue-100 text-blue-800";
			case "planning":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
            opts={{
                loop: true,
            }}
		>
			<CarouselContent>
				{featuredProjects.map((project, index) => (
					<CarouselItem key={index}>
						<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
							<div className="grid lg:grid-cols-2 gap-0">
								<div
									className="h-64 lg:h-full bg-cover bg-center"
									style={{ backgroundImage: `url(${project.image_url})` }}
								/>
								<CardContent className="p-8 flex flex-col justify-center">
									<div className="flex items-center gap-2 mb-4">
										<Badge className={getStatusColor(project.status)}>
											{project.status}
										</Badge>
										<Badge variant="outline">{project.type}</Badge>
									</div>
									<h3 className="text-2xl font-bold mb-2">{project.title}</h3>
									<div className="flex items-center text-muted-foreground mb-4">
										<MapPin className="h-4 w-4 mr-2" />
										<span>{project.location}</span>
									</div>
									<div
										className="text-sm text-muted-foreground mb-4 tiptap"
										dangerouslySetInnerHTML={{
											__html:
												project.description.length > 300
													? project.description.slice(0, 300) + "..."
													: project.description,
										}}
									/>
									<div className="grid grid-cols-2 gap-4 mb-6 text-sm">
										<div>
											<span className="text-muted-foreground">Value:</span>
											<span className="font-semibold ml-2">
												${project.budget.toLocaleString()}
											</span>
										</div>
										<div>
											<span className="text-muted-foreground">Team Size:</span>
											<span className="font-semibold ml-2">
												{project.team_size}
											</span>
										</div>
									</div>

									<Link href={route("projects.show", project.id)}>
										<Button className="w-fit">
											View Project Details
											<ExternalLink className="h-4 w-4 ml-2" />
										</Button>
									</Link>
								</CardContent>
							</div>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
