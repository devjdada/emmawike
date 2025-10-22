<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $featuredProperties = Property::with('media')
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $formattedProperties = $featuredProperties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'price' => 'NGN ' . number_format($property->price),
                'location' => $property->city . ', ' . $property->country,
                'beds' => $property->bedrooms,
                'baths' => $property->bathrooms,
                'sqft' => $property->area_sq_ft,
                'status' => $property->status,
                'featured' => $property->is_featured,
                'image' => $property->media->first() ? Storage::url($property->media->first()->path) : null,
                'photos' => $property->media->count(),
            ];
        });

        $heroProperties = Property::with('media')
            ->where('is_featured', true)
            ->where('status', 'published')
            ->latest()
            ->take(9)
            ->get();

        $formattedHeroProperties = $heroProperties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'description' => Str::limit($property->description, 100),
                'price' => 'NGN ' . number_format($property->price),
                'location' => $property->city . ', ' . $property->country,
                'beds' => $property->bedrooms,
                'baths' => $property->bathrooms,
                'sqft' => $property->area_sq_ft,
                'image' => $property->media->first() ? Storage::url($property->media->first()->path) : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop',
            ];
        });

        return Inertia::render('welcome', [
            'featuredProperties' => $formattedProperties,
            'heroProperties' => $formattedHeroProperties,
        ]);
    }
}
