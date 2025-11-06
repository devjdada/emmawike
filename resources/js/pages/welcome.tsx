import FeaturedListings from '@/components/home/FeaturedListings';
import HeroCarousel from '@/components/home/HeroCarousel';
import SearchBar from '@/components/home/SearchBar';
import StatsSection from '@/components/home/StatsSection';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PublicLayout from '@/layouts/PublicLayout';
import type { SharedData } from '@/types';
import type { Property } from '@/types/property';
import { Head, usePage } from '@inertiajs/react';

interface PageProps extends SharedData {
    featuredProperties: Property[];
    heroProperties: Property[];
    testimonials: any[]; // You can create a more specific type for testimonials
    clients: any[]; // You can create a more specific type for clients
}

export default function Welcome() {
    const { featuredProperties, heroProperties, testimonials, clients } = usePage<PageProps>().props;

    const dummyStats = [
        {
            icon: 'TrendingUp',
            number: '20+',
            label: 'Years in Business',
            description: 'Experience you can trust.',
        },
        {
            icon: 'Users',
            number: '500+',
            label: 'Happy Clients',
            description: 'Our clients are our priority.',
        },
        {
            icon: 'Award',
            number: '100%',
            label: 'Satisfaction',
            description: 'Guaranteed results.',
        },
        {
            icon: 'MapPin',
            number: '300+',
            label: 'Properties Sold',
            description: 'Across various locations.',
        },
    ];

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <PublicLayout>
                <HeroCarousel slides={heroProperties} />
                <div className="px-4 sm:px-6 lg:px-8">
                    <SearchBar />
                </div>
                <FeaturedListings properties={featuredProperties} />

                <WhyChooseUs />
                <StatsSection stats={dummyStats} clients={clients} />
                <Testimonials testimonials={testimonials} />
            </PublicLayout>
        </>
    );
}
