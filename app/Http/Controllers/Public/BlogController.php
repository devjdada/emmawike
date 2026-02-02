<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('Public/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Blogs/Create');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Public/Blogs/Edit', [
            'blog' => $blog,
        ]);
    }

    public function publicIndex()
    {
        $blogs = Blog::where('status', 'published')->orderBy('published_at', 'desc')->get();
        $featuredBlog = $blogs->first();
        $otherBlogs = $blogs->skip(1)->values();
        $categories = Blog::where('status', 'published')->distinct()->pluck('category');

        return Inertia::render('Public/Blogs/Index', [
            'blogs' => $blogs,
            'featuredBlog' => $featuredBlog,
            'otherBlogs' => $otherBlogs,
            'categories' => $categories,
        ]);
    }

    public function publicShow(Blog $blog)
    {
        $otherBlogs = Blog::where('id', '!=', $blog->id)->inRandomOrder()->limit(3)->get();

        return Inertia::render('Public/Blogs/Show', [
            'blog' => $blog,
            'otherBlogs' => $otherBlogs,
        ]);
    }
}
