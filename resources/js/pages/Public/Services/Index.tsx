import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Calculator, Camera, FileText, Gavel, Home, MapPin, Shield, TrendingUp, Users } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image_url: string;
    features: string;
}

interface ServicesIndexProps extends PageProps {
    services: Service[];
}

const iconMap = {
    Home,
    TrendingUp,
    FileText,
    Calculator,
    Users,
    Shield,
    MapPin,
    Camera,
    Gavel,
    Building,
};

export default function ServicesIndex({ services }: ServicesIndexProps) {
    const specialtyServices = [
        {
            icon: Building,
            title: 'Commercial Real Estate',
            description: 'Specialized services for commercial property transactions and investments.',
        },
        {
            icon: MapPin,
            title: 'Relocation Services',
            description: 'Complete relocation assistance for corporate and individual clients.',
        },
        {
            icon: Camera,
            title: 'Property Marketing',
            description: 'Professional photography, virtual tours, and marketing materials.',
        },
        {
            icon: Gavel,
            title: 'Auction Services',
            description: 'Property auction management and bidding assistance.',
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Initial Consultation',
            description: 'We start with a comprehensive consultation to understand your needs and goals.',
        },
        {
            step: '02',
            title: 'Strategy Development',
            description: 'Our team develops a customized strategy tailored to your specific situation.',
        },
        {
            step: '03',
            title: 'Implementation',
            description: 'We execute the plan with precision, keeping you informed every step of the way.',
        },
        {
            step: '04',
            title: 'Results & Support',
            description: 'We deliver results and provide ongoing support for your continued success.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Services" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/5 to-accent/5 pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">Our Services</h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
                            Comprehensive real estate services designed to meet all your property needs. From buying and selling to investment
                            consulting and property management.
                        </p>
                        <Button size="lg" className="bg-accent hover:bg-accent/90">
                            Schedule Consultation
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Core Services - Redesigned */}
            <section className="bg-gradient-to-br from-background via-muted/20 to-background py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-16 text-center"
                    >
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                            <Home className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold text-foreground">Core Services</h2>
                        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                            Our comprehensive suite of real estate services covers every aspect of property transactions and investments with
                            professional excellence.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* start of services loop */}
                        {services.map((service, index) => {
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * (index + 2) }}
                                >
                                    <Card className="group h-full overflow-hidden border bg-card transition-all duration-1000 hover:border-primary/20 hover:bg-muted/30 hover:shadow-xl">
                                        <img
                                            src={service.image_url}
                                            alt={service.name}
                                            className="-mt-5 h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <CardContent className="p-6">
                                            <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                                                {service.name}
                                            </h3>
                                            <div
                                                className="mb-4 line-clamp-3 text-sm text-muted-foreground"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        service.description.length > 300
                                                            ? `${service.description.substring(0, 300)}...`
                                                            : service.description,
                                                }}
                                            />

                                            <div className="mb-4 space-y-2">
                                                {service.features
                                                    .split(',')
                                                    .slice(0, 3)
                                                    .map((feature) => (
                                                        <div key={feature} className="flex items-center text-xs">
                                                            <div className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"></div>
                                                            <span className="text-muted-foreground">{feature.trim()}</span>
                                                        </div>
                                                    ))}
                                                {service.features.split(',').length > 3 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        +{service.features.split(',').length - 3} more features
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between border-t border-border pt-4">
                                                <Link href={route('services.show', service.id)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                                                    >
                                                        Details
                                                        <ArrowRight className="ml-1 h-3 w-3" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                        {/* end of services loop */}
                    </div>
                </div>
            </section>

            {/* Specialty Services - Redesigned */}
            <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-accent py-20 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
                            <Building className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Specialty Services</h2>
                        <p className="mx-auto max-w-3xl text-xl text-white/90">
                            Discover our specialized services designed to meet unique real estate challenges and opportunities.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {specialtyServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="group"
                            >
                                <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-all duration-500 group-hover:scale-105 hover:bg-white/20 hover:shadow-2xl">
                                    <div className="relative mb-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 transition-colors duration-300 group-hover:bg-white/30">
                                            <service.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold text-white transition-colors group-hover:text-white/90">{service.title}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-white/80">{service.description}</p>

                                    <div className="border-t border-white/20 pt-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="font-semibold text-white transition-all duration-300 hover:bg-white/90 hover:text-primary"
                                        >
                                            Explore Service
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional CTA for Specialty Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-16 text-center"
                    >
                        <div className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                            <h3 className="mb-4 text-2xl font-bold text-white">Need a Custom Solution?</h3>
                            <p className="mb-6 text-white/90">
                                Our team specializes in creating tailored real estate solutions for unique requirements.
                            </p>
                            <Button size="lg" className="bg-white text-primary transition-all duration-300 hover:bg-white/90 hover:shadow-xl">
                                Discuss Your Needs
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Our Process</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            We follow a proven process to ensure the best outcomes for our clients.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {process.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="text-center"
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                                    <span className="text-lg font-bold text-white">{step.step}</span>
                                </div>
                                <h3 className="mb-2 font-semibold">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
                        <p className="mb-8 text-lg opacity-90">
                            Contact us today to discuss your real estate needs and discover how we can help you achieve your goals.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg" variant="secondary">
                                Schedule Consultation
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                                View Our Portfolio
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
