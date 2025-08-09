<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'posted_by_staff_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image_url' => 'nullable|url',
            'budget' => 'nullable|numeric',
            'location' => 'nullable|string',
            'team_size' => 'nullable|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'date_added' => 'nullable|date',
            'is_featured' => 'boolean',
        ]);

        Project::create($validated);

        return redirect()->route('projects.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'posted_by_staff_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image_url' => 'nullable|url',
            'budget' => 'nullable|numeric',
            'location' => 'nullable|string',
            'team_size' => 'nullable|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'date_added' => 'nullable|date',
            'is_featured' => 'boolean',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index');
    }
}
