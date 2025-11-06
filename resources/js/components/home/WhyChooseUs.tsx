import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import axios from 'axios';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Clock, Eye, Handshake, Shield, Star, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    // Fetch data from the API
    useEffect(() => {
        axios
            .get('/api/wcu-features')
            .then((response) => {
                setFeatures(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs once on mount
    return (
        <section className="bg-background py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-4 text-4xl font-bold text-primary lg:text-5xl">
                            Why Choose <span className="text-accent">Emmo Wilke & Partners</span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                            We don't just sell properties—we create lasting relationships and deliver exceptional experiences that set us apart in the
                            luxury real estate market.
                        </p>
                    </motion.div>
                </div>

                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error fetching features: {error.message}</p>}
                        {!loading &&
                            !error &&
                            features.map((feature, index) => {
                                const IconComponent = iconMap[feature.icon];
                                return (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square flex-col items-start justify-center p-6">
                                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                                                        <IconComponent className="h-8 w-8 text-accent" />
                                                    </div>
                                                    <h3 className="mb-4 text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="mt-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="rounded-2xl bg-gradient-to-r from-primary to-primary/90 p-8 text-white lg:p-12"
                    >
                        <h3 className="mb-4 text-3xl font-bold lg:text-4xl">Ready to Experience the Difference?</h3>
                        <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                            Join thousands of satisfied clients who have trusted us with their most important real estate decisions.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <button className="rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-primary transition-colors hover:bg-accent/90">
                                Schedule Consultation
                            </button>
                            <button className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-primary">
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
