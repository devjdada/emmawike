import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentTestimonial(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length,
		);
	};

	return (
		<section className="py-20 bg-secondary">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
							What Our <span className="text-accent">Clients Say</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Don't just take our word for it. See what our satisfied clients
							have to say about their experience.
						</p>
					</motion.div>
				</div>

				<div className="max-w-4xl mx-auto">
					{loading && <p>Loading...</p>}
					{error && <p>Error fetching testimonials: {error.message}</p>}
					{testimonials.length > 0 && (
						<>
							<div className="relative">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentTestimonial}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
									>
										<div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
											{/* Client Image */}
											<div className="flex-shrink-0">
												<img
													src={testimonials[currentTestimonial].image}
													alt={testimonials[currentTestimonial].name}
													className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
												/>
											</div>

											{/* Testimonial Content */}
											<div className="flex-1 text-center lg:text-left">
												{/* Quote Icon */}
												<Quote className="h-12 w-12 text-accent mb-6 mx-auto lg:mx-0" />

												{/* Rating */}
												<div className="flex justify-center lg:justify-start mb-4">
													{[
														...Array(testimonials[currentTestimonial].rating),
													].map((_, i) => (
														<Star
															key={i}
															className="h-5 w-5 fill-accent text-accent"
														/>
													))}
												</div>

												{/* Testimonial Text */}
												<p className="text-lg lg:text-xl text-foreground mb-6 leading-relaxed italic">
													"{testimonials[currentTestimonial].text}"
												</p>

												{/* Client Info */}
												<div className="border-t border-border pt-6">
													<h4 className="text-xl font-semibold text-primary mb-1">
														{testimonials[currentTestimonial].name}
													</h4>
													<p className="text-muted-foreground mb-1">
														{testimonials[currentTestimonial].role}
													</p>
													<p className="text-sm text-muted-foreground mb-2">
														{testimonials[currentTestimonial].location}
													</p>
													<div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
														{testimonials[currentTestimonial].property}
													</div>
												</div>
											</div>
										</div>
									</motion.div>
								</AnimatePresence>

								{/* Navigation Arrows */}
								<Button
									variant="outline"
									size="icon"
									className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-12 hidden lg:flex border-accent text-accent hover:bg-accent hover:text-white"
									onClick={prevTestimonial}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-12 hidden lg:flex border-accent text-accent hover:bg-accent hover:text-white"
									onClick={nextTestimonial}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</div>

							{/* Mobile Navigation */}
							<div className="flex justify-center gap-4 mt-8 lg:hidden">
								<Button
									variant="outline"
									size="icon"
									className="border-accent text-accent hover:bg-accent hover:text-white"
									onClick={prevTestimonial}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="border-accent text-accent hover:bg-accent hover:text-white"
									onClick={nextTestimonial}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</div>

							{/* Testimonial Indicators */}
							<div className="flex justify-center space-x-2 mt-8">
								{testimonials.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentTestimonial(index)}
										className={`w-3 h-3 rounded-full transition-all ${
											index === currentTestimonial ? "bg-accent" : "bg-border"
										}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
