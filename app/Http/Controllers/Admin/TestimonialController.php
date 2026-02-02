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
            'photo_file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photoPath = $request->file('photo_file')->store('testimonials', 'public');

        Testimonial::create(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photoPath = $testimonial->photo_url;

        if ($request->hasFile('photo_file')) {
            if ($testimonial->photo_url) {
                Storage::disk('public')->delete($testimonial->photo_url);
            }
            $photoPath = $request->file('photo_file')->store('testimonials', 'public');
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