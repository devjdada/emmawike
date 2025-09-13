<?php

namespace App\Http\Controllers\Public;

use App\Models\Agency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AgencyController extends Controller
{
    public function index()
    {
        $agencies = Agency::all();
        return Inertia::render('Public/Agencies/Index', [
            'agencies' => $agencies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Public/Agencies/Create');
    }

    public function edit(Agency $agency)
    {
        return Inertia::render('Public/Agencies/Edit', [
            'agency' => $agency,
        ]);
    }

    public function publicIndex()
    {
        $agencies = Agency::all();
        return Inertia::render('Public/Agencies/Index', [
            'agencies' => $agencies,
        ]);
    }
}
