import { FeaturedProjectsCarousel } from '@/components/FeaturedProjectsCarousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Award, Building, Building2, Calendar, Home, MapPin, TrendingUp, Warehouse } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    image_url: string;
    status: string;
    type: string;
    budget: number;
    team_size: number;
    start_date: string;
    end_date: string;
}

interface ProjectsIndexProps extends PageProps {
    projects: Project[];
    featuredProjects: Project[];
    otherProjects: Project[];
    stats: {
        total_value: string;
        completed: string;
        units_delivered: string;
        experience: string;
    };
    projectTypes: Record<string, number>;
}

export default function ProjectsIndex({ projects, featuredProjects, otherProjects, stats, projectTypes }: ProjectsIndexProps) {
    const statsIcons = {
        total_value: TrendingUp,
        completed: Award,
        units_delivered: Building,
        experience: Calendar,
    };

    const projectTypeIcons = {
        Residential: Home,
        Commercial: Building2,
        'Mixed-Use': Building,
        Industrial: Warehouse,
        Resort: Building,
        Renovation: Building,
        Infrastructure: Building,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            case 'planning':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        return projectTypeIcons[type] || Building;
    };

    return (
        <PublicLayout>
            <Head title="Projects" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 pt-32 pb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=1920&h=800&fit=crop)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">Our Projects</h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
                            Discover our portfolio of exceptional real estate developments that shape communities and create lasting value for
                            investors and residents alike.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-b border-border py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {Object.entries(stats).map(([key, value], index) => {
                            const Icon = statsIcons[key];
                            const label = key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
                            return (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                    className="text-center"
                                >
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="mb-2 text-3xl font-bold text-foreground">{value}</div>
                                    <div className="text-muted-foreground">{label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Project Types */}
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Project Categories</h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            We specialize in diverse real estate developments across multiple sectors.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {Object.entries(projectTypes).map(([name, count], index) => {
                            const Icon = getTypeIcon(name);
                            return (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                >
                                    <Card className="group cursor-pointer text-center transition-shadow duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/20">
                                                <Icon className="h-6 w-6 text-accent" />
                                            </div>
                                            <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">{name}</h3>
                                            <p className="text-2xl font-bold text-primary">{count}</p>
                                            <p className="text-sm text-muted-foreground">Projects</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Project Carousel */}
            {featuredProjects.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <h2 className="mb-8 text-2xl font-bold text-foreground">Featured Projects</h2>
                            <FeaturedProjectsCarousel featuredProjects={featuredProjects} />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Projects Grid */}
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-bold text-foreground">All Projects</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => {
                            const TypeIcon = getTypeIcon(project.type);
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                >
                                    <Card className="group h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                                        <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.image_url})` }}>
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                                                    <TypeIcon className="h-4 w-4 text-primary" />
                                                </div>
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            <h3 className="mb-2 font-bold transition-colors group-hover:text-primary">{project.title}</h3>
                                            <div className="mb-3 flex items-center text-muted-foreground">
                                                <MapPin className="mr-2 h-4 w-4" />
                                                <span className="text-sm">{project.location}</span>
                                            </div>
                                            <div
                                                className="tiptap mb-4 text-sm text-muted-foreground"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        project.description.length > 300
                                                            ? project.description.slice(0, 300) + '...'
                                                            : project.description,
                                                }}
                                            />

                                            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">Value:</span>
                                                    <span className="ml-1 font-semibold">${project.budget.toLocaleString()}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Timeline:</span>
                                                    <span className="ml-1 font-semibold">
                                                        {project.start_date} - {project.end_date}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link href={route('projects.show', project.id)}>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Partner with Us</h2>
                        <p className="mb-8 text-muted-foreground">
                            Interested in investing in our upcoming projects or discussing a potential partnership? We'd love to hear from you.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg">Investment Opportunities</Button>
                            <Button size="lg" variant="outline">
                                Contact Our Team
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
