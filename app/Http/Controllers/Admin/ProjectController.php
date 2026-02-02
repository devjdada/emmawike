<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        Gate::authorize('is_admin');
        $projects = Project::all();
        return Inertia::render('Admin/Projects/Index', ['projects' => $projects]);
    }

    public function create()
    {
        Gate::authorize('is_admin');
        return Inertia::render('Admin/Projects/ProjectForm');
    }

    public function store(Request $request)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:residential,commercial,industrial,mixed_use,resort,renovation,infrastructure',
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

        Project::create($validatedData);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        Gate::authorize('is_admin');
        return Inertia::render('Admin/Projects/Show', ['project' => $project]);
    }

    public function edit(Project $project)
    {
        Gate::authorize('is_admin');
        return Inertia::render('Admin/Projects/ProjectForm', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        Gate::authorize('is_admin');

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|in:residential,commercial,industrial,mixed_use,resort,renovation,infrastructure',
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
            if ($project->image_url) {
                $oldImagePath = str_replace(asset('storage/'), '', $project->image_url);
                Storage::disk('public')->delete($oldImagePath);
            }

            $path = $request->file('image')->store('projects', 'public');
            $validatedData['image_url'] = asset('storage/' . $path);
        }
        unset($validatedData['image']);

        $project->update($validatedData);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        Gate::authorize('is_admin');
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}