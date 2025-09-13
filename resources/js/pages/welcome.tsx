import { Head, usePage } from "@inertiajs/react";
import FeaturedListings from "@/components/home/FeaturedListings";
import HeroCarousel from "@/components/home/HeroCarousel";
import SearchBar from "@/components/home/SearchBar";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PublicLayout from "@/layouts/PublicLayout";
import type { SharedData } from "@/types";
import { Property } from "@/types/property";

interface PageProps extends SharedData {
    featuredProperties: Property[];
    heroProperties: Property[];
}

export default function Welcome() {
	const { featuredProperties, heroProperties } = usePage<PageProps>().props;

	return (
		<>
			<Head title="Welcome">
				<link rel="preconnect" href="https://fonts.bunny.net" />
				<link
					href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
					rel="stylesheet"
				/>
			</Head>
			<PublicLayout>
				<HeroCarousel slides={heroProperties} />
				<div className="px-4 sm:px-6 lg:px-8">
					<SearchBar />
				</div>
				<FeaturedListings properties={featuredProperties} />
				<StatsSection />
				<WhyChooseUs />
				<Testimonials />
			</PublicLayout>
		</>
	);
}
