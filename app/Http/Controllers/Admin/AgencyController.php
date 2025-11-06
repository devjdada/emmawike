<?php

namespace App\Http\Controllers\Admin;

use App\Models\Agency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AgencyController extends Controller
{
    public function index()
    {
        $agencies = Agency::all();
        return Inertia::render('Admin/Agencies/Index', [
            'agencies' => $agencies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Agencies/Create');
    }

    public function edit(Agency $agency)
    {
        return Inertia::render('Admin/Agencies/Edit', [
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
