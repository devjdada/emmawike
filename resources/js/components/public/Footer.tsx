import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
	Clock,
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ icon: Facebook, href: "#", label: "Facebook" },
		{ icon: Instagram, href: "#", label: "Instagram" },
		{ icon: Twitter, href: "#", label: "Twitter" },
		{ icon: Linkedin, href: "#", label: "LinkedIn" },
	];

	const quickLinks = [
		{ name: "Properties", href: "/properties" },
		{ name: "Projects", href: "/projects" },
		{ name: "Services", href: "/services" },
		{ name: "About Us", href: "/about" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact", href: "/contact" },
	];

	const services = [
		"Luxury Home Sales",
		"Property Investment",
		"Market Analysis",
		"Property Management",
		"Commercial Real Estate",
		"Relocation Services",
	];

	return (
		<footer className="bg-primary text-white">
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="lg:col-span-1"
					>
						<div className="flex items-center space-x-3 mb-6">
							<div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
								<span className="text-primary font-bold text-lg">EWP</span>
							</div>
							<div>
								<h3 className="text-xl font-bold">Emmo Wilke & Partners</h3>
								<p className="text-sm text-white/80">Premium Real Estate</p>
							</div>
						</div>
						<p className="text-white/80 mb-6 leading-relaxed">
							Your trusted partner in luxury real estate for over 25 years. We
							specialize in premium properties across California's most
							desirable locations.
						</p>
						<div className="flex space-x-4">
							{socialLinks.map((social) => {
								const IconComponent = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
										aria-label={social.label}
									>
										<IconComponent className="h-5 w-5" />
									</a>
								);
							})}
						</div>
					</motion.div>

					{/* Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-semibold mb-6">Quick Links</h3>
						<ul className="space-y-3">
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-white/80 hover:text-accent transition-colors hover:underline"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Services */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-semibold mb-6">Our Services</h3>
						<ul className="space-y-3">
							{services.map((service) => (
								<li key={service}>
									<span className="text-white/80">{service}</span>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-semibold mb-6">Contact Us</h3>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
								<div>
									<p className="text-white/80">
										123 Luxury Avenue
										<br />
										Beverly Hills, CA 90210
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 text-accent flex-shrink-0" />
								<p className="text-white/80">(555) 123-4567</p>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="h-5 w-5 text-accent flex-shrink-0" />
								<p className="text-white/80">info@emmowilke.com</p>
							</div>
							<div className="flex items-start space-x-3">
								<Clock className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
								<div>
									<p className="text-white/80">
										Mon - Fri: 9:00 AM - 7:00 PM
										<br />
										Sat - Sun: 10:00 AM - 5:00 PM
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-white/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="text-white/80 text-sm mb-4 md:mb-0">
							© {currentYear} Emmo Wilke & Partners. All rights reserved.
						</div>
						<div className="flex space-x-6 text-sm">
							<Link
								href="#"
								className="text-white/80 hover:text-accent transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="#"
								className="text-white/80 hover:text-accent transition-colors"
							>
								Terms of Service
							</Link>
							<Link
								href="#"
								className="text-white/80 hover:text-accent transition-colors"
							>
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
