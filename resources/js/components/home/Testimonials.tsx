import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useRef } from 'react';

const Testimonials = ({ testimonials }) => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <section className="bg-secondary py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-4 text-4xl font-bold text-primary lg:text-5xl">
                            What Our <span className="text-accent">Clients Say</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                            Don't just take our word for it. See what our satisfied clients have to say about their experience.
                        </p>
                    </motion.div>
                </div>

                <Carousel
                    plugins={[plugin.current]}
                    className="mx-auto w-full max-w-4xl"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="rounded-3xl p-8 shadow-2xl lg:p-12">
                                        <CardContent className="flex flex-col items-center gap-8 p-0 lg:flex-row lg:items-start">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={testimonial.photo_url}
                                                    alt={testimonial.author_name}
                                                    className="h-24 w-24 rounded-full object-cover lg:h-32 lg:w-32"
                                                />
                                            </div>
                                            <div className="flex-1 text-center lg:text-left">
                                                <Quote className="mx-auto mb-6 h-12 w-12 text-accent lg:mx-0" />
                                                <p className="mb-6 text-lg leading-relaxed text-foreground italic lg:text-xl">
                                                    "{testimonial.content}"
                                                </p>
                                                <div className="border-t border-border pt-6">
                                                    <h4 className="mb-1 text-xl font-semibold text-primary">{testimonial.author_name}</h4>
                                                    <p className="mb-1 text-muted-foreground">{testimonial.author_title}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;
