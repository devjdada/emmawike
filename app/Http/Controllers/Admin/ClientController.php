<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Admin/Clients/Index', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_url' => 'nullable|url|max:255',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url|max:255',
        ]);

        // Custom validation logic to ensure only one of logo_url or logo_file is present
        if ($request->filled('logo_url') && $request->hasFile('logo_file')) {
            return redirect()->back()->withErrors(['logo_url' => 'Please provide either a Logo URL or upload a Logo file, not both.']);
        }

        $logoPath = null;

        if ($request->hasFile('logo_file')) {
            $logoPath = $request->file('logo_file')->store('clients', 'public');
        } elseif ($request->filled('logo_url')) {
            try {
                $contents = file_get_contents($request->input('logo_url'));
                $name = basename($request->input('logo_url'));
                $logoPath = 'clients/' . $name;
                Storage::disk('public')->put($logoPath, $contents);
            } catch (\Exception $e) {
                // Log the error or handle it as needed
                return redirect()->back()->withErrors(['logo_url' => 'Could not download image from URL.']);
            }
        }

        Client::create(array_merge($validated, ['logo_url' => $logoPath]));

        return redirect()->route('admin.clients.index')->with('success', 'Client created successfully.');
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_url' => 'nullable|url|max:255',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url|max:255',
        ]);

        // Custom validation logic to ensure only one of logo_url or logo_file is present
        if ($request->filled('logo_url') && $request->hasFile('logo_file')) {
            return redirect()->back()->withErrors(['logo_url' => 'Please provide either a Logo URL or upload a Logo file, not both.']);
        }

        $logoPath = $client->logo_url; // Keep existing logo if no new one is provided

        if ($request->hasFile('logo_file')) {
            if ($client->logo_url) {
                Storage::disk('public')->delete($client->logo_url);
            }
            $logoPath = $request->file('logo_file')->store('clients', 'public');
        } elseif ($request->filled('logo_url')) {
            try {
                if ($client->logo_url) {
                    Storage::disk('public')->delete($client->logo_url);
                }
                $contents = file_get_contents($request->input('logo_url'));
                $name = basename($request->input('logo_url'));
                $logoPath = 'clients/' . $name;
                Storage::disk('public')->put($logoPath, $contents);
            } catch (\Exception $e) {
                // Log the error or handle it as needed
                return redirect()->back()->withErrors(['logo_url' => 'Could not download image from URL.']);
            }
        } elseif (!$request->filled('logo_url') && !$request->hasFile('logo_file')) {
            // If both are empty, and there was an existing logo, delete it
            if ($client->logo_url) {
                Storage::disk('public')->delete($client->logo_url);
            }
            $logoPath = null;
        }

        $client->update(array_merge($validated, ['logo_url' => $logoPath]));

        return redirect()->route('admin.clients.index')->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client)
    {
        if ($client->logo_url) {
            Storage::disk('public')->delete($client->logo_url);
        }
        $client->delete();

        return redirect()->route('admin.clients.index')->with('success', 'Client deleted successfully.');
    }
}
