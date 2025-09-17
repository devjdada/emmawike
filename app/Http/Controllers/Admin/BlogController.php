<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string',
            'status' => 'string|in:draft,published',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tags' => 'nullable|string',
            'read_time' => 'nullable|integer',
        ]);

        $validated['user_id'] = auth()->id();

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blogs', 'public');
            $validated['featured_image'] = asset('storage/' . $path);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = explode(',', $validated['tags']);
        }

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully.');
    }

    public function edit(Blog $blog)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'author' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'status' => 'string|in:draft,published',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tags' => 'nullable|string',
            'read_time' => 'nullable|integer',
        ]);

        if ($request->hasFile('featured_image')) {
            if ($blog->featured_image) {
                $oldImagePath = str_replace(asset('storage/'), '', $blog->featured_image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $path = $request->file('featured_image')->store('blogs', 'public');
            $validated['featured_image'] = asset('storage/' . $path);
        }

        if (isset($validated['tags'])) {
            $validated['tags'] = explode(',', $validated['tags']);
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully.');
    }

    public function publicIndex()
    {
        $blogs = Blog::where('status', 'published')->get();
        return Inertia::render('Public/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function publicShow(Blog $blog)
    {
        return Inertia::render('Public/Blogs/Show', [
            'blog' => $blog,
        ]);
    }
}
