<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TeamMemberResource::collection(TeamMember::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamMember $teamMember)
    {
        return new TeamMemberResource($teamMember);
    }
}
