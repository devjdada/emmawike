<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::all();
        return Inertia::render('Admin/Team/Index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'photo_file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bio' => 'nullable|string',
        ]);

        $photoPath = $request->file('photo_file')->store('team', 'public');

        TeamMember::create(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.teams.index')->with('success', 'Team member created successfully.');
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bio' => 'nullable|string',
        ]);

        $photoPath = $teamMember->photo_url;

        if ($request->hasFile('photo_file')) {
            if ($teamMember->photo_url) {
                Storage::disk('public')->delete($teamMember->photo_url);
            }
            $photoPath = $request->file('photo_file')->store('team', 'public');
        }

        $teamMember->update(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.teams.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->photo_url) {
            Storage::disk('public')->delete($teamMember->photo_url);
        }
        $teamMember->delete();

        return redirect()->route('admin.teams.index')->with('success', 'Team member deleted successfully.');
    }
}