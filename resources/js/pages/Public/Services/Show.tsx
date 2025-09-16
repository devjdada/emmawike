import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	Award,
	Calendar,
	CheckCircle,
	Clock,
	Heart,
	Mail,
	Phone,
	Share2,
	Star,
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
	status: string;
}

interface ServiceShowProps extends PageProps {
	service: Service;
	otherServices: Service[];
}

export default function ServiceShow({
	service,
	otherServices,
}: ServiceShowProps) {
	return (
		<PublicLayout>
			<Head title={service.name} />

			{/* Hero Section */}
			<section
				className="pt-32 pb-16 relative overflow-hidden"
				style={{
					backgroundImage: `url(${service.image_url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-black/70"></div>
				<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl mx-auto"
					>
						<div className="flex items-center justify-center mb-6">
							<div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
								<Star className="h-10 w-10 text-primary" />
							</div>
						</div>

						<Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
							{service.category}
						</Badge>

						<h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
							{service.name}
						</h1>

						{/* <div
							className="text-xl text-muted-foreground mb-8 leading-relaxed prose max-w-none tiptap"
							dangerouslySetInnerHTML={{ __html: service.description }}
						/> */}

						<div className="flex flex-wrap items-center justify-center gap-6 mb-8">
							<div className="flex items-center text-sm text-muted-foreground">
								<Clock className="h-4 w-4 mr-2" />
								<span>{service.duration}</span>
							</div>
							<div className="flex items-center text-sm text-muted-foreground">
								<Star className="h-4 w-4 mr-2 text-yellow-500" />
								<span>4.8/5.0 Rating</span>
							</div>
							<div className="flex items-center text-sm text-muted-foreground">
								<Users className="h-4 w-4 mr-2" />
								<span>250+ Happy Clients</span>
							</div>
						</div>

						<div className="flex items-center justify-center space-x-4">
							<Button size="lg" className="bg-primary hover:bg-primary/90">
								Get Started Now
								<ArrowRight className="h-4 w-4 ml-2" />
							</Button>
							<Button variant="outline" size="lg">
								<Heart className="h-4 w-4 mr-2" />
								Save Service
							</Button>
							<Button variant="outline" size="lg">
								<Share2 className="h-4 w-4 mr-2" />
								Share
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Service Details */}
						<div className="lg:col-span-2 space-y-8">
							{/* Features */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="max-w-4xl mx-auto"
							>
								<Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
									{service.category}
								</Badge>

								<h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
									{service.name}
								</h1>

								<div
									className="text-xl text-muted-foreground mb-8 leading-relaxed prose max-w-none tiptap"
									dangerouslySetInnerHTML={{ __html: service.description }}
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center">
											<CheckCircle className="h-6 w-6 text-accent mr-3" />
											What's Included
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{service.features?.split(",").map((feature, index) => (
												<div key={index} className="flex items-start">
													<CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
													<span className="text-muted-foreground">
														{feature.trim()}
													</span>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>

							{/* Service Benefits */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center">
											<Award className="h-6 w-6 text-primary mr-3" />
											Why Choose This Service
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Expert Guidance
														</h4>
														<p className="text-sm text-muted-foreground">
															Professional advice from certified experts
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Proven Results
														</h4>
														<p className="text-sm text-muted-foreground">
															Track record of successful outcomes
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Personalized Approach
														</h4>
														<p className="text-sm text-muted-foreground">
															Tailored solutions for your specific needs
														</p>
													</div>
												</div>
											</div>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Quick Turnaround
														</h4>
														<p className="text-sm text-muted-foreground">
															Efficient process with fast results
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Ongoing Support
														</h4>
														<p className="text-sm text-muted-foreground">
															Continued assistance after service completion
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
													<div>
														<h4 className="font-semibold text-foreground">
															Competitive Pricing
														</h4>
														<p className="text-sm text-muted-foreground">
															Best value for professional service
														</p>
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>

						{/* Sidebar */}
						<div className="space-y-6 sticky top-20">
							{/* Pricing Card */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<Card className="border-2 border-primary/20">
									<CardHeader className="text-center">
										<div className="text-3xl font-bold text-primary">
											${service.price}
										</div>
										<p className="text-sm text-muted-foreground">
											Starting from
										</p>
									</CardHeader>
									<CardContent className="space-y-4">
										<Button
											className="w-full bg-primary hover:bg-primary/90"
											size="lg"
										>
											Book This Service
										</Button>
										<Button variant="outline" className="w-full" size="lg">
											Request Quote
										</Button>

										<div className="pt-4 border-t border-border space-y-3">
											<div className="flex items-center text-sm text-muted-foreground">
												<Clock className="h-4 w-4 mr-2" />
												<span>Duration: {service.duration}</span>
											</div>
											<div className="flex items-center text-sm text-muted-foreground">
												<Calendar className="h-4 w-4 mr-2" />
												<span>
													Available:{" "}
													{service.status === "active"
														? "Immediate start"
														: "Contact for availability"}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>

							{/* Contact Card */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Card>
									<CardHeader>
										<CardTitle>Need More Information?</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<p className="text-sm text-muted-foreground">
											Our service specialists are ready to answer your questions
											and help you get started.
										</p>
										<div className="space-y-3">
											<Button variant="outline" className="w-full">
												<Phone className="h-4 w-4 mr-2" />
												Call Us: (555) 123-4567
											</Button>
											<Button variant="outline" className="w-full">
												<Mail className="h-4 w-4 mr-2" />
												Send Message
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
