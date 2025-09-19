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
            'photo_url' => 'nullable|url|max:255',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bio' => 'nullable|string',
        ]);

        // Custom validation logic to ensure only one of photo_url or photo_file is present
        if ($request->filled('photo_url') && $request->hasFile('photo_file')) {
            return redirect()->back()->withErrors(['photo_url' => 'Please provide either a Photo URL or upload a Photo file, not both.']);
        }

        $photoPath = null;

        if ($request->hasFile('photo_file')) {
            $photoPath = $request->file('photo_file')->store('team', 'public');
        } elseif ($request->filled('photo_url')) {
            try {
                $contents = file_get_contents($request->input('photo_url'));
                $name = basename($request->input('photo_url'));
                $photoPath = 'team/' . $name;
                Storage::disk('public')->put($photoPath, $contents);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['photo_url' => 'Could not download image from URL.']);
            }
        }

        TeamMember::create(array_merge($validated, ['photo_url' => $photoPath]));

        return redirect()->route('admin.teams.index')->with('success', 'Team member created successfully.');
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'photo_url' => 'nullable|url|max:255',
            'photo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bio' => 'nullable|string',
        ]);

        // Custom validation logic to ensure only one of photo_url or photo_file is present
        if ($request->filled('photo_url') && $request->hasFile('photo_file')) {
            return redirect()->back()->withErrors(['photo_url' => 'Please provide either a Photo URL or upload a Photo file, not both.']);
        }

        $photoPath = $teamMember->photo_url; // Keep existing photo if no new one is provided

        if ($request->hasFile('photo_file')) {
            if ($teamMember->photo_url) {
                Storage::disk('public')->delete($teamMember->photo_url);
            }
            $photoPath = $request->file('photo_file')->store('team', 'public');
        } elseif ($request->filled('photo_url')) {
            try {
                if ($teamMember->photo_url) {
                    Storage::disk('public')->delete($teamMember->photo_url);
                }
                $contents = file_get_contents($request->input('photo_url'));
                $name = basename($request->input('photo_url'));
                $photoPath = 'team/' . $name;
                Storage::disk('public')->put($photoPath, $contents);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['photo_url' => 'Could not download image from URL.']);
            }
        } elseif (!$request->filled('photo_url') && !$request->hasFile('photo_file')) {
            if ($teamMember->photo_url) {
                Storage::disk('public')->delete($teamMember->photo_url);
            }
            $photoPath = null;
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
