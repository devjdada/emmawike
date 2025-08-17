<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\User;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there's at least one user to associate with blogs
        if (User::count() === 0) {
            User::factory()->create([
                'name' => 'Seeder User',
                'email' => 'seeder@example.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]);
        }

        // Get a random user to be the author
        $user = User::inRandomOrder()->first();

        // Create 13 blog posts
        Blog::factory()->count(13)->create([
            'user_id' => $user->id,
        ]);
    }
}