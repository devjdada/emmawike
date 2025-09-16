<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('is_admin');
        return Project::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:residential,commercial,industrial',
            'status' => 'required|string|in:planning,in_progress,completed,on_hold',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'budget' => 'required|numeric',
            'location' => 'required|string',
            'is_featured' => 'boolean',
            'progress' => 'integer|min:0|max:100',
            'team_size' => 'integer|min:1',
        ]);

        $validatedData['posted_by_staff_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validatedData['image_url'] = asset('storage/' . $path);
        }
        unset($validatedData['image']);

        $project = Project::create($validatedData);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        Gate::authorize('is_admin');
        return $project;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|in:residential,commercial,industrial',
            'status' => 'sometimes|required|string|in:planning,in_progress,completed,on_hold',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'budget' => 'sometimes|required|numeric',
            'location' => 'sometimes|required|string',
            'is_featured' => 'boolean',
            'progress' => 'integer|min:0|max:100',
            'team_size' => 'integer|min:1',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($project->image_url) {
                $oldImagePath = str_replace(asset('storage/'), '', $project->image_url);
                Storage::disk('public')->delete($oldImagePath);
            }

            $path = $request->file('image')->store('projects', 'public');
            $validatedData['image_url'] = asset('storage/' . $path);
        }
        unset($validatedData['image']);

        $project->update($validatedData);

        return response()->json($project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Gate::authorize('is_admin');

        $project->delete();

        return response()->json(null, 204);
    }
}
