import { AnimatePresence, motion } from "framer-motion";
import {
	Bath,
	Bed,
	ChevronLeft,
	ChevronRight,
	Heart,
	MapPin,
	Share2,
	Square,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HeroCarouselProps {
	slides: {
		id: number;
		image: string;
		title: string;
		location: string;
		price: string;
		beds: number;
		baths: number;
		sqft: string;
		description: string;
	}[];
}

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	if (!slides || slides.length === 0) {
		return (
			<div className="relative h-screen w-full overflow-hidden bg-background">
				<div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
					<p className="text-gray-500">No hero images available.</p>
				</div>
			</div>
		);
	}

	useEffect(() => {
		if (slides.length > 0) {
			const timer = setInterval(() => {
				if (!isHovered) {
					setCurrentSlide((prev) => (prev + 1) % slides.length);
				}
			}, 7000);

			return () => clearInterval(timer);
		}
	}, [slides.length, isHovered]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	return (
		<div className="relative h-screen w-full overflow-hidden bg-background mt-16">
			{/* Full-screen background image with overlay */}
			<div className="absolute inset-0 z-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentSlide}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.5 }}
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
					>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Content overlay */}
			<div className="relative z-10 h-full flex flex-col">
				{/* Main content */}
				<div className="flex-grow flex items-center px-8 pb-16">
					<div className="max-w-6xl mx-auto w-full">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
								className="text-white max-w-2xl"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<div className="mb-6">
									<span className="inline-block px-4 py-2 bg-primary/90 text-sm font-semibold rounded-full mb-4">
										Featured Property
									</span>
									<h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
										{slides[currentSlide].title}
									</h1>
									<div className="flex items-center text-lg mb-6">
										<MapPin className="h-5 w-5 mr-2" />
										<span>{slides[currentSlide].location}</span>
									</div>
								</div>

								<p className="text-lg text-white/90 mb-8 leading-relaxed">
									{slides[currentSlide].description}
								</p>

								<div className="grid grid-cols-3 gap-6 mb-8">
									<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
										<div className="flex items-center justify-center mb-2">
											<Bed className="h-6 w-6 mr-2" />
											<span className="text-xl font-bold">
												{slides[currentSlide].beds}
											</span>
										</div>
										<span className="text-sm text-white/80">Bedrooms</span>
									</div>
									<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
										<div className="flex items-center justify-center mb-2">
											<Bath className="h-6 w-6 mr-2" />
											<span className="text-xl font-bold">
												{slides[currentSlide].baths}
											</span>
										</div>
										<span className="text-sm text-white/80">Bathrooms</span>
									</div>
									<div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
										<div className="flex items-center justify-center mb-2">
											<Square className="h-6 w-6 mr-2" />
											<span className="text-xl font-bold">
												{slides[currentSlide].sqft}
											</span>
										</div>
										<span className="text-sm text-white/80">Square Feet</span>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-4">
									<Button
										size="lg"
										className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
									>
										View Full Details
									</Button>
									<Button
										variant="outline"
										size="lg"
										className="bg-accent text-white hover:bg-accent/70 text-lg px-8 py-6"
									>
										Schedule Tour
									</Button>
									<div className="flex gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12"
										>
											<Heart className="h-5 w-5" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12"
										>
											<Share2 className="h-5 w-5" />
										</Button>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Price tag */}
				<div className="absolute right-8 bottom-1/4">
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-primary text-white px-6 py-4 rounded-lg shadow-xl"
					>
						<div className="text-sm uppercase tracking-wider">
							Starting From
						</div>
						<div className="text-3xl font-bold">
							{slides[currentSlide].price}
						</div>
					</motion.div>
				</div>
			</div>

			{/* Navigation controls */}
			<div className="absolute bottom-8 left-8 z-20 flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 h-12 w-12"
					onClick={prevSlide}
				>
					<ChevronLeft className="h-6 w-6 text-white" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 h-12 w-12"
					onClick={nextSlide}
				>
					<ChevronRight className="h-6 w-6 text-white" />
				</Button>

				{/* Slide indicators */}
				<div className="flex items-center gap-2 ml-4">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-3 h-3 rounded-full transition-all ${
								index === currentSlide ? "bg-primary w-6" : "bg-white/50"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HeroCarousel;
