import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Building,
	Calculator,
	Camera,
	CheckCircle,
	FileText,
	Gavel,
	Home,
	MapPin,
	Shield,
	TrendingUp,
	Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLayout from "@/layouts/PublicLayout";
import type { PageProps } from "@/types";

interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	duration: string;
	image_url: string;
	features: string;
}

interface ServicesIndexProps extends PageProps {
	services: Service[];
}

const iconMap = {
	Home,
	TrendingUp,
	FileText,
	Calculator,
	Users,
	Shield,
	MapPin,
	Camera,
	Gavel,
	Building,
};

export default function ServicesIndex({ services }: ServicesIndexProps) {
	const specialtyServices = [
		{
			icon: Building,
			title: "Commercial Real Estate",
			description:
				"Specialized services for commercial property transactions and investments.",
		},
		{
			icon: MapPin,
			title: "Relocation Services",
			description:
				"Complete relocation assistance for corporate and individual clients.",
		},
		{
			icon: Camera,
			title: "Property Marketing",
			description:
				"Professional photography, virtual tours, and marketing materials.",
		},
		{
			icon: Gavel,
			title: "Auction Services",
			description: "Property auction management and bidding assistance.",
		},
	];

	const process = [
		{
			step: "01",
			title: "Initial Consultation",
			description:
				"We start with a comprehensive consultation to understand your needs and goals.",
		},
		{
			step: "02",
			title: "Strategy Development",
			description:
				"Our team develops a customized strategy tailored to your specific situation.",
		},
		{
			step: "03",
			title: "Implementation",
			description:
				"We execute the plan with precision, keeping you informed every step of the way.",
		},
		{
			step: "04",
			title: "Results & Support",
			description:
				"We deliver results and provide ongoing support for your continued success.",
		},
	];

	return (
		<PublicLayout>
			<Head title="Services" />

			{/* Hero Section */}
			<section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
							Our Services
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
							Comprehensive real estate services designed to meet all your
							property needs. From buying and selling to investment consulting
							and property management.
						</p>
						<Button size="lg" className="bg-accent hover:bg-accent/90">
							Schedule Consultation
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Core Services - Redesigned */}
			<section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-center mb-16"
					>
						<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
							<Home className="h-8 w-8 text-primary" />
						</div>
						<h2 className="text-4xl font-bold text-foreground mb-6">
							Core Services
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Our comprehensive suite of real estate services covers every
							aspect of property transactions and investments with professional
							excellence.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* start of services loop */}
						{services.map((service, index) => {
							return (
								<motion.div
									key={service.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * (index + 2) }}
								>
									<Card className="h-full bg-card hover:bg-muted/30 transition-all duration-1000 group hover:shadow-xl border hover:border-primary/20 overflow-hidden">
										<img
											src={service.image_url}
											alt={service.name}
											className="w-full h-48 object-cover -mt-5 group-hover:scale-110 transition-transform duration-300"
										/>
										<CardContent className="p-6">
											<h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
												{service.name}
											</h3>
											<div
												className="text-muted-foreground text-sm mb-4 line-clamp-3"
												dangerouslySetInnerHTML={{
													__html:
														service.description.length > 300
															? `${service.description.substring(0, 300)}...`
															: service.description,
												}}
											/>

											<div className="space-y-2 mb-4">
												{service.features
													.split(",")
													.slice(0, 3)
													.map((feature) => (
														<div
															key={feature}
															className="flex items-center text-xs"
														>
															<div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
															<span className="text-muted-foreground">
																{feature.trim()}
															</span>
														</div>
													))}
												{service.features.split(",").length > 3 && (
													<div className="text-xs text-muted-foreground">
														+{service.features.split(",").length - 3} more
														features
													</div>
												)}
											</div>

											<div className="flex items-center justify-between pt-4 border-t border-border">
												<Link href={route("services.show", service.id)}>
													<Button
														variant="ghost"
														size="sm"
														className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 font-semibold"
													>
														Details
														<ArrowRight className="h-3 w-3 ml-1" />
													</Button>
												</Link>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
						{/* end of services loop */}
					</div>
				</div>
			</section>

			{/* Specialty Services - Redesigned */}
			<section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-accent text-white relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
							<Building className="h-10 w-10 text-white" />
						</div>
						<h2 className="text-4xl font-bold mb-6">Specialty Services</h2>
						<p className="text-xl text-white/90 max-w-3xl mx-auto">
							Discover our specialized services designed to meet unique real
							estate challenges and opportunities.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{specialtyServices.map((service, index) => (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * index }}
								className="group"
							>
								<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-500 group-hover:scale-105 hover:shadow-2xl">
									<div className="relative mb-6">
										<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-white/30 transition-colors duration-300">
											<service.icon className="h-8 w-8 text-white" />
										</div>
										<div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>

									<h3 className="text-xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors">
										{service.title}
									</h3>
									<p className="text-white/80 text-sm leading-relaxed mb-6">
										{service.description}
									</p>

									<div className="pt-4 border-t border-white/20">
										<Button
											variant="ghost"
											size="sm"
											className="text-white hover:text-primary hover:bg-white/90 transition-all duration-300 font-semibold"
										>
											Explore Service
											<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
										</Button>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Additional CTA for Specialty Services */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="text-center mt-16"
					>
						<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
							<h3 className="text-2xl font-bold mb-4 text-white">
								Need a Custom Solution?
							</h3>
							<p className="text-white/90 mb-6">
								Our team specializes in creating tailored real estate solutions
								for unique requirements.
							</p>
							<Button
								size="lg"
								className="bg-white text-primary hover:bg-white/90 hover:shadow-xl transition-all duration-300"
							>
								Discuss Your Needs
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Our Process
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							We follow a proven process to ensure the best outcomes for our
							clients.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{process.map((step, index) => (
							<motion.div
								key={step.step}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * index }}
								className="text-center"
							>
								<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-white font-bold text-lg">
										{step.step}
									</span>
								</div>
								<h3 className="font-semibold mb-2">{step.title}</h3>
								<p className="text-sm text-muted-foreground">
									{step.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-primary text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
						<p className="text-lg opacity-90 mb-8">
							Contact us today to discuss your real estate needs and discover
							how we can help you achieve your goals.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary">
								Schedule Consultation
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								View Our Portfolio
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</PublicLayout>
	);
}
