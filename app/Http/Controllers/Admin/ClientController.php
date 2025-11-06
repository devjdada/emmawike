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
            'logo_file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url|max:255',
        ]);

        $logoPath = $request->file('logo_file')->store('clients', 'public');

        Client::create(array_merge($validated, ['logo_url' => $logoPath]));

        return redirect()->route('admin.clients.index')->with('success', 'Client created successfully.');
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_url' => 'nullable|url|max:255',
        ]);

        $logoPath = $client->logo_url;

        if ($request->hasFile('logo_file')) {
            if ($client->logo_url) {
                Storage::disk('public')->delete($client->logo_url);
            }
            $logoPath = $request->file('logo_file')->store('clients', 'public');
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