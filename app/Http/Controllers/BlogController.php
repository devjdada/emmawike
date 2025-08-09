<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Blogs/Create');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Blogs/Edit', [
            'blog' => $blog,
        ]);
    }
}
