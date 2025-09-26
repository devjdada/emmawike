<?php

/**
 * @deprecated This controller is deprecated and will be removed in a future version.
 * The functionality is being refactored into CompensationController and ValuationController.
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\CompensationEvaluation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CompensationEvaluationController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', CompensationEvaluation::class);

        $query = CompensationEvaluation::with('evaluatable');

        if (Auth::user()->role === 'staff') {
            $query->where('user_id', Auth::id());
        }

        $evaluations = $query->get();

        return Inertia::render('Admin/CompensationEvaluations/Index', [
            'evaluations' => $evaluations,
        ]);
    }

    public function create()
    {
        $this->authorize('create', CompensationEvaluation::class);
        return Inertia::render('Admin/CompensationEvaluations/Create', [
            'can' => [
                'publish' => Auth::user()->can('publish', CompensationEvaluation::class),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', CompensationEvaluation::class);

        $validated = $request->validate([
            'evaluation_type' => 'required|string|in:crop,machine,land,property',
            'status' => 'required|string|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
            // Add validation for specific evaluation types
        ]);

        if (Auth::user()->role === 'staff') {
            $validated['status'] = 'draft';
        }

        $evaluation = Auth::user()->compensationEvaluations()->create($validated);

        // Logic to create the specific evaluatable model (CropEvaluation, etc.)

        return redirect()->route('admin.compensation-evaluations.index')->with('success', 'Evaluation created successfully.');
    }

    public function edit(CompensationEvaluation $compensationEvaluation)
    {
        $this->authorize('update', $compensationEvaluation);

        return Inertia::render('Admin/CompensationEvaluations/Edit', [
            'evaluation' => $compensationEvaluation->load('evaluatable'),
            'can' => [
                'publish' => Auth::user()->can('publish', $compensationEvaluation),
            ]
        ]);
    }

    public function update(Request $request, CompensationEvaluation $compensationEvaluation)
    {
        $this->authorize('update', $compensationEvaluation);

        $validated = $request->validate([
            'evaluation_type' => 'required|string|in:crop,machine,land,property',
            'status' => 'required|string|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'total_value' => 'nullable|numeric',
            // Add validation for specific evaluation types
        ]);

        if (Auth::user()->role === 'staff' && $validated['status'] !== 'draft') {
            abort(403, 'You are not authorized to publish this evaluation.');
        }

        if (Auth::user()->role === 'admin' && $compensationEvaluation->status === 'draft' && $validated['status'] !== 'draft') {
            $this->authorize('publish', $compensationEvaluation);
        }

        $compensationEvaluation->update($validated);

        // Logic to update the specific evaluatable model (CropEvaluation, etc.)

        return redirect()->route('admin.compensation-evaluations.index')->with('success', 'Evaluation updated successfully.');
    }

    public function show(CompensationEvaluation $compensationEvaluation)
    {
        $this->authorize('view', $compensationEvaluation);

        return Inertia::render('Admin/CompensationEvaluations/Show', [
            'evaluation' => $compensationEvaluation->load('evaluatable'),
        ]);
    }
}
