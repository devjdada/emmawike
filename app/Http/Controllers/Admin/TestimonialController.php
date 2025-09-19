<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::all();
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo_url' => 'nullable|url|max:255',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Custom validation logic to ensure only one of photo_url or photo_file is present
        if ($request->filled('photo_url') && $request->hasFile('photo_file')) {
            return redirect()->back()->withErrors(['photo_url' => 'Please provide either a Photo URL or upload a Photo file, not both.']);
        }

        $photoPath = null;

        if ($request->hasFile('photo_file')) {
            $photoPath = $request->file('photo_file')->store('testimonials', 'public');
        } elseif ($request->filled('photo_url')) {
            try {
                $contents = file_get_contents($request->input('photo_url'));
                $name = basename($request->input('photo_url'));
                $photoPath = 'testimonials/' . $name;
                Storage::disk('public')->put($photoPath, $contents);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['photo_url' => 'Could not download image from URL.']);
            }
        }

        Testimonial::create(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo_url' => 'nullable|url|max:255',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Custom validation logic to ensure only one of photo_url or photo_file is present
        if ($request->filled('photo_url') && $request->hasFile('photo_file')) {
            return redirect()->back()->withErrors(['photo_url' => 'Please provide either a Photo URL or upload a Photo file, not both.']);
        }

        $photoPath = $testimonial->photo_url; // Keep existing photo if no new one is provided

        if ($request->hasFile('photo_file')) {
            if ($testimonial->photo_url) {
                Storage::disk('public')->delete($testimonial->photo_url);
            }
            $photoPath = $request->file('photo_file')->store('testimonials', 'public');
        } elseif ($request->filled('photo_url')) {
            try {
                if ($testimonial->photo_url) {
                    Storage::disk('public')->delete($testimonial->photo_url);
                }
                $contents = file_get_contents($request->input('photo_url'));
                $name = basename($request->input('photo_url'));
                $photoPath = 'testimonials/' . $name;
                Storage::disk('public')->put($photoPath, $contents);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['photo_url' => 'Could not download image from URL.']);
            }
        } elseif (!$request->filled('photo_url') && !$request->hasFile('photo_file')) {
            if ($testimonial->photo_url) {
                Storage::disk('public')->delete($testimonial->photo_url);
            }
            $photoPath = null;
        }

        $testimonial->update(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo_url) {
            Storage::disk('public')->delete($testimonial->photo_url);
        }
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }
}
