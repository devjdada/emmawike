import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import PublicLayout from '@/layouts/PublicLayout';
import type { Client, PageProps, TeamMember, Testimonial } from '@/types';
import { Head } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Award, Eye, Heart, Home, Quote, Star, Target, Users } from 'lucide-react';
import React from 'react';

interface AboutIndexProps extends PageProps {
    teamMembers: TeamMember[];
    testimonials: Testimonial[];
    clients: Client[];
}

export default function AboutIndex({ teamMembers, testimonials, clients }: AboutIndexProps) {
    const stats = [
        { icon: Home, label: 'Properties Sold', value: '500+' },
        { icon: Users, label: 'Happy Clients', value: '1,200+' },
        { icon: Award, label: 'Awards Won', value: '15' },
        { icon: Star, label: 'Average Rating', value: '4.9' },
    ];

    const values = [
        {
            icon: Target,
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our service, from initial consultation to closing day.',
        },
        {
            icon: Eye,
            title: 'Transparency',
            description: 'Honest communication and clear processes ensure our clients are always informed and confident.',
        },
        {
            icon: Heart,
            title: 'Integrity',
            description: 'We build lasting relationships through trust, reliability, and ethical business practices.',
        },
    ];

    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <PublicLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/5 to-accent/5 pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">About Emma Wike</h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
                            We are a registered firm of Estate Surveyors and Valuers, committed to providing exceptional real estate services with
                            integrity and professionalism.
                        </p>
                        <Button size="lg">Get to Know Us</Button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-b border-border py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="text-center"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <stat.icon className="h-8 w-8 text-primary" />
                                </div>
                                <div className="mb-2 text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Mission</h2>
                            <p className="mb-6 text-muted-foreground">
                                Our craving cardinal focus is on client's/customers satisfaction as well as meeting corporate social responsibilities
                                to stakeholders in general.
                            </p>
                            <p className="text-muted-foreground">
                                We have earned an enviable stature in the provision of Facility Management Services to clients/customers over its time
                                of existence.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div
                                className="aspect-video rounded-2xl bg-cover bg-center shadow-2xl"
                                style={{
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop)',
                                }}
                            />
                            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary">Est. 2008</Badge>
                                    <span className="text-sm font-medium">15+ Years Experience</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Our Values</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            The principles that guide everything we do and shape every interaction we have.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Card className="h-full text-center transition-shadow duration-300 hover:shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                            <value.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mb-4 text-xl font-bold">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Meet Our Team</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">The passionate professionals who make it all happen.</p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Card className="overflow-hidden text-center transition-shadow duration-300 hover:shadow-lg">
                                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${member.photo_url})` }} />
                                    <CardContent className="p-6">
                                        <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                                        <p className="mb-3 font-medium text-primary">{member.title}</p>
                                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            {testimonials.length > 0 && (
                <section className="bg-primary/5 py-16">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <Quote className="mx-auto mb-6 h-12 w-12 text-primary" />
                            <blockquote className="mb-6 text-2xl font-medium text-foreground">{testimonials[0].content}</blockquote>
                            <cite className="text-muted-foreground">
                                — {testimonials[0].author_name}, {testimonials[0].author_title}
                            </cite>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Clients Section */}
            {clients.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center"
                        >
                            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Clients</h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">We are proud to have worked with a diverse range of clients.</p>
                        </motion.div>
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{ align: 'start', loop: true }}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                            className="w-full"
                        >
                            <CarouselContent>
                                {clients.map((client) => (
                                    <CarouselItem key={client.id} className="basis-1/2 md:basis-1/3 lg:basis-1/6">
                                        <div className="p-1">
                                            <a href={client.website_url} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`/storage/${client.logo_url}`}
                                                    alt={client.name}
                                                    className="object-covermx-auto h-56 w-full"
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

            {/* CTA Section */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Start Your Journey?</h2>
                        <p className="mb-8 text-muted-foreground">
                            Whether you're buying, selling, or investing, we're here to guide you every step of the way.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg">Contact Us Today</Button>
                            <Button size="lg" variant="outline">
                                View Properties
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
