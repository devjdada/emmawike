import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Agency {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    user_id: string;
    users?: User[]; // Eager loaded agents belonging to the agency
    owner?: User; // Eager loaded owner of the agency
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string; // Added for agent avatar
    phone?: string; // Added for agent phone
    location?: string; // Added for agent location
    specialization?: string; // Added for agent specialization
    experience?: string; // Added for agent experience
    rating?: number; // Added for agent rating
    totalSales?: number; // Added for agent total sales
    bio?: string; // Added for agent bio
    certifications?: string[]; // Added for agent certifications
    languages?: string[]; // Added for agent languages
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface TeamMember {
    id: number;
    name: string;
    title: string;
    photo_url: string;
    bio: string;
}

export interface Testimonial {
    id: number;
    author_name: string;
    author_title: string;
    content: string;
    photo_url: string;
}

export interface Client {
    id: number;
    name: string;
    logo_url: string;
    website_url: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
