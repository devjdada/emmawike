import { motion } from "framer-motion";
import { Clock, Eye, Handshake, Shield, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
	Shield,
	Clock,
	Star,
	Handshake,
	Eye,
	Users,
};

const WhyChooseUs = () => {
	const [features, setFeatures] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
							Why Choose{" "}
							<span className="text-accent">Emmo Wilke & Partners</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							We don't just sell properties—we create lasting relationships and
							deliver exceptional experiences that set us apart in the luxury
							real estate market.
						</p>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{loading && <p>Loading...</p>}
					{error && <p>Error fetching features: {error.message}</p>}
					{features.map((feature, index) => {
						const IconComponent = iconMap[feature.icon];
						return (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group"
							>
								<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border h-full">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors">
										<IconComponent className="h-8 w-8 text-accent" />
									</div>
									<h3 className="text-xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
										{feature.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{feature.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>

				<div className="text-center mt-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 lg:p-12 text-white"
					>
						<h3 className="text-3xl lg:text-4xl font-bold mb-4">
							Ready to Experience the Difference?
						</h3>
						<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
							Join thousands of satisfied clients who have trusted us with their
							most important real estate decisions.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
								Schedule Consultation
							</button>
							<button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
								View Properties
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
