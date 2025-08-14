<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => Str::uuid(),
            'posted_by_staff_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['residential', 'commercial', 'industrial']),
            'status' => $this->faker->randomElement(['planning', 'in_progress', 'completed', 'on_hold']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'image_url' => $this->faker->imageUrl(),
            'budget' => $this->faker->numberBetween(100000, 5000000),
            'location' => $this->faker->address(),
            'is_featured' => $this->faker->boolean(),
            'progress' => $this->faker->numberBetween(0, 100),
            'date_added' => $this->faker->date(),
            'team_size' => $this->faker->numberBetween(2, 20),
        ];
    }
}