import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    duration: string;
    image_url: string;
    featured: boolean;
    status: string;
    features: string;
}

interface ServiceShowProps extends PageProps {
    service: Service;
}

export default function ServiceShow({ auth, service }: ServiceShowProps) {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'draft':
                return 'secondary';
            case 'inactive':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title={service.name} />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.services.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Button>
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{service.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <img src={service.image_url} alt={service.name} className="mb-6 h-96 w-full rounded-lg object-cover" />
                                        <div className="prose tiptap max-w-none" dangerouslySetInnerHTML={{ __html: service.description }} />
                                    </div>
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Details</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div>
                                                    <h3 className="font-medium">Category</h3>
                                                    <p>{service.category}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">Price</h3>
                                                    <p>${service.price.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">Duration</h3>
                                                    <p>{service.duration}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">Status</h3>
                                                    <Badge variant={getStatusVariant(service.status)}>{service.status}</Badge>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">Featured</h3>
                                                    <p>{service.featured ? 'Yes' : 'No'}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Features</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-inside list-disc space-y-1">
                                                    {service.features.split(',').map((feature, index) => (
                                                        <li key={index}>{feature.trim()}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}
