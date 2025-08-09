<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('is_admin')) {
            return Blog::all();
        } elseif (Gate::allows('is_agency_owner')) {
            return Blog::whereHas('user', function ($query) {
                $query->where('agency_id', auth()->user()->agency_id);
            })->get();
        } elseif (auth()->user()->isAgent()) {
            return Blog::where('user_id', auth()->user()->id)->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'required|url',
            'user_id' => 'required|exists:users,id',
        ]);

        if (Gate::allows('is_admin')) {
            // Admin can create for any user
        } elseif (Gate::allows('is_agency_owner')) {
            // Agency owner can create for agents within their agency
            if (auth()->user()->agency_id !== \App\Models\User::find($validatedData['user_id'])->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot create blog for user outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            // Agent can only create for themselves
            if ($validatedData['user_id'] !== auth()->user()->id) {
                return response()->json(['message' => 'Unauthorized: Cannot create blog for another user.'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $blog = Blog::create($validatedData);

        return response()->json($blog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        if (Gate::allows('is_admin')) {
            return $blog;
        } elseif (Gate::allows('is_agency_owner')) {
            if ($blog->user->agency_id === auth()->user()->agency_id) {
                return $blog;
            }
        } elseif (auth()->user()->isAgent()) {
            if ($blog->user_id === auth()->user()->id) {
                return $blog;
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        if (Gate::allows('is_admin')) {
            // Admin can update any blog
        } elseif (Gate::allows('is_agency_owner')) {
            if ($blog->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot update blog outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            if ($blog->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Blog update restricted to the blog owner."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image_url' => 'sometimes|required|url',
        ]);

        $blog->update($validatedData);

        return response()->json($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if (Gate::allows('is_admin')) {
            // Admin can delete any blog
        } elseif (Gate::allows('is_agency_owner')) {
            if ($blog->user->agency_id !== auth()->user()->agency_id) {
                return response()->json(['message' => 'Unauthorized: Cannot delete blog outside your agency.'], 403);
            }
        } elseif (auth()->user()->isAgent()) {
            if ($blog->user_id !== auth()->user()->id) {
                return response()->json(["message" => "Unauthorized: Cannot delete a blog belonging to another user."], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $blog->delete();

        return response()->json(null, 204);
    }
}
