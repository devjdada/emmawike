<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Client;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    public function about()
    {
        return Inertia::render('Public/About/Index', [
            'teamMembers' => TeamMember::all(),
            'testimonials' => Testimonial::all(),
            'clients' => Client::all(),
        ]);
    }
    //
}
