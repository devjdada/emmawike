<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contactInfo = [
            'address' => '1A Evo Road, G.R.A Phase II, Port Harcourt, Rivers State, Nigeria.',
            'phone' => '+234 809 560 1292',
            'email' => 'info@emmawike.com',
            'hours' => 'Monday - Friday: 9:00 AM - 6:00 PM',
        ];

        $services = Service::inRandomOrder()->limit(4)->get();
        $teamMembers = TeamMember::all();

        return Inertia::render('Public/Contact/Index', [
            'contactInfo' => $contactInfo,
            'services' => $services,
            'teamMembers' => $teamMembers,
        ]);
    }
}
