<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Owner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OwnerController extends Controller
{
    public function index()
    {
        $owners = Owner::all();
        return Inertia::render('Admin/Owners/Index', [
            'owners' => $owners,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Owners/Create');
    }

    public function edit(Owner $owner)
    {
        return Inertia::render('Admin/Owners/Edit', [
            'owner' => $owner,
        ]);
    }
}
