<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('date_added', 'desc')->get();
        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Projects/ProjectForm');
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
        return Inertia::render('Public/Projects/ProjectForm', [
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

            'budget' => 'nullable|numeric',
            'location' => 'nullable|string',
            'team_size' => 'nullable|integer',
            'progress' => 'nullable|integer|min:0|max:100',
            'date_added' => 'nullable|date',
            'is_featured' => 'boolean',
        ]);

        $project->update($validated);

        return redirect()->route('admin.projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('admin.projects.index');
    }

    public function publicIndex()
    {
        $projects = Project::orderBy('date_added', 'desc')->get();
        $featuredProjects = Project::where('is_featured', true)->orderBy('date_added', 'desc')->get();
        $otherProjects = Project::where('is_featured', false)->orderBy('date_added', 'desc')->get();

        $stats = [
            'total_value' => '$' . number_format($projects->sum('budget')) . '+',
            'completed' => $projects->where('status', 'completed')->count() . '+',
            'units_delivered' => $projects->sum('team_size') . '+', // Using team_size as a proxy for units
            'experience' => '15+' // Hardcoded as in the sample
        ];

        $projectTypes = $projects->groupBy('type')->map(function ($group) {
            return $group->count();
        });

        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
            'featuredProjects' => $featuredProjects,
            'otherProjects' => $otherProjects,
            'stats' => $stats,
            'projectTypes' => $projectTypes,
        ]);
    }

    public function publicShow(Project $project)
    {
        $otherProjects = Project::where('id', '!=', $project->id)->inRandomOrder()->limit(3)->get();

        return Inertia::render('Public/Projects/Show', [
            'project' => $project,
            'otherProjects' => $otherProjects,
        ]);
    }
}
