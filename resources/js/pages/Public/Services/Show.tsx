import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Calendar, CheckCircle, Clock, Heart, Mail, Phone, Share2, Star, Users } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image_url: string;
    features: string;
    status: string;
}

interface ServiceShowProps extends PageProps {
    service: Service;
    otherServices: Service[];
}

export default function ServiceShow({ service, otherServices }: ServiceShowProps) {
    return (
        <PublicLayout>
            <Head title={service.name} />

            {/* Hero Section */}
            <section
                className="relative overflow-hidden pt-32 pb-16"
                style={{
                    backgroundImage: `url(${service.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-4xl"
                    >
                        <div className="mb-6 flex items-center justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                                <Star className="h-10 w-10 text-primary" />
                            </div>
                        </div>

                        <Badge className="mb-4 border-accent/20 bg-accent/10 text-accent">{service.category}</Badge>

                        <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">{service.name}</h1>

                        {/* <div
							className="text-xl text-muted-foreground mb-8 leading-relaxed prose max-w-none tiptap"
							dangerouslySetInnerHTML={{ __html: service.description }}
						/> */}

                        <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                                <span>4.8/5.0 Rating</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="mr-2 h-4 w-4" />
                                <span>250+ Happy Clients</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Get Started Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg">
                                <Heart className="mr-2 h-4 w-4" />
                                Save Service
                            </Button>
                            <Button variant="outline" size="lg">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Service Details */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mx-auto max-w-4xl"
                            >
                                <Badge className="mb-4 border-accent/20 bg-accent/10 text-accent">{service.category}</Badge>

                                <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">{service.name}</h1>

                                <div
                                    className="prose tiptap mb-8 max-w-none text-xl leading-relaxed text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: service.description }}
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <CheckCircle className="mr-3 h-6 w-6 text-accent" />
                                            What's Included
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {service.features?.split(',').map((feature, index) => (
                                                <div key={index} className="flex items-start">
                                                    <CheckCircle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-accent" />
                                                    <span className="text-muted-foreground">{feature.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Service Benefits */}
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Award className="mr-3 h-6 w-6 text-primary" />
                                            Why Choose This Service
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Expert Guidance</h4>
                                                        <p className="text-sm text-muted-foreground">Professional advice from certified experts</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Proven Results</h4>
                                                        <p className="text-sm text-muted-foreground">Track record of successful outcomes</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Personalized Approach</h4>
                                                        <p className="text-sm text-muted-foreground">Tailored solutions for your specific needs</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Quick Turnaround</h4>
                                                        <p className="text-sm text-muted-foreground">Efficient process with fast results</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Ongoing Support</h4>
                                                        <p className="text-sm text-muted-foreground">Continued assistance after service completion</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mt-3 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">Competitive Pricing</h4>
                                                        <p className="text-sm text-muted-foreground">Best value for professional service</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-20 space-y-6">
                            {/* Pricing Card */}
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <Card className="border-2 border-primary/20">
                                    <CardHeader className="text-center">
                                        <div className="text-3xl font-bold text-primary">${service.price}</div>
                                        <p className="text-sm text-muted-foreground">Starting from</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                                            Book This Service
                                        </Button>
                                        <Button variant="outline" className="w-full" size="lg">
                                            Request Quote
                                        </Button>

                                        <div className="space-y-3 border-t border-border pt-4">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="mr-2 h-4 w-4" />
                                                <span>Duration: {service.duration}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                <span>Available: {service.status === 'active' ? 'Immediate start' : 'Contact for availability'}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Contact Card */}
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Need More Information?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Our service specialists are ready to answer your questions and help you get started.
                                        </p>
                                        <div className="space-y-3">
                                            <Button variant="outline" className="w-full">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Us: (555) 123-4567
                                            </Button>
                                            <Button variant="outline" className="w-full">
                                                <Mail className="mr-2 h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
