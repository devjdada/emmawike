<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OwnerController extends Controller
{
    public function index()
    {
        $owners = Owner::all();
        return Inertia::render('Owners/Index', [
            'owners' => $owners,
        ]);
    }

    public function create()
    {
        return Inertia::render('Owners/Create');
    }

    public function edit(Owner $owner)
    {
        return Inertia::render('Owners/Edit', [
            'owner' => $owner,
        ]);
    }
}
