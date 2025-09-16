import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
	Award,
	Building,
	Building2,
	Calendar,
	ExternalLink,
	Home,
	MapPin,
	TrendingUp,
	Users,
	Warehouse,
} from "lucide-react";
import { FeaturedProjectsCarousel } from "@/components/FeaturedProjectsCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/layouts/PublicLayout";
import type { PageProps } from "@/types";

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
	start_date: string;
	end_date: string;
}

interface ProjectsIndexProps extends PageProps {
	projects: Project[];
	featuredProjects: Project[];
	otherProjects: Project[];
	stats: {
		total_value: string;
		completed: string;
		units_delivered: string;
		experience: string;
	};
	projectTypes: Record<string, number>;
}

export default function ProjectsIndex({
	projects,
	featuredProjects,
	otherProjects,
	stats,
	projectTypes,
}: ProjectsIndexProps) {
	const statsIcons = {
		total_value: TrendingUp,
		completed: Award,
		units_delivered: Building,
		experience: Calendar,
	};

	const projectTypeIcons = {
		Residential: Home,
		Commercial: Building2,
		"Mixed-Use": Building,
		Industrial: Warehouse,
		Resort: Building,
		Renovation: Building,
		Infrastructure: Building,
	};

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

	const getTypeIcon = (type: string) => {
		return projectTypeIcons[type] || Building;
	};

	return (
		<PublicLayout>
			<Head title="Projects" />

			{/* Hero Section */}
			<section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-20"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=1920&h=800&fit=crop)",
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
							Our Projects
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
							Discover our portfolio of exceptional real estate developments
							that shape communities and create lasting value for investors and
							residents alike.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{Object.entries(stats).map(([key, value], index) => {
							const Icon = statsIcons[key];
							const label = key
								.replace("_", " ")
								.replace(/\b\w/g, (l) => l.toUpperCase());
							return (
								<motion.div
									key={label}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
									className="text-center"
								>
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<Icon className="h-8 w-8 text-primary" />
									</div>
									<div className="text-3xl font-bold text-foreground mb-2">
										{value}
									</div>
									<div className="text-muted-foreground">{label}</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Project Types */}
			<section className="py-16 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Project Categories
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							We specialize in diverse real estate developments across multiple
							sectors.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{Object.entries(projectTypes).map(([name, count], index) => {
							const Icon = getTypeIcon(name);
							return (
								<motion.div
									key={name}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
								>
									<Card className="text-center hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
										<CardContent className="p-6">
											<div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
												<Icon className="h-6 w-6 text-accent" />
											</div>
											<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
												{name}
											</h3>
											<p className="text-2xl font-bold text-primary">{count}</p>
											<p className="text-sm text-muted-foreground">Projects</p>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Featured Project Carousel */}
			{featuredProjects.length > 0 && (
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-2xl font-bold text-foreground mb-8">
								Featured Projects
							</h2>
							<FeaturedProjectsCarousel featuredProjects={featuredProjects} />
						</motion.div>
					</div>
				</section>
			)}

			{/* Projects Grid */}
			<section className="py-16 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-foreground mb-8">
						All Projects
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => {
							const TypeIcon = getTypeIcon(project.type);
							return (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
								>
									<Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
										<div
											className="h-48 bg-cover bg-center relative"
											style={{ backgroundImage: `url(${project.image_url})` }}
										>
											<div className="absolute top-4 left-4 flex gap-2">
												<Badge className={getStatusColor(project.status)}>
													{project.status}
												</Badge>
											</div>
											<div className="absolute top-4 right-4">
												<div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
													<TypeIcon className="h-4 w-4 text-primary" />
												</div>
											</div>
										</div>

										<CardContent className="p-6">
											<h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
												{project.title}
											</h3>
											<div className="flex items-center text-muted-foreground mb-3">
												<MapPin className="h-4 w-4 mr-2" />
												<span className="text-sm">{project.location}</span>
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

											<div className="grid grid-cols-2 gap-4 text-sm mb-4">
												<div>
													<span className="text-muted-foreground">Value:</span>
													<span className="font-semibold ml-1">
														${project.budget.toLocaleString()}
													</span>
												</div>
												<div>
													<span className="text-muted-foreground">
														Timeline:
													</span>
													<span className="font-semibold ml-1">
														{project.start_date} - {project.end_date}
													</span>
												</div>
											</div>

											<Link href={route("projects.show", project.id)}>
												<Button variant="outline" size="sm" className="w-full">
													View Details
												</Button>
											</Link>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Partner with Us
						</h2>
						<p className="text-muted-foreground mb-8">
							Interested in investing in our upcoming projects or discussing a
							potential partnership? We'd love to hear from you.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg">Investment Opportunities</Button>
							<Button size="lg" variant="outline">
								Contact Our Team
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</PublicLayout>
	);
}
