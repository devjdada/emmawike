<?php

namespace App\Http\Controllers;

use App\Models\CompensationEvaluation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompensationEvaluationController extends Controller
{
    public function index()
    {
        $evaluations = CompensationEvaluation::with('evaluatable')->get();
        return Inertia::render('CompensationEvaluations/Index', [
            'evaluations' => $evaluations,
        ]);
    }

    public function create()
    {
        return Inertia::render('CompensationEvaluations/Create');
    }

    public function edit(CompensationEvaluation $compensationEvaluation)
    {
        return Inertia::render('CompensationEvaluations/Edit', [
            'evaluation' => $compensationEvaluation->load('evaluatable'),
        ]);
    }
}
