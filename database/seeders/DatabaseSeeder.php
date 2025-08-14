<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Property;
use App\Models\Agency; // Import Agency model
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // Import Hash facade
use Illuminate\Support\Str; // Import Str facade

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create 20 agencies with 1 to 5 agents each
        for ($i = 0; $i < 20; $i++) {
            // Create an owner/main agent for the agency
            $owner = User::factory()->create([
                'password' => Hash::make('password'),
                'role' => 'agent',
            ]);

            // Create the agency
            $agency = Agency::factory()->create([
                'user_id' => $owner->id, // Set the owner of the agency
                'name' => 'Agency ' . Str::random(5),
                'description' => 'Description for Agency ' . ($i + 1),
                'logo_url' => 'https://via.placeholder.com/150',
            ]);

            // Assign the owner to the agency
            $owner->agency_id = $agency->id;
            $owner->save();

            // Create 0 to 4 additional agents for the agency
            $numberOfAdditionalAgents = rand(0, 4);
            User::factory($numberOfAdditionalAgents)->create([
                'agency_id' => $agency->id,
                'password' => Hash::make('password'),
                'role' => 'agent',
            ]);
        }

        Property::factory(20)->create();
        \App\Models\Project::factory(20)->create();
    }
}
