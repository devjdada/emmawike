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

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }
}
