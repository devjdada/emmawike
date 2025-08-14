<?php

namespace Database\Factories;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AgencyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Agency::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => (string) Str::uuid(), // Generate UUID for the primary key
            'name' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'logo_url' => $this->faker->imageUrl(640, 480, 'business', true),
            // 'user_id' will be set in the seeder
        ];
    }
}
