import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Bath, Bed, ChevronLeft, ChevronRight, Heart, MapPin, Share2, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

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
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
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
        <div className="relative mt-16 h-screen w-full overflow-hidden bg-background">
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
            <div className="relative z-10 flex h-full flex-col">
                {/* Main content */}
                <div className="flex flex-grow items-center px-8 pb-16">
                    <div className="mx-auto w-full max-w-6xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="max-w-2xl text-white"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="mb-6">
                                    <span className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-2 text-sm font-semibold">
                                        Featured Property
                                    </span>
                                    <h1 className="mb-4 text-4xl leading-tight font-bold md:text-6xl">{slides[currentSlide].title}</h1>
                                    <div className="mb-6 flex items-center text-lg">
                                        <MapPin className="mr-2 h-5 w-5" />
                                        <span>{slides[currentSlide].location}</span>
                                    </div>
                                </div>

                                <p className="mb-8 text-lg leading-relaxed text-white/90">{slides[currentSlide].description}</p>

                                <div className="mb-8 grid grid-cols-3 gap-6">
                                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                        <div className="mb-2 flex items-center justify-center">
                                            <Bed className="mr-2 h-6 w-6" />
                                            <span className="text-xl font-bold">{slides[currentSlide].beds}</span>
                                        </div>
                                        <span className="text-sm text-white/80">Bedrooms</span>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                        <div className="mb-2 flex items-center justify-center">
                                            <Bath className="mr-2 h-6 w-6" />
                                            <span className="text-xl font-bold">{slides[currentSlide].baths}</span>
                                        </div>
                                        <span className="text-sm text-white/80">Bathrooms</span>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                        <div className="mb-2 flex items-center justify-center">
                                            <Square className="mr-2 h-6 w-6" />
                                            <span className="text-xl font-bold">{slides[currentSlide].sqft}</span>
                                        </div>
                                        <span className="text-sm text-white/80">Square Feet</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Button size="lg" className="bg-primary px-8 py-6 text-lg hover:bg-primary/90">
                                        View Full Details
                                    </Button>
                                    <Button variant="outline" size="lg" className="bg-accent px-8 py-6 text-lg text-white hover:bg-accent/70">
                                        Schedule Tour
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20">
                                            <Heart className="h-5 w-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20">
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
                        className="rounded-lg bg-primary px-6 py-4 text-white shadow-xl"
                    >
                        <div className="text-sm tracking-wider uppercase">Starting From</div>
                        <div className="text-3xl font-bold">{slides[currentSlide].price}</div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation controls */}
            <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </Button>

                {/* Slide indicators */}
                <div className="ml-4 flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-primary' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
