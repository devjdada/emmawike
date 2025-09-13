import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';

export default function Index() {
    return (
        <PublicLayout>
            <Head title="About Us" />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">About Us</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="mb-4">Welcome to Emma Wika Real Estate, your trusted partner in finding the perfect property. We are dedicated to providing you with the best real estate experience, whether you are looking to buy, sell, or rent.</p>
                    <p className="mb-4">Our team of experienced professionals is committed to helping you achieve your real estate goals. We believe in transparency, integrity, and personalized service to meet your unique needs.</p>
                    <p>Thank you for choosing Emma Wika Real Estate. We look forward to serving you!</p>
                </div>
            </div>
        </PublicLayout>
    );
}
