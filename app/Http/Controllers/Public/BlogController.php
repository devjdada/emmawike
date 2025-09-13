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
