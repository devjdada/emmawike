import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Award, MapPin, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';

const iconMap = {
    TrendingUp,
    Users,
    Award,
    MapPin,
};

const StatsSection = ({ stats, clients }) => {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <>
            <section className="relative overflow-hidden bg-primary py-20 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
                                Trusted by <span className="text-accent">Thousands</span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-xl opacity-90">
                                Our track record speaks for itself. We've been setting the standard in luxury real estate for over two decades.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => {
                            const IconComponent = iconMap[stat.icon];
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
                                        <IconComponent className="h-8 w-8 text-accent" />
                                    </div>
                                    <div className="mb-2 text-4xl font-bold text-accent lg:text-5xl">{stat.number}</div>
                                    <div className="mb-2 text-xl font-semibold">{stat.label}</div>
                                    <div className="text-sm text-white/80">{stat.description}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {clients.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
                                    Clients <span className="text-accent">Our</span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-xl opacity-90">
                                    <div className="mb-16 text-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            {/* <h2 className="text-4xl lg:text-5xl font-bold mb-4">
												Trusted by{" "}
												<span className="text-accent">Thousands</span>
											</h2> */}
                                            <p className="mx-auto max-w-2xl text-xl opacity-90">
                                                We are proud to have worked with a diverse range of clients.
                                            </p>
                                        </motion.div>
                                    </div>
                                </p>
                            </motion.div>
                        </div>
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{ align: 'start', loop: true }}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                            className="w-full"
                        >
                            <CarouselContent>
                                {clients.map((client) => (
                                    <CarouselItem key={client.id} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                                        <div className="p-1">
                                            <a href={client.website_url} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`/storage/${client.logo_url}`}
                                                    alt={client.name}
                                                    className="mx-auto h-56 w-full object-cover"
                                                />
                                            </a>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>
            )}
        </>
    );
};

export default StatsSection;
