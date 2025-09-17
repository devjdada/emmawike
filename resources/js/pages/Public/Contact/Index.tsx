import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
	Building,
	Calendar,
	Clock,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	Users,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PublicLayout from "@/layouts/PublicLayout";
import type { PageProps } from "@/types";

interface ContactInfo {
	address: string;
	phone: string;
	email: string;
	hours: string;
}

interface Service {
	id: string;
	name: string;
	description: string;
	category: string;
}

interface ContactIndexProps extends PageProps {
	contactInfo: ContactInfo;
	services: Service[];
}

export default function ContactIndex({
	contactInfo,
	services,
}: ContactIndexProps) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		const { firstName, lastName, email, phone, subject, message } = formData;
		const mailtoSubject = subject || "New message from Emma Wike";
		const mailtoBody = `
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;
		const mailtoLink = `mailto:info@emmawike.com?subject=${encodeURIComponent(
			mailtoSubject,
		)}&body=${encodeURIComponent(mailtoBody)}`;
		window.location.href = mailtoLink;
	};

	const handleGetDirections = () => {
		const encodedAddress = encodeURIComponent(contactInfo.address);
		window.open(
			`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
			"_blank",
		);
	};

	const handleContactAction = (action: string) => {
		switch (action) {
			case "Get Directions":
				handleGetDirections();
				break;
			case "Call Now":
				window.location.href = `tel:${contactInfo.phone}`;
				break;
			case "Send Email":
				window.location.href = `mailto:${contactInfo.email}`;
				break;
			case "Schedule Visit":
				document
					.getElementById("contact-form")
					?.scrollIntoView({ behavior: "smooth" });
				break;
			default:
				break;
		}
	};

	const contactDetails = [
		{
			icon: MapPin,
			title: "Visit Our Office",
			details: [contactInfo.address],
			action: "Get Directions",
		},
		{
			icon: Phone,
			title: "Call Us",
			details: [contactInfo.phone],
			action: "Call Now",
		},
		{
			icon: Mail,
			title: "Email Us",
			details: [contactInfo.email],
			action: "Send Email",
		},
		{
			icon: Clock,
			title: "Office Hours",
			details: [contactInfo.hours, "Saturday: 10:00 AM - 4:00 PM"],
			action: "Schedule Visit",
		},
	];

	const serviceIcons = {
		"Property Sales": Building,
		"Property Management": Users,
		Consultation: MessageCircle,
		"Property Tours": Calendar,
	};

	return (
		<PublicLayout>
			<Head title="Contact Us" />

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
							Contact Us
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
							Ready to find your dream property or have questions about our
							services? We're here to help you every step of the way.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
						{contactDetails.map((info, index) => (
							<motion.div
								key={info.title}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * index }}
							>
								<Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
									<CardContent className="p-6">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<info.icon className="h-8 w-8 text-primary" />
										</div>
										<h3 className="font-bold text-lg mb-3">{info.title}</h3>
										{info.details.map((detail, idx) => (
											<p key={idx} className="text-muted-foreground mb-1">
												{detail}
											</p>
										))}
										<Button
											variant="outline"
											size="sm"
											className="mt-4"
											onClick={() => handleContactAction(info.action)}
										>
											{info.action}
										</Button>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Form & Map */}
			<section id="contact-form" className="py-16 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Card>
								<form onSubmit={handleFormSubmit}>
									<CardHeader>
										<CardTitle className="text-2xl">
											Send Us a Message
										</CardTitle>
										<p className="text-muted-foreground">
											Fill out the form below and we'll get back to you within
											24 hours.
										</p>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="firstName">First Name</Label>
												<Input
													id="firstName"
													placeholder="John"
													value={formData.firstName}
													onChange={handleInputChange}
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="lastName">Last Name</Label>
												<Input
													id="lastName"
													placeholder="Doe"
													value={formData.lastName}
													onChange={handleInputChange}
													required
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												placeholder="john@example.com"
												value={formData.email}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Phone Number</Label>
											<Input
												id="phone"
												type="tel"
												placeholder="+1 (555) 123-4567"
												value={formData.phone}
												onChange={handleInputChange}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="subject">Subject</Label>
											<Input
												id="subject"
												placeholder="How can we help you?"
												value={formData.subject}
												onChange={handleInputChange}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="message">Message</Label>
											<Textarea
												id="message"
												placeholder="Tell us about your property needs or any questions you have..."
												rows={5}
												value={formData.message}
												onChange={handleInputChange}
												required
											/>
										</div>
										<Button type="submit" className="w-full">
											Send Message
										</Button>
									</CardContent>
								</form>
							</Card>
						</motion.div>

						{/* Map & Office Info */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="space-y-6"
						>
							{/* Map Placeholder */}
							<Card className="overflow-hidden">
								<div
									className="h-64 bg-cover bg-center relative"
									style={{
										backgroundImage:
											"url(https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=400&fit=crop)",
									}}
								>
									<div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
										<div className="bg-background/90 rounded-lg p-4 text-center">
											<MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
											<p className="font-medium">
												{contactInfo.address.split(",")[0]}
											</p>
											<p className="text-sm text-muted-foreground">
												{contactInfo.address.split(",").slice(1).join(",")}
											</p>
										</div>
									</div>
								</div>
								<CardContent className="p-6">
									<h3 className="font-bold text-lg mb-2">Visit Our Office</h3>
									<p className="text-muted-foreground mb-4">
										Stop by our beautiful showroom. We're always happy to meet
										in person and discuss your real estate needs.
									</p>
									<Button
										variant="outline"
										className="w-full"
										onClick={handleGetDirections}
									>
										Get Directions
									</Button>
								</CardContent>
							</Card>

							{/* Quick Contact */}
							<Card>
								<CardContent className="p-6">
									<h3 className="font-bold text-lg mb-4">
										Need Immediate Help?
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<Phone className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Call us directly</p>
												<p className="text-sm text-muted-foreground">
													{contactInfo.phone}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Mail className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Send us an email</p>
												<p className="text-sm text-muted-foreground">
													{contactInfo.email}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<MessageCircle className="h-5 w-5 text-primary" />
											<div>
												<p className="font-medium">Live chat support</p>
												<p className="text-sm text-muted-foreground">
													Available Mon-Fri 9AM-6PM
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							How Can We Help?
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							We offer a comprehensive range of real estate services to meet all
							your property needs.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{services.map((service, index) => {
							const Icon = serviceIcons[service.category] || Building;
							return (
								<motion.div
									key={service.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
								>
									<Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
										<CardContent className="p-6">
											<div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
												<Icon className="h-6 w-6 text-accent" />
											</div>
											<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
												{service.name}
											</h3>
											<p
												className="text-sm text-muted-foreground climps-3"
												dangerouslySetInnerHTML={{
													__html:
														service.description.length > 100
															? service.description.slice(0, 100) + "..."
															: service.description,
												}}
											/>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
