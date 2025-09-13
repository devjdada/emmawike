<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project; // Import the Project model
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all(); // Fetch all projects

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        // Placeholder
        return Inertia::render('Admin/Projects/Create');
    }

    public function edit($id)
    {
        // Placeholder
        return Inertia::render('Admin/Projects/Edit', ['id' => $id]);
    }

    public function store(Request $request)
    {
        // Placeholder
        return redirect()->route('admin.projects.index');
    }
}
