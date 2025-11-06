import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

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

interface ProjectShowProps extends PageProps {
    project: Project;
    otherProjects: Project[];
}

export default function ProjectShow({ project, otherProjects }: ProjectShowProps) {
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

    return (
        <PublicLayout>
            <Head title={project.title} />

            {/* Back Button */}
            <div className="pt-24 pb-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('projects.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="mb-8 h-96 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${project.image_url})` }} />

                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                                    <Badge variant="outline">{project.type}</Badge>
                                    <Badge variant="secondary">{new Date(project.start_date).getFullYear()}</Badge>
                                </div>

                                <h1 className="mb-4 text-4xl font-bold text-foreground">{project.title}</h1>

                                <div className="mb-6 flex items-center text-muted-foreground">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    <span className="text-lg">{project.location}</span>
                                </div>

                                <div
                                    className="prose tiptap mb-8 max-w-none text-lg text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            </div>

                            <div className="space-y-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">Project Overview</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status:</span>
                                                <span className="font-medium">{project.status}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Value:</span>
                                                <span className="font-medium">${project.budget.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Team Size:</span>
                                                <span className="font-medium">{project.team_size}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Start Date:</span>
                                                <span className="font-medium">{project.start_date}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">End Date:</span>
                                                <span className="font-medium">{project.end_date}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">Get In Touch</h3>
                                        <div className="space-y-3">
                                            <Button className="w-full">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Us
                                            </Button>
                                            <Button variant="outline" className="w-full">
                                                <Mail className="mr-2 h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Other Projects */}
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-bold text-foreground">Other Projects</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {otherProjects.map((otherProject, index) => (
                            <motion.div
                                key={otherProject.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Card className="group h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                                    <div
                                        className="relative h-48 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${otherProject.image_url})`,
                                        }}
                                    >
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className={getStatusColor(otherProject.status)}>{otherProject.status}</Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="mb-2 font-bold transition-colors group-hover:text-primary">{otherProject.title}</h3>
                                        <div className="mb-3 flex items-center text-muted-foreground">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span className="text-sm">{otherProject.location}</span>
                                        </div>
                                        <p className="mb-4 text-sm text-muted-foreground">{otherProject.description.substring(0, 100)}...</p>

                                        <Link href={route('projects.show', otherProject.id)}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
