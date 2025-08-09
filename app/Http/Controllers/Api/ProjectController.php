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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'image_url' => 'required|url',
        ]);

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
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'location' => 'sometimes|required|string',
            'image_url' => 'sometimes|required|url',
        ]);

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
