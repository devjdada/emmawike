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

export interface Compensation {
    id: string;
    notes: string;
    total_value: number;
    status: "pending" | "approved" | "rejected" | "completed";
    name: string;
    phone: string;
    email: string;
    code: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // Add this line
}

export interface Valuation {
    id: string;
    compensation_id: string;
    description: string;
    evaluation_type: string;
    crop_type?: string;
    area_acres?: number;
    yield_per_acre?: number;
    market_price_per_unit?: number;
    damage_percentage?: number;
    machine_type?: string;
    model?: string;
    manufacture_year?: number;
    current_value?: number;
    depreciation_rate?: number;
    land_use_type?: string;
    area_sqft?: number;
    location_description?: string;
    zoning_regulations?: string;
    soil_quality?: string;
    number_of_units?: number;
    construction_year?: number;
    condition?: string;
    renovation_cost?: number;
    rate?: number;
    value?: number;
    complete_level?: string;
    complete_amount?: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};