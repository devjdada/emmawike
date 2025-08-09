<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgencyController extends Controller
{
    public function index()
    {
        $agencies = Agency::all();
        return Inertia::render('Agencies/Index', [
            'agencies' => $agencies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Agencies/Create');
    }

    public function edit(Agency $agency)
    {
        return Inertia::render('Agencies/Edit', [
            'agency' => $agency,
        ]);
    }
}
