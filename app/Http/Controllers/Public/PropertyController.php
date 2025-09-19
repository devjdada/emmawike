<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::with('media')->get();
        return Inertia::render('Public/Properties/Index', [
            'properties' => $properties,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Properties/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'currency' => 'required|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'zip_code' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'area_sq_ft' => 'required|integer',
            'status' => 'required|string',
            'is_featured' => 'required|boolean',
            'media' => 'required|array',
            'media.*' => 'file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,ogg,qt|max:20480',
        ]);

        $property = Property::create($validated);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $path = $file->store('properties', 'public');
                $property->media()->create([
                    'path' => $path,
                    'type' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                    'label' => 'property_image',
                ]);
            }
        }

        return redirect()->route('properties.index');
    }

    public function show(Property $property)
    {
        $property->load('media');
        return Inertia::render('Public/Properties/Show', [
            'property' => $property,
        ]);
    }

    public function edit(Property $property)
    {
        $property->load('media');
        return Inertia::render('Public/Properties/Edit', [
            'property' => $property,
        ]);
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'owner_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'currency' => 'sometimes|required|string',
            'address_line1' => 'sometimes|required|string',
            'address_line2' => 'nullable|string',
            'city' => 'sometimes|required|string',
            'state' => 'sometimes|required|string',
            'country' => 'sometimes|required|string',
            'zip_code' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'bedrooms' => 'sometimes|required|integer',
            'bathrooms' => 'sometimes|required|integer',
            'area_sq_ft' => 'sometimes|required|integer',
            'status' => 'sometimes|required|string',
            'is_featured' => 'sometimes|required|boolean',
            'image_url' => 'nullable|url',
            'media' => 'nullable|array',
            'media.*' => 'file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,ogg,qt|max:20480',
            'deleted_media_ids' => 'nullable|array',
            'deleted_media_ids.*' => 'exists:property_media,id',
        ]);

        $property->update($validated);

        // Handle new media uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $path = $file->store('properties', 'public');
                $property->media()->create([
                    'path' => $path,
                    'type' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                    'label' => 'property_image',
                ]);
            }
        }

        // Handle media deletions
        if ($request->has('deleted_media_ids')) {
            foreach ($request->input('deleted_media_ids') as $mediaId) {
                $mediaItem = $property->media()->find($mediaId);
                if ($mediaItem) {
                    Storage::disk('public')->delete($mediaItem->path);
                    $mediaItem->delete();
                }
            }
        }

        return redirect()->route('properties.index');
    }

    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->route('properties.index');
    }

    public function updateStatus(Request $request, Property $property)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:available,published,draft,archived',
        ]);

        $property->update($validated);

        return redirect()->route('properties.index');
    }

    public function addMedia(Request $request, Property $property)
    {
        $request->validate([
            'media' => 'required|array',
            'media.*.file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,ogg,qt|max:20480',
            'media.*.label' => 'required|string|in:property_image,floor_plan',
        ]);

        foreach ($request->file('media') as $mediaItem) {
            $file = $mediaItem['file'];
            $label = data_get($mediaItem, 'label', 'property_image');
            $path = $file->store('properties', 'public');

            $property->media()->create([
                'path' => $path,
                'type' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                'label' => $label,
            ]);
        }

        return redirect()->route('properties.index');
    }

    public function incrementViewCount(Property $property)
    {
        $property->increment('views');
        return response()->json(['message' => 'View count incremented']);
    }

    public function publicIndex(Request $request)
    {
        $query = Property::with('media')->where('status', 'published');

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhere('address_line1', 'like', "%{$searchTerm}%")
                    ->orWhere('city', 'like', "%{$searchTerm}%")
                    ->orWhere('state', 'like', "%{$searchTerm}%");
            });
        }

        $properties = $query->get();

        return Inertia::render('Public/Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['search'])
        ]);
    }

    public function publicShow(Property $property)
    {
        $property->increment('views'); // Increment view count
        $property->load('media');
        return Inertia::render('Public/Properties/Show', [
            'property' => $property,
        ]);
    }
}
