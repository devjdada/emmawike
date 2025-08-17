<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Blog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(5, 10));
        $content = $this->faker->paragraphs(rand(5, 10), true);
        $status = $this->faker->randomElement(['draft', 'published', 'archived']);
        $publishedAt = $status === 'published' ? $this->faker->dateTimeBetween('-1 year', 'now') : null;
        $categories = ["Market Analysis", "Buying Guide", "Investment", "Property Management", "Legal"];

        return [
            'id' => (string) Str::uuid(),
            'user_id' => User::factory(), // Will create a new user or use an existing one
            'title' => $title,
            'content' => $content,
            'excerpt' => $this->faker->sentence(20),
            'author' => $this->faker->name(),
            'category' => $this->faker->randomElement($categories),
            'status' => $status,
            'published_at' => $publishedAt,
            'featured_image' => $this->faker->imageUrl(640, 480, 'business', true),
            'tags' => $this->faker->words(rand(2, 5)), // Generates an array of words
            'read_time' => rand(2, 10), // Read time in minutes
        ];
    }
}
